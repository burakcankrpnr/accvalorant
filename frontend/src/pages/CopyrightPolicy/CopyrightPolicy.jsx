import React from "react";
import "./CopyrightPolicy.css";

const CopyrightPolicy = () => {
  return (
    <div className="copyright-policy-container">
      <div className="copyright-policy-header">
        <h2>COPYRIGHT POLICY</h2>
        <p>
          If you believe that your intellectual property rights have been
          violated through our website or services, you can report the issue to
          our Legal Department. Below, we provide guidelines on how to report
          copyright, trademark, or other intellectual property infringements.
        </p>
      </div>

      <div className="copyright-policy-content">
        {/* REPORTING COPYRIGHT INFRINGEMENT */}
        <h2>REPORTING COPYRIGHT INFRINGEMENT</h2>
        <p>
          If you believe your copyrighted work has been used on our website in a
          manner that infringes your rights, please submit a DMCA Notice to our
          Designated Copyright Agent at:
        </p>
        <ul>
          <li>
            <strong>AccValoSHOP Legal Department</strong>
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:accvalorantshop@gmail.com">
              accvalorantshop@gmail.com
            </a>
          </li>
        </ul>
        <p>Your DMCA Notice must include the following information:</p>
        <ol>
          <li>
            A detailed description of the copyrighted work(s) you claim has been
            infringed.
          </li>
          <li>
            Identification of the material that you claim is infringing,
            including a description of its location on our website.
          </li>
          <li>
            Your full legal name, mailing address, telephone number, and email
            address.
          </li>
          <li>
            The following statement:
            <br />
            <em>
              “I have a good-faith belief that the use of the material is not
              authorized by the copyright owner, its agent, or the law. I
              represent that the information in this DMCA Notice is accurate
              and, under penalty of perjury, that I am the copyright owner or
              authorized to act on the copyright owner’s behalf.”
            </em>
          </li>
          <li>Your electronic or physical signature.</li>
        </ol>

        {/* REPORTING TRADEMARK INFRINGEMENT */}
        <h2>REPORTING TRADEMARK INFRINGEMENT</h2>
        <p>
          Our policies prohibit any content that infringes on trademarks. If you
          are a trademark owner and believe your trademark has been misused on
          our website, we encourage you to attempt resolution directly with the
          individual responsible for the content. If resolution is not possible,
          you may submit a Trademark Complaint to us at:
        </p>
        <ul>
          <li>
            <strong>AccValoSHOP Legal Department</strong>
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:accvalorantshop@gmail.com">
              accvalorantshop@gmail.com
            </a>
          </li>
        </ul>
        <p>Your Trademark Complaint should include the following details:</p>
        <ol>
          <li>
            Your full legal name, title, company name, mailing address,
            telephone number, and email address.
          </li>
          <li>
            Information about the trademark, including the registration
            authority, jurisdiction, and registration number.
          </li>
          <li>
            A description of the infringing material and its location on our
            website.
          </li>
        </ol>

        {/* REPORTING OTHER TYPES OF INFRINGEMENT */}
        <h2>REPORTING OTHER TYPES OF INFRINGEMENT</h2>
        <p>
          For complaints involving other intellectual property rights, we are
          willing to review a limited number of reasonable claims. To report
          such infringements, please submit an Infringement Complaint to:
        </p>
        <ul>
          <li>
            <strong>AccValoSHOP Legal Department</strong>
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:accvalorantshop@gmail.com">
              accvalorantshop@gmail.com
            </a>
          </li>
        </ul>
        <p>Your Infringement Complaint should include:</p>
        <ol>
          <li>
            Your full legal name, mailing address, telephone number, and email
            address.
          </li>
          <li>
            A description of your intellectual property, including any
            registration details (if applicable).
          </li>
          <li>
            A detailed description of the infringing material, including its
            location on our website.
          </li>
        </ol>

        <p>
          We are committed to addressing valid claims promptly and taking
          appropriate action when necessary. For any further questions or
          clarifications, please contact our Legal Department.
        </p>
      </div>
    </div>
  );
};

export default CopyrightPolicy;
