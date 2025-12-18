// Firebase Configuration and Initialization
// Replace these values with your actual Firebase project configuration
// Get these from Firebase Console > Project Settings > Your apps > SDK setup and configuration

const firebaseConfig = {
  apiKey: "AIzaSyDJOuYk3sUoQkkqX4tH3e8P9Gh1kXBRJ8A",
  authDomain: "preventive-maintenance-2b1b7.firebaseapp.com",
  databaseURL: "https://preventive-maintenance-2b1b7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "preventive-maintenance-2b1b7",
  storageBucket: "preventive-maintenance-2b1b7.firebasestorage.app",
  messagingSenderId: "781770447532",
  appId: "1:781770447532:web:5f90c90bfcde2e2ca51d09",
  measurementId: "G-P8QLRSSNXY"
};

// Initialize Firebase
let db = null;
let isFirebaseInitialized = false;

async function initFirebase() {
  try {
    if (typeof firebase === 'undefined') {
      console.warn('Firebase SDK not loaded, falling back to localStorage');
      return false;
    }
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
    db = firebase.database();
    
    isFirebaseInitialized = true;
    console.log('Firebase Realtime Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    return false;
  }
}

// Firebase Realtime Database Helper Functions
const FirestoreDB = {
  // Save records to Realtime Database
  async saveRecords(collectionName, records) {
    if (!isFirebaseInitialized || !db) {
      console.warn('Firebase not initialized, using localStorage');
      localStorage.setItem(collectionName, JSON.stringify(records));
      return;
    }
    
    try {
      const ref = db.ref(collectionName);
      
      // Save records as array with timestamp
      const dataToSave = {
        records: records,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        lastUpdated: new Date().toISOString()
      };
      
      await ref.set(dataToSave);
      console.log(`Saved ${records.length} records to Realtime Database`);
      
      // Keep local backup
      localStorage.setItem(collectionName + '_backup', JSON.stringify(records));
    } catch (error) {
      console.error('Realtime Database save error:', error);
      // Fallback to localStorage
      localStorage.setItem(collectionName, JSON.stringify(records));
    }
  },
  
  // Load records from Realtime Database
  async loadRecords(collectionName) {
    if (!isFirebaseInitialized || !db) {
      console.warn('Firebase not initialized, using localStorage');
      const raw = localStorage.getItem(collectionName);
      return raw ? JSON.parse(raw) : [];
    }
    
    try {
      const ref = db.ref(collectionName);
      const snapshot = await ref.once('value');
      const data = snapshot.val();
      
      if (!data || !data.records) {
        console.log('No records found in Realtime Database');
        // Try localStorage fallback
        const raw = localStorage.getItem(collectionName) || localStorage.getItem(collectionName + '_backup');
        return raw ? JSON.parse(raw) : [];
      }
      
      const records = Array.isArray(data.records) ? data.records : [];
      console.log(`Loaded ${records.length} records from Realtime Database`);
      
      // Update local backup
      if (records.length > 0) {
        localStorage.setItem(collectionName + '_backup', JSON.stringify(records));
      }
      
      return records;
    } catch (error) {
      console.error('Realtime Database load error:', error);
      // Fallback to localStorage
      const raw = localStorage.getItem(collectionName) || localStorage.getItem(collectionName + '_backup');
      return raw ? JSON.parse(raw) : [];
    }
  },
  
  // Add single record
  async addRecord(collectionName, record) {
    const records = await this.loadRecords(collectionName);
    records.unshift(record);
    await this.saveRecords(collectionName, records);
  },
  
  // Delete record by index
  async deleteRecord(collectionName, index) {
    const records = await this.loadRecords(collectionName);
    if (index >= 0 && index < records.length) {
      records.splice(index, 1);
      await this.saveRecords(collectionName, records);
    }
  },
  
  // Sync localStorage to Realtime Database (for migration)
  async syncLocalToDatabase(collectionName) {
    const localData = localStorage.getItem(collectionName);
    if (localData) {
      try {
        const records = JSON.parse(localData);
        await this.saveRecords(collectionName, records);
        console.log(`Synced ${records.length} records from localStorage to Realtime Database`);
        return true;
      } catch (error) {
        console.error('Sync error:', error);
        return false;
      }
    }
    return false;
  }
};

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFirebase);
} else {
  initFirebase();
}
