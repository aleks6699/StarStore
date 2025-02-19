import { auth } from "./firebaseСonfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth} from "firebase/auth";
class AuthService {
  private auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  async loginUser(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }

  async logoutUser() {
    await this.auth.signOut();
  }

  async registerUser(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }


}

export const user = new AuthService(auth);