import { firestore, auth, initializationPromise } from "./firebase";

export async function registerUser(
  email: string,
  password: string,
  username: string,
  role = "user"
) {
  try {
    await initializationPromise; // Ensure Firebase is initialized

    const emailCheck = await firestore()
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!emailCheck.empty) {
      throw new Error("Email already in use.");
    }

    const usernameCheck = await firestore()
      .collection("users")
      .where("username", "==", username)
      .get();

    if (!usernameCheck.empty) {
      throw new Error("Username already in use.");
    }

    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );

    const user = userCredential.user;

    const userDoc = firestore().collection("users").doc(user.uid);
    await userDoc.set({
      uid: user.uid,
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
