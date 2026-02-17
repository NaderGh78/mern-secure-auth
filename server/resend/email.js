import { resend } from "./config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE
} from "./email-templates.js";

/*=========================================*/
/*=========================================*/
/*=========================================*/

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Auth Mern <onboarding@resend.dev>",
      to: [email],
      subject: "Verify Your Email Address Now",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });

  } catch (error) {
    console.log("error sending verification email", error);
    throw new Error("Error sending verification email");
  }
};

/*=========================================*/

const sendWelcomeEmail = async (email, name) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Auth Mern <onboarding@resend.dev>",
      to: [email],
      subject: `Welcome to ${process.env.PROJECT_NAME}`,
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
    });
  } catch (error) {
    console.log("error sending welcome email", error);
  }
};

/*=========================================*/

const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Auth Mern <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Your Password",
      // html: `Click <a href="${resetURL}">here</a> to reset your password`,
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });
  } catch (error) {
    console.log("error sending password reset email", error);
  }
};

/*=========================================*/

const sendResetSuccessEmail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Auth Mern <onboarding@resend.dev>",
      to: [email],
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
  } catch (error) {
    console.log("error sending password reset successful email", error);
  }
}

/*=========================================*/

export {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail
};  