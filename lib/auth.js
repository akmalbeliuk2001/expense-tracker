import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export const register = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export const onAuthChange = (callback) => auth.onAuthStateChanged(callback);
export const getCurrentUser = () => auth.currentUser;
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// export const register = async (email, password) => {
//   const userCredential = await createUserWithEmailAndPassword(
//     auth,
//     email,
//     password
//   );
//   await sendEmailVerification(userCredential.user);
//   return userCredential;
// };
