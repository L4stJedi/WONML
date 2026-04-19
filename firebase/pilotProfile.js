/**
 * Pilot Profile Module
 * Enzo Caruso — Database Specialist
 * 2026-04-19
 *
 * Manages pilot profile documents in Firestore.
 * Integrates with the Pilot Avatar feature (FEATURE_BRIEF_PilotAvatar_v1.md).
 * Schema defined in DB_Design_Enzo_v2_Firebase.md.
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  type Firestore,
  type DocumentReference,
  type DocumentSnapshot,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

import firebaseConfig from './config.js';

/**
 * Gets or initializes the Firestore instance.
 * Call once on app startup, then cache the result.
 *
 * @returns {Firestore} The Firestore database instance.
 */
function getFirestoreInstance() {
  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
}

/**
 * Schema for a pilot profile document.
 * @typedef {Object} PilotProfile
 * @property {string} uid - User ID (document ID)
 * @property {string} [pilot_name] - Display name for the pilot
 * @property {string} [avatar_url] - Cloud Storage path or signed URL to the generated avatar portrait
 *   Example: "gs://bucket/users/{uid}/avatar.png"
 * @property {number} [avatar_generation_count] - Number of times the avatar has been regenerated
 * @property {number} [total_campaigns_completed] - Count of campaigns finished
 * @property {number} [total_flights] - Total number of flights/runs
 * @property {number} [highest_score] - Best score across all campaigns
 * @property {Object} [preferences] - Player settings
 * @property {boolean} [preferences.use_avatar] - Whether to display the avatar (vs. silhouette)
 * @property {boolean} [preferences.announcements_enabled] - Whether player opted into email/notifications
 * @property {string} [faction_preference] - Preferred faction ("british" or "german")
 * @property {Object} [created_at] - Firestore Timestamp (server-set)
 * @property {Object} [updated_at] - Firestore Timestamp (server-set, updated on any write)
 * @property {number} [schema_version] - Schema version for safe migrations
 */

/**
 * Fetches a pilot profile by UID.
 * Returns null if the profile does not exist.
 *
 * @param {string} uid - User ID
 *
 * @returns {Promise<PilotProfile | null>}
 *   Resolves with the profile object if found, null if not found.
 *   Rejects if Firestore is unavailable.
 *
 * @example
 * const profile = await getProfile("user-123");
 * if (profile) {
 *   console.log("Pilot name:", profile.pilot_name);
 *   console.log("Avatar URL:", profile.avatar_url);
 * }
 */
export async function getProfile(uid) {
  if (!uid || typeof uid !== 'string') {
    throw new Error('uid must be a non-empty string');
  }

  const db = getFirestoreInstance();
  const profileRef = doc(db, 'pilot_profiles', uid);

  try {
    const snapshot = await getDoc(profileRef);
    if (snapshot.exists()) {
      return {
        uid,
        ...snapshot.data(),
      };
    }
    return null;
  } catch (error) {
    console.error('[WONML Firebase] Failed to fetch profile:', error);
    throw error;
  }
}

/**
 * Creates or updates a pilot profile.
 * Overwrites all fields if the profile exists; creates a new one if it doesn't.
 *
 * For partial updates, use updateProfile() instead.
 *
 * @param {string} uid - User ID
 * @param {Partial<PilotProfile>} profileData - Profile fields to set
 *   Fields like uid, created_at, updated_at should not be included here.
 *
 * @returns {Promise<void>}
 *   Resolves when the write is complete.
 *   Rejects if Firestore is unavailable or validation fails.
 *
 * @throws {Error} If uid is invalid.
 *
 * @example
 * await upsertProfile("user-123", {
 *   pilot_name: "Red Squadron Leader",
 *   avatar_url: "gs://bucket/users/user-123/avatar.png",
 *   preferences: {
 *     use_avatar: true,
 *     announcements_enabled: true,
 *   },
 *   faction_preference: "british",
 *   schema_version: 1,
 * });
 */
