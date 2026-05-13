const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Standard configuration for Gmail
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOrderConfirmation = async (userEmail, userName, orderId, totalAmount, items) => {
    // Only attempt to send if credentials are provided
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("Email credentials not configured. Skipping order confirmation email.");
        return false;
    }

    try {
        const mailOptions = {
            from: `"Cyizere Fruits" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `Order Confirmation - Cyizere Fruits #${orderId}`,
            html: `
                <div style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #fcfcfc; border-radius: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <img src="https://cdn-icons-png.flaticon.com/512/3194/3194591.png" alt="Cyizere Fruits" style="width: 80px; height: 80px;">
                    </div>
                    
                    <h1 style="color: #22c55e; text-align: center; font-size: 28px; margin-bottom: 10px;">Order Confirmed!</h1>
                    <p style="font-size: 18px; color: #1e293b; text-align: center; margin-bottom: 30px;">
                        Thank you so much for choosing <strong>Cyizere Fruits</strong>, ${userName}! 🌿
                    </p>
                    
                    <div style="background-color: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #f0f0f0; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #f8fafc; padding-bottom: 15px; margin-bottom: 20px;">
                            <h2 style="margin: 0; color: #1e293b; font-size: 18px;">Order Details</h2>
                            <span style="color: #64748b; font-size: 14px;">#CF-${orderId.toString().padStart(4, '0')}</span>
                        </div>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            ${items.map(item => `
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #f8fafc; color: #1e293b;">
                                        <span style="font-weight: 600;">${item.quantity}x</span> ${item.name || 'Product'}
                                    </td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #f8fafc; text-align: right; color: #1e293b; font-weight: 700;">
                                        RWF ${(item.price * item.quantity).toLocaleString()}
                                    </td>
                                </tr>
                            `).join('')}
                        </table>
                        
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #f8fafc; text-align: right;">
                            <span style="color: #64748b; font-size: 14px; margin-right: 10px;">Total Amount:</span>
                            <span style="color: #22c55e; font-size: 24px; font-weight: 800;">RWF ${totalAmount.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div style="margin-top: 40px; text-align: center; color: #64748b; font-size: 15px; line-height: 1.6;">
                        <p>We are currently hand-picking your items to ensure maximum freshness.</p>
                        <p>Our delivery partner will contact you shortly to coordinate the drop-off.</p>
                    </div>
                    
                    <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 30px; text-align: center;">
                        <p style="margin-bottom: 5px; color: #1e293b; font-weight: 600;">Questions? We're here to help!</p>
                        <p style="margin-top: 0; font-size: 14px; color: #64748b;">Contact us at info@cyizerefruits.com or +250 788 000 000</p>
                        
                        <div style="margin-top: 20px;">
                            <p style="font-style: italic; color: #22c55e; font-weight: 700; margin-bottom: 0;">Eat Fresh, Stay Healthy!</p>
                            <p style="margin-top: 5px; font-weight: 700; color: #1e293b;">The Cyizere Fruits Team</p>
                        </div>
                    </div>
                </div>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent to: ' + userEmail);
        return true;
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        return false;
    }
};

module.exports = { sendOrderConfirmation };
