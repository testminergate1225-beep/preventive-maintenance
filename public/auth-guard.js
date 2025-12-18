// Authentication Guard - Include in all protected pages
// This script checks if user is authenticated and redirects to login if not

(function() {
  'use strict';
  
  let authChecked = false;
  const currentUser = { email: null, displayName: null, uid: null };
  
  // Check authentication status
  async function checkAuth() {
    if (authChecked) return currentUser;
    
    try {
      if (typeof firebase === 'undefined' || !firebase.auth) {
        console.warn('Firebase Auth not initialized');
        redirectToLogin();
        return null;
      }
      
      return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          authChecked = true;
          unsubscribe(); // Unsubscribe after first check
          
          if (user) {
            // User is signed in
            currentUser.email = user.email;
            currentUser.displayName = user.displayName || user.email.split('@')[0];
            currentUser.uid = user.uid;
            console.log('User authenticated:', currentUser.email);
            resolve(currentUser);
          } else {
            // User is not signed in
            console.log('User not authenticated, redirecting to login');
            redirectToLogin();
            reject(new Error('Not authenticated'));
          }
        }, error => {
          console.error('Auth check error:', error);
          redirectToLogin();
          reject(error);
        });
      });
    } catch (error) {
      console.error('Authentication check failed:', error);
      redirectToLogin();
      return null;
    }
  }
  
  function redirectToLogin() {
    // Don't redirect if already on login page
    if (!window.location.pathname.includes('login.html')) {
      window.location.href = 'login.html';
    }
  }
  
  // Logout function
  async function logout() {
    try {
      if (firebase.auth) {
        await firebase.auth().signOut();
        console.log('User logged out');
        window.location.href = 'login.html';
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to logout. Please try again.');
    }
  }
  
  // Add logout button to pages
  function addLogoutButton() {
    // Check if logout button already exists
    if (document.getElementById('auth-logout-btn')) return;
    
    // Find header controls or create one
    let headerControls = document.querySelector('.header-controls');
    
    if (headerControls) {
      const logoutBtn = document.createElement('button');
      logoutBtn.id = 'auth-logout-btn';
      logoutBtn.className = 'small secondary';
      logoutBtn.textContent = '🚪 Logout';
      logoutBtn.title = 'Sign out';
      logoutBtn.onclick = logout;
      headerControls.appendChild(logoutBtn);
    }
    
    // Also add to toolbar if exists
    const toolbar = document.querySelector('.toolbar');
    if (toolbar && !toolbar.querySelector('#auth-logout-btn-toolbar')) {
      const logoutBtnToolbar = document.createElement('button');
      logoutBtnToolbar.id = 'auth-logout-btn-toolbar';
      logoutBtnToolbar.className = 'small secondary';
      logoutBtnToolbar.textContent = '🚪 Logout';
      logoutBtnToolbar.onclick = logout;
      toolbar.appendChild(logoutBtnToolbar);
    }
    
    // Display user info if there's a suitable location
    const userInfoEl = document.getElementById('user-info');
    if (userInfoEl && currentUser.displayName) {
      userInfoEl.textContent = `Logged in as: ${currentUser.displayName}`;
    }
  }
  
  // Expose functions globally
  window.AuthGuard = {
    checkAuth,
    logout,
    getCurrentUser: () => currentUser,
    isAuthenticated: () => authChecked && currentUser.uid !== null
  };
  
  // Auto-check authentication on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
      await checkAuth();
      addLogoutButton();
    });
  } else {
    checkAuth().then(() => addLogoutButton()).catch(() => {});
  }
})();
