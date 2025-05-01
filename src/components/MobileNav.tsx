import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToElement } from '../utils/animations';
import logo from '../assets/logo.png';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string; isRouter?: boolean }[];
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, links }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <img src={logo} alt="Orion Safaris Logo" className="h-16" />
                </div>
                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-stone-500" />
                </motion.button>
              </div>
              <nav className="flex flex-col space-y-4">
                {links.map((link, index) => 
                  link.isRouter ? (
                    <Link
                      key={index}
                      to={link.href}
                      className="py-2 text-stone-700 hover:text-amber-600 transition-colors"
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <motion.a
                      key={index}
                      href={link.href}
                      className="py-2 text-stone-700 hover:text-amber-600 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToElement(link.href.substring(1));
                        onClose();
                      }}
                    >
                      {link.label}
                    </motion.a>
                  )
                )}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
