/**
 * Firebase Authentication Module
 * Enzo Caruso — Database Specialist
 * 2026-04-19
 *
 * Provides anonymous authentication for WONML v1.
 * Email/Google Sign-In deferred to v2.
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged as fbOnAuthStateChanged,
  type Auth,
  type User,
  type Unsubscribe,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

import firebaseConfig from './config.js';

/**
 * Initializes the Firebase app with the provided configuration.
 *
 * @returns {typeof import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js').FirebaseApp}
 *   The initialized Firebase app instance.
 */
export function initializeFirebaseApp() {
  try {
    return initializeApp(firebaseConfig);
  } catch (error) {
    console.error('[WONML Firebase] Failed to initialize app:', error);
    throw error;
  }
}

/**
 * Gets or initializes the Auth instance for the WONML app.
 * Call once on app startup, then cache the result.
 *
 * @returns {Auth} The Firebase Auth instance.
 */
export function getAuthInstance() {
  const app = initializeFirebaseApp();
  return getAuth(app);
}

/**
 * Signs in the current user anonymously.
 * In v1, all players authenticate anonymously (no sign-in screen).
 * The UID returned is stable per browser/device.
 *
 * @returns {Promise<{uid: string, isAnonymous: boolean}>}
 *   Resolves with the user's UID and anonymous flag on success.
 *   Rejects if authentication fails (e.g., network down, quota exceeded).
 *
 * @throws {FirebaseError} If Firebase auth fails.
 *
 * @example
 * const { uid } = await signInAnon();
 * console.log('Signed in as:', uid);
 */
export async function signInAnon() {
  const auth = getAuthInstance();
  try {
    const result = await signInAnonymously(auth);
    const user = result.user;
    return {
      uid: user.uid,
      isAnonymous: user.isAnonymous,
    };
  } catch (error) {
    console.error('[WONML Firebase] Anonymous sign-in failed:', error);
    throw error;
  }
}

/**
 * Retrieves the UID of the currently authenticated user.
 * Returns null if no user is signed in or auth is not initialized.
 *
 * @returns {string | null}
 *   The current user's UID, or null if not authenticated.
 *
 * @example
 * const uid = getCurrentUid();
 * if (uid) {
 *   console.log('Current user UID:', uid);
 * }
 */
export function getCurrentUid() {
  const auth = getAuthInstance();
  const user = auth.currentUser;
  return user ? user.uid : null;
}

/**
 * Registers a callback to be invoked whenever the authentication state changes.
 * This wraps Firebase's onAuthStateChanged and logs state transitions.
 *
 * @param {(user: User | null) => void} callback
 *   Called with the current user object when auth state changes.
 *   If user is null, the user has signed out (or auth failed).
 *
 * @returns {Unsubscribe}
 *   A function that unsubscribes the listener when called.
 *
 * @example
 * const unsubscribe = onAuthStateChanged((user) => {
 *   if (user) {
 *     console.log('Signed in as:', user.uid);
 *   } else {
 *     console.log('Signed out or not authenticated');
 *   }
 * });
 *
 * // Later, to stop listening:
 * unsubscribe();
 */
export function onAuthStateChanged(callback) {
  const auth = getAuthInstance();
  return fbOnAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('[WONML Firebase] Auth state changed: user signed in', user.uid);
    } else {
      console.log('[WONML Firebase] Auth state changed: user signed out or not authenticated');
    }
    callback(user);
  });
}

/**
 * Checks if the current user is authenticated.
 * Useful for guards before making authenticated requests.
 *
 * @returns {Promise<boolean>}
 *   Resolves to true if a user is signed in, false otherwise.
 *
 * @example
 * if (await isAuthenticated()) {
 *   const uid = getCurrentUid();
 *   const profile = await getProfile(uid);
 * }
 */
export async function isAuthenticated() {
  return new Promise((resolve) => {
    const auth = getAuthInstance();
    const unsubscribe = fbOnAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(!!user);
    });
  });
}
