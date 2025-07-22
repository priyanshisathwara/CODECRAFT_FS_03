import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p>Effective Date: July 21, 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to Tradivo. We value your trust and are committed to protecting your personal information. 
          This Privacy Policy explains how we collect, use, and safeguard your data when you shop with us.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>We may collect the following personal information:</p>
        <ul>
          <li>Your name, email address, and contact details</li>
          <li>Billing and shipping information</li>
          <li>Your order history and preferences</li>
          <li>Optional location data (for shipping purposes)</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>Your information helps us to:</p>
        <ul>
          <li>Process orders and manage your account</li>
          <li>Communicate with you about your orders and offers</li>
          <li>Improve our website and your shopping experience</li>
          <li>Comply with applicable laws</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Sharing</h2>
        <p>
          We do not sell your personal data. We only share your information with trusted third parties 
          (such as payment gateways and delivery partners) necessary for fulfilling your orders.
        </p>
      </section>

      <section>
        <h2>5. Data Security</h2>
        <p>
          We use appropriate technical and organizational measures to protect your personal data 
          from unauthorized access, misuse, or disclosure.
        </p>
      </section>

      <section>
        <h2>6. Your Rights</h2>
        <p>
          You may request to access, update, or delete your information at any time. 
          You may also unsubscribe from marketing communications through the links provided.
        </p>
      </section>

      <section>
        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy as needed. Any changes will be posted on this page with the updated effective date.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at: <br />
          <strong>Email:</strong> support@tradivo.com
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
