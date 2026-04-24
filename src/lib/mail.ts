// import nodemailer from "nodemailer";
// import { BRAND } from "./constants";

// const transporter = nodemailer.createTransport({
//     // Generic configuration; user should provide these in .env
//     host: process.env.EMAIL_HOST || "smtp.gmail.com",
//     port: parseInt(process.env.EMAIL_PORT || "587"),
//     secure: process.env.EMAIL_SECURE === "true",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// export const MailService = {
//     async sendBookingConfirmation(to: string, userName: string, courseTitle: string) {
//         if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//             console.warn("Email service not configured. Check EMAIL_USER and EMAIL_PASS environment variables.");
//             return;
//         }

//         const mailOptions = {
//             from: `"${BRAND.name}" <${process.env.EMAIL_USER}>`,
//             to,
//             subject: `Booking Confirmed: ${courseTitle}`,
//             html: `
//                 <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
//                     <h2 style="color: #00e5ff;">Welcome to ${BRAND.name}, ${userName}!</h2>
//                     <p>Your booking for <strong>${courseTitle}</strong> has been successfully confirmed.</p>
//                     <p>We are excited to have you join our community and begin your leadership journey with <strong>Mridu Bhandari</strong>.</p>
//                     <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
//                         <p style="margin: 0;"><strong>Course:</strong> ${courseTitle}</p>
//                         <p style="margin: 5px 0 0 0;"><strong>Status:</strong> Enrolled</p>
//                     </div>
//                     <p>You can now access your course from the <a href="${BRAND.mainUrl}/dashboard" style="color: #6366f1;">Dashboard</a>.</p>
//                     <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
//                     <p style="font-size: 12px; color: #888;">This is an automated email from ${BRAND.name}. Please do not reply to this email.</p>
//                 </div>
//             `,
//         };

//         try {
//             const info = await transporter.sendMail(mailOptions);
//             console.log("Email sent successfully:", info.messageId);
//             return info;
//         } catch (error) {
//             console.error("Error sending email:", error);
//             throw error;
//         }
//     },

//     async sendAdminInterestNotification(adminEmail: string, userDetails: any, courseTitle: string) {
//         if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//             console.warn("Email service not configured. Check EMAIL_USER and EMAIL_PASS environment variables.");
//             return;
//         }

//         const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

//         const mailOptions = {
//             from: `"${BRAND.name}" <${process.env.EMAIL_USER}>`,
//             to: adminEmail,
//             subject: `New Interest: ${courseTitle}`,
//             html: `
//                 <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
//                     <h2 style="color: #6366f1;">New Course Interest!</h2>
//                     <p>A user has shown interest in <strong>${courseTitle}</strong> and filled out the enrollment form.</p>
                    
//                     <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #e2e8f0;">
//                         <h3 style="margin-top: 0; color: #1e293b; font-size: 16px;">Details:</h3>
//                         <table style="width: 100%; border-collapse: collapse;">
//                             <tr>
//                                 <td style="padding: 8px 0; color: #64748b; width: 120px;"><strong>Name:</strong></td>
//                                 <td style="padding: 8px 0; color: #1e293b;">${userDetails.fullName}</td>
//                             </tr>
//                             <tr>
//                                 <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
//                                 <td style="padding: 8px 0; color: #1e293b;">${userDetails.email}</td>
//                             </tr>
//                             <tr>
//                                 <td style="padding: 8px 0; color: #64748b;"><strong>Phone:</strong></td>
//                                 <td style="padding: 8px 0; color: #1e293b;">${userDetails.phone}</td>
//                             </tr>
//                             <tr>
//                                 <td style="padding: 8px 0; color: #64748b;"><strong>Company:</strong></td>
//                                 <td style="padding: 8px 0; color: #1e293b;">${userDetails.company}</td>
//                             </tr>
//                             <tr>
//                                 <td style="padding: 8px 0; color: #64748b;"><strong>Submitted at:</strong></td>
//                                 <td style="padding: 8px 0; color: #1e293b; font-style: italic;">${timestamp}</td>
//                             </tr>
//                             ${userDetails.linkedin ? `
//                             <tr>
//                                 <td style="padding: 8px 0; color: #64748b;"><strong>LinkedIn:</strong></td>
//                                 <td style="padding: 8px 0; color: #1e293b;"><a href="${userDetails.linkedin}" style="color: #00e5ff;">View Profile</a></td>
//                             </tr>` : ''}
//                         </table>
//                     </div>
                    
