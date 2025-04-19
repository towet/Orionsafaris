import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Mountain,
  Droplets,
  DollarSign,
  Compass,
  CheckCircle,
  XCircle
} from 'lucide-react';
import BookingModal from '../components/BookingModal';

const DayTours = () => {
  // Animation controls
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  
  // State for destination selection
  const [selectedDestination, setSelectedDestination] = useState<'lake-nakuru' | 'amboseli'>('lake-nakuru');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSafariPackage, setSelectedSafariPackage] = useState('Day Tour - Lake Nakuru');
  
  // Parallax effect state
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Trigger hero animations when in view
  useEffect(() => {
    if (isHeroInView) {
      controls.start('visible');
    }
  }, [isHeroInView, controls]);
  
  // Update selected safari package when destination changes
  useEffect(() => {
    if (selectedDestination === 'lake-nakuru') {
      setSelectedSafariPackage('Day Tour - Lake Nakuru');
    } else {
      setSelectedSafariPackage('Day Tour - Amboseli');
    }
  }, [selectedDestination]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Tour data
  const destinations = {
    'lake-nakuru': {
      name: 'Lake Nakuru National Park',
      description: 'Lake Nakuru sits in the heart of the Great Rift Valley and famously transforms into a "pink paradise" as thousands of flamingos—both lesser and greater species—flock to its alkaline shores, creating one of nature\'s most mesmerizing spectacles.',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80',
      highlights: [
        'Witness thousands of flamingos creating a "pink paradise"',
        'Spot endangered rhinos in their natural habitat',
        'Enjoy breathtaking views of the Great Rift Valley',
        'See diverse wildlife including lions, giraffes, and zebras'
      ],
      prices: [
        { vehicle: 'Land Cruiser Jeep', price: 'Ksh 8,100' },
        { vehicle: 'Safari Van', price: 'Ksh 6,800' }
      ]
    },
    'amboseli': {
      name: 'Amboseli National Park',
      description: 'Nestled at the base of Mount Kilimanjaro—the world\'s tallest free-standing mountain at 5,896 m—Amboseli boasts unrivaled views of the snow-capped peak that dominate its horizon on clear mornings.',
      image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      highlights: [
        'Spectacular views of Mount Kilimanjaro',
        'Large herds of elephants in their natural habitat',
        'Diverse ecosystem with over 400 bird species',
        'Authentic encounters with Maasai culture'
      ],
      prices: [
        { vehicle: 'Safari Van', price: 'Ksh 7,300' }
      ]
    }
  };
  
  // Get current destination data
  const currentDestination = destinations[selectedDestination as keyof typeof destinations];
  
  return (
    <div className="min-h-screen bg-amber-50 overflow-hidden">
      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `url(${currentDestination.image})`,
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundPosition: 'center',
            filter: 'brightness(0.7)'
          }}
        />
        
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
        
        <motion.div 
          className="container mx-auto px-4 z-20 text-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            One-Day Safari <span className="text-amber-400">Experience</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10"
            variants={itemVariants}
          >
            Experience the thrill of Kenya's wildlife in just one unforgettable day.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={itemVariants}
          >
            <motion.button
              className={`px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 ${
                selectedDestination === 'lake-nakuru' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDestination('lake-nakuru')}
            >
              <Droplets className="w-5 h-5" />
              <span>Lake Nakuru</span>
            </motion.button>
            
            <motion.button
              className={`px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 ${
                selectedDestination === 'amboseli' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDestination('amboseli')}
            >
              <Mountain className="w-5 h-5" />
              <span>Amboseli</span>
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="mt-12"
            variants={itemVariants}
          >
            <motion.button
              className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsBookingModalOpen(true);
              }}
            >
              <span>Book This Tour</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div 
            className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center p-1"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-1 h-3 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Destination Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Discover <span className="text-amber-600">{currentDestination.name}</span>
              </h2>
              <div className="w-20 h-1 bg-amber-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                {currentDestination.description}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src={currentDestination.image} 
                    alt={currentDestination.name}
                    className="w-full h-96 object-cover"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Compass className="w-6 h-6 text-amber-600 mr-2" />
                  Tour Highlights
                </h3>
                
                <ul className="space-y-4">
                  {currentDestination.highlights.map((highlight: string, index: number) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <CheckCircle className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <motion.button
                    className="px-6 py-3 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsBookingModalOpen(true);
                    }}
                  >
                    <span>Book This Tour</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tour Details */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tour <span className="text-amber-600">Details</span>
            </h2>
            <div className="w-20 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Everything you need to know about your one-day safari experience.
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inclusions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                  Tour Inclusions
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Pick-up & Drop-off in Nairobi</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Choice of Vehicle: Land Cruiser Jeep or Safari Van</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Pop-Up-Roofed Safari Vehicle for unobstructed game viewing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Single-Entry Park Fees included</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Bottled Drinking Water provided throughout the tour</span>
                  </li>
                </ul>
              </motion.div>
              
              {/* Exclusions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-2" />
                  Tour Exclusions
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">All Meals (lunch can be arranged at a park picnic site)</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Tips & Gratuities for guide and driver</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Personal Items (sunglasses, sunscreen, binoculars, etc.)</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            {/* Pricing Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <DollarSign className="w-6 h-6 text-amber-600 mr-2" />
                Tour Pricing
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-amber-100">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Destination</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Vehicle</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rate (per person)</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-amber-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-700" rowSpan={2}>Lake Nakuru</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Land Cruiser Jeep</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Ksh 8,100</td>
                      <td className="px-6 py-4 text-sm">
                        <motion.button
                          className="px-4 py-2 bg-amber-600 text-white rounded-full text-sm hover:bg-amber-700 transition-colors flex items-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedDestination('lake-nakuru');
                            setSelectedSafariPackage('Day Tour - Lake Nakuru (Land Cruiser)');
                            setIsBookingModalOpen(true);
                          }}
                        >
                          <span>Book Now</span>
                          <ArrowRight className="w-3 h-3" />
                        </motion.button>
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-700">Safari Van</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Ksh 6,800</td>
                      <td className="px-6 py-4 text-sm">
                        <motion.button
                          className="px-4 py-2 bg-amber-600 text-white rounded-full text-sm hover:bg-amber-700 transition-colors flex items-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedDestination('lake-nakuru');
                            setSelectedSafariPackage('Day Tour - Lake Nakuru (Safari Van)');
                            setIsBookingModalOpen(true);
                          }}
                        >
                          <span>Book Now</span>
                          <ArrowRight className="w-3 h-3" />
                        </motion.button>
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-700">Amboseli</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Safari Van</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Ksh 7,300</td>
                      <td className="px-6 py-4 text-sm">
                        <motion.button
                          className="px-4 py-2 bg-amber-600 text-white rounded-full text-sm hover:bg-amber-700 transition-colors flex items-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedDestination('amboseli');
                            setSelectedSafariPackage('Day Tour - Amboseli (Safari Van)');
                            setIsBookingModalOpen(true);
                          }}
                        >
                          <span>Book Now</span>
                          <ArrowRight className="w-3 h-3" />
                        </motion.button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-amber-600 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: `url(${currentDestination.image})`,
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-white mb-6"
            >
              Ready for Your One-Day Safari Adventure?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/90 mb-10"
            >
              Book your unforgettable wildlife experience today and create memories that will last a lifetime.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                className="px-8 py-4 bg-white text-amber-900 rounded-full font-medium hover:bg-amber-100 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsBookingModalOpen(true);
                }}
              >
                <span>Book Your Safari Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        safariPackage={selectedSafariPackage} 
      />
    </div>
  );
};

export default DayTours;
