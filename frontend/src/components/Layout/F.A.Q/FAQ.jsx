import React, { useState, useEffect, useRef } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "What We Do ?",
    answer:
      "AccValo.Shop offer a wide range of digital goods, focusing on game accounts. Our platform ensures a quick, hassle-free purchase with exceptional customer support. AccVictory is a secure online platform where users can buy game accounts and digital goods.",
  },
  {
    question: "Are The Products Original ?",
    answer:
      "All of our products are original. You can easily connect to online servers. If you have any problems you can reach our support team 24/7.",
  },
  {
    question: "How Are The Orders Delivered ?",
    answer:
      "Once you register on our website and place an order, you can track the status of your order in the 'My Orders' section. When you receive your order, click 'View Order' to access the product details. Our average delivery time is between 1-2 hour.",
  },
  {
    question: "How Can I Make A Order ?",
    answer:
      "You can sign up and buy our products with credit/debit cards or other similar payment methods.",
  },
  {
    question: "Is There A Product Warranty ?",    
    answer:
      "Absolutely, all our products come with a 'first login' guarantee. Each product undergoes thorough verification by our team before delivery. Should any issues arise, our support team is ready to provide comprehensive assistance.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqRef = useRef(null); // FAQ container'ı referansı

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // "Click outside" algılama
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (faqRef.current && !faqRef.current.contains(event.target)) {
        setActiveIndex(null); // Eğer dışarı tıklanırsa tüm akordeonları kapat
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="faq-section" ref={faqRef}>
      <h2 className="faq-title">F.A.Q.</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            {...item}
            isOpen={activeIndex === index}
            onClick={() => toggleAccordion(index)}
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
