import {
  getFunctions,
  httpsCallable,
  HttpsCallableResult,
} from "firebase/functions";
import { initializationPromise } from "../firebase"; // Ensure Firebase is initialized

// Define the type for the Cloud Function response
interface SendVerificationEmailResponse {
  success: boolean | null;
  error: string | null;
}

/**
 * Sends a verification email using a Firebase Cloud Function.
 * @param email The recipient's email address.
 * @param emailType The type of email to send. Possible values:
 * - 'verification': Email verification
 * - 'reset': Password reset
 * - 'delete': Account deletion
 * - 'default': Generic verification code
 * @returns A promise that resolves with the Cloud Function's response.
 */
const sendVerifEmail = async (
  email: string,
  emailType: string
): Promise<SendVerificationEmailResponse> => {
  await initializationPromise; // Ensure Firebase is initialized
  try {
    const functions = getFunctions();
    const sendVerificationEmailCallable = httpsCallable<
      { email: string; emailType: string },
      SendVerificationEmailResponse
    >(functions, "sendVerificationEmail");

    const result: HttpsCallableResult<SendVerificationEmailResponse> =
      await sendVerificationEmailCallable({
        email: email,
        emailType: emailType,
      });

    return result.data;
  } catch (error: any) {
    const errorCode = error?.code || "unknown";
    const errorMessage = error?.message || "Unknown error occurred";
    console.error(
      "Error calling sendVerificationEmail:",
      errorCode,
      errorMessage
    );
    throw error;
  }
};

export default sendVerifEmail;
