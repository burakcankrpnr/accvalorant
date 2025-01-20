import React, { useState } from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const policyData = {
  privacy: {
    title: "Privacy Policy",
    content: `
At www.accvictory.com, we are committed to protecting the privacy and security of the information provided by our users. Our approach to safeguarding your data is built on the following principles:

INFORMATION COLLECTION
We only collect user information that is necessary for processing service requests and ensuring the effective delivery of our products and services. The data collected is carefully selected to meet these specific needs.

DATA PROTECTION MEASURES
We have implemented stringent measures to maintain the confidentiality of user information obtained through www.accvictory.com. These measures are designed to:
•	Secure all data entered on the website for service applications or account updates.
•	Protect user information from being accessed by unauthorized individuals, including external internet users.
•	Provide a reliable and secure infrastructure to safeguard data on our platform.

ACCESS RESTRICTIONS AND NON-DISCLOSURE
•	Access to user data is strictly limited, even for employees of www.accvictory.com, unless it is necessary for operational purposes.
•	User data is never shared with third parties, institutions, or organizations unless explicitly authorized by the user or legally required.
•	In cases where external service providers are engaged for support purposes, we ensure that these organizations adhere to our strict privacy standards.

APPLICABILITY AND SCOPE
Our privacy commitments apply exclusively to the www.accvictory.com platform and the interactions within it.
•	This policy does not extend to external websites accessible via links on www.accvictory.com. Users are encouraged to review the privacy policies and terms of use for these third-party websites independently.
•	www.accvictory.com does not assume responsibility for the privacy practices, data handling, or content quality of third-party sites accessed through advertisements, banners, or external links on our platform.

USER RESPONSIBILITIES
•	Users bear the responsibility for any risks associated with navigating to external websites linked from www.accvictory.com.
•	www.accvictory.com does not verify the accuracy, reliability, or security of content found on third-party websites or their subsequent links.
•	Users are advised to exercise caution and discretion when interacting with external sites.
By using www.accvictory.com, you agree to the terms outlined in this Privacy Policy. Our commitment is to provide a safe and secure environment for your data and interactions. For any questions or concerns, please contact us directly.
    `,
  },
  terms: {
    title: "Terms & Conditions",
    content: `
If you believe that your intellectual property rights have been violated through our website or services, you can report the issue to our Legal Department. Below, we provide guidelines on how to report copyright, trademark, or other intellectual property infringements.

Reporting Copyright Infringement
If you believe your copyrighted work has been used on our website in a manner that infringes your rights, please submit a DMCA Notice to our Designated Copyright Agent at:
Legal Department
AccVictory
Email: support@accvictory.com
Your DMCA Notice must include the following information:
1.	A detailed description of the copyrighted work(s) you claim has been infringed.
2.	Identification of the material that you claim is infringing, including a description of its location on our website.
3.	Your full legal name, mailing address, telephone number, and email address.
4.	The following statement:
“I have a good-faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law. I represent that the information in this DMCA Notice is accurate and, under penalty of perjury, that I am the copyright owner or authorized to act on the copyright owner’s behalf.”
5.	Your electronic or physical signature.

Reporting Trademark Infringement
Our policies prohibit any content that infringes on trademarks. If you are a trademark owner and believe your trademark has been misused on our website, we encourage you to attempt resolution directly with the individual responsible for the content. If resolution is not possible, you may submit a Trademark Complaint to us at:
Legal Department
AccVictory
Email: support@accvictory.com
Your Trademark Complaint should include the following details:
1.	Your full legal name, title, company name, mailing address, telephone number, and email address.
2.	Information about the trademark, including the registration authority, jurisdiction, and registration number.
3.	A description of the infringing material and its location on our website.

Reporting Other Types of Infringement
For complaints involving other intellectual property rights, we are willing to review a limited number of reasonable claims. To report such infringements, please submit an Infringement Complaint to:
Legal Department
AccVictory
Email: support@accvictory.com
Your Infringement Complaint should include:
1.	Your full legal name, mailing address, telephone number, and email address.
2.	A description of your intellectual property, including any registration details (if applicable).
3.	A detailed description of the infringing material, including its location on our website.

We are committed to addressing valid claims promptly and taking appropriate action when necessary. For any further questions or clarifications, please contact our Legal Department.


    `,
  },
  refund: {
    title: "Refund Policy",
    content: `
      English
SALES AGREEMENT
PARTIES
ARTICLE 1
This Distance Sales Agreement (“Agreement”) is made between the “CUSTOMER” who registers on the “www.accvictory.com” “Platform”.
This Agreement and other rules on the Platform outline the terms and conditions governing the services provided or facilitated by “www.accvictory.com” and their usage.
CUSTOMER INFORMATION:
Turkish Identity Number: # 
Name and Surname: # 
Address: # 
Phone Number: # 
Email Address: #
DEFINITIONS
ARTICLE 2
Membership Agreement: This refers to the agreement accepted by Customers prior to entering this distance sales agreement during the membership process.
SUBJECT AND SCOPE OF THE AGREEMENT
ARTICLE 3
This Agreement sets forth the rights and obligations of the parties under the Law and Regulation concerning the sale and delivery of user game accounts described on the product page.
PRODUCT DETAILS AND PRICES
PRODUCT DETAIL: #
 QUANTITY: # 
SUB-TOTAL: #
TOTAL : #  
VAT: #
DELIVERY METHOD
ARTICLE 4
This Agreement takes effect with the Customer's electronic approval and is fulfilled by sending the purchased account details to the Customer's email address.
DELIVERY COSTS AND EXECUTION
ARTICLE 5
No shipping costs apply since the service involves online delivery of a game account.
RIGHT OF WITHDRAWAL
ARTICLE 6
Since the game accounts are delivered immediately after payment, no right of withdrawal applies.
DISPUTE RESOLUTION
ARTICLE 7
Disputes will be resolved by Provincial or District Arbitration Committees.
DEFAULT AND LEGAL CONSEQUENCES
ARTICLE 9
In case of default, legal actions and costs may be incurred.
NOTICES AND EVIDENCE AGREEMENT
ARTICLE 10
Correspondence will be conducted via email, and electronic records are considered binding evidence.
ENFORCEMENT
ARTICLE 11
This Agreement takes effect upon electronic approval or payment.
Türkçe
SATIŞ SÖZLEŞMESİ
TARAFLAR
MADDE 1
Bu Mesafeli Satış Sözleşmesi (“Sözleşme”), “www.accvictory.com” (“Platform”) üzerinden kayıt olan “MÜŞTERİ” ile akdedilmiştir.
Bu Sözleşme ve Platform üzerindeki diğer kurallar, “www.accvictory.com” tarafından sunulan veya aracılık edilen hizmetlerin koşullarını ve kullanım kurallarını düzenler.
MÜŞTERİ BİLGİLERİ:
T.C. Kimlik Numarası: # 
Ad ve Soyad: # 
Adres: # 
Telefon Numarası: # 
E-posta Adresi: #
TANIMLAR
MADDE 2
Üyelik Sözleşmesi: Bu, Müşterilerin mesafeli satış sözleşmesini imzalamadan önce üyelik sürecinde kabul ettikleri sözleşmedir.
SÖZLEŞMENİN KONUSU VE KAPSAMI
MADDE 3
Bu Sözleşme, “www.accvictory.com” Platformu üzerinden Müşteri tarafından elektronik olarak sipariş edilen ve ürün sayfasında belirtilen niteliklere sahip kullanıcı oyun hesaplarının satış ve teslimine ilişkin tarafların hak ve yükümlülüklerini belirler.
ÜRÜN DETAYLARI VE FİYATLAR
ÜRÜN DETAYLARI: #
 MİKTAR: #
ARA TOPLAM: # 
TOPLAM: #
KDV: #
TESLİMAT ŞEKLİ
MADDE 4
Bu Sözleşme, Müşteri'nin elektronik onayı ile yürürlüğe girer ve satın alınan hesap bilgileri Müşteri’nin e-posta adresine gönderilerek yerine getirilir.
TESLİMAT MASRAFLARI VE İCRA
MADDE 5
Hizmetin çevrimiçi bir oyun hesabının teslimini içermesi nedeniyle herhangi bir kargo ücreti yoktur.
CAYMA HAKKI
MADDE 6
Oyun hesapları ödeme sonrasında anında teslim edildiğinden, cayma hakkı bulunmamaktadır.
UYUŞMAZLIKLARIN ÇÖZÜMÜ
MADDE 7
Uyuşmazlıklar, İl veya İlçe Tüketici Hakem Heyetleri tarafından çözümlenecektir.
TEMERRÜT VE HUKUKİ SONUÇLARI
MADDE 9
Temerrüt durumunda, hukuki işlemler başlatılabilir ve masraf ile avukatlık ücretleri talep edilebilir.
BİLDİRİMLER VE DELİL SÖZLEŞMESİ
MADDE 10
Yazışmalar e-posta ile yapılacaktır ve elektronik kayıtlar kesin delil teşkil eder.
YÜRÜRLÜK
MADDE 11
Bu Sözleşme, elektronik onay veya ödeme ile yürürlüğe girer.

    `,
  },
};

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  // Function to handle opening the modal with specific policy content
  const handleModalOpen = (policyKey) => {
    // policyKey: "privacy" | "terms" | "refund"
    const policy = policyData[policyKey];
    setModalTitle(policy.title);
    setModalContent(policy.content);
    setModalOpen(true);
  };

  // Function to close modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <footer className="footer">
      {/* Top Section: Widgets */}
      <div className="widgets-row">
        <div className="container footer-widgets">
          <div className="brand-info">
          <img src="/sds-Photoroom.png" alt="AccValorant Logo" className="logo" />
          <p className="footer-desc">
              AccValo.Shop, provides gaming accounts and products. This website
              is not affiliated with Riot Games or Valorant.
            </p>
            <p className="footer-contact">
  <strong>Email:  </strong> 
  <a href="mailto:contact@accvalorantshop.com" className="email-link">
     contact@accvalorantshop.com
  </a>
</p>

          </div>
          <div className="widget-nav-menu">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/auth?mode=login">Login</a>
              </li>
              <li>
                <a href="/auth?mode=register">Register</a>
              </li>
            </ul>
          </div>
          <div className="widget-nav-menu">
            <h4>Policies</h4>
            <ul>
              <li>
                <button onClick={() => handleModalOpen("privacy")}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleModalOpen("terms")}>
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => handleModalOpen("refund")}>
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>
          <div className="footer-contact-bottom">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-icon">
                <TwitterIcon />
              </a>
              <a href="#" className="social-icon">
                <InstagramIcon />
              </a>
              
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="copyright-row">
        <div className="container">
          <div className="footer-copyright">
            <div className="site-copyright">
              <p>
                © 2025 accvalo.shop, This website is not affiliated with Riot
                Games or Valorant.
              </p>
            </div>
            <div className="footer-menu"></div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalTitle}</h2>
            
            {/* Uzun metinler için bir kapsayıcı ekleyerek scroll ekliyoruz */}
            <div className="modal-text">
              {modalContent}
            </div>

            <button className="modal-close-button" onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;