/**
 * Leaderboard Module
 * Enzo Caruso — Database Specialist
 * 2026-04-19
 *
 * Manages score submission and leaderboard queries via Firestore.
 * Implements the contract defined in DB_Design_Enzo_v2_Firebase.md § 4.
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  type Firestore,
  type DocumentData,
  type Query,
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
 * Validates a score submission payload.
 *
 * @param {string} playerName - Pilot name (1-30 chars)
 * @param {number} score - Final run score (>= 0)
 * @param {string} campaignId - Campaign key (e.g., "belgium", "marne")
 * @param {string} faction - Normalised faction: "british" or "german"
 * @param {string} aircraftId - Aircraft key (e.g., "se5a", "dh1")
 *
 * @returns {{valid: boolean, errors: string[]}}
 *   Object with validation status and list of error messages.
 *
 * @example
 * const validation = validateScore("Alice", 4250, "belgium", "british", "se5a");
 * if (!validation.valid) {
 *   console.error('Validation errors:', validation.errors);
 * }
 */
export function validateScore(playerName, score, campaignId, faction, aircraftId) {
  const errors = [];

  if (typeof playerName !== 'string' || playerName.trim().length === 0 || playerName.length > 30) {
    errors.push('playerName must be a non-empty string, 1–30 characters');
  }

  if (typeof score !== 'number' || !Number.isInteger(score) || score < 0) {
    errors.push('score must be a non-negative integer');
  }

  if (typeof campaignId !== 'string' || campaignId.trim().length === 0) {
    errors.push('campaignId must be a non-empty string');
  }

  if (faction !== 'british' && faction !== 'german') {
    errors.push('faction must be "british" or "german"');
  }

  if (typeof aircraftId !== 'string' || aircraftId.trim().length === 0) {
    errors.push('aircraftId must be a non-empty string');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Submits a score to the leaderboard.
 * Firestore enforces field validation via Security Rules (see DB_Design_Enzo_v2_Firebase.md § 3).
 *
 * @param {string} playerName - Pilot name as entered by player
 * @param {number} score - Final run score
 * @param {string} campaignId - Campaign key
 * @param {string} faction - Normalised faction ("british" or "german")
 * @param {string} aircraftId - Aircraft key
 * @param {Object} [metadata] - Optional extended fields (stage_reached, flight_duration_seconds, etc.)
 *
 * @returns {Promise<void>}
 *   Resolves if the score was written successfully.
 *   Rejects if Firestore is unavailable or the write fails.
 *
 * @throws {FirebaseError}
 *   If the network is down, Firestore is unavailable, or Security Rules reject the write.
 *   Note: Rule violations may be silent (for security); check document counts if concerned.
 *
 * @example
 * try {
 *   await submitScore("Alice", 4250, "belgium", "british", "se5a", {
 *     stage_reached: 5,
 *     flight_duration_seconds: 120,
 *   });
 *   console.log('Score submitted.');
 * } catch (error) {
 *   console.error('Failed to submit score:', error.message);
 *   // Implement retry logic or offline queue here
 * }
 */
export async function submitScore(
  playerName,
  score,
  campaignId,
  faction,
  aircraftId,
  metadata = {},
) {
  // Validate before sending to Firestore
  const validation = validateScore(playerName, score, campaignId, faction, aircraftId);
  if (!validation.valid) {
    throw new Error(`Score validation failed: ${validation.errors.join('; ')}`);
  }

  const db = getFirestoreInstance();
  const scoresCollection = collection(db, 'scores');

  const payload = {
    player_name: playerName.trim(),
    score,
    campaign_id: campaignId.trim(),
    faction,
    aircraft_id: aircraftId.trim(),
    timestamp: serverTimestamp(),
    schema_version: 1,
    ...metadata,
  };

  try {
    const docRef = await addDoc(scoresCollection, payload);
    console.log('[WONML Firebase] Score submitted successfully. Document ID:', docRef.id);
  } catch (error) {
    console.error('[WONML Firebase] Failed to submit score:', error);
    throw error;
  }
}

/**
 * Fetches the top N scores from the leaderboard.
 *
 * @param {Object} options - Query options
 * @param {string} [options.campaignId] - Filter by campaign ID. If omitted, returns global top scores.
 * @param {string} [options.faction] - Filter by faction ("british" or "german"). Optional, deferred to v2.
 * @param {number} [options.limit] - Maximum results to return (default: 10)
 *
 * @returns {Promise<Array<{name: string, score: number, campaign_id: string, faction: string, aircraft_id: string}>>}
 *   Resolves with an array of score records, sorted by score descending.
 *   Returns empty array if Firestore is unavailable or no results found.
 *
 * @example
 * // Top 10 global scores
 * const topGlobal = await getTopScores();
 *
 * // Top 10 scores in "belgium" campaign
 * const topBelgium = await getTopScores({ campaignId: "belgium" });
 *
 * // Top 5 scores
 * const top5 = await getTopScores({ limit: 5 });
 */
export async function getTopScores(options = {}) {
  const db = getFirestoreInstance();
  const scoresCollection = collection(db, 'scores');
  const queryLimit = options.limit || 10;

  try {
    let q;

    if (options.campaignId) {
      // Per-campaign top scores: requires composite index (created on first query)
      q = query(
        scoresCollection,
        where('campaign_id', '==', options.campaignId),
        orderBy('score', 'desc'),
        limit(queryLimit),
      );
    } else {
      // Global top scores: single-field index, auto-created by Firestore
      q = query(
        scoresCollection,
        orderBy('score', 'desc'),
        limit(queryLimit),
      );
    }

    const snapshot = await getDocs(q);
    const scores = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      scores.push({
        name: data.player_name,
        score: data.score,
        campaign_id: data.campaign_id,
        faction: data.faction,
        aircraft_id: data.aircraft_id,
      });
    });

    return scores;
  } catch (error) {
    console.warn('[WONML Firebase] Failed to fetch top scores:', error.message);
    // Return empty array on error; game treats this as "offline" and uses local cache
    return [];
  }
}

