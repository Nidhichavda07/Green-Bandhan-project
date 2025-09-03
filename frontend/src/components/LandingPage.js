import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import { FaLeaf, FaHandsHelping, FaRecycle } from 'react-icons/fa';

/* ---------------------- Accordion Item ---------------------- */
const AccordionItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg shadow-sm bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600/30"
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className="text-xl leading-none select-none">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-5 py-3 text-gray-600 border-t">
          {answer}
        </div>
      )}
    </div>
  );
};

/* ---------------------- Landing Page ---------------------- */
const LandingPage = () => {
  const [page, setPage] = useState('landing'); // landing, register, login

  if (page === 'register') return <Register goBack={() => setPage('landing')} />;
  if (page === 'login') return <Login goBack={() => setPage('landing')} />;

  const faqItems = [
    {
      question: '🌱 How can I report a waste issue?',
      answer:
        "Register, go to 'Report Issue', drop a pin on the map, add details/photos, and submit. You'll get live status updates."
    },
    {
      question: '🤝 How do I join an NGO campaign?',
      answer:
        "Open the Campaigns section, choose an active drive, and click 'Participate'. You'll receive event time, venue, and coordinator info."
    },
    {
      question: '💚 Can I donate items through GreenBandhan?',
      answer:
        'Yes. Use Donations to list items, pick a pickup/drop option, and track when an NGO/volunteer collects them.'
    },
    {
      question: '📍 How are nearby parks shown?',
      answer:
        'We use map integration to show green spaces near you with oxygen ratings, features, and maintenance feedback.'
    }
  ];
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <span className="text-2xl font-bold text-green-700">GreenBandhan</span>
              <div className="hidden md:flex space-x-4">
                <a href="#home" className="text-gray-700 hover:text-green-700">Home</a>
                <a href="#about" className="text-gray-700 hover:text-green-700">About</a>
                <a href="#features" className="text-gray-700 hover:text-green-700">Features</a>
                <a href="#cta" className="text-gray-700 hover:text-green-700">Get Started</a>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setPage('login')}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
              >
                Login
              </button>
              <button
                onClick={() => setPage('register')}
                className="bg-white text-green-700 px-4 py-2 rounded border border-green-700 hover:bg-green-100 transition"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-green-600 to-green-400 text-white py-32 text-center">

  <h1 className="text-5xl font-bold mb-4">Welcome to Green Bandhan</h1>

  {/* Slogan in English + Hindi */}
  <p className="text-2xl font-semibold mb-2">
     Connected to Nature, Committed to Tomorrow
  </p>
  <p className="text-lg font-medium mb-6">
    प्रकृति से जुड़ाव, कल के लिए संकल्प
  </p>

  {/* One-line project description */}
  <p className="text-lg mb-8 max-w-2xl mx-auto">
    A community-driven platform where citizens, NGOs, and volunteers come together 
    to create cleaner cities, greener parks, and a sustainable tomorrow.
  </p>

  <div className="flex justify-center space-x-6">
    <button
      onClick={() => setPage('register')}
      className="bg-white text-green-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
    >
      Register
    </button>
    <button
      onClick={() => setPage('login')}
      className="bg-white text-green-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
    >
      Login
    </button>
  </div>
</section>

    

      {/* About Section */}
      <section id="about" className="py-20 max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-700">About Green Bandhan</h2>
        <p className="text-gray-700 mb-4">
          Green Bandhan is a platform for citizens, NGOs, volunteers, and recyclers to collaborate
          on environmental campaigns, track waste, participate in green initiatives, and make a positive impact.
        </p>
        <p className="text-gray-700">
          Report waste issues, join local cleanups, donate items, or give feedback on parks. Everything you need to make a real difference.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-700">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
              <FaLeaf className="mx-auto text-green-700 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Report Issues</h3>
              <p className="text-gray-600">Submit waste or recycling issues in your area and track their resolution.</p>
            </div>
            <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
              <FaHandsHelping className="mx-auto text-green-700 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Join Campaigns</h3>
              <p className="text-gray-600">Participate in environmental campaigns organized by NGOs or communities.</p>
            </div>
            <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
              <FaRecycle className="mx-auto text-green-700 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Donations & Volunteering</h3>
              <p className="text-gray-600">Donate items or contribute as a volunteer to local initiatives and projects.</p>
            </div>
          </div>
        </div>
      </section>

 {/* Accordion Section (FAQ) */}
      <section id="faq" className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-700">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <AccordionItem key={idx} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>


      {/* Call to Action Section */}
      <section id="cta" className="py-20 text-center bg-green-50">
        <h2 className="text-3xl font-bold mb-6 text-green-700">Get Started Today</h2>
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => setPage('register')}
            className="bg-green-700 text-white font-semibold px-6 py-3 rounded shadow hover:bg-green-800 transition"
          >
            Register
          </button>
          <button
            onClick={() => setPage('login')}
            className="bg-green-700 text-white font-semibold px-6 py-3 rounded shadow hover:bg-green-800 transition"
          >
            Login
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 text-center">
        &copy; 2025 Green Bandhan. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
