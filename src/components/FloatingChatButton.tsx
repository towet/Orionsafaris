import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Mail, X } from 'lucide-react';

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<number | null>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set new timeout to detect when scrolling stops
      const timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
      
      setScrollTimeout(timeout);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Social Media Options */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-center gap-3 mb-3">
            {/* Phone */}
            <motion.a
              href="tel:+2547468388812"
              className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Phone className="w-6 h-6" />
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/2547468388812?text=I'm%20interested%20in%20booking%20a%20safari"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-green-400 text-white flex items-center justify-center shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 13.5723 2.37892 15.0741 3.06513 16.3914L2.0332 22.0019L7.76 21.0016C9.02332 21.6293 10.4628 22 12.001 22C17.5238 22 22.001 17.5228 22.001 12C22.001 6.47715 17.5238 2 12.001 2ZM16.3662 15.5505C16.1044 16.2206 15.0022 16.8094 14.2222 16.9451C13.6564 17.0424 12.9056 17.1174 10.4506 16.0488C7.30013 14.6729 5.27478 11.4749 5.14142 11.2989C5.01484 11.1229 4.00098 9.77054 4.00098 8.37597C4.00098 6.98139 4.71549 6.30186 4.99549 6.00186C5.22835 5.75715 5.60356 5.64285 5.96099 5.64285C6.09099 5.64285 6.20784 5.64925 6.31356 5.65455C6.59356 5.66715 6.73356 5.68139 6.91892 6.07715C7.14642 6.56568 7.64099 7.96025 7.70356 8.09683C7.76613 8.2334 7.82871 8.41877 7.74099 8.59825C7.65913 8.78362 7.58706 8.86568 7.45049 9.02649C7.31392 9.18731 7.18442 9.31104 7.04784 9.47775C6.92249 9.62104 6.78077 9.77715 6.93892 10.0472C7.09706 10.3114 7.64099 11.2114 8.44642 11.9334C9.48163 12.8587 10.3155 13.1549 10.6106 13.2805C10.8345 13.3741 11.1006 13.3549 11.2622 13.1865C11.4651 12.9741 11.7145 12.6229 11.9684 12.2776C12.1451 12.0364 12.3684 12.0018 12.6028 12.0953C12.8433 12.1829 14.2339 12.8699 14.4966 13.0018C14.7594 13.1338 14.9372 13.1976 15.0006 13.3114C15.0631 13.4251 15.0631 14.0114 14.8006 14.6805L16.3662 15.5505Z" />
              </svg>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:orion.safarisafrica@gmail.com?subject=Safari%20Inquiry"
              className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-6 h-6" />
            </motion.a>

            {/* Close Button */}
            <motion.button
              onClick={toggleChat}
              className="w-14 h-14 rounded-full bg-amber-800 text-white flex items-center justify-center shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Main Chat Button with Online Indicator and Label */}
      <div className="flex flex-col items-end">
        {/* Talk to us now - only visible when scrolling */}
        <AnimatePresence>
          {isScrolling && (
            <motion.div 
              className="bg-amber-600 text-white px-4 py-2 rounded-lg shadow-md mb-2 flex items-center"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm font-medium mr-2">Talk to us now</span>
              <div className="relative">
                <div className="absolute -right-1 -top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={toggleChat}
          className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="w-7 h-7" />
          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingChatButton;
