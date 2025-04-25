import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import { SentMessageInfo } from "nodemailer";
import { CallableRequest } from "firebase-functions/v2/https";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

interface EmailConfig {
  service: string;
  auth: {
    user: string;
    pass: string;
  };
}

const config = functions.config();
const EMAIL_CONFIG: EmailConfig = {
  service: "gmail",
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
};

const OTP_LENGTH = 6;
const OTP_EXPIRATION_TIME = 120; // 5 minutes

const transporter = nodemailer.createTransport(EMAIL_CONFIG);

const generateOTP = (length: number): string => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return otp;
};

/**
 **
 * @param email - The recipient's email address
 * @param otp - The OTP sent to the recipient
 * @param emailType - The type of email to send. Possible values:
 * - 'verification': Email verification
 * - 'reset': Password reset
 * - 'delete': Account deletion
 * - 'default': Generic verification code
 */

const sendEMail = async (
  email: string,
  otp: string,
  emailType: string
): Promise<void> => {
  let subject = "";
  let text = "";
  let html = "";

  switch (emailType) {
    case "verification":
      subject = "Email Verification";
      text = `Your verification code is ${otp}.`;
      html = `<p>Your verification code is <strong>${otp}</strong>.</p>`;
      break;
    case "reset":
      subject = "Password Reset";
      text = `Your password reset code is ${otp}.`;
      html = `<p>Your password reset code is <strong>${otp}</strong>.</p>`;
      break;
    case "delete":
      subject = "Account Deletion";
      text = `Your account deletion code is ${otp}.`;
      html = `<p>Your account deletion code is <strong>${otp}</strong>.</p>`;
      break;
    case "default":
      subject = "Verification Code";
      text = `Your verification code is ${otp}.`;
      html = `<p>Your verification code is <strong>${otp}</strong>.</p>`;
      break;
  }

  const mailOptions = {
    from: EMAIL_CONFIG.auth.user,
    to: email,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${email}`, info);
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email.");
  }
};

const storeOTP = async (email: string, otp: string): Promise<void> => {
  const otpRef = admin.firestore().collection("otps").doc(email);
  const expiration = admin.firestore.Timestamp.fromDate(
    new Date(Date.now() + OTP_EXPIRATION_TIME * 1000)
  );

  try {
    await otpRef.set({
      otp,
      expiration,
    });
    console.log(`OTP stored for ${email}`);
  } catch (error: any) {
    console.error("Error storing OTP:", error);
    throw new Error("Failed to store OTP.");
  }
};

interface SendVerificationEmailData {
  email: string;
  emailType: string;
}

export const sendVerificationEmail = functions.https.onCall(
  async (request: CallableRequest<SendVerificationEmailData>, context) => {
    console.log("Cloud Function triggered:", request.data);

    const email = request.data.email;
    const emailType = request.data.emailType;

    if (!email) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Email is required."
      );
    }
    if (!emailType) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Email type is required."
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Invalid email format."
      );
    }

    try {
      const otp = generateOTP(OTP_LENGTH);
      await sendEMail(email, otp, emailType);
      await storeOTP(email, otp);

      return { success: true };
    } catch (error: any) {
      console.error("Error in sendVerificationEmail:", error);
      const errorMessage =
        error.message || "An error occurred while sending the email.";
      throw new functions.https.HttpsError("internal", errorMessage);
    }
  }
);
