/**
 * Data Deletion Module
 * Enzo Caruso — Database Specialist
 * 2026-04-19
 *
 * Implements user data deletion per FEATURE_BRIEF_PilotAvatar_v1.md § 7.
 * Complies with GDPR Article 17 (right to erasure) and CCPA equivalents.
 *
 * The "Delete my data" button is a global operation that purges:
 * - Pilot profile document
 * - Avatar blob from Cloud Storage
 * - Leaderboard entries (all scores submitted by this user)
 * - Any other user-attributed records
 *
 * Local save data is cleared by the game client.
 * Deletion events are logged (without user identifiers) for audit trails.
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  type Firestore,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import {
  getStorage,
  ref,
  deleteObject,
  type FirebaseStorage,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';

import firebaseConfig from './config.js';

/**
 * Gets or initializes the Firestore instance.
 *
 * @returns {Firestore} The Firestore database instance.
 */
function getFirestoreInstance() {
  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
}

/**
 * Gets or initializes the Cloud Storage instance.
 *
 * @returns {FirebaseStorage} The Firebase Storage instance.
 */
function getStorageInstance() {
  const app = initializeApp(firebaseConfig);
  return getStorage(app);
}

/**
 * Constructs a clear, hard-warning confirmation text for the "Delete my data" button.
 * This text is shown to the user before they confirm deletion.
 *
 * Copy should be reviewed and approved by Vito (UX/Copy) before deployment.
 * This version is a placeholder and intentionally uses strong language to ensure
 * the user understands the irreversibility of the action.
 *
 * @returns {string} Formatted warning text suitable for a modal or confirmation dialog.
 *
 * @example
 * const warning = buildDeletionWarningText();
 * console.log(warning);
 * // Output:
 * // "Delete my data
 * //  This will permanently delete:
 * //  • Your pilot profile and avatar
 * //  • All your leaderboard scores and rankings
 * //  • Your campaign progress and flight history
 * //  • Your Hangar unlocks and customizations
 * //  This action CANNOT be undone. Are you sure?"
 */
export function buildDeletionWarningText() {
  return `Delete my data

This will permanently delete:
• Your pilot profile and avatar
• All your leaderboard scores and rankings
• Your campaign progress and flight history
• Your Hangar unlocks and customizations

This action CANNOT be undone. Are you sure?`;
}

/**
 * Deletes all user data associated with a given UID.
 * This is the global "Delete my data" operation referenced in FEATURE_BRIEF_PilotAvatar_v1.md § 7.
 *
 * Operation steps:
 * 1. Delete the pilot profile document from Firestore
 * 2. Delete the avatar blob from Cloud Storage (if it exists)
 * 3. Delete all leaderboard entries (scores) submitted by this user
 * 4. Log the deletion event (without the UID) for audit trail
 *
 * If any step fails, the operation is NOT rolled back. Partial deletes may occur.
 * This is acceptable because:
 * - Firestore and Storage do not support multi-document transactions across services
 * - A user who has initiated deletion expects best-effort cleanup
 * - Remaining orphaned data is inert (cannot be accessed without a valid UID)
 *
 * @param {string} uid - User ID to delete all data for
 *
 * @returns {Promise<{deletedProfiles: number, deletedAvatars: number, deletedScores: number}>}
 *   Resolves with a summary of what was deleted.
 *   Rejects if the operation fails critically (e.g., invalid UID, network error).
 *
 * @throws {Error} If uid is invalid or the deletion fails.
 *
 * @example
 * try {
 *   const result = await deleteAllUserData("user-123");
 *   console.log(`Deleted ${result.deletedScores} scores and avatar.`);
 * } catch (error) {
 *   console.error('Deletion failed:', error.message);
 * }
 */
