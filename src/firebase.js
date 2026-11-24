
const firebaseConfig = {
  apiKey: 'AIzaSyByIYfRU_TU5o04Qe0fHrOnkU8lLL4fQC0',
  authDomain: 'reuse-market-39cc3.firebaseapp.com',
  projectId: 'reuse-market-39cc3',
  appId: '1:220608765215:web:75ae0568b24d4a2c91242a',
}

const isConfigured = Object.values(firebaseConfig).every(Boolean);

export const isGoogleConfigured = isConfigured;

export async function signInWithGoogle() {
  if (!isConfigured) {
    const error = new Error(
      "Google sign-in isn't set up yet. Please use email and password."
    );
    error.code = 'not-configured';
    throw error;
  }

  const { initializeApp, getApps, getApp } = await import('firebase/app');

  const {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
  } = await import('firebase/auth');

  // Reuse the existing Firebase app instead of initializing it again
  const app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();

  // Show the Google account chooser every time
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  const result = await signInWithPopup(auth, provider);

  return result.user;
}
