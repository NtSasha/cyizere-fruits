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
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h1 style="color: #4CAF50; text-align: center;">Thank you for your order!</h1>
                    <p style="font-size: 16px; color: #333;">Hi <strong>${userName}</strong>,</p>
                    <p style="font-size: 16px; color: #333;">We have successfully received your order and are preparing it for delivery.</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h2 style="margin-top: 0; color: #333;">Order Details <span style="color: #777; font-size: 16px;">(Order ID: #${orderId})</span></h2>
                        <ul style="list-style-type: none; padding-left: 0;">
                            ${items.map(item => `
                                <li style="padding: 10px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
                                    <span><strong>${item.quantity}x</strong> ${item.name || 'Product'}</span>
                                    <span>RWF ${(item.price * item.quantity).toLocaleString()}</span>
                                </li>
                            `).join('')}
                        </ul>
                        <h3 style="text-align: right; color: #333; margin-bottom: 0;">Total Paid: RWF ${totalAmount.toLocaleString()}</h3>
                    </div>
                    
                    <p style="font-size: 16px; color: #333;">We will contact you shortly regarding delivery.</p>
                    <br>
                    <p style="font-size: 16px; color: #777; margin-bottom: 0;">Best regards,</p>
                    <p style="font-size: 16px; color: #4CAF50; font-weight: bold; margin-top: 5px;">The Cyizere Fruits Team</p>
                </div>
            `
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
