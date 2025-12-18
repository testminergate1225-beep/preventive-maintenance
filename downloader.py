import requests
import os

def download_json_from_url(url, local_filename=None):
    """
    Downloads a file from a URL and saves it locally.

    Args:
        url (str): The URL of the file to download (expected to be a JSON file).
        local_filename (str, optional): The name to save the file as.
                                        If None, it tries to infer the name
                                        from the URL or defaults to 'downloaded_file.json'.
    """
    if local_filename is None:
        # Try to infer filename from the URL path
        local_filename = url.split('/')[-1]
        if not local_filename or '.' not in local_filename:
            local_filename = 'downloaded_data.json'
        elif not local_filename.lower().endswith('.json'):
            # Ensure it has a .json extension
            local_filename = os.path.splitext(local_filename)[0] + '.json'

    try:
        # 1. Send an HTTP GET request to the URL
        print(f"Attempting to download from: {url}")
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx)

        # 2. Check content type (optional but good practice for JSON)
        content_type = response.headers.get('Content-Type', '')
        if 'json' not in content_type.lower() and 'text' not in content_type.lower():
             print(f"Warning: Expected JSON, but received Content-Type: {content_type}")

        # 3. Save the content to the local file
        with open(local_filename, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:  # filter out keep-alive new chunks
                    f.write(chunk)

        print(f"✅ Successfully downloaded and saved to: {local_filename}")
        print(f"File size: {os.path.getsize(local_filename) / 1024:.2f} KB")

    except requests.exceptions.RequestException as e:
        print(f"❌ An error occurred during the download process: {e}")
    except IOError as e:
        print(f"❌ An error occurred while writing the file: {e}")

# --- Example Usage ---
# REPLACE THIS WITH YOUR ACTUAL JSON URL
json_url = "https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2YvYy9mYjFhNzcxYzI5NWQxYjBhL0lnQ2UtOFY2YS1EZFNvOWxJSzRUWlZUWUFjNHdTM0NuTVlyUk4waGpxbUhaNEpZP2U9NToxQVRTeDcmc2hhcmluZ3YyPXRydWUmZnJvbVNoYXJlPXRydWUmYXQ9OSZ3ZE9yaWdpbj1PV0EuTElOSyZ3ZFByZXZpb3VzU2Vzc2lvbj02ZjA4NmJlYi00NzE2LTQ5YWUtOWFkZi03NTRlYjY5YjcyMTg&id=FB1A771C295D1B0A%21s7ac5fb9ee06b4add8f6520ae136554d8&cid=FB1A771C295D1B0A"
output_name = "pm_records_backup.json"

download_json_from_url(json_url, output_name)

# Another example where the filename is automatically determined
# json_url_2 = "YOUR_SECOND_JSON_URL_HERE"
# download_json_from_url(json_url_2)