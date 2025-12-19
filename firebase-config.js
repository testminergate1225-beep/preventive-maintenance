// Firebase Configuration - PRODUCTION VERSION
// This file contains the actual Firebase credentials
// Used for local development and as backup

const firebaseConfig = {
  apiKey: "AIzaSyDJOuYk3sUoQkkqX4tH3e8P9Gh1kXBRJ8A",
  authDomain: "preventive-maintenance-2b1b7.firebaseapp.com",
  databaseURL: "https://preventive-maintenance-2b1b7-default-rtdb.asia-southeast1.firebasedatabase.app/",
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
      console.log('Records saved to Firebase Realtime Database');
      
      // Also save to localStorage as backup
      localStorage.setItem(collectionName, JSON.stringify(records));
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      // Fallback to localStorage
      localStorage.setItem(collectionName, JSON.stringify(records));
    }
  },

  // Load records from Realtime Database
  async loadRecords(collectionName) {
    if (!isFirebaseInitialized || !db) {
      console.warn('Firebase not initialized, loading from localStorage');
      const stored = localStorage.getItem(collectionName);
      return stored ? JSON.parse(stored) : [];
    }
    
    try {
      const ref = db.ref(collectionName);
      const snapshot = await ref.once('value');
      const data = snapshot.val();
      
      if (data && data.records && Array.isArray(data.records)) {
        console.log('Records loaded from Firebase Realtime Database');
        // Update localStorage with latest data
        localStorage.setItem(collectionName, JSON.stringify(data.records));
        return data.records;
      }
      
      // If no data in Firebase, check localStorage
      const stored = localStorage.getItem(collectionName);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading from Firebase:', error);
      // Fallback to localStorage
      const stored = localStorage.getItem(collectionName);
      return stored ? JSON.parse(stored) : [];
    }
  },

  // Delete a specific record
  async deleteRecord(collectionName, recordIndex) {
    const records = await this.loadRecords(collectionName);
    if (recordIndex >= 0 && recordIndex < records.length) {
      records.splice(recordIndex, 1);
      await this.saveRecords(collectionName, records);
      return true;
    }
    return false;
  },

  // Clear all records
  async clearRecords(collectionName) {
    await this.saveRecords(collectionName, []);
    return true;
  }
};

// Auto-initialize when loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFirebase);
} else {
  initFirebase();
}
