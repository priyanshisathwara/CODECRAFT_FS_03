import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="tos-container">
      <h1>Terms of Service</h1>
      <p>Last Updated: July 21, 2025</p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Tradivo, you agree to comply with and be bound by these Terms of Service. 
          If you do not agree with these terms, please do not use our website.
        </p>
      </section>

      <section>
        <h2>2. Use of Our Website</h2>
        <p>
          Tradivo offers a platform for purchasing fashion and lifestyle products. 
          You must provide accurate and complete information when creating an account or placing orders.
        </p>
      </section>

      <section>
        <h2>3. User Responsibilities</h2>
        <ul>
          <li>Keep your account information secure</li>
          <li>Use this website only for lawful purposes</li>
          <li>Respect the rights and property of Tradivo and others</li>
        </ul>
      </section>

      <section>
        <h2>4. Orders and Payments</h2>
        <p>
          Orders are confirmed only after successful payment. 
          Refunds and exchanges are subject to our Return Policy. 
          Please review policies carefully before making a purchase.
        </p>
      </section>

      <section>
        <h2>5. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to our services at any time for any reason, 
          including violations of these terms.
        </p>
      </section>

      <section>
        <h2>6. Limitation of Liability</h2>
        <p>
          Tradivo is not liable for any indirect or incidental damages related to your use of our website, 
          including loss of data or profits.
        </p>
      </section>

      <section>
        <h2>7. Changes to Terms</h2>
        <p>
          We may update these Terms of Service at any time. 
          Updates will be posted on this page with a revised date. 
          Continued use of Tradivo means you accept the revised terms.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>
          For any questions regarding these Terms of Service, please contact us at: <br />
          <strong>Email:</strong> support@tradivo.com
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
