import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Camera, 
  MapPin, 
  Sunrise, 
  Tent, 
  Users, 
  Compass, 
  ChevronRight,
  ArrowRight,
  Star,
  Search as Binoculars,
  Coffee,
  Utensils,
  Car,
  Mountain,
  Check,
  DollarSign,
  Info
} from 'lucide-react';
import BookingModal from '../components/BookingModal';
import RequestItineraryModal from '../components/RequestItineraryModal';

const GroupSafariAdventure = () => {
  // State for package selection
  const [selectedPackage, setSelectedPackage] = useState<'five-day' | 'seven-day'>('five-day');
  
  // Animation controls
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);
  
  // Pricing tabs state
  const [activePricingTab, setActivePricingTab] = useState('low');
  
  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSafariPackage, setSelectedSafariPackage] = useState('');

  // Request itinerary modal state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestPackageName, setRequestPackageName] = useState('');

  useEffect(() => {
    if (isHeroInView) {
      controls.start('visible');
    }
  }, [controls, isHeroInView]);

  // Scroll progress animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollIndicator = document.getElementById('scroll-indicator');
      
      if (scrollIndicator) {
        scrollIndicator.style.width = `${scrollPercent * 100}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect for hero section
  useEffect(() => {
    const handleParallax = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.5');
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerCardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: { 
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Safari features
  const safariFeatures = [
    {
      title: "Group activities",
      description: "Enjoy shared experiences with like-minded travelers",
      icon: Users
    },
    {
      title: "Shared experiences",
      description: "Create lasting memories with fellow adventurers",
      icon: Coffee
    },
    {
      title: "Comfortable lodges",
      description: "Stay in premium accommodations with modern amenities",
      icon: Tent
    },
    {
      title: "Game drives",
      description: "Experience thrilling wildlife encounters in custom 4x4 vehicles",
      icon: Car
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50 overflow-hidden">
      {/* Scroll Progress Indicator */}
      <div id="scroll-indicator" className="fixed top-0 left-0 h-1 bg-amber-600 z-50" />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="parallax" data-speed="0.3">
            <img 
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80" 
              alt="Group Safari Adventure" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-amber-950/30" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-block px-4 py-1 bg-amber-600 text-white rounded-full text-sm font-medium">
                Social Safari Experience
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6"
            >
              Group Safari Adventure
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl"
            >
              Perfect for social travelers and group experiences. Explore the wonders of Tanzania with like-minded adventurers.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span className="text-white">4 Days</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span className="text-white">Tanzania</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-5 h-5 text-amber-400" />
                <span className="text-white">Group Experience</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-amber-400" />
                <span className="text-white">$2,830 / person</span>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="inline-block">
                <motion.button
                  className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedSafariPackage('Group Safari Adventure');
                    setIsBookingModalOpen(true);
                  }}
                >
                  <span>Book This Safari</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>
      
      {/* Package Selection Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.span 
              variants={itemVariants}
              className="px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4 inline-block"
            >
              Choose Your Adventure
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6"
            >
              Discover Our Safari Packages
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-black max-w-3xl mx-auto mb-12"
            >
              Experience the Essence of Tanzania with our carefully crafted group safari packages. Select the adventure that suits your timeframe and interests.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="inline-flex bg-amber-100 p-1 rounded-full mb-12"
            >
              <button 
                className={`relative py-2.5 px-4 rounded-full text-sm font-medium flex-1 ${selectedPackage === 'five-day' ? 'bg-amber-600 text-white shadow-sm' : 'text-amber-900 hover:bg-amber-200'}`}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                onClick={() => setSelectedPackage('five-day')}
              >
                5-Day Safari
              </button>
              <button 
                className={`relative py-2.5 px-4 rounded-full text-sm font-medium flex-1 ${selectedPackage === 'seven-day' ? 'bg-amber-600 text-white shadow-sm' : 'text-amber-900 hover:bg-amber-200'}`}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                onClick={() => setSelectedPackage('seven-day')}
              >
                4-Day Safari
              </button>
            </motion.div>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {selectedPackage === 'five-day' ? (
              <motion.div
                key="five-day"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className="relative">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80" 
                    alt="5-Day Safari" 
                    className="w-full h-auto rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white px-6 py-4 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold"></div>
                    <div className="text-sm">orion safaris</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">
                    5 Days Lake Manyara, Serengeti and Ngorongoro
                  </h3>
                  
                  <p className="text-lg text-black mb-6">
                    Embark on an exhilarating 5-day journey through Tanzania's premier wildlife destinations.
                  </p>
                  
                  <div className="bg-amber-50 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-amber-900 mb-3">Tour Options:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-amber-800 font-medium mb-1">Budget Camping</div>
                        <div className="text-2xl font-bold text-amber-600">$1,150</div>
                        <div className="text-sm text-stone-600">per person</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-amber-800 font-medium mb-1">Mid-Range Lodge</div>
                        <div className="text-2xl font-bold text-amber-600">$1,970</div>
                        <div className="text-sm text-stone-600">per person</div>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 inline-flex"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedSafariPackage('Group Safari Adventure');
                      setIsBookingModalOpen(true);
                    }}
                  >
                    <span>Book This Safari</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  
                  <div className="relative mt-4">
                    <motion.button
                      className="w-full px-8 py-4 bg-transparent border-2 border-amber-600 text-amber-700 rounded-full font-medium hover:bg-amber-50 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setRequestPackageName('five-day-top');
                        setIsRequestModalOpen(true);
                      }}
                    >
                      <span>Request Itinerary</span>
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="seven-day"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className="relative">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80" 
                    alt="4-Day Safari" 
                    className="w-full h-auto rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white px-6 py-4 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold"></div>
                    <div className="text-sm">orion safaris</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">
                    4 Days Serengeti & Ngorongoro Mid-Range Safari
                  </h3>
                  
                  <p className="text-lg text-black mb-6">
                    Experience the best of Tanzania's northern circuit with our comprehensive 4-day safari adventure.
                  </p>
                  
                  <div className="bg-amber-50 rounded-xl p-6 mb-6">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="text-sm text-amber-800 font-medium">1 person</div>
                        <div className="text-lg font-bold text-amber-600">$2,830</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="text-sm text-amber-800 font-medium">2-3 people</div>
                        <div className="text-lg font-bold text-amber-600">$2,040 pp</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="text-sm text-amber-800 font-medium">4-5 people</div>
                        <div className="text-lg font-bold text-amber-600">$1,720 pp</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="text-sm text-amber-800 font-medium">6-7 people</div>
                        <div className="text-lg font-bold text-amber-600">$1,550 pp</div>
                      </div>
                    </div>
                    <div className="text-xs text-stone-600 text-center">Prices shown for Low Season (Jan-Jun). Same prices apply for Peak Season (Jul-Dec).</div>
                  </div>
                  
                  <motion.a
                    href="#pricing"
                    className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 inline-flex"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View Pricing Details</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.span 
              variants={itemVariants}
              className="px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4 inline-block"
            >
              Safari Pricing
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6"
            >
              4 Days Serengeti & Ngorongoro Mid-Range Safari
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-black max-w-3xl mx-auto mb-12"
            >
              All-inclusive pricing for our premium group safari adventures. Experience the best of Tanzania's wildlife with our expert guides.
            </motion.p>
          </motion.div>
          
          {/* Pricing Cards */}
          <motion.div
            className="max-w-5xl mx-auto overflow-hidden mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Season Tab Selector */}
              <div className="p-8 md:p-10">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Select Season</h3>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-amber-600">All prices in:</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-stone-600">USD</span>
                  </div>
                </div>
                
                <div className="bg-stone-100 p-1 rounded-full flex mb-8 max-w-md mx-auto">
                  <motion.button
                    className={`relative py-2.5 px-4 rounded-full text-sm font-medium flex-1 ${activePricingTab === 'low' ? 'bg-white text-amber-600 shadow-sm' : 'text-stone-600'}`}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                    onClick={() => setActivePricingTab('low')}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Sunrise className="w-4 h-4" />
                      Low Season (Jan-Jun)
                    </span>
                  </motion.button>
                  
                  <motion.button
                    className={`relative py-2.5 px-4 rounded-full text-sm font-medium flex-1 ${activePricingTab === 'peak' ? 'bg-white text-amber-600 shadow-sm' : 'text-stone-600'}`}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                    onClick={() => setActivePricingTab('peak')}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Star className="w-4 h-4" />
                      Peak Season (Jul-Dec)
                    </span>
                  </motion.button>
                </div>
                
                {/* Low Season Pricing */}
                {activePricingTab === 'low' && (
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* 1 person */}
                    <motion.div 
                      className="bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="bg-amber-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="font-medium text-stone-700">1 person</span>
                          </div>
                          <div className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">Solo</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-end gap-1 mb-2">
                          <span className="text-3xl font-bold text-amber-600">$2,830</span>
                        </div>
                        <p className="text-xs text-stone-500">total package price</p>
                      </div>
                    </motion.div>
                    
                    {/* 2-3 people */}
                    <motion.div 
                      className="bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="bg-amber-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="font-medium text-stone-700">2-3 people</span>
                          </div>
                          <div className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">Popular</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-end gap-1 mb-2">
                          <span className="text-3xl font-bold text-amber-600">$2,040</span>
                          <span className="text-sm text-stone-600 mb-1">pp</span>
                        </div>
                        <p className="text-xs text-stone-500">per person</p>
                      </div>
                    </motion.div>
                    
                    {/* 4-5 people */}
                    <motion.div 
                      className="bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="bg-amber-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="font-medium text-stone-700">4-5 people</span>
                          </div>
                          <div className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">Group</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-end gap-1 mb-2">
                          <span className="text-3xl font-bold text-amber-600">$1,720</span>
                          <span className="text-sm text-stone-600 mb-1">pp</span>
                        </div>
                        <p className="text-xs text-stone-500">per person</p>
                      </div>
                    </motion.div>
                    
                    {/* 6-7 people */}
                    <motion.div 
                      className="bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="bg-amber-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="font-medium text-stone-700">6-7 people</span>
                          </div>
                          <div className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">Best Value</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-end gap-1 mb-2">
                          <span className="text-3xl font-bold text-amber-600">$1,550</span>
                          <span className="text-sm text-stone-600 mb-1">pp</span>
                        </div>
                        <p className="text-xs text-stone-500">per person</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Peak Season Pricing */}
                {activePricingTab === 'peak' && (
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* 1 person */}
                    <motion.div 
                      className="bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="bg-amber-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="font-medium text-stone-700">1 person</span>
                          </div>
                          <div className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">Solo</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-end gap-1 mb-2">
                          <span className="text-3xl font-bold text-amber-600">$2,830</span>
                        </div>
                        <p className="text-xs text-stone-500">total package price</p>
                      </div>
                    </motion.div>
                    
                    {/* 2-3 people */}
                    <motion.div 
                      className="bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="bg-amber-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="font-medium text-stone-700">2-3 people</span>
                          </div>
                          <div className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">Popular</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-end gap-1 mb-2">
                          <span className="text-3xl font-bold text-amber-600">$2,040</span>
                          <span className="text-sm text-stone-600 mb-1">pp</span>
                        </div>
                        <p className="text-xs text-stone-500">per person</p>
                      </div>
                    </motion.div>
                    
                    {/* 4-5 people */}
                    <motion.div 
                      className="bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="bg-amber-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="font-medium text-stone-700">4-5 people</span>
                          </div>
                          <div className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">Group</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-end gap-1 mb-2">
                          <span className="text-3xl font-bold text-amber-600">$1,720</span>
                          <span className="text-sm text-stone-600 mb-1">pp</span>
                        </div>
                        <p className="text-xs text-stone-500">per person</p>
                      </div>
                    </motion.div>
                    
                    {/* 6-7 people */}
                    <motion.div 
                      className="bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="bg-amber-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="font-medium text-stone-700">6-7 people</span>
                          </div>
                          <div className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">Best Value</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-end gap-1 mb-2">
                          <span className="text-3xl font-bold text-amber-600">$1,550</span>
                          <span className="text-sm text-stone-600 mb-1">pp</span>
                        </div>
                        <p className="text-xs text-stone-500">per person</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                {/* What's Included Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-xl font-medium text-amber-900 mb-4 flex items-center">
                      <Check className="w-5 h-5 mr-2 text-amber-600" />
                      Cost Inclusions
                    </h3>
                    <ul className="space-y-3">
                      {[
                        'All airport/airstrip transfers',
                        '5 Nights\' accommodation during safari on a full board basis',
                        '4 Nights\' accommodation in Zanzibar on full board basis',
                        '3 meals per day during Safari tour',
                        'One way flight - Nairobi - Maasai Mara',
                        'One way flight - Maasai Mara - Serengeti',
                        'One way flight - Serengeti - Zanzibar',
                        'Shared use of a customized safari 4X4 Land cruiser Jeep in Kenya and Tanzania with a pop up roof for easy game viewing and photography (Morning and evening game drives)',
                        'All park entrance fees in all parks in Kenya and Tanzania',
                        'Bottled water in the car'
                      ].map((item, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Check className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-stone-700 mb-4 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-stone-500" />
                      Exclusions
                    </h3>
                    <ul className="space-y-3">
                      {[
                        'Gratuities and tips',
                        'Drinks e.g. alcohol',
                        'Balloon Safari in Maasai Mara @ $450 per person',
                        'Visit to Maasai Village @ 30 USD per person (optional)',
                        'Travel or Medical Insurance',
                        'Drinks and Meals not specified as included',
                        'Visa fees',
                        'International flights'
                      ].map((item, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Info className="w-5 h-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-stone-600">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Book Now Button */}
                <div className="mt-10 text-center">
                  <motion.button
                    className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedSafariPackage('4 Days Serengeti & Ngorongoro Mid-Range Safari');
                      setIsBookingModalOpen(true);
                    }}
                  >
                    <span>Book This Safari Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* 5-Day Itinerary Section */}
      <section id="itinerary" className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.span 
              variants={itemVariants}
              className="px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4 inline-block"
            >
              Our Safari Options
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6"
            >
              Select Your Perfect Safari Package
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-black max-w-3xl mx-auto"
            >
              Choose from our carefully designed safari packages for an unforgettable Tanzania adventure.
            </motion.p>
          </motion.div>
          
          {/* Safari Packages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* 5 Days Package */}
            <motion.div
              className="bg-white rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80" 
                  alt="5-Day Safari" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-2xl font-serif text-white font-bold">5 Days Lake Manyara, Serengeti & Ngorongoro</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                    <span>5 Days / 4 Nights</span>
                  </div>
                  <div className="bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                    <span>Group Safari</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-900 mb-2">Budget Camping</h4>
                    <div className="text-2xl font-bold text-amber-600">$1,150</div>
                    <div className="text-sm text-stone-600">per person</div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-900 mb-2">Mid-Range Lodge</h4>
                    <div className="text-2xl font-bold text-amber-600">$1,970</div>
                    <div className="text-sm text-stone-600">per person</div>
                  </div>
                </div>
                
                <motion.button
                  className="w-full bg-amber-600 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedSafariPackage('5 Days Lake Manyara, Serengeti & Ngorongoro Safari');
                    setIsBookingModalOpen(true);
                  }}
                >
                  Book This Safari
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                
                <div className="relative mt-4">
                  <motion.button
                    className="w-full px-8 py-4 bg-transparent border-2 border-amber-600 text-amber-700 rounded-full font-medium hover:bg-amber-50 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setRequestPackageName('five-day-package');
                      setIsRequestModalOpen(true);
                    }}
                  >
                    <span>Request Itinerary</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            {/* 4 Days Package */}
            <motion.div
              className="bg-white rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80" 
                  alt="4-Day Safari" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-2xl font-serif text-white font-bold">4 Days Serengeti & Ngorongoro Mid-Range Safari</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                    <span>4 Days / 3 Nights</span>
                  </div>
                  <div className="bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                    <span>Mid-Range Safari</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-amber-900 mb-1">1 person</h4>
                    <div className="text-xl font-bold text-amber-600">$2,830</div>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-amber-900 mb-1">2-3 people</h4>
                    <div className="text-xl font-bold text-amber-600">$2,040 pp</div>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-amber-900 mb-1">4-5 people</h4>
                    <div className="text-xl font-bold text-amber-600">$1,720 pp</div>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-amber-900 mb-1">6-7 people</h4>
                    <div className="text-xl font-bold text-amber-600">$1,550 pp</div>
                  </div>
                </div>
                
                <p className="text-xs text-stone-500 text-center mb-4">Prices shown apply for both Low Season (Jan-Jun) and Peak Season (Jul-Dec)</p>
                
                <motion.button
                  className="w-full bg-amber-600 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedSafariPackage('4 Days Serengeti & Ngorongoro Mid-Range Safari');
                    setIsBookingModalOpen(true);
                  }}
                >
                  Book This Safari
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                
                <div className="relative mt-4">
                  <motion.button
                    className="w-full px-8 py-4 bg-transparent border-2 border-amber-600 text-amber-700 rounded-full font-medium hover:bg-amber-50 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setRequestPackageName('four-day-card');
                      setIsRequestModalOpen(true);
                    }}
                  >
                    <span>Request Itinerary</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.span 
              variants={itemVariants}
              className="px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4 inline-block"
            >
              Guest Experiences
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6"
            >
              What Our Guests Say
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-black max-w-3xl mx-auto"
            >
              Hear from travelers who have experienced our Group Safari Adventures.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Testimonial 1 */}
            <motion.div 
              className="bg-amber-50 rounded-2xl p-8 shadow-lg"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80" 
                    alt="Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-amber-900">Sarah Johnson</h4>
                  <p className="text-amber-700">New York, USA</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-black italic">
                "The group safari was an incredible experience! We bonded with fellow travelers while witnessing amazing wildlife. The guides were knowledgeable and accommodations were perfect. Highly recommend for solo travelers looking to share the experience."
              </p>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div 
              className="bg-amber-50 rounded-2xl p-8 shadow-lg"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" 
                    alt="David Thompson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-amber-900">David Thompson</h4>
                  <p className="text-amber-700">London, UK</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-black italic">
                "The 5-day safari exceeded all expectations. The itinerary was perfectly balanced with game drives and relaxation time. Our group became like family, and we're still in touch. The Ngorongoro Crater was the highlight - absolutely breathtaking!"
              </p>
            </motion.div>
            
            {/* Testimonial 3 */}
            <motion.div 
              className="bg-amber-50 rounded-2xl p-8 shadow-lg"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" 
                    alt="Michelle Rodriguez" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-amber-900">Michelle Rodriguez</h4>
                  <p className="text-amber-700">Sydney, Australia</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-black italic">
                "As a solo traveler, I was hesitant about a group safari, but it was the best decision! Our guide was exceptional, spotting animals we would have missed. The accommodations were comfortable and the food was delicious. I made lifelong friends and memories."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-amber-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80" 
            alt="Safari Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-white mb-6"
            >
              Ready for Your Group Safari Adventure?
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/90 mb-10"
            >
              Join fellow travelers for an unforgettable journey through Tanzania's most spectacular wildlife destinations.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="px-8 py-4 bg-white text-amber-900 rounded-full font-medium hover:bg-amber-100 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSafariPackage('Group Safari Adventure');
                  setIsBookingModalOpen(true);
                }}
              >
                <span>Book Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Contact Us</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        safariPackage={selectedSafariPackage} 
      />
      
      {/* Request Itinerary Modal */}
      <RequestItineraryModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
        packageName={requestPackageName} 
      />
    </div>
  );
};

export default GroupSafariAdventure;
