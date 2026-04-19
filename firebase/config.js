/**
 * Firebase Configuration Module
 * Enzo Caruso — Database Specialist
 * 2026-04-19
 *
 * Placeholder Firebase configuration for WONML (Wings Over No Man's Land).
 * All credential values are TBD by Charlie before deployment.
 */

// TODO(Charlie): Fill in these values from Firebase Console → Project Settings → Your Apps → Web App
const firebaseConfig = {
  // Public API key — identifies the project, safe to expose in client code
  // Obtain from: Firebase Console → Project Settings
  apiKey: "TODO_FIREBASE_API_KEY",

  // Auth domain for email/phone sign-in (deferred to v2; not used in v1 anonymous mode)
  // Format: {projectId}.firebaseapp.com
  authDomain: "TODO_FIREBASE_AUTH_DOMAIN",

  // GCP Project ID — must match the Firebase project you create
  // Example: "sky-aces-studio" or "wonml-prod"
  projectId: "TODO_FIREBASE_PROJECT_ID",

  // Cloud Storage bucket for avatar uploads (part of Pilot Avatar feature)
  // Format: {projectId}.appspot.com
  storageBucket: "TODO_FIREBASE_STORAGE_BUCKET",

  // Firebase Cloud Messaging sender ID
  messagingSenderId: "TODO_FIREBASE_MESSAGING_SENDER_ID",

  // Firebase App ID
  appId: "TODO_FIREBASE_APP_ID",

  // Optional: Firebase Database URL (Realtime Database, not used in this design)
  // databaseURL: "TODO_FIREBASE_DATABASE_URL"
};

/**
 * Export the configuration object.
 * This is imported by auth.js and other modules to initialize Firebase.
 */
export default firebaseConfig;
