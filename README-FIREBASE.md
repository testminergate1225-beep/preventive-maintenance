# Firebase Deployment Guide

## Prerequisites
1. Install Firebase CLI:
   ```powershell
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```powershell
   firebase login
   ```

## Setup

1. **Initialize Firebase** (if not already done):
   ```powershell
   firebase init hosting
   ```
   - Select your Firebase project or create a new one
   - Set public directory to: `.` (current directory)
   - Configure as single-page app: `No`
   - Don't overwrite existing files

2. **Update `.firebaserc`**:
   - Replace `your-project-id` with your actual Firebase project ID
   - You can find this in Firebase Console → Project Settings

## Deploy

```powershell
firebase deploy --only hosting
```

## How the App Works on Firebase

### What Works:
- All HTML pages and forms
- localStorage for data persistence
- CSV/JSON export/import
- Browser's File System Access API for local backups
- All calculations and visualizations

### What Doesn't Work:
- The `/save_backup` server endpoint (Python backend)
- Automatic server-side backup merging

### Backup Strategy on Firebase:
The app will automatically fall back to:
1. **File System Access API** (Chrome/Edge) - users can select a folder to save backups
2. **Save File Picker** - users download backup files manually
3. **Direct download** - downloads merged JSON file

All existing functionality remains intact, just without the Python server backend.

## Testing Locally Before Deploy

```powershell
firebase serve
```
Then open `http://localhost:5000`

## Post-Deployment

1. Your app will be available at: `https://your-project-id.web.app`
2. You can also set up a custom domain in Firebase Console

## Notes
- The `pm_records_backup/` directory is ignored (won't be deployed)
- Python files (`*.py`) are excluded from deployment
- All images in `images/` folder will be deployed
