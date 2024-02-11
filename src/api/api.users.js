import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

const ApiUsers = {
  async Login(email, password) {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password).catch(e => null);
    const user = userCredentials ? userCredentials.user : null;

    return user;
  },

  async Logout() {
    await signOut(auth);
  }
}

export default ApiUsers;