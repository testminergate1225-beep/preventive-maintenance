# Authentication Setup Guide

## 🔐 Secure Login System

Your EPM app now has a complete authentication system using Firebase Authentication.

## Features

✅ **Email/Password Authentication**
✅ **User Registration (Sign Up)**
✅ **Password Reset via Email**
✅ **Automatic Logout Button**
✅ **Protected Pages** - All pages require login
✅ **Secure Session Management**

## Setup Instructions

### 1. Enable Authentication in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `preventive-maintenance-2b1b7`
3. Click **Authentication** in the left menu
4. Click **Get Started**
5. Select **Email/Password** as sign-in method
6. Enable **Email/Password** (toggle ON)
7. Click **Save**

### 2. (Optional) Add Authorized Users

**Option A: Let users self-register**
- Users can create their own accounts via the Sign Up form
- No additional setup needed

**Option B: Pre-create authorized users**
1. In Firebase Console > Authentication > Users tab
2. Click **Add User**
3. Enter email and password for each authorized user
4. Users can login with these credentials

### 3. Configure Email Templates (Recommended)

1. In Firebase Console > Authentication > Templates
2. Customize email templates for:
   - **Password reset** - Change sender name, message, etc.
   - **Email verification** (if you enable it)

### 4. Set Password Requirements (Optional)

Firebase default: minimum 6 characters
To enforce stronger passwords:
1. Use custom validation in `login.html` (already set to 6 chars minimum)
2. Or implement custom auth logic

## How It Works

### Login Flow

1. User visits any page (e.g., `index.html`)
2. `auth-guard.js` checks authentication status
3. If NOT logged in → Redirect to `login.html`
4. If logged in → Continue to page

### Login Page (`login.html`)

- **Sign In**: Login with existing account
- **Sign Up**: Create new account
- **Forgot Password**: Reset password via email

### Protected Pages

All pages are now protected:
- [index.html](index.html)
- [pm_records.html](pm_records.html)
- [load_balancing.html](load_balancing.html)
- [load_balancing_form.html](load_balancing_form.html)
- [megger_test_form.html](megger_test_form.html)

### Logout

Logout buttons automatically added to:
- Header controls (top right)
- Toolbars (where applicable)

Click **🚪 Logout** to sign out and return to login page.

## Testing

### Test Login System

1. **Deploy your app:**
   ```powershell
   firebase deploy --only hosting
   ```

2. **Create a test account:**
   - Visit your app URL
   - Click "Sign up"
   - Enter email, password (min 6 chars)
   - Click "Create Account"

3. **Test login:**
   - Logout
   - Login with same credentials

4. **Test password reset:**
   - Click "Forgot password?"
   - Enter email
   - Check email for reset link

### Test Protected Pages

1. Open app in **incognito/private window**
2. Try to access `index.html` directly
3. Should redirect to `login.html`
4. Login → Should access page normally

## Security Notes

### Current Security Level: **Medium**

✅ All pages require authentication
✅ Firebase manages password hashing/security
✅ Sessions expire automatically
✅ Password reset via email

### To Increase Security:

1. **Enable Email Verification**
   ```javascript
   // In login.html after signup:
   await user.sendEmailVerification();
   ```

2. **Implement Role-Based Access**
   - Store user roles in Firestore
   - Check roles before allowing access

3. **Enable MFA (Multi-Factor Authentication)**
   - Available in Firebase Auth settings

4. **Set Session Timeout**
   ```javascript
   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
   ```

5. **Update Firestore Rules** (in Firebase Console > Firestore > Rules):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         // Only authenticated users can read/write
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## Customization

### Change App Name/Logo

Edit `login.html`:
```html
<div class="logo-section">
  <h1>⚡ Your Company Name</h1>
  <p>Your Tagline</p>
</div>
```

### Change Password Requirements

Edit `login.html`, find:
```html
<input id="signup-password" type="password" minlength="6" />
```
Change `minlength="6"` to your desired minimum.

### Add Custom Validation

Edit `login.html`, in signup form submit handler:
```javascript
if (password.length < 8) {
  showError('Password must be at least 8 characters.');
  return;
}
```

## Troubleshooting

**Problem**: "Firebase Auth not initialized"
- **Solution**: Check Firebase SDK scripts are loaded in HTML files

**Problem**: Users can't sign up
- **Solution**: Verify Email/Password is enabled in Firebase Console > Authentication

**Problem**: Password reset email not sent
- **Solution**: Check spam folder, verify email template settings in Firebase

**Problem**: Redirect loop
- **Solution**: Clear browser cache and cookies

**Problem**: "User not authenticated" on page load
- **Solution**: Check browser console for errors, verify auth-guard.js is loaded

## File Structure

```
login.html          - Login/Signup/Reset page
auth-guard.js       - Authentication middleware
firebase-config.js  - Firebase initialization (updated)
index.html          - Protected main page
pm_records.html     - Protected records page
[other pages]       - All protected
```

## Next Steps

1. ✅ Enable Email/Password in Firebase Console
2. ✅ Deploy updated app
3. ✅ Test login/signup flow
4. ✅ Add authorized users (if needed)
5. ⏭️ (Optional) Configure email templates
6. ⏭️ (Optional) Implement additional security measures

Your app is now secure! Only authenticated users can access the maintenance system.
