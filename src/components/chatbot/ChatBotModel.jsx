import { useState, useEffect, useRef } from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";



export const faqData = [
  {
    question: "What services does SkyWorld offer?",
    answer: "We provide airline ticket bookings, visa services, tour packages, and job placement assistance.",
    keywords: ["services", "SkyWorld", "airline ticket bookings", "visa services", "tour packages", "job placement assistance"]
  },
  {
    question: "Where is SkyWorld located?",
    answer: "We are based in [insert location], but our services are available globally.",
    keywords: ["location", "SkyWorld", "global services"]
  },
  {
    question: "How can I contact SkyWorld?",
    answer: "You can reach us at +91 9446004261 or via email at [insert email address].",
    keywords: ["contact", "SkyWorld", "phone number", "email"]
  },
  {
    question: "What are your office hours?",
    answer: "Our office hours are Monday to Saturday, 9:00 AM to 7:00 PM.",
    keywords: ["office hours", "SkyWorld"]
  },
  {
    question: "Does SkyWorld guarantee job placements?",
    answer: "While we strive to connect you with the best opportunities, final placement decisions depend on the employer.",
    keywords: ["job placements", "SkyWorld", "employer"]
  },
  {
    question: "What types of jobs do you offer?",
    answer: "We offer jobs in restaurants, supermarkets, construction, healthcare, and more.",
    keywords: ["job types", "SkyWorld", "restaurants", "supermarkets", "construction", "healthcare"]
  },
  {
    question: "What is included in the 60,000 INR package?",
    answer: "The package includes visa processing, airfare, and service fees.",
    keywords: ["60,000 INR package", "visa processing", "airfare", "service fees"]
  },
  {
    question: "How long does it take to process the visa?",
    answer: "Typically, visa processing takes 7-10 working days.",
    keywords: ["visa processing", "time", "SkyWorld"]
  },
  {
    question: "Can I choose the job I want to apply for?",
    answer: "Yes, you can select from available positions that match your skills.",
    keywords: ["choose job", "apply", "SkyWorld"]
  },
  {
    question: "Is accommodation provided for jobs in Dubai?",
    answer: "Accommodation depends on the employer. Please check the job details for specifics.",
    keywords: ["accommodation", "jobs in Dubai", "employer"]
  },
  {
    question: "What documents are required for visa processing?",
    answer: "A valid passport, recent passport-sized photos, and any job-specific documents.",
    keywords: ["visa processing", "documents", "SkyWorld"]
  },
  {
    question: "Can SkyWorld help with visa extensions?",
    answer: "Yes, we assist with visa extensions based on your needs.",
    keywords: ["visa extensions", "SkyWorld"]
  },
  {
    question: "What happens if my visa application is rejected?",
    answer: "We will guide you on reapplying or exploring alternative options.",
    keywords: ["visa application", "rejected", "SkyWorld"]
  },
  {
    question: "Do you provide airfare discounts?",
    answer: "Yes, we offer competitive rates on airline tickets as part of our services.",
    keywords: ["airfare discounts", "SkyWorld"]
  },
  {
    question: "Is travel insurance included in the package?",
    answer: "Travel insurance is optional and can be arranged upon request.",
    keywords: ["travel insurance", "package", "SkyWorld"]
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, bank transfers, and major credit/debit cards.",
    keywords: ["payment methods", "SkyWorld", "UPI", "bank transfers", "credit cards"]
  },
  {
    question: "Can I pay in installments?",
    answer: "Yes, installment options are available for certain packages. Please contact us for details.",
    keywords: ["installments", "payment", "SkyWorld"]
  },
  {
    question: "What is your refund policy?",
    answer: "Refunds depend on the stage of processing. Contact us for detailed terms and conditions.",
    keywords: ["refund policy", "SkyWorld"]
  },
  {
    question: "Are there hidden charges in your packages?",
    answer: "No, all charges are transparent and clearly mentioned in the package details.",
    keywords: ["hidden charges", "packages", "SkyWorld"]
  },
  {
    question: "Do you provide invoices for payments?",
    answer: "Yes, we provide invoices for all payments made to us.",
    keywords: ["invoices", "payments", "SkyWorld"]
  },
  {
    question: "Can SkyWorld help with group travel bookings?",
    answer: "Absolutely! We provide customized packages for group travel.",
    keywords: ["group travel", "SkyWorld"]
  },
  {
    question: "Do you offer holiday packages?",
    answer: "Yes, we have tour packages tailored for leisure and business travelers.",
    keywords: ["holiday packages", "SkyWorld"]
  },
  {
    question: "What countries do you offer visa services for?",
    answer: "We currently provide visa services for the UAE and other GCC countries.",
    keywords: ["visa services", "countries", "SkyWorld"]
  },
  {
    question: "Can I track my visa application status?",
    answer: "Yes, contact us to receive updates on your visa application status.",
    keywords: ["track visa application", "SkyWorld"]
  },
  {
    question: "Is there a support team available for emergencies?",
    answer: "Yes, our support team is available 24/7 to assist with emergencies.",
    keywords: ["support team", "emergencies", "SkyWorld"]
  },
  {
    question: "What’s the processing time for a Dubai job visa?",
    answer: "The processing time is 7-10 working days after submitting all required documents.",
    keywords: ["Dubai job visa", "processing time", "SkyWorld"]
  },
  {
    question: "Do you help with job applications?",
    answer: "Yes, we assist with job applications and guide you throughout the process.",
    keywords: ["job applications", "assistance", "SkyWorld"]
  },
  {
    question: "Can I change my job after reaching Dubai?",
    answer: "Job changes depend on your employment contract and visa terms. Please consult your employer or contact us for guidance.",
    keywords: ["job change", "Dubai", "employment contract", "SkyWorld"]
  },
  {
    question: "How do I make a payment?",
    answer: "You can pay via UPI, bank transfer, or credit/debit card. For details, contact us at +91 9446004261.",
    keywords: ["payment", "methods", "SkyWorld"]
  }
];

 const calculateSimilarity = (str1, str2) => {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  const intersection = new Set([...s1].filter(char => s2.includes(char)));
  const union = new Set([...s1, ...s2]);
  return intersection.size / union.size;
};

