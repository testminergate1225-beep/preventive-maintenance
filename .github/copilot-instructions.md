# Electrical Preventive Maintenance (EPM) System - AI Coding Instructions

## System Overview
A browser-based preventive maintenance record-keeping system for electrical equipment in retail branches (TW/JA/FH/AQ). Pure HTML/CSS/JavaScript frontend with optional Python backend for backup management.

## Architecture

### Data Storage
- **Primary storage**: Browser `localStorage` with key `epm_records_v1`
- **Records structure**: Array of objects with fields: `BranchCode`, `BranchName`, `location`, `date`, `equipment`, `task`, `status`, `performedBy`, `verifiedBy`, `nextDue`, `notes`
- **Backup strategy**: Dual approach
  1. File System Access API (`showDirectoryPicker`) for local JSON file merging
  2. HTTP POST to `/save_backup` endpoint handled by `save_server.py`

### Key Files Structure
- **[index.html](index.html)** - Main app: record form, quick task checklist, records table (shows max 10 records)
- **[pm_records.html](pm_records.html)** - Full records viewer with JSON/CSV import/export
- **[load_balancing.html](load_balancing.html)** - Separate 3-phase load calculator with balancing suggestions
- **[load_balancing_form.html](load_balancing_form.html)** - Load balancing data entry form
- **[megger_test_form.html](megger_test_form.html)** - Specialized megger/insulation test form
- **[save_server.py](save_server.py)** - Python HTTP server for backup deduplication and persistence
- **[downloader.py](downloader.py)** - Utility to fetch backup JSON from OneDrive/cloud URLs

## Critical Conventions

### Deduplication Logic
All backup operations use **stable JSON stringification** for deduplication:
```javascript
function stableStringify(obj) {
  if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
  if (Array.isArray(obj)) return '[' + obj.map(stableStringify).join(',') + ']';
  const keys = Object.keys(obj).sort(); // ← keys MUST be sorted
  return '{' + keys.map(k => JSON.stringify(k) + ':' + stableStringify(obj[k])).join(',') + '}';
}
```
**Never modify this algorithm** - consistency across all save/merge operations depends on identical key ordering.

### View Modes
Two independent toggle systems:
1. **Mobile/Desktop layout** (localStorage: `epm_view_mode`) - affects responsive grid breakpoints
2. **Display cleared state** (localStorage: `epm_display_cleared`) - hides records until "View Saved Records" clicked

### Server Backup Endpoint
`POST /save_backup` behavior ([save_server.py](save_server.py#L33-L105)):
- Reads ALL `.json` files in `pm_records_backup/`
- Merges incoming + existing using stable stringify deduplication
- Writes atomic: `pm_records_backup.json.tmp` → rename to `pm_records_backup.json`
- Returns: `{status, existing_files_merged, incoming_count, merged_count}`

## Equipment Dropdown Pattern
The `<select id="equipment">` in forms has **49 predefined options** (Lighting, Panel Board, Transformer, Motors, UPS/Battery, specific LED types, conduits, etc.). When adding new equipment types:
1. Insert alphabetically or by category grouping
2. Keep "Other" as the last option
3. Use title case for consistency

## Development Workflow

### Running the App
**Option 1 - Direct file open:**
```powershell
# Open index.html in browser (file:// protocol)
Start-Process "d:\Preventive Maintenance\index.html"
```

**Option 2 - With Python backup server:**
```powershell
cd "d:\Preventive Maintenance"
py -3 save_server.py 5500  # Serves on http://localhost:5500
```
Then navigate to `http://localhost:5500/index.html`

### Testing Backup Logic
Use `pm_records_backup/` directory - server merges all `.json` files found there on each save.

## CSS Architecture
Single `<style>` block per HTML file with CSS variables:
- `--bg: #f4f6f8` (page background)
- `--card: #fff` (card backgrounds)
- `--accent: #0b78d1` (primary blue)
- `--muted: #6b7280` (secondary text)

**Responsive breakpoints:**
- Desktop: `> 880px` (2-column grids)
- Mobile: `≤ 880px` (single column)
- Print: hides `.toolbar` and `button` elements

## Integration Points
- **OneDrive backup**: Hardcoded URL in [downloader.py](downloader.py#L50) and [pm_records.html](pm_records.html) "Download from OneDrive" button
- **Project Monitoring link**: Button in header (`id="go-project-monitoring"`) - currently navigates to placeholder
- **Load Balancing**: Separate localStorage key `epm_load_balancing_v1` - does NOT share data with main records
- **Firebase Authentication**: All pages protected via [auth-guard.js](auth-guard.js), login required via [login.html](login.html)
- **Firebase Firestore**: Data synced to cloud via [firebase-config.js](firebase-config.js) with localStorage fallback

## Common Patterns

### Toast Notifications
```javascript
function showToast(msg, duration=2000, type='info') {
  // Implementation in index.html - use for user feedback
}
```

### CSV Export
All export functions use helper:
```javascript
function quoteCSV(v) {
  if(v==null) v='';
  v = String(v).replace(/"/g,'""');
  if(/[\",\n]/.test(v)) v='"'+v+'"';
  return v;
}
```

### HTML Escaping
Always use `escapeHTML()` when rendering user input in tables:
```javascript
function escapeHTML(s) {
  return String(s).replace(/[&<>\\"]/g, c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"
  })[c]);
}
```

## Authentication System
- **Login required**: All pages check auth via `auth-guard.js` on load
- **Login page**: [login.html](login.html) handles signup, signin, password reset
- **Auto-logout buttons**: Added to header controls and toolbars by auth-guard
- **Session management**: Firebase Auth handles tokens, auto-redirects if expired
- **Security**: Email/Password auth via Firebase, requires setup in Firebase Console

## Constraints
- No build system - all files are standalone HTML/CSS/JS
- No external JS libraries/frameworks (vanilla JS only except Firebase SDK)
- Python backend optional - app works in browser with Firebase backend
- Authentication required - all pages redirect to login if not authenticated
