const nodemailer = require('nodemailer');

// Using CommonJS exports syntax
module.exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse the JSON body
    const { name, email, subject, message } = JSON.parse(event.body);

    // Validate the required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Please provide name, email, and message' })
      };
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'frankyfreaky103@gmail.com',
        pass: process.env.EMAIL_PASS || 'mkco aawp ahit wmpw' // App password
      }
    });

    // Setup email data
    const mailOptions = {
      from: `"Orion Safaris Website" <${process.env.EMAIL_USER || 'frankyfreaky103@gmail.com'}>`,
      to: process.env.EMAIL_TO || 'frankyfreaky103@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'No Subject'}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email', error: error.message })
    };
  }
};
