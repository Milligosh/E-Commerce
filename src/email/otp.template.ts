export const sendOtp = (fullName: string, otp: string) =>
    `<!doctype html>
  <html lang="en" dir="auto">
  <head>
    <title>OTP Verification</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a { padding:0; }
      body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
      table,td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
      img { border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
      p { display:block;margin:0; }
      a { color: inherit; text-decoration: none; }
      .email-container { width: 100%; max-width: 600px; margin: auto; background-color: #fffffe; padding: 20px; }
      .header { font-family: 'DM Sans', 'Arial', sans-serif; font-weight: 700; font-size: 28px; color: #000000; text-align: left; }
      .subheader { font-family: 'DM Sans', 'Arial', sans-serif; font-weight: 400; font-size: 16px; color: #868a90; line-height: 150%; text-align: left; }
      .otp { font-family: 'DM Sans', 'Arial', sans-serif; font-weight: 500; font-size: 20px; color: #ad3398; line-height: 150%; text-align: center; letter-spacing: 20px; }
      .footer { font-family: 'Inter', 'Arial', sans-serif; font-weight: 400; font-size: 16px; color: #777777; line-height: 188%; text-align: left; }
      .footer .app-name { color: #ad3398; }
    </style>
  </head>
  <body lang="en" link="#DD0000" vlink="#DD0000" style="background-color:#1e1e1e;">
    <div class="email-container">
      <div class="header">OTP VERIFICATION</div>
      <div class="subheader">Hello, ${fullName}</div>
      <div class="subheader">
        Please use the following OTP to verify your email address. This OTP is valid for the next 5 minutes.
      </div>
      <div class="otp">${otp}</div>
      <div class="subheader">
        If you did not request this OTP, please ignore this email.
      </div>
      <div class="footer">
        Warm Regards,<br>
        <span class="app-name">MilliJoule's App</span>
      </div>
    </div>
  </body>
  </html>`;
  