import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "How does the buying process work?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a sapien in lectus commodo porta.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We support multiple payment options such as PayPal, credit card, and various cryptocurrencies.",
  },
  {
    question: "Is there any guarantee for safety and reliability?",
    answer:
      "Yes, we take security very seriously. All transactions are encrypted, and we have a refund policy under certain conditions.",
  },
  {
    question: "How long does it take to receive my account details?",
    answer:
      "Typically, you'll receive the details via email within a few minutes after purchase. In rare cases, it may take up to 24 hours.",
  },
  {
    question: "How do I contact support?",    
    answer:
      "You can reach us 24/7 via live chat, email, or by creating a ticket in our support center.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null); // Açık öğeyi takip eden durum

  const toggleAccordion = (index) => {
    // Tıklanan öğe zaten açıksa kapat, değilse aç
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">F.A.Q.</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            {...item}
            isOpen={activeIndex === index}
            onClick={() => toggleAccordion(index)} // Tıklama işlemi
          />
        ))}
      </div>
    </section>
  );
};

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`accordion-item ${isOpen ? "open" : ""}`}>
      <div className="accordion-header" onClick={onClick}>
        <h3>{question}</h3>
        <span className="accordion-icon">{isOpen ? "-" : "+"}</span>
      </div>
      <div
        className="accordion-content"
        style={{ maxHeight: isOpen ? "500px" : "0px" }}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default FAQ;
