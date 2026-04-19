/**
 * Firebase Module Barrel Export
 * Enzo Caruso — Database Specialist
 * 2026-04-19
 *
 * Re-exports all Firebase helper modules for easy importing in the game client.
 * ES module syntax; no bundler assumed.
 *
 * Usage:
 * import { signInAnon, submitScore, getProfile, deleteAllUserData } from './firebase/index.js';
 */

// Configuration
export { default as firebaseConfig } from './config.js';

// Authentication
export {
  initializeFirebaseApp,
  getAuthInstance,
  signInAnon,
  getCurrentUid,
  onAuthStateChanged,
  isAuthenticated,
} from './auth.js';

// Leaderboard
export {
  validateScore,
  submitScore,
  getTopScores,
  getScoreAround,
} from './leaderboard.js';

// Pilot Profile
export {
  getProfile,
  upsertProfile,
  updateProfile,
  getAvatarUrl,
  setAvatarUrl,
} from './pilotProfile.js';

// Data Deletion
export {
  deleteAllUserData,
  buildDeletionWarningText,
  profileExists,
} from './dataDeletion.js';
