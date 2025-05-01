// enforces that this code can only be called on the server
import "server-only";

import { cookies } from "next/headers";
import { initializeServerApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";
import { UserService } from "@/services/UserService";

export async function getFirebaseApp() {
  const authIdToken = (await cookies()).get("__session")?.value;

  const firebaseServerApp = initializeServerApp(initializeApp(firebaseConfig), {
    authIdToken
  });

  return firebaseServerApp;
}

export async function isGuestServerSide() {
  const authIdToken = (await cookies()).get("__session")?.value;

  if (!authIdToken) return true;
  else return false;
}

export async function getCurrentUserServerSide() {
  const authIdToken = (await cookies()).get("__session")?.value;

  const firebaseServerApp = initializeServerApp(initializeApp(firebaseConfig), {
    authIdToken
  });

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  const user = auth.currentUser;

  if (!user) return null;

  // Now calling UserService to get user data
  const data = await UserService.getSelf(await user.getIdToken());

  return data;
}
