import React from "react";
import "./Privacy Policy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p><strong>Dear User,</strong></p>
      <p>
        By accessing or using this website, you agree to the terms of this Privacy Policy. 
        We are committed to protecting your privacy and ensuring that your personal data is handled securely and responsibly.
      </p>

      <h2>1. Data Collection</h2>
      <p>
        We collect personal information that you provide when registering on our website, making a purchase, 
        subscribing to our newsletter, or contacting us. This information may include your name, email address, 
        payment details, and other relevant data necessary to provide our services.
      </p>

      <h2>2. Use of Information</h2>
      <p>
        The information we collect is used to process transactions, improve our services, provide customer 
        support, and send you updates or promotional offers (only if you opt-in). We do not sell or share 
        your personal data with third parties except where necessary for transaction processing or as required by law.
      </p>

      <h2>3. Data Protection & Security</h2>
      <p>
        We implement industry-standard security measures to protect your personal data from unauthorized 
        access, alteration, or loss. All transactions are encrypted using SSL (Secure Socket Layer) technology.
      </p>

      <h2>4. Sharing of Information</h2>
      <p>
        We do not share your data with third parties except in the following cases:
      </p>
      <ul>
        <li>To process transactions through banks or payment processors.</li>
        <li>When required by legal or regulatory authorities.</li>
        <li>To enforce our Terms and Conditions or protect user rights.</li>
      </ul>

      <h2>5. Cookies & Tracking</h2>
      <p>
        We use cookies to enhance your experience on our website. Cookies help us analyze site traffic, 
        customize content, and improve usability. You can manage cookie preferences through your browser settings.
      </p>

      <h2>6. User Rights</h2>
      <p>
        You have the right to request access, correction, or deletion of your personal data. If you wish to 
        exercise these rights, please contact us via email at 
        <a href="mailto:accvalorantshop@gmail.com"> accvalorantshop@gmail.com</a>.
      </p>

      <h2>7. Changes to this Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or 
        legal requirements. Any modifications will be effective immediately upon posting on our website.
      </p>

      <p className="footer-note">
        If you have any concerns about privacy or data security, please reach out to us at 
        <a href="mailto:accvalorantshop@gmail.com"> accvalorantshop@gmail.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
