const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files (adjust path to parent public folder)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve HTML on GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'My-portfolio.html'));
});

// POST route for contact form
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jaiminprajapati0001@gmail.com',
      pass: 'Jaimin@2011' // ⚠️ DO NOT keep this in code for production
    }
  });

  let mailOptions = {
    from: email,
    to: 'jaiminprajapati0001@gmail.com',
    subject: `Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Failed to send message' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

