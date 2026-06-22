const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify connection on startup
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email config error:', error.message);
  } else {
    console.log('✅ Email server ready');
  }
});

const emailTemplates = {
  diagnosticWelcome: (name) => ({
    subject: '🎯 Welcome to Dakhilaa - Start Your Free Diagnostic Test',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #FF6B35;">Welcome to Dakhilaa, ${name}!</h2>
        <p>Your free 15-minute diagnostic test is ready. Discover exactly where you stand and what to fix.</p>
        <p><strong>What you'll get:</strong></p>
        <ul>
          <li>Your exact weak topics in Physics, Chemistry & Math</li>
          <li>College predictor with branch-wise cutoffs</li>
          <li>Personalized improvement strategy</li>
        </ul>
        <p>
          <a href="${process.env.DIAGNOSTIC_TEST_URL}"
             style="background:#FF6B35;color:white;padding:12px 24px;border-radius:5px;text-decoration:none;display:inline-block;margin-top:10px;">
            Start Test Now →
          </a>
        </p>
        <p style="color:#888;margin-top:20px;">Questions? Email us: hello@dakhilaa.com</p>
      </div>
    `,
  }),

  diagnosticResults: (name, weakTopics, score) => ({
    subject: '📊 Your Dakhilaa Diagnostic Results Are Ready!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #FF6B35;">Your Diagnostic Results, ${name}</h2>
        <p><strong>Total Score:</strong> ${score}/300</p>
        <p><strong>Your Weak Topics:</strong></p>
        <ul>
          ${weakTopics.map((topic) => `<li>${topic}</li>`).join('')}
        </ul>
        <p>Now it's time to fix these topics and improve your score by 20–40 marks in 3–4 weeks.</p>
        <p>
          <a href="${process.env.UPGRADE_URL}"
             style="background:#FF6B35;color:white;padding:12px 24px;border-radius:5px;text-decoration:none;display:inline-block;margin-top:10px;">
            Upgrade to Premium Plans →
          </a>
        </p>
      </div>
    `,
  }),

  paymentConfirmation: (name, planType, amount) => ({
    subject: '✅ Payment Successful - Welcome to Dakhilaa Premium',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #10B981;">Payment Confirmed! 🎉</h2>
        <p>Hello ${name},</p>
        <p>Your payment of <strong>₹${amount}</strong> for the <strong>${planType}</strong> plan has been confirmed.</p>
        <p>Your account is now active and you have unlimited access to all premium features.</p>
        <p>
          <a href="${process.env.DASHBOARD_URL}"
             style="background:#10B981;color:white;padding:12px 24px;border-radius:5px;text-decoration:none;display:inline-block;margin-top:10px;">
            Go to Dashboard →
          </a>
        </p>
      </div>
    `,
  }),

  weeklyProgressReport: (name, weekScore, improvements) => ({
    subject: '📈 Your Weekly Progress Report',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #FF6B35;">Weekly Progress Report</h2>
        <p>Hi ${name},</p>
        <p><strong>This Week's Score:</strong> ${weekScore}/300</p>
        <p><strong>Improvements this week:</strong></p>
        <ul>
          ${improvements.map((imp) => `<li>${imp}</li>`).join('')}
        </ul>
        <p>Keep up the great work! Continue practicing on weak topics.</p>
      </div>
    `,
  }),
};

/**
 * Send an email
 * @param {string} to - Recipient email
 * @param {object} template - { subject, html }
 */
async function sendEmail(to, template) {
  try {
    await transporter.sendMail({
      from: `"Dakhilaa" <${process.env.EMAIL_USER}>`,
      to,
      subject: template.subject,
      html: template.html,
    });
  } catch (error) {
    console.error('Email sending error:', error.message);
    // Don't throw - email failures shouldn't break API responses
  }
}

module.exports = { transporter, emailTemplates, sendEmail };
