import React from "react";
import "./Privacy Policy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-header">
        <h2>Privacy Policy</h2>
        <p>
        At www.accvalo.shop, we are committed to protecting the privacy and security of the information provided by our users. Our approach to safeguarding your data is built on the following principles:
        </p>
      </div>
      <div className="privacy-policy-content">
        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, payment details, etc.</li>
          <li><strong>Automatically Collected Data:</strong> IP address, browser type, and usage data.</li>
          <li><strong>Cookies:</strong> We use cookies to improve user experience and track site usage.</li>
        </ul>

        <h2>2. Use of Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Provide and improve our services.</li>
          <li>Process transactions and customer support requests.</li>
          <li>Ensure security and prevent fraud.</li>
          <li>Send relevant updates and promotional offers (if opted-in).</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>We do not share personal data except in the following cases:</p>
        <ul>
          <li>When required by law.</li>
          <li>With service providers (payment processing, hosting, analytics).</li>
          <li>To protect our legal rights and ensure security.</li>
        </ul>

        <h2>4. Cookies & Tracking</h2>
        <p>
          Our website uses cookies for analytics and personalization. You can
          manage cookie settings via your browser.
        </p>

        <h2>5. Data Protection</h2>
        <p>
          We implement industry-standard security measures to protect your
          personal data. However, no online transmission is 100% secure.
        </p>

        <h2>6. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party sites. We are not
          responsible for their privacy practices and encourage you to review
          their policies.
        </p>

        <h2>7. User Rights</h2>
        <p>
          You have the right to access, correct, or delete your data. Contact us
          at:
          <a href="mailto:accvalorantshop@gmail.com"> accvalorantshop@gmail.com</a>
           to exercise these rights.
        </p>

        <h2>8. Policy Updates</h2>
        <p>
          We may update this Privacy Policy as needed. Changes will be posted on
          this page.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          For any privacy-related concerns, please reach out to us at:
          <a href="mailto:accvalorantshop@gmail.com"> accvalorantshop@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;