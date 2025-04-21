import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firestore } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export async function registerUser(
  email: string,
  password: string,
  username: string,
  role = "user"
) {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = doc(firestore, "users", user.uid);
    await setDoc(userDoc, {
      username,
      email,
      profile_picture: "",
      role: role,
      createdAt: new Date(),
    });

    console.log("User registered and saved successfully!");
    return user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}
