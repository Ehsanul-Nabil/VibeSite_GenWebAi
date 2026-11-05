import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
})

export const sendVerificationEmail = async (toEmail, token) => {
  console.log('sendVerificationEmail')
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000'
  const verificationLink = `${backendUrl}/api/auth/verify-email?token=${token}`

  const mailOptions = {
    from: `"VibeSite.AI" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Confirm Your VibeSite.AI Account',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0b0b0b; color: #ffffff; padding: 32px; border-radius: 16px; text-align: center;">
        <h2 style="color: #a855f7;">Welcome to VibeSite.AI!</h2>
        <p style="color: #cbd5e1; font-size: 14px;">Please confirm your email address by clicking the button below:</p>
        <div style="margin: 28px 0;">
          <a href="${verificationLink}" style="background: linear-gradient(90deg, #9333ea, #3b82f6); color: #ffffff; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p style="color: #64748b; font-size: 12px;">This link will expire in 24 hours. If you did not create this account, please ignore this email.</p>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}


// const transporter = nodemailer.createTransport({
// //   host: 'smtp.gmail.com',
// //   port: 465,
// //   secure: true,
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// })

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true, // Use SSL/TLS for port 465
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   // Add timeouts so requests fail gracefully instead of hanging
//   connectionTimeout: 10000, 
//   socketTimeout: 10000,
// });

// export const sendVerificationEmail = async (toEmail, token) => {
//     console.log("sendVerificationEmail")
//   const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000'
//   const verificationLink = `${backendUrl}/api/auth/verify-email?token=${token}`

//   const mailOptions = {
//     from: `"VibeSite.AI" <${process.env.EMAIL_USER}>`,
//     to: toEmail,
//     subject: 'Confirm Your VibeSite.AI Account',
//     html: `
//       <div style="font-family: Arial, sans-serif; background-color: #0b0b0b; color: #ffffff; padding: 32px; border-radius: 16px; text-align: center;">
//         <h2 style="color: #a855f7;">Welcome to VibeSite.AI!</h2>
//         <p style="color: #cbd5e1; font-size: 14px;">Please confirm your email address by clicking the button below:</p>
//         <div style="margin: 28px 0;">
//           <a href="${verificationLink}" style="background: linear-gradient(90deg, #9333ea, #3b82f6); color: #ffffff; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
//             Verify Email Address
//           </a>
//         </div>
//         <p style="color: #64748b; font-size: 12px;">This link will expire in 24 hours. If you did not create this account, please ignore this email.</p>
//       </div>
//     `,
//   }

//   return await transporter.sendMail(mailOptions)
// }