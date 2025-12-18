#!/usr/bin/env python3
"""
A tiny static file server that also accepts POST to /save_backup to save
`pm_records_backup/pm_records_backup.json` on disk. Run from the project root:

    py -3 save_server.py 5500

It will serve the current directory and accept a POST with JSON body.
"""
import http.server
import socketserver
import sys
import os
import json
from urllib.parse import urlparse

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5500
BACKUP_DIR = 'pm_records_backup'
BACKUP_FILE = 'pm_records_backup.json'

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # allow cross-origin requests from localhost (useful for testing)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == '/save_backup':
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length) if length else b''
            try:
                # ensure backup dir exists
                os.makedirs(BACKUP_DIR, exist_ok=True)
                target = os.path.join(BACKUP_DIR, BACKUP_FILE)

                # parse incoming JSON (expected array or single object)
                incoming = []
                try:
                    parsed_in = json.loads(body.decode('utf-8') if body else '[]')
                    if isinstance(parsed_in, list):
                        incoming = parsed_in
                    elif parsed_in:
                        incoming = [parsed_in]
                except Exception:
                    # if incoming is not valid JSON, treat as empty
                    incoming = []

                # gather all existing JSON files in the backup dir
                existing = []
                for fname in os.listdir(BACKUP_DIR):
                    if not fname.lower().endswith('.json'):
                        continue
                    fpath = os.path.join(BACKUP_DIR, fname)
                    # skip temporary file if present
                    if fname.endswith('.tmp'):
                        continue
                    try:
                        with open(fpath, 'r', encoding='utf-8') as rf:
                            data = json.load(rf)
                            if isinstance(data, list):
                                existing.extend(data)
                            elif data:
                                existing.append(data)
                    except Exception:
                        # skip unreadable/invalid json files
                        continue

                # deduplicate using stable stringify (sort keys)
                def stable_stringify(o):
                    if o is None or not isinstance(o, (dict, list)):
                        return json.dumps(o, sort_keys=True)
                    if isinstance(o, list):
                        return '[' + ','.join(stable_stringify(x) for x in o) + ']'
                    # dict
                    items = []
                    for k in sorted(o.keys()):
                        items.append(json.dumps(k) + ':' + stable_stringify(o[k]))
                    return '{' + ','.join(items) + '}'

                merged_list = []
                seen = set()
                for r in existing + incoming:
                    try:
                        key = stable_stringify(r)
                    except Exception:
                        key = json.dumps(r, sort_keys=True)
                    if key not in seen:
                        seen.add(key)
                        merged_list.append(r)

                # write merged result atomically
                tmp = target + '.tmp'
                with open(tmp, 'w', encoding='utf-8') as f:
                    json.dump(merged_list, f, indent=2, ensure_ascii=False)
                os.replace(tmp, target)
                # respond with info on counts
                resp_obj = { 'status': 'ok', 'message': 'saved', 'existing_files_merged': len(existing), 'incoming_count': len(incoming), 'merged_count': len(merged_list) }
                resp_bytes = json.dumps(resp_obj).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(resp_bytes)
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                msg = ('{"status":"error","message":"' + str(e).replace('"','\\"') + '"}').encode('utf-8')
                self.wfile.write(msg)
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}; POST /save_backup will write {BACKUP_DIR}/{BACKUP_FILE}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nStopping server')
            httpd.server_close()
