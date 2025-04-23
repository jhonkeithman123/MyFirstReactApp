import { firestore, auth, initializationPromise } from "./firebase";

export async function loginUser(identifier: string, password: string) {
  try {
    await initializationPromise; // Ensure Firebase is initialized

    let errorMessage: string | null = null;
    let emailToUse: string | undefined;

    if (identifier.includes("@") && identifier.includes(".")) {
      emailToUse = identifier;
    } else {
      const userSnapshot = await firestore()
        .collection("users")
        .where("userneme", "==", identifier)
        .get();

      if (userSnapshot.empty) {
        errorMessage = "Account with this username doesn't exist.";
      } else {
        emailToUse = userSnapshot.docs[0].data()?.email;
      }
    }

    if (!emailToUse && !errorMessage) {
      errorMessage = "Account with this email doesn't exist.";
    }

    if (errorMessage) {
      throw new Error(errorMessage);
    }

    const userCredential = await auth().signInWithEmailAndPassword(
      emailToUse!,
      password
    );

    const user = userCredential.user;

    const userDoc = await firestore().collection("users").doc(user.uid).get();
    if (!userDoc.exists) {
      throw new Error("User does not exist in the database.");
    }

    console.log("User logged in successfully!");
    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
