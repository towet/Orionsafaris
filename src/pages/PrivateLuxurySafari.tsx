import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Calendar, 
  Camera, 
  ChevronRight,
  ArrowRight,
  Star,
  Search as Binoculars,
  MapPin, 
  Sunrise, 
  Tent, 
  Users
} from 'lucide-react';
import BookingModal from '../components/BookingModal';
import RequestItineraryModal from '../components/RequestItineraryModal';

const MigrationSafari = () => {
  // Animation controls
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  
  // State for season toggle
  const [activePricingTab, setActivePricingTab] = useState('low');
  
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Safari highlights
  const highlights = [
    {
      title: "Witness the Great Migration",
      description: "Experience the awe-inspiring spectacle of over 1.5 million wildebeest, zebras, and gazelles traversing the vast plains.",
      icon: Binoculars
    },
    {
      title: "Luxury Camping",
      description: "Stay in premium tented camps that blend authentic safari experience with modern comforts and amenities.",
      icon: Tent
    },
    {
      title: "Professional Photography",
      description: "Capture stunning wildlife moments with guidance from our professional photography guides.",
      icon: Camera
    },
    {
      title: "Cultural Visits",
      description: "Engage with local Maasai communities to learn about their traditions and way of life.",
      icon: Users
    }
  ];

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSafariPackage, setSelectedSafariPackage] = useState('');
  
  // Request itinerary modal state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestPackageName, setRequestPackageName] = useState('');

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
              alt="Great Migration" 
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
                Ultimate Safari Experience
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6"
            >
              The Great Migration Safari
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl"
            >
              Experience the awe-inspiring spectacle of the Great Migration across the vast plains of Kenya's Maasai Mara and Tanzania's Serengeti.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span className="text-white">6 Nights</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span className="text-white">Maasai Mara & Serengeti</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-amber-400" />
                <span className="text-white">Premium Experience</span>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="inline-block">
                <motion.button
                  className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedSafariPackage('Great Migration Safari');
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
      
      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6"
            >
              Maasai Mara & Serengeti
              <span className="block text-xl md:text-2xl text-amber-600 mt-2">6-Night Migration Safari</span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-black mb-8"
            >
              Experience the awe-inspiring spectacle of the Great Migration, where over 1.5 million wildebeest, zebras, and gazelles traverse the vast plains of Kenya's Maasai Mara and Tanzania's Serengeti in search of greener pastures. This 6-night safari offers an unparalleled opportunity to witness nature's grandest theater, where survival and instinct drive the rhythm of life.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                Witness wildebeest migration
              </span>
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                Luxury camping
              </span>
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                Professional photography
              </span>
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                Cultural visits
              </span>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={fadeInUpVariants} className="relative">
              <img 
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80" 
                alt="Safari Experience" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white px-6 py-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold"></div>
                <div className="text-sm">Amazing safari</div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUpVariants}>
              <h3 className="text-2xl font-serif font-bold text-amber-900 mb-6">Safari Highlights</h3>
              
              <div className="space-y-6">
                {highlights.map((highlight, index) => (
                  <motion.div 
                    key={index}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <highlight.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-amber-900 mb-1">{highlight.title}</h4>
                      <p className="text-black">{highlight.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
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
              Investment Details
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6"
            >
              Safari Pricing
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-black max-w-3xl mx-auto"
            >
              Choose the perfect safari package for your group size and preferred travel season.
            </motion.p>
          </motion.div>
          
          {/* Pricing Cards - 3 Days Maasai Mara Private Safari */}
          <motion.div
            className="max-w-5xl mx-auto overflow-hidden mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            {/* Header with safari name */}
            <motion.div 
              className="bg-gradient-to-r from-amber-800 to-amber-600 rounded-t-2xl p-8 md:p-12 relative overflow-hidden shadow-xl"
              variants={fadeInUpVariants}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full -ml-10 -mb-10 blur-xl"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">3 Days Maasai Mara Private Safari</h2>
                  <p className="text-amber-100">Exclusive private safari experience in Kenya's iconic Maasai Mara</p>
                </div>
              </div>
            </motion.div>
            
            {/* Pricing Section */}
            <div className="bg-white rounded-b-2xl shadow-xl p-8 md:p-10">
              {/* Season Tab Selector */}
              <div className="mb-10">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Select Season</h3>
                
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
                    initial={{ opacity: 1 }}
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
                          <span className="text-3xl font-bold text-amber-600">$1,380</span>
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
                          <span className="text-3xl font-bold text-amber-600">$910</span>
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
                          <span className="text-3xl font-bold text-amber-600">$720</span>
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
                          <span className="text-3xl font-bold text-amber-600">$630</span>
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
                          <span className="text-3xl font-bold text-amber-600">$2,020</span>
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
                          <span className="text-3xl font-bold text-amber-600">$1,380</span>
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
                          <span className="text-3xl font-bold text-amber-600">$1,180</span>
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
                          <span className="text-3xl font-bold text-amber-600">$1,080</span>
                          <span className="text-sm text-stone-600 mb-1">pp</span>
                        </div>
                        <p className="text-xs text-stone-500">per person</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                <div className="text-center mt-6">
                  <p className="text-sm text-stone-600 max-w-3xl mx-auto mb-2">
                    Low Season (Jan - June) - 15% Commission | Peak Season (July - Dec) - 20% Commission
                  </p>
                  <p className="text-sm text-stone-600 max-w-3xl mx-auto">
                    All prices are in USD. Prices may vary based on exact travel dates, group size, and customizations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Pricing Cards - 3 Days Amboseli Private Safari */}
          <motion.div
            className="max-w-5xl mx-auto overflow-hidden mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            {/* Header with safari name */}
            <motion.div 
              className="bg-gradient-to-r from-amber-800 to-amber-600 rounded-t-2xl p-8 md:p-12 relative overflow-hidden shadow-xl"
              variants={fadeInUpVariants}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full -ml-10 -mb-10 blur-xl"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">3 Days Amboseli Private Safari</h2>
                  <p className="text-amber-100">Exclusive private safari experience in Kenya's iconic Amboseli National Park</p>
                </div>
              </div>
            </motion.div>
            
            {/* Pricing Section */}
            <div className="bg-white rounded-b-2xl shadow-xl p-8 md:p-10">
              {/* Season Tab Selector */}
              <div className="mb-10">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Select Season</h3>
                
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
                    initial={{ opacity: 1 }}
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
                          <span className="text-3xl font-bold text-amber-600">$1,520</span>
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
                          <span className="text-3xl font-bold text-amber-600">$1,020</span>
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
                          <span className="text-3xl font-bold text-amber-600">$810</span>
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
                          <span className="text-3xl font-bold text-amber-600">$725</span>
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
                          <span className="text-3xl font-bold text-amber-600">$1,720</span>
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
                          <span className="text-3xl font-bold text-amber-600">$1,150</span>
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
                          <span className="text-3xl font-bold text-amber-600">$920</span>
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
                          <span className="text-3xl font-bold text-amber-600">$820</span>
                          <span className="text-sm text-stone-600 mb-1">pp</span>
                        </div>
                        <p className="text-xs text-stone-500">per person</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                <div className="text-center mt-6">
                  <p className="text-sm text-stone-600 max-w-3xl mx-auto mb-2">
                    Low Season (Jan - June) - 15% Commission | Peak Season (July - Dec) - 20% Commission
                  </p>
                  <p className="text-sm text-stone-600 max-w-3xl mx-auto">
                    All prices are in USD. Prices may vary based on exact travel dates, group size, and customizations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Book Now Button */}
          <div className="mt-10 text-center">
            <motion.button
              className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedSafariPackage('3 Days Maasai Mara Private Safari');
                setIsBookingModalOpen(true);
              }}
            >
              <span>Book This Safari Now</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <div className="relative">
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setRequestPackageName('3 Days Maasai Mara Private Safari');
                  setIsRequestModalOpen(true);
                }}
              >
                <span>Request Itinerary</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
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
              Ready to Witness the Great Migration?
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/90 mb-10"
            >
              Book your safari adventure today and experience the wonder of Africa's most spectacular wildlife event.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="px-8 py-4 bg-white text-amber-900 rounded-full font-medium hover:bg-amber-100 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSafariPackage('3 Days Maasai Mara Private Safari');
                  setIsBookingModalOpen(true);
                }}
              >
                <span>Book Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <div className="relative">
                <motion.button
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setRequestPackageName('3 Days Maasai Mara Private Safari');
                    setIsRequestModalOpen(true);
                  }}
                >
                  <span>Request Itinerary</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
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

export default MigrationSafari;
