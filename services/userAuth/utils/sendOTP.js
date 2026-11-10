// services/userAuth/utils/sendOTP.js

export const sendOtpEmail = async (toEmail, otp) => {
  const scriptUrl = process.env.GOOGLE_SCRIPT_EMAIL_URL;

  if (!scriptUrl) {
    throw new Error("GOOGLE_SCRIPT_EMAIL_URL environment variable is missing.");
  }

  const response = await fetch(scriptUrl, {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({ toEmail, otp }),
  });

  const data = await response.json();

  if (data.success !== true) {
    throw new Error(`Google Apps Script Email Error: ${data.error || "Failed to deliver email"}`);
  }

  return data;
};