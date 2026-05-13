const { sendOrderConfirmation } = require('../utils/emailService');
const nodemailer = require('nodemailer');

// Reuse transporter logic or define a dedicated one for contact
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Send email to admin
        const mailOptions = {
            from: `"Cyizere Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Admin receives the message
            subject: `New Contact Message from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #4CAF50;">New Message Received</h2>
                    <p><strong>From:</strong> ${name} (${email})</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="font-size: 12px; color: #777;">This message was sent from the Cyizere Fruits contact form.</p>
                </div>
            `
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
        } else {
            console.warn("Email credentials not configured. Contact form message logged to console.");
            console.log("Contact Message:", { name, email, message });
        }

        res.status(200).json({ success: true, message: "Message sent successfully" });

    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
};

module.exports = { submitContactForm };