const extractKeywords = (input) => {
  const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'do', 'does', 'i', 'you']);
  return [...new Set(input.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => !stopWords.has(word) && word.length > 2))];
};

const parseMessageText = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">
        {part}
      </a>
    ) : (
      part
    )
  );
};
// components/Message.js
const Message = ({ message }) => (
  <div className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
    <div className={`max-w-3/4 rounded-lg p-3 ${message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-500 text-white'}`}>
      {parseMessageText(message.text)}
    </div>
  </div>
);

const TypingIndicator = () => (
  <div className="flex items-center text-gray-500 mb-4">
    <div className="w-2 h-2 bg-gray-500 rounded-full mr-1 animate-bounce"></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
  </div>
);

// New FAQ Suggestions component
const FAQSuggestions = ({ onQuestionClick }) => {
  const suggestedQuestions = [
    "What services does SkyWorld offer?",
    "Where is SkyWorld located?",
    "How can I contact SkyWorld?",
    "What are your office hours?",
    "Does SkyWorld guarantee job placements?"
  ];

  return (
    <div className="space-y-2 mb-4">
      <p className="text-gray-600 font-medium mb-2">Frequently Asked Questions:</p>
      {suggestedQuestions.map((question, index) => (
        <button
          key={index}
          onClick={() => onQuestionClick(question)}
          className="w-full text-left p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 text-sm border border-gray-200"
        >
          {question}
        </button>
      ))}
    </div>
  );
};

const ChatBotModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ 
    id: 1, 
    text: "Hello! I'm your Sky World assistant. How can I help you plan your trip? Feel free to ask me anything or choose from the suggestions below.", 
    isBot: true 
  }]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFAQClick = async (question) => {
    setHasInteracted(true);
    setMessages(prev => [...prev, { id: messages.length + 1, text: question, isBot: false }]);
    
    const response = generateResponse(question);
    await simulateTyping(response);
    
    setMessages(prev => [...prev, { id: messages.length + 2, text: response, isBot: true }]);
  };

  const findBestMatch = (input) => {
    const inputKeywords = extractKeywords(input);
    let bestMatch = { faq: null, score: 0 };

    faqData.forEach(faq => {
      let score = 0;
      if (faq.question.toLowerCase().includes(input.toLowerCase())) score += 2;

      inputKeywords.forEach(keyword => {
        if (faq.keywords.includes(keyword)) score += 1;
        faq.keywords.forEach(faqKeyword => {
          const similarity = calculateSimilarity(keyword, faqKeyword);
          if (similarity > 0.7) score += similarity;
        });
      });

      const questionSimilarity = calculateSimilarity(input, faq.question);
      score += questionSimilarity * 2;

      if (score > bestMatch.score) bestMatch = { faq, score };
    });

    return bestMatch;
  };

  const generateResponse = (input) => {
    const greetings = ['hello', 'hi', 'hey'];
    const goodbyes = ['bye', 'goodbye', 'see you'];
    const thanks = ['thank', 'thanks'];

    if (greetings.some(greeting => input.toLowerCase().includes(greeting))) return "Hello! How can I help you plan your trip?";
    if (goodbyes.some(goodbye => input.toLowerCase().includes(goodbye))) return "Goodbye! Feel free to return anytime.";
    if (thanks.some(thank => input.toLowerCase().includes(thank))) return "You're welcome! Need anything else?";

    const match = findBestMatch(input);
    if (match.score > 1.5) return match.faq.answer;
    else if (match.score > 0.8) return `${match.faq.answer} Feel free to ask for more details!`;
    else return "I'm not sure about that. Could you rephrase? You can ask about packages, activities, or destinations.";
  };

  const simulateTyping = (response) => {
    setIsTyping(true);
    return new Promise(resolve => {
      const delay = Math.min(Math.max(response.length * 20, 1000), 3000);
      setTimeout(() => {
        setIsTyping(false);
        resolve(response);
      }, delay);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setHasInteracted(true);
    setMessages(prev => [...prev, { id: messages.length + 1, text: inputText, isBot: false }]);
    setInputText('');

    const response = generateResponse(inputText);
    await simulateTyping(response);

    setMessages(prev => [...prev, { id: messages.length + 2, text: response, isBot: true }]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        aria-label="Open chat"
      >
        <IoChatbubbleEllipses className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      {isOpen && (
        <div className="fixed bottom-0 md:bottom-24 right-0 w-full sm:w-[400px] h-[100dvh] md:h-[500px] transform transition-transform duration-300 ease-out z-50">
          <div className="absolute inset-0 bg-gray-200 shadow-lg rounded-t-2xl md:rounded-2xl flex flex-col overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-100 z-10"
              aria-label="Close chat"
            >
              <IoMdClose size={24} />
            </button>

            <div className="bg-blue-600 text-white px-4 py-3 flex items-center">
              <FaRobot className="mr-2 text-xl" />
              <h1 className="text-xl font-semibold">SkyWorldAssist</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              {!hasInteracted && <FAQSuggestions onQuestionClick={handleFAQClick} />}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t bg-white p-4">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={isTyping}
                  className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="hidden md:inline">Send</span>
                  <IoSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black transition-opacity duration-300 z-40 sm:hidden opacity-50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ChatBotModal;