//                     <p style="color: #ef4444; font-weight: bold;">Action Required: Please check if the payment was successful in the Razorpay dashboard for this user.</p>
//                     <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
//                     <p style="font-size: 12px; color: #888;">MentorLeap Automated Notification System</p>
//                 </div>
//             `,
//         };


//         try {
//             return await transporter.sendMail(mailOptions);
//         } catch (error) {
//             console.error("Error sending admin notification:", error);
//             throw error;
//         }
//     }
// };




import nodemailer from "nodemailer";
import { BRAND } from "./constants";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const MailService = {
    async sendBookingConfirmation(to: string, userName: string, courseTitle: string) {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn("Email service not configured. Check EMAIL_USER and EMAIL_PASS environment variables.");
            return;
        }

        const mailOptions = {
            from: `"${BRAND.name}" <${process.env.EMAIL_USER}>`,
            to,
            subject: `Booking Confirmed: ${courseTitle}`,
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking Confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#f0ede8;font-family:Georgia,'Times New Roman',serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0ede8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- TOP BAR -->
          <tr>
            <td style="background-color:#1c1c1c;border-radius:10px 10px 0 0;padding:18px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td><p style="margin:0;font-family:Georgia,serif;font-size:15px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">${BRAND.name}</p></td>
                  <td align="right"><p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.4);">Booking Confirmation</p></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO -->
          <tr>
            <td style="background-color:#ffffff;padding:48px 40px 36px;border-left:1px solid #e8e4df;border-right:1px solid #e8e4df;">
              <p style="margin:0 0 20px;display:inline-block;padding:4px 14px;border-radius:20px;background-color:#f0faf4;border:1px solid #a3d9b8;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;color:#276a45;letter-spacing:1px;text-transform:uppercase;">Confirmed</p>
              <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:28px;font-weight:700;color:#1c1c1c;letter-spacing:-0.3px;line-height:1.25;">Welcome aboard, ${userName}.</h1>
              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#6b6560;line-height:1.7;">Your enrollment for the following programme has been successfully confirmed. We look forward to your participation.</p>
            </td>
          </tr>

          <!-- ACCENT LINE -->
          <tr>
            <td style="background-color:#ffffff;padding:0 40px;border-left:1px solid #e8e4df;border-right:1px solid #e8e4df;">
              <div style="height:2px;background:linear-gradient(90deg,#1c1c1c 0%,#1c1c1c 30%,#e8e4df 100%);"></div>
            </td>
          </tr>

          <!-- PROGRAMME DETAILS -->
          <tr>
            <td style="background-color:#fafaf8;padding:28px 40px;border:1px solid #e8e4df;border-top:none;">
              <p style="margin:0 0 10px;font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#a09890;">Programme Details</p>
              <p style="margin:0 0 18px;font-family:Georgia,serif;font-size:17px;font-weight:700;color:#1c1c1c;line-height:1.35;">${courseTitle}</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e8e4df;border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="padding:12px 16px;background-color:#ffffff;width:50%;border-right:1px solid #e8e4df;">
                    <p style="margin:0 0 3px;font-family:Helvetica,Arial,sans-serif;font-size:10px;color:#a09890;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Instructor</p>
                    <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#1c1c1c;font-weight:600;">Mridu Bhandari</p>
                  </td>
                  <td style="padding:12px 16px;background-color:#ffffff;width:50%;">
                    <p style="margin:0 0 3px;font-family:Helvetica,Arial,sans-serif;font-size:10px;color:#a09890;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Enrolment Status</p>
                    <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#276a45;font-weight:600;">Active</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- NEXT STEPS -->
          <tr>
            <td style="background-color:#ffffff;padding:28px 40px;border:1px solid #e8e4df;border-top:none;">
              <p style="margin:0 0 18px;font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#a09890;">Next Steps</p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                <tr>
                  <td style="vertical-align:top;width:36px;">
                    <div style="width:28px;height:28px;border-radius:50%;background-color:#1c1c1c;text-align:center;line-height:28px;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;color:#ffffff;">1</div>
                  </td>
                  <td style="vertical-align:top;padding-left:12px;">
                    <p style="margin:0 0 3px;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;color:#1c1c1c;">Access your dashboard</p>
                    <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6b6560;line-height:1.55;">Visit My Events to view your schedule, session materials, and programme updates.</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                <tr>
                  <td style="vertical-align:top;width:36px;">
                    <div style="width:28px;height:28px;border-radius:50%;background-color:#1c1c1c;text-align:center;line-height:28px;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;color:#ffffff;">2</div>
                  </td>
                  <td style="vertical-align:top;padding-left:12px;">
                    <p style="margin:0 0 3px;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;color:#1c1c1c;">Watch your inbox</p>
                    <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6b6560;line-height:1.55;">Session links, pre-work, and reminders will be sent ahead of each session.</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:top;width:36px;">
                    <div style="width:28px;height:28px;border-radius:50%;background-color:#1c1c1c;text-align:center;line-height:28px;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;color:#ffffff;">3</div>
                  </td>
                  <td style="vertical-align:top;padding-left:12px;">
                    <p style="margin:0 0 3px;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;color:#1c1c1c;">Prepare to engage</p>
                    <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6b6560;line-height:1.55;">Come with your questions and a willingness to challenge your thinking.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background-color:#1c1c1c;padding:32px 40px;text-align:center;">
              <a href="https://mentorleap.co/dashboard/my-events"
                 style="display:inline-block;padding:14px 40px;background-color:#ffffff;color:#1c1c1c;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:6px;letter-spacing:0.3px;">
                Go to My Events
              </a>
              <p style="margin:14px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.35);">mentorleap.co/dashboard/my-events</p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#1c1c1c;border-radius:0 0 10px 10px;padding:20px 40px 24px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.3);line-height:1.7;">This is an automated message from ${BRAND.name}. Please do not reply directly.<br/>For support, visit your dashboard.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
            `,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully:", info.messageId);
            return info;
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    },

    async sendAdminInterestNotification(adminEmail: string, userDetails: any, courseTitle: string) {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn("Email service not configured. Check EMAIL_USER and EMAIL_PASS environment variables.");
            return;
        }

        const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

        const mailOptions = {
            from: `"${BRAND.name}" <${process.env.EMAIL_USER}>`,
            to: adminEmail,
            subject: `New Interest: ${courseTitle}`,
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Course Interest</title>
</head>
<body style="margin:0;padding:0;background-color:#f0ede8;font-family:Georgia,'Times New Roman',serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0ede8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- TOP BAR -->
          <tr>
            <td style="background-color:#1c1c1c;border-radius:10px 10px 0 0;padding:18px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td><p style="margin:0;font-family:Georgia,serif;font-size:15px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">${BRAND.name}</p></td>
                  <td align="right">
                    <span style="display:inline-block;padding:3px 12px;background-color:#fef3c7;border:1px solid rgba(245,158,11,0.3);border-radius:20px;font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:700;color:#92400e;letter-spacing:1.5px;text-transform:uppercase;">Admin Alert</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO -->
          <tr>
            <td style="background-color:#ffffff;padding:40px 40px 32px;border-left:1px solid #e8e4df;border-right:1px solid #e8e4df;">
              <h1 style="margin:0 0 10px;font-family:Georgia,serif;font-size:26px;font-weight:700;color:#1c1c1c;letter-spacing:-0.3px;line-height:1.25;">New enrolment interest received.</h1>
              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#6b6560;line-height:1.6;">A prospective participant has submitted an enrolment form. Their details are listed below for your review.</p>
            </td>
          </tr>

          <!-- ACCENT LINE -->
          <tr>
            <td style="background-color:#ffffff;padding:0 40px;border-left:1px solid #e8e4df;border-right:1px solid #e8e4df;">
              <div style="height:2px;background:linear-gradient(90deg,#1c1c1c 0%,#1c1c1c 30%,#e8e4df 100%);"></div>
            </td>
          </tr>

          <!-- PROGRAMME OF INTEREST -->
          <tr>
            <td style="background-color:#fafaf8;padding:20px 40px;border:1px solid #e8e4df;border-top:none;">
              <p style="margin:0 0 10px;font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#a09890;">Programme of Interest</p>
              <div style="padding:14px 18px;border:1px solid #e8e4df;border-left:3px solid #1c1c1c;border-radius:0 8px 8px 0;background-color:#ffffff;">
                <p style="margin:0 0 4px;font-family:Helvetica,Arial,sans-serif;font-size:10px;color:#a09890;text-transform:uppercase;letter-spacing:2px;font-weight:700;">Course</p>
                <p style="margin:0;font-family:Georgia,serif;font-size:15px;font-weight:700;color:#1c1c1c;">${courseTitle}</p>
              </div>
            </td>
          </tr>

          <!-- LEAD DETAILS -->
          <tr>
            <td style="background-color:#ffffff;padding:24px 40px;border:1px solid #e8e4df;border-top:none;">
              <p style="margin:0 0 14px;font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#a09890;">Lead Details</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">

                <tr style="border-bottom:1px solid #f0ede8;">
                  <td style="padding:11px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#a09890;text-transform:uppercase;letter-spacing:1px;font-weight:600;width:110px;vertical-align:top;">Name</td>
                  <td style="padding:11px 0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#1c1c1c;font-weight:500;">${userDetails.fullName}</td>
                </tr>

                <tr style="border-bottom:1px solid #f0ede8;">
                  <td style="padding:11px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#a09890;text-transform:uppercase;letter-spacing:1px;font-weight:600;vertical-align:top;">Email</td>
                  <td style="padding:11px 0;font-family:Helvetica,Arial,sans-serif;font-size:13px;">
                    <a href="mailto:${userDetails.email}" style="color:#1c1c1c;text-decoration:underline;">${userDetails.email}</a>
                  </td>
                </tr>

                <tr style="border-bottom:1px solid #f0ede8;">
                  <td style="padding:11px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#a09890;text-transform:uppercase;letter-spacing:1px;font-weight:600;vertical-align:top;">Phone</td>
                  <td style="padding:11px 0;font-family:Helvetica,Arial,sans-serif;font-size:13px;">
                    <a href="tel:${userDetails.phone}" style="color:#1c1c1c;text-decoration:underline;">${userDetails.phone}</a>
                  </td>
                </tr>

                <tr style="border-bottom:1px solid #f0ede8;">
                  <td style="padding:11px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#a09890;text-transform:uppercase;letter-spacing:1px;font-weight:600;vertical-align:top;">Company</td>
                  <td style="padding:11px 0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#1c1c1c;font-weight:500;">${userDetails.company}</td>
                </tr>

                ${userDetails.linkedin ? `
                <tr style="border-bottom:1px solid #f0ede8;">
                  <td style="padding:11px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#a09890;text-transform:uppercase;letter-spacing:1px;font-weight:600;vertical-align:top;">LinkedIn</td>
                  <td style="padding:11px 0;font-family:Helvetica,Arial,sans-serif;font-size:13px;">
                    <a href="${userDetails.linkedin}" style="color:#1c1c1c;text-decoration:underline;">View Profile</a>
                  </td>
                </tr>` : ''}

                <tr>
                  <td style="padding:11px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#a09890;text-transform:uppercase;letter-spacing:1px;font-weight:600;vertical-align:top;">Submitted</td>
                  <td style="padding:11px 0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6b6560;font-style:italic;">${timestamp} IST</td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- ACTION REQUIRED -->
          <tr>
            <td style="background-color:#fffbeb;padding:16px 40px;border:1px solid #e8e4df;border-top:none;">
              <div style="padding:14px 18px;border:1px solid #fcd34d;border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;background-color:#fffbeb;">
                <p style="margin:0 0 4px;font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#92400e;">Action Required</p>
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#78350f;line-height:1.6;">Please verify if the payment was successful in the <strong>Razorpay dashboard</strong> for this user before proceeding.</p>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background-color:#1c1c1c;padding:28px 40px;text-align:center;">
              <a href="https://mentorleap.co/dashboard/my-events"
                 style="display:inline-block;padding:13px 36px;background-color:#ffffff;color:#1c1c1c;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:6px;letter-spacing:0.2px;">
                Open Admin Dashboard
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#1c1c1c;border-radius:0 0 10px 10px;padding:20px 40px 24px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.3);line-height:1.7;">${BRAND.name} Automated Notification System &middot; Do not reply to this email.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
            `,
        };

        try {
            return await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Error sending admin notification:", error);
            throw error;
        }
    }
};