export async function upsertProfile(uid, profileData) {
  if (!uid || typeof uid !== 'string') {
    throw new Error('uid must be a non-empty string');
  }

  const db = getFirestoreInstance();
  const profileRef = doc(db, 'pilot_profiles', uid);

  const payload = {
    ...profileData,
    updated_at: serverTimestamp(),
    schema_version: profileData.schema_version || 1,
  };

  // If this is a new profile, set created_at
  try {
    const existingProfile = await getDoc(profileRef);
    if (!existingProfile.exists()) {
      payload.created_at = serverTimestamp();
    }
  } catch (error) {
    // If the getDoc fails, we'll let setDoc fail and report that error
    console.warn('[WONML Firebase] Could not check if profile exists; proceeding with setDoc:', error.message);
  }

  try {
    await setDoc(profileRef, payload, { merge: true });
    console.log('[WONML Firebase] Profile upserted for UID:', uid);
  } catch (error) {
    console.error('[WONML Firebase] Failed to upsert profile:', error);
    throw error;
  }
}

/**
 * Updates specific fields of a pilot profile.
 * Does not overwrite fields that are not included in the update.
 * More efficient than upsertProfile for partial updates.
 *
 * @param {string} uid - User ID
 * @param {Partial<PilotProfile>} updates - Fields to update
 *   Include only the fields you want to change.
 *
 * @returns {Promise<void>}
 *   Resolves when the update is complete.
 *   Rejects if Firestore is unavailable or the profile does not exist.
 *
 * @throws {Error} If uid is invalid or the profile does not exist.
 *
 * @example
 * // Update just the avatar URL and usage preference
 * await updateProfile("user-123", {
 *   avatar_url: "gs://bucket/users/user-123/avatar-v2.png",
 *   "preferences.use_avatar": true,
 * });
 */
export async function updateProfile(uid, updates) {
  if (!uid || typeof uid !== 'string') {
    throw new Error('uid must be a non-empty string');
  }

  const db = getFirestoreInstance();
  const profileRef = doc(db, 'pilot_profiles', uid);

  const payload = {
    ...updates,
    updated_at: serverTimestamp(),
  };

  try {
    await updateDoc(profileRef, payload);
    console.log('[WONML Firebase] Profile updated for UID:', uid);
  } catch (error) {
    console.error('[WONML Firebase] Failed to update profile:', error);
    throw error;
  }
}

/**
 * Retrieves the avatar URL for a pilot.
 * Returns null if no avatar is set or the profile does not exist.
 *
 * Used for preloading avatars at game startup.
 *
 * @param {string} uid - User ID
 *
 * @returns {Promise<string | null>}
 *   Resolves with the avatar URL if set, null otherwise.
 *
 * @example
 * const avatarUrl = await getAvatarUrl("user-123");
 * if (avatarUrl) {
 *   preloadImage(avatarUrl);
 * }
 */
export async function getAvatarUrl(uid) {
  if (!uid || typeof uid !== 'string') {
    throw new Error('uid must be a non-empty string');
  }

  try {
    const profile = await getProfile(uid);
    return profile?.avatar_url || null;
  } catch (error) {
    console.warn('[WONML Firebase] Failed to fetch avatar URL:', error.message);
    return null;
  }
}

/**
 * Sets or updates the avatar URL for a pilot.
 * This is called after the avatar is generated and uploaded to Cloud Storage.
 *
 * @param {string} uid - User ID
 * @param {string} avatarUrl - Cloud Storage path or signed URL
 *   Example: "gs://bucket/users/{uid}/avatar.png"
 *
 * @returns {Promise<void>}
 *   Resolves when the update is complete.
 *   Rejects if Firestore is unavailable.
 *
 * @throws {Error} If uid or avatarUrl is invalid.
 *
 * @example
 * await setAvatarUrl("user-123", "gs://bucket/users/user-123/avatar.png");
 */
export async function setAvatarUrl(uid, avatarUrl) {
  if (!uid || typeof uid !== 'string') {
    throw new Error('uid must be a non-empty string');
  }

  if (!avatarUrl || typeof avatarUrl !== 'string') {
    throw new Error('avatarUrl must be a non-empty string');
  }

  try {
    await updateProfile(uid, {
      avatar_url: avatarUrl,
    });
  } catch (error) {
    console.error('[WONML Firebase] Failed to set avatar URL:', error);
    throw error;
  }
}