/**
 * Fetches scores around a specific player in a campaign's leaderboard.
 * Useful for showing a player's rank and nearby competitors.
 *
 * Limitations: Firestore does not support "before/after" range queries on non-unique keys.
 * This implementation fetches top N scores and filters client-side.
 * For large leaderboards (100K+), a server-side solution is recommended (Cloud Functions).
 *
 * @param {string} playerUid - UID of the player (for context; not used in current v1 implementation)
 * @param {string} campaignId - Campaign to query
 * @param {Object} [options] - Options
 * @param {number} [options.radius] - Number of scores before/after the player (default: 3)
 * @param {number} [options.fetchLimit] - Number of top scores to fetch for filtering (default: 50)
 *
 * @returns {Promise<Array<{rank: number, name: string, score: number, faction: string, aircraft_id: string, isPlayer: boolean}>>}
 *   Resolves with an array of scores centered around the player.
 *   Returns empty array if Firestore is unavailable.
 *
 * @example
 * // Get player "Alice"'s rank and 3 scores before/after her
 * const nearby = await getScoreAround("uid-alice", "belgium", { radius: 3 });
 * // Might return: [
 * //   { rank: 1, name: "Bob", score: 5000, faction: "british", aircraft_id: "se5a", isPlayer: false },
 * //   { rank: 2, name: "Alice", score: 4250, faction: "british", aircraft_id: "se5a", isPlayer: true },
 * //   { rank: 3, name: "Charlie", score: 4100, faction: "german", aircraft_id: "d7", isPlayer: false },
 * // ]
 */
export async function getScoreAround(playerUid, campaignId, options = {}) {
  const radius = options.radius || 3;
  const fetchLimit = options.fetchLimit || 50;

  try {
    const topScores = await getTopScores({ campaignId, limit: fetchLimit });

    if (topScores.length === 0) {
      return [];
    }

    // For v1, we don't have a mapping from playerUid to player_name in the leaderboard.
    // This function is a placeholder for v2 when player profiles are synced.
    // For now, return top scores with rank annotations.

    return topScores.slice(0, radius * 2 + 1).map((score, index) => ({
      rank: index + 1,
      name: score.name,
      score: score.score,
      faction: score.faction,
      aircraft_id: score.aircraft_id,
      isPlayer: false, // TODO(v2): Match against player profile
    }));
  } catch (error) {
    console.warn('[WONML Firebase] Failed to fetch scores around player:', error.message);
    return [];
  }
}
