# Firebase Database Integration Guide

## Setup Instructions

### 1. Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project or create a new one
3. Click the gear icon ⚙️ > Project Settings
4. Scroll down to "Your apps" section
5. Click the web icon (`</>`) to add a web app
6. Copy the `firebaseConfig` object

### 2. Update Configuration

Edit `firebase-config.js` and replace these values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 3. Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create Database**
3. Choose **Start in production mode** (we'll set rules next)
4. Select a location closest to your users

### 4. Set Firestore Security Rules

Go to Firestore > Rules and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to all collections (adjust as needed)
    match /{document=**} {
      allow read, write: if true;
    }
    
    // Or use authenticated access:
    // match /{document=**} {
    //   allow read, write: if request.auth != null;
    // }
  }
}
```

**Note:** These rules allow public access. For production, implement proper authentication.

### 5. Deploy Updated Files

```powershell
firebase deploy --only hosting
```

## How It Works

### Automatic Fallback System

The integration uses a **hybrid approach**:

1. **Primary**: Firestore database (cloud storage)
2. **Fallback**: localStorage (browser storage)
3. **Backup**: localStorage backup copy

If Firebase is unavailable, the app automatically uses localStorage.

### Collections Created

- `epm_records_v1` - Main maintenance records
- `epm_load_balancing_v1` - Load balancing data
- `megger_tests_v2` - Megger test results

### Features

✅ **Offline Support**: Works without internet, syncs when online
✅ **Real-time Sync**: Changes sync across devices automatically
✅ **Data Migration**: Existing localStorage data auto-migrates to Firestore
✅ **Graceful Degradation**: Falls back to localStorage if Firebase fails

## Migration Process

Existing data in localStorage will automatically migrate to Firestore on first load. The app keeps a local backup copy for safety.

## Testing

1. **Test offline**: Disconnect internet, app should still work
2. **Test sync**: Make changes on one device, check another device
3. **Test fallback**: Remove Firebase config, should use localStorage

## Troubleshooting

**Problem**: "Firebase not initialized"
- **Solution**: Check `firebase-config.js` has correct config values

**Problem**: "Permission denied"
- **Solution**: Update Firestore security rules

**Problem**: Data not syncing
- **Solution**: Check browser console for errors, verify internet connection

## Optional: Enable Authentication

For user-specific data:

1. Enable Authentication in Firebase Console
2. Add sign-in method (Email/Password, Google, etc.)
3. Update security rules to require authentication
4. Add login UI to your HTML pages

## Cost Considerations

Firebase Free Tier (Spark Plan):
- 50,000 reads/day
- 20,000 writes/day
- 1 GB storage
- 10 GB/month transfer

This is sufficient for small to medium usage. Monitor usage in Firebase Console.
