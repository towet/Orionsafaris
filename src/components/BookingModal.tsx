import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  safariPackage?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, safariPackage = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '1',
    package: safariPackage,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Safari Booking Request: ${formData.package || 'General Inquiry'}`,
          message: `
            Booking Details:
            ----------------
            Name: ${formData.name}
            Email: ${formData.email}
            Phone: ${formData.phone}
            Requested Date: ${formData.date}
            Number of Guests: ${formData.guests}
            Safari Package: ${formData.package}
            
            Additional Message:
            ${formData.message}
          `
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-17147796767/PLACEHOLDER_CONVERSION_LABEL', // IMPORTANT: Replace PLACEHOLDER_CONVERSION_LABEL with your actual conversion label from Google Ads
            'event_category': 'Safari Booking',
            'event_label': formData.package || 'General Inquiry', // Tracks which package was booked or if it's a general inquiry
            // 'value': 50.0, // Optional: You can assign a monetary value to this conversion
            // 'currency': 'USD' // Optional: Specify the currency if you add a value
          });
        }
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          guests: '1',
          package: safariPackage,
          message: ''
        });
        // Close modal after 3 seconds on success
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date in YYYY-MM-DD format for min date input
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-amber-600 px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
              <h2 className="text-xl font-serif text-white">Book Your Safari Adventure</h2>
              <button
                onClick={onClose}
                className="text-white hover:bg-amber-700 p-1 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Full Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <span>Preferred Date*</span>
                      </div>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={minDate}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-amber-600" />
                        <span>Number of Guests*</span>
                      </div>
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                      <option value="11+">11+ Guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Safari Package</label>
                  <input
                    type="text"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Which safari package are you interested in?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Additional Information</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Tell us more about your preferences, questions, or special requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-medium text-white transition-all ${
                    isSubmitting ? 'bg-amber-400' : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? 'Sending...' : 'Book Now'}
                    {isSubmitting && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </span>
                </button>

                {submitStatus === 'success' && (
                  <motion.div
                    className="p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Booking request sent successfully! We'll contact you shortly to confirm your safari adventure.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span>There was an error sending your booking request. Please try again or contact us directly.</span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
