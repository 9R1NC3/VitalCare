import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getPrivateKey() {
  const raw = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!raw) {
    return undefined;
  }

  // Support keys stored as quoted one-line env values with literal \n.
  const unwrapped =
    (raw.startsWith("\"") && raw.endsWith("\"")) ||
    (raw.startsWith("'") && raw.endsWith("'"))
      ? raw.slice(1, -1)
      : raw;

  return unwrapped.replace(/\r\n/g, "\n");
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = getPrivateKey();

if (!projectId || !clientEmail || !privateKey) {
  // Keep runtime error explicit so setup issues are obvious.
  throw new Error(
    "Missing Firebase Admin env vars. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.",
  );
}

const app =
  getApps()[0] ??
  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });

export const db = getFirestore(app);
