export function getVerifyCodeTemplate(
  email: string,
  code: string,
  type: string,
) {
  let title = 'Verification Code';
  let description = '';
  let warning = '';

  switch (type) {
    case 'register':
      title = 'Confirm Your Registration';
      description =
        'A verification code has been sent to the email below to complete your registration:';
      warning = 'If you did not sign up, you can safely ignore this email.';
      break;
    case 'forgot':
      title = 'Reset Your Password';
      description =
        'A verification code has been sent to the email below to reset your password:';
      warning =
        'If you did not request a password reset, you can ignore this email.';
      break;
    default:
      description = 'A verification code has been sent to confirm your action:';
      warning =
        'If you did not request this, you can safely ignore this email.';
      break;
  }

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="100%" max-width="480" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
              <tr>
                <td style="padding: 32px; text-align: center;">
                  <h2 style="color: #222; font-size: 20px; margin: 0 0 16px;">${title}</h2>
                  <p style="font-size: 15px; color: #555; margin: 0 0 12px;">${description}</p>
                  <p style="font-size: 14px; background-color: #f0f0f0; color: #333; display: inline-block; padding: 6px 14px; border-radius: 20px; margin: 0 0 24px;">
                    ${email}
                  </p>
                  <div style="font-size: 32px; color: #ff4422; font-weight: bold; background-color: #fff4f0; padding: 12px 24px; border-radius: 8px; letter-spacing: 6px; margin: 0 auto 24px;">
                    ${code}
                  </div>
                  <p style="font-size: 13px; color: #888; max-width: 300px; margin: 0 auto 24px;">${warning}</p>
                  <a href="mailto:rezaderakhshan.dev@gmail.com" style="display: inline-block; font-size: 14px; color: #0066cc; text-decoration: none; margin-top: 12px;">
                    Contact Support
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin-top: 20px; font-size: 11px; color: #aaa;">© ${new Date().getFullYear()} Darj, All rights reserved.</p>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
