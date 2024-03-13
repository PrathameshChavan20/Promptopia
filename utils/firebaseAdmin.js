import * as admin from "firebase-admin";

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
      storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    });
  }
  console.log("Firebase admin connected succcessfully...");
} catch (error) {
  console.log("Firebase admin initialization error", error.stack);
}
const bucket = admin.storage().bucket();

export { admin, bucket };
