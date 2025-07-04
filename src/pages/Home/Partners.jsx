import React, { useState } from 'react';
import company1 from '../../assets/company1.jpg';
import company2 from '../../assets/company2.jpg';
import company3 from '../../assets/company3.png';
import company4 from '../../assets/company4.png';

const Partners = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const partners = [
    {
      id: 1,
      logo: company1,
      name: "Tech Leaders",
      description: "Leaders in Programming development",
      category: "Technology"
    },
    {
      id: 2,
      logo: company2,
      name: "Creative Solutions",
      description: "Innovative creative solutions",
      category: "Design"
    },
    {
      id: 3,
      logo: company3,
      name: "EduTech Pro",
      description: "Trusted in Education management",
      category: "Education"
    },
    {
      id: 4,
      logo: company4,
      name: "Green Support",
      description: "Sustainable and eco-friendly Support",
      category: "Sustainability"
    }
  ];

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!form.name || !form.company || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setSubmitted(true);
    setForm({ name: '', company: '', email: '', message: '' });
    setTimeout(() => {
      setModalOpen(false);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We collaborate with industry leaders to bring you the best educational experiences and innovative solutions.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 p-6"
            >
              {/* Logo Container */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain group-hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
                <div className="absolute -top-2 -right-2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                    {partner.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {partner.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {partner.description}
                </p>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Want to Partner With Us?
            </h3>
            <p className="text-gray-600 mb-6">
              Join our network of trusted partners and help shape the future of education.
            </p>
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={() => setModalOpen(true)}
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span>Become a Partner</span>
              </span>
            </button>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                onClick={() => { setModalOpen(false); setError(''); setSubmitted(false); }}
                aria-label="Close"
              >
                &times;
              </button>
              {submitted ? (
                <div className="text-center py-8">
                  <h4 className="text-2xl font-bold text-green-600 mb-2">Thank you!</h4>
                  <p className="text-gray-700">Your partnership request has been received.<br />We'll contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-800 mb-2 text-center">Become a Partner</h4>
                  {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.company}
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.email}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="message"
                    placeholder="Tell us about your partnership goals..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[80px]"
                    value={form.message}
                    onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Partners;
