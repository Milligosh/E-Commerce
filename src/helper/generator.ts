import crypto from'crypto'
import nodemailer from 'nodemailer'
 export class GenericHelper{
    static generateId():string{
        return crypto.randomUUID().replace(/-/g, "")
    }
    static generateComplexPassword(length = 12): string {
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        
        const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
        
        let password = '';
        
        // Ensure at least one character from each set
        password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
        password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
        password += numberChars[Math.floor(Math.random() * numberChars.length)];
        password += specialChars[Math.floor(Math.random() * specialChars.length)];
        
        // Fill the rest of the password
        for (let i = password.length; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars[randomIndex];
        }
        
        // Shuffle the password
        return password.split('').sort(() => 0.5 - Math.random()).join('');
    }
    static async sendCredentialsEmail(email: string, password: string): Promise<void> {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your New Account Credentials",
      text: `Welcome to Millijoule's App! Your account has been created. 
             Email: ${email}
             Password: ${password}
             
             You can now log in with these credentials.`,
      html: `<p>Welcome! Your Admin account has been created.</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Password:</strong> ${password}</p>
             <p>You can now log in with these credentials.</p>`,
        };
    
        await transporter.sendMail(mailOptions);
    }
 }

