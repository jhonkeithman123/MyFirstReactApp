import { firestore, auth } from "./firebase";

export async function registerUser(
  email: string,
  password: string,
  username: string,
  role = "user"
) {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = firestore().collection("users").doc(user.uid);
    await userDoc.set({
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
