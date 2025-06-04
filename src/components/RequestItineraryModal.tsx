import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageCircle } from 'lucide-react';

interface RequestItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
}

const RequestItineraryModal: React.FC<RequestItineraryModalProps> = ({ isOpen, onClose, packageName }) => {
  if (!isOpen) return null;
  
  const getPackageDescription = () => {
    if (packageName === 'five-day-top' || packageName === 'five-day-package') {
      return '5 Days Lake Manyara, Serengeti & Ngorongoro Safari';
    } else if (packageName === 'four-day-card') {
      return '4 Days Serengeti & Ngorongoro Mid-Range Safari';
    } else if (packageName === 'serengeti-main') {
      return '4 Days Serengeti & Ngorongoro Mid-Range Safari';
    } else if (packageName.includes('migration')) {
      return 'Great Migration Safari';
    } else {
      return 'Safari Package';
    }
  };
  
  const packageDescription = getPackageDescription();
  
  const whatsappMessage = encodeURIComponent(`Hello, I would like to request a detailed itinerary for the ${packageDescription}. Please send me more information. Thank you!`);
  const emailSubject = encodeURIComponent(`Itinerary Request: ${packageDescription}`);
  const emailBody = encodeURIComponent(`Hello, I would like to request a detailed itinerary for the ${packageDescription}. Please send me more information. Thank you!`);
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <motion.div 
          className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-stone-600" />
          </button>
          
          {/* Header */}
          <div className="bg-amber-600 py-6 px-6 text-white">
            <h3 className="text-xl font-medium">Request Itinerary</h3>
            <p className="text-amber-100 mt-1">{packageDescription}</p>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-6">
            <p className="text-stone-700">
              Choose your preferred way to receive the detailed itinerary for this safari:
            </p>
            
            <div className="space-y-4">
              {/* WhatsApp Option */}
              <a 
                href={`https://wa.me/2547468388812?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white border-2 border-green-500 rounded-xl hover:bg-green-50 transition-colors"
                onClick={() => {
                  if (typeof (window as any).gtag === 'function') {
                    (window as any).gtag('event', 'conversion', {
                      'send_to': 'AW-17147796767/PLACEHOLDER_ITINERARY_CONVERSION_LABEL', // IMPORTANT: Replace with your actual conversion label
                      'event_category': 'Itinerary Request',
                      'event_label': `${packageDescription} - WhatsApp`
                    });
                  }
                }}
              >
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <div className="font-medium text-gray-800 text-lg">WhatsApp</div>
                  <div className="text-gray-500">Get itinerary via chat</div>
                </div>
              </a>
              
              {/* Email Option */}
              <a 
                href={`mailto:orion.safarisafrica@gmail.com?subject=${emailSubject}&body=${emailBody}`}
                className="flex items-center gap-4 p-4 bg-white border-2 border-blue-500 rounded-xl hover:bg-blue-50 transition-colors"
                onClick={() => {
                  if (typeof (window as any).gtag === 'function') {
                    (window as any).gtag('event', 'conversion', {
                      'send_to': 'AW-17147796767/PLACEHOLDER_ITINERARY_CONVERSION_LABEL', // IMPORTANT: Replace with your actual conversion label
                      'event_category': 'Itinerary Request',
                      'event_label': `${packageDescription} - Email`
                    });
                  }
                }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <div className="font-medium text-gray-800 text-lg">Email</div>
                  <div className="text-gray-500">Get itinerary via email</div>
                </div>
              </a>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 bg-stone-50 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RequestItineraryModal;
