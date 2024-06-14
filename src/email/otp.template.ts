export const sendOtp = (fullName: string, otp: string) =>
    ` <!doctype html>
  <html lang="en" dir="auto" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
  <title></title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  
  #outlook a{padding:0;}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}table,td{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}p{display:block;margin:0;}
  </style>
  <!--[if mso]> <noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <!--[if lte mso 11]>
  <style type="text/css">
  
  .y{width:100% !important;}
  </style>
  <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=DM Sans:700,400,500" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Inter:400" rel="stylesheet" type="text/css">
  <!--<![endif]-->
  <style type="text/css">
  
  @media only screen and (min-width:599px){.h{width:536px!important;max-width:536px;}.h11{width:356px!important;max-width:356px;}}
  </style>
  <style media="screen and (min-width:599px)">.moz-text-html .h{width:536px!important;max-width:536px;}.moz-text-html .h11{width:356px!important;max-width:356px;}
  </style>
  <style type="text/css">
  
  u+.emailify .gs{background:#000;mix-blend-mode:screen;display:inline-block;padding:0;margin:0;}u+.emailify .gd{background:#000;mix-blend-mode:difference;display:inline-block;padding:0;margin:0;}p{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;}u+.emailify a{color:inherit!important;text-decoration:none!important;}#MessageViewBody a{color:inherit!important;text-decoration:none!important;}
  @media only screen and (max-width:599px){.emailify{height:100%!important;margin:0!important;padding:0!important;width:100%!important;}u+.emailify .glist{margin-left:1em!important;}td.x{padding-left:0!important;padding-right:0!important;}div.r.e>table>tbody>tr>td,div.r.e>div>table>tbody>tr>td{padding-right:16px!important}div.r.ys>table>tbody>tr>td,div.r.ys>div>table>tbody>tr>td{padding-left:16px!important}div.w.e>table>tbody>tr>td,div.w.e>div>table>tbody>tr>td{padding-right:16px!important;}div.w.ys>table>tbody>tr>td,div.w.ys>div>table>tbody>tr>td{padding-left:16px!important;}}
  </style>
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <!--[if gte mso 9]>
  <style>a:link{mso-style-priority:99;color:inherit;text-decoration:none;}a:visited{mso-style-priority:99;color:inherit;text-decoration:none;}li{text-indent:-1em;}table,td,p,div,span,ul,ol,li,a{mso-hyphenate:none;}sup,sub{font-size: 100% !important;}
  </style>
  <![endif]-->
  </head>
  <body lang="en" link="#DD0000" vlink="#DD0000" class="emailify" style="mso-line-height-rule:exactly;mso-hyphenate:none;word-spacing:normal;background-color:#1e1e1e;"><div style="background-color:#1e1e1e;" lang="en" dir="auto">
  <!--[if mso | IE]>
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
  <![endif]--><div class="r e ys" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:20px 16px 12px 16px;text-align:center;">
  <!--[if mso | IE]>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr></tr></table>
  <![endif]-->
  </td></tr></tbody></table></div>
  <!--[if mso | IE]>
  </td></tr></table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
  <![endif]--><div class="r e ys" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:42px 32px 12px 32px;text-align:left;">
  <!--[if mso | IE]>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:middle;width:536px;">
  <![endif]--><div class="h y" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="left" class="x" style="font-size:0;padding-bottom:24px;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:32px;mso-ansi-font-size:28px;"><span style="font-size:28px;font-family:'DM Sans','Arial',sans-serif;font-weight:700;color:#000000;line-height:114%;mso-line-height-alt:32px;mso-ansi-font-size:28px;">OTP VERIFICATION</span></p></div>
  </td></tr><tr><td align="left" class="x" style="font-size:0;padding-bottom:24px;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:24px;mso-ansi-font-size:16px;"><span style="font-size:16px;font-family:'DM Sans','Arial',sans-serif;font-weight:400;color:#868a90;line-height:150%;mso-line-height-alt:24px;mso-ansi-font-size:16px;">Hello,&nbsp;</span><span style="font-size:16px;font-family:'DM Sans','Arial',sans-serif;font-weight:400;color:#230a1e;line-height:150%;mso-line-height-alt:24px;mso-ansi-font-size:16px;">${fullName}</span></p></div>
  </td></tr><tr><td align="left" class="x" style="font-size:0;padding-bottom:0;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:24px;mso-ansi-font-size:16px;"><span style="font-size:16px;font-family:'DM Sans','Arial',sans-serif;font-weight:400;color:#868a90;line-height:150%;mso-line-height-alt:24px;mso-ansi-font-size:16px;">Ex ad in do. Magna veniam tempor adipisicing consectetur occaecat consequat commodo Lorem ad ea non esse non id mollit. Qui fugiat sunt irure quis et elit do eiusmod ullamco ipsum adipisicing deserunt ad eu et. Veniam velit nostru</span></p></div>
  </td></tr></tbody></table></div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
  </td></tr></tbody></table></div>
  <!--[if mso | IE]>
  </td></tr></table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600" bgcolor="#fffffe"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
  <![endif]--><div class="w e ys" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:16px 32px 16px 32px;text-align:center;">
  <!--[if mso | IE]>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td width="600px">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:536px;" width="536"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
  <![endif]--><div class="r e ys" style="background:#f9f4f8;background-color:#f9f4f8;margin:0px auto;max-width:536px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f4f8;background-color:#f9f4f8;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:42px 1px 42px 1px;text-align:center;">
  <!--[if mso | IE]>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:middle;width:356px;">
  <![endif]--><div class="h11 y" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="vertical-align:middle;padding:0 0 0 0;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style width="100%"><tbody><tr><td align="center" class="x" style="font-size:0;word-break:break-word;"><div style="text-align:center;"><p style="Margin:0;text-align:center;mso-line-height-alt:30px;mso-ansi-font-size:20px;"><span style="font-size:20px;font-family:'DM Sans','Arial',sans-serif;font-weight:500;color:#ad3398;line-height:150%;letter-spacing:20px;mso-line-height-alt:30px;mso-ansi-font-size:20px;">${otp}</span></p></div>
  </td></tr></tbody></table>
  </td></tr></tbody></table></div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
  </td></tr></tbody></table></div>
  <!--[if mso | IE]>
  </td></tr></table>
  </td></tr></table>
  <![endif]-->
  </td></tr></tbody></table></div>
  <!--[if mso | IE]>
  </td></tr></table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
  <![endif]--><div class="r e ys" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:32px 32px 32px 32px;text-align:left;">
  <!--[if mso | IE]>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:middle;width:536px;">
  <![endif]--><div class="h y" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="left" class="x" style="font-size:0;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:30px;mso-ansi-font-size:16px;"><span style="font-size:16px;font-family:'Inter','Arial',sans-serif;font-weight:400;color:#777777;line-height:188%;mso-line-height-alt:30px;mso-ansi-font-size:16px;">Warm Regards,</span></p><p style="Margin:0;mso-line-height-alt:30px;mso-ansi-font-size:16px;"><span style="font-size:16px;font-family:'Inter','Arial',sans-serif;font-weight:400;color:#777777;line-height:188%;mso-line-height-alt:30px;mso-ansi-font-size:16px;"><span style="font-size:16px;font-family:'Inter','Arial',sans-serif;font-weight:400;color:#ad3398;line-height:188%;mso-line-height-alt:30px;mso-ansi-font-size:16px;">Millijoule's App</span></span></p></div>
  </td></tr></tbody></table></div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
  </td></tr></tbody></table></div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]--></div>
  </body>
  </html>
  `;
  