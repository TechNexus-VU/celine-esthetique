const { db } = require('../config/firebaseConfig');
const emailService = require('../services/emailService');
const whatsappService = require('../services/whatsappService');

exports.scheduleReminder = async (req, res) => {
    try {
        const { clientName, clientEmail, phoneNumber, serviceType, appointmentDate } = req.body;

        const reminderData = {
            clientName,
            clientEmail,
            phoneNumber,
            serviceType,
            appointmentDate,
            reminderDays: [1, 3, 7],
            status: "active",
            createdAt: new Date()
        };

        const emailSent = await emailService.sendLuxuryEmail(
            clientEmail,
            "Celine Appointment Confirmed",
            clientName,
            `<p>Your ${serviceType} is booked. We will send reminders on day 1, 3, and 7.</p>`,
            "Maintain your glow!"
        );

        const waMessage = `Your appointment for ${serviceType} at Celine Esthetique is confirmed for ${appointmentDate}.`;
        const waStatus = await whatsappService.sendWhatsAppMessage(phoneNumber, clientName, waMessage);

        try {
            await db.collection('reminders').add(reminderData);

            res.status(201).json({
                success: true,
                status: "Success",
                communication: {
                    email: emailSent ? "Sent" : "Failed",
                    whatsapp: waStatus.success ? "Simulated" : "Error"
                },
                message: "Universal reminder system triggered."
            });

        } catch (dbError) {
            res.status(200).json({
                success: true,
                mode: "Simulation",
                communication: "Triggered"
            });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};