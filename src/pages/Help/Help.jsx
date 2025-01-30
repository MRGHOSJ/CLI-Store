import React, { useState } from "react";
import "./Help.css";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample FAQ data
  const faqs = [
    { question: "How do I reset my password?", answer: "Go to Settings > Account > Reset Password." },
    { question: "How do I switch between dark and light mode?", answer: "Go to Settings and toggle the dark mode switch." },
    { question: "How do I report a bug?", answer: "Click on 'Contact Support' below and describe the issue." },
    { question: "Can I change my username?", answer: "Currently, username changes are not supported." },
  ];

  // Filter FAQs based on search input
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="Help">
      <h1>Help & Support</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for help..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="help-search"
      />

      {/* FAQ Section */}
      <div className="faq-section">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))
        ) : (
          <p>No results found. Try searching for something else.</p>
        )}
      </div>

      {/* Contact Support */}
      <button className="contact-support">Contact Support</button>
    </div>
  );
};

export default Help;
