const nodemailer = require('nodemailer');

const sendEmail = async options => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "Ashish261088@gmail.com",
            pass: "rrjhgqjycctxztvy"
        }
    })

    const message = {
        from: "Ashish261088@gmail.com",
        to: "Ashishwakde53@gmail.com",
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(message)

}

module.exports = sendEmail;