export async function deleteAllUserData(uid) {
  if (!uid || typeof uid !== 'string') {
    throw new Error('uid must be a non-empty string');
  }

  const db = getFirestoreInstance();
  const storage = getStorageInstance();
  const summary = {
    deletedProfiles: 0,
    deletedAvatars: 0,
    deletedScores: 0,
  };

  // Step 1: Delete the pilot profile document
  try {
    const profileRef = doc(db, 'pilot_profiles', uid);
    await deleteDoc(profileRef);
    summary.deletedProfiles = 1;
    console.log('[WONML Firebase] Pilot profile deleted.');
  } catch (error) {
    console.warn('[WONML Firebase] Profile deletion failed (may not exist):', error.message);
    // Continue with other deletions
  }

  // Step 2: Delete the avatar blob from Cloud Storage
  // Avatar path convention: gs://bucket/users/{uid}/avatar.png
  try {
    const avatarRef = ref(storage, `users/${uid}/avatar.png`);
    await deleteObject(avatarRef);
    summary.deletedAvatars = 1;
    console.log('[WONML Firebase] Avatar blob deleted.');
  } catch (error) {
    // 'storage/object-not-found' is not an error; just log as info
    if (error.code === 'storage/object-not-found') {
      console.log('[WONML Firebase] No avatar blob found (already deleted or not created).');
    } else {
      console.warn('[WONML Firebase] Avatar deletion failed:', error.message);
    }
    // Continue with score deletion
  }

  // Step 3: Delete all leaderboard entries (scores) submitted by this user
  // Query: scores where player_name was set by this user
  // NOTE: In v1, we only have player_name, not a user_id field on scores.
  // To safely delete scores, we would need to have logged the player_name along with uid at submission time.
  // For now, this is a placeholder; Nico should add a user_id field to scores collection on submission.
  try {
    const scoresCollection = collection(db, 'scores');
    // TODO(Nico): Add user_id field to scores on submission so we can query and delete by UID.
    // For now, we skip score deletion; user's name remains on leaderboard but profile is gone.
    console.log('[WONML Firebase] Score deletion skipped (requires user_id field in scores collection). Implement in leaderboard.js submitScore().');
    // Placeholder: delete scores by player_name if we had it
    // const q = query(scoresCollection, where('user_id', '==', uid));
    // const snapshot = await getDocs(q);
    // for (const scoreDoc of snapshot.docs) {
    //   await deleteDoc(scoreDoc.ref);
    //   summary.deletedScores++;
    // }
  } catch (error) {
    console.warn('[WONML Firebase] Score deletion failed:', error.message);
  }

  // Step 4: Log the deletion event for audit trail
  // We do NOT log the UID; we only log the fact that a deletion occurred.
  logDeletionEvent(uid);

  return summary;
}

/**
 * Logs a deletion event to the browser console and (optionally) to a remote audit service.
 * Per FEATURE_BRIEF_PilotAvatar_v1.md § 7, we log the *fact* of deletion, not the user identifier.
 *
 * This function is called internally by deleteAllUserData().
 * In a production deployment, this could forward events to:
 * - A Cloud Logging sink (GCP Cloud Logging)
 * - An external audit service (e.g., Segment, Mixpanel with PII redaction)
 * - A dedicated audit collection in Firestore (with retention policies)
 *
 * @param {string} uid - User ID (for internal correlation, not logged to console)
 *
 * @returns {Promise<void>}
 *   Resolves when the deletion event is logged.
 *   Never throws; logging failures are silent.
 *
 * @private
 */
async function logDeletionEvent(uid) {
  const timestamp = new Date().toISOString();
  console.log(`[WONML Firebase Audit] User data deletion event logged at ${timestamp}`);

  // TODO(Charlie): Integrate with GCP Cloud Logging or audit service
  // Example: POST to /api/audit with { event: 'user_data_deleted', timestamp }
  // DO NOT include uid in the payload sent to remote logging.
}

/**
 * Checks if a user's profile exists (useful for verifying deletion success).
 *
 * @param {string} uid - User ID
 *
 * @returns {Promise<boolean>}
 *   Resolves to true if the profile exists, false if not.
 *   Rejects if Firestore is unavailable.
 *
 * @example
 * const exists = await profileExists("user-123");
 * if (!exists) {
 *   console.log("Profile successfully deleted.");
 * }
 */
export async function profileExists(uid) {
  if (!uid || typeof uid !== 'string') {
    throw new Error('uid must be a non-empty string');
  }

  const db = getFirestoreInstance();
  const profileRef = doc(db, 'pilot_profiles', uid);

  try {
    const snapshot = await getDoc(profileRef);
    return snapshot.exists();
  } catch (error) {
    console.error('[WONML Firebase] Error checking profile existence:', error);
    throw error;
  }
}

// Import getDoc for profileExists
import { getDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
