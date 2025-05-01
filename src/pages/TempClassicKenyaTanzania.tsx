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
  Users,
  Plane,
  Palmtree,
  Heart
} from 'lucide-react';
import BookingModal from '../components/BookingModal';
import RequestItineraryModal from '../components/RequestItineraryModal';

const ClassicKenyaTanzania = () => {
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
      description: "Spot massive herds of wildebeest and zebras making their epic river crossings in both the Maasai Mara and Serengeti.",
      icon: Binoculars
    },
    {
      title: "Luxury Fly-In Transfers",
      description: "Skip the long drives—board small aircraft to travel swiftly and soak in aerial vistas of grasslands and acacia-dotted horizons.",
      icon: Plane
    },
    {
      title: "Premium Tented Camps & Boutique Lodges",
      description: "Immerse yourself in nature without sacrificing comfort: private plunge pools, outdoor bathtubs, and five-star cuisine await.",
      icon: Tent
    },
    {
      title: "Balloon Safari & Champagne Breakfast",
      description: "Drift silently above the plains at dawn, then celebrate with champagne on a secluded bush breakfast.",
      icon: Sunrise
    },
    {
      title: "Zanzibar Beach Retreat",
      description: "Conclude your journey with days of snorkeling, dhow cruises at sunset, and spice-farm visits on this idyllic Indian Ocean isle.",
      icon: Palmtree
    },
    {
      title: "Cultural Immersion",
      description: "Meet Maasai warriors in their village, learn about Hadzabe hunter-gatherer traditions, and discover Swahili life in Stone Town.",
      icon: Users
    }
  ];

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSafariPackage, setSelectedSafariPackage] = useState('Classic Kenya & Tanzania');
  
  // Request itinerary modal state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestPackageName, setRequestPackageName] = useState('');

  return (
    <div className="min-h-screen bg-amber-50 overflow-hidden">
      {/* Scroll Progress Indicator */}
      <div id="scroll-indicator" className="fixed top-0 left-0 h-1 bg-amber-600 z-50" />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80" 
            alt="Classic Kenya and Tanzania Safari" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <motion.div 
            ref={heroRef}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="max-w-4xl"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-amber-600 rounded-full text-white font-medium mb-6"
            >
              10 DAYS MAASAI MARA-SERENGETI & ZANZIBAR LUXURY FLY-IN SAFARI
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-serif font-bold text-white mb-4"
            >
              Classic Kenya and Tanzania
            </motion.h1>
            
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl font-serif font-medium text-amber-300 mb-6"
            >
              Maasai Mara, Serengeti & Zanzibar
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-white/90 mb-8 max-w-3xl"
            >
              Experience the ultimate in East African luxury: fly from the rolling plains of Kenya's Maasai Mara to the endless savannas of Tanzania's Serengeti, then unwind on the white-sand beaches of Zanzibar. From hot-air balloon sunrises over wildebeest herds to spa treatments beneath tropical palms, this is the safari of your dreams.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button
                className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSafariPackage('Classic Kenya & Tanzania');
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
                    setRequestPackageName('Classic Kenya & Tanzania');
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
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center">
          <p className="text-sm font-medium mb-2">Scroll to Explore</p>
          <div className="w-6 h-10 border-2 border-white rounded-full mx-auto flex justify-center">
            <motion.div 
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </div>
      </section>
      
      {/* Safari Highlights Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6">Safari Highlights</h2>
            <p className="text-lg text-stone-600">Experience the best of East Africa with our luxury packages</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {highlights.map((highlight, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-amber-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -10 }}
              >
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                  <highlight.icon className="w-7 h-7 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-4">{highlight.title}</h3>
                <p className="text-stone-600">{highlight.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6">Safari Pricing</h2>
            <p className="text-lg text-stone-600">Tailored packages for an unforgettable East African adventure</p>
          </motion.div>
          
          {/* Season Tabs */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex rounded-full overflow-hidden border border-amber-200 p-1 bg-white">
              <button 
                className={`flex-1 py-3 px-6 rounded-full font-medium transition-colors ${activePricingTab === 'low' ? 'bg-amber-600 text-white' : 'text-amber-900 hover:bg-amber-50'}`}
                onClick={() => setActivePricingTab('low')}
              >
                Low Season
              </button>
              <button 
                className={`flex-1 py-3 px-6 rounded-full font-medium transition-colors ${activePricingTab === 'peak' ? 'bg-amber-600 text-white' : 'text-amber-900 hover:bg-amber-50'}`}
                onClick={() => setActivePricingTab('peak')}
              >
                Peak Season
              </button>
            </div>
          </div>
          
          {/* 10 Day Luxury Package */}
          <motion.div 
            className="max-w-4xl mx-auto mb-16 bg-white rounded-2xl overflow-hidden shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            <div className="bg-amber-900 text-white p-6">
              <h3 className="text-2xl font-bold">10 Days Maasai Mara-Serengeti & Zanzibar Luxury Fly-in Safari</h3>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-amber-900">Premium Package</h4>
                    <p className="text-stone-500">All-inclusive luxury experience</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-amber-700">$8,550</div>
                  <div className="text-sm text-stone-500">per person</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  <span className="text-stone-700">
                    {activePricingTab === 'peak' ? 'July - December' : 'January - June'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-amber-600" />
                  <span className="text-stone-700">Based on double occupancy</span>
                </div>
              </div>
              
              <motion.button
                className="w-full py-4 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedSafariPackage('10 Days Maasai Mara-Serengeti & Zanzibar Luxury Fly-in Safari');
                  setIsBookingModalOpen(true);
                }}
              >
                <span>Book This Package</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
          
          {/* 8 Day Classic Package */}
          <motion.div 
            className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            <div className="bg-amber-800 text-white p-6">
              <h3 className="text-2xl font-bold">8 Days Kenya & Tanzania Classic Safari</h3>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h4 className="text-xl font-medium text-amber-900 mb-4">Choose Your Group Size</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {/* 1 person */}
                  <motion.div 
                    className="bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="bg-amber-50 p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-amber-600" />
                        </div>
                        <span className="font-medium text-stone-700">1 person</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-end gap-1 mb-2">
                        <span className="text-3xl font-bold text-amber-600">
                          ${activePricingTab === 'peak' ? '6,220' : '5,620'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500">per person</p>
                    </div>
                  </motion.div>
                  
                  {/* 2-3 people */}
                  <motion.div 
                    className="bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="bg-amber-50 p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-amber-600" />
                        </div>
                        <span className="font-medium text-stone-700">2-3 people</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-end gap-1 mb-2">
                        <span className="text-3xl font-bold text-amber-600">
                          ${activePricingTab === 'peak' ? '4,220' : '3,770'}
                        </span>
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
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-amber-600" />
                        </div>
                        <span className="font-medium text-stone-700">4-5 people</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-end gap-1 mb-2">
                        <span className="text-3xl font-bold text-amber-600">
                          ${activePricingTab === 'peak' ? '3,340' : '2,940'}
                        </span>
                        <span className="text-sm text-stone-600 mb-1">pp</span>
                      </div>
                      <p className="text-xs text-stone-500">per person</p>
                    </div>
                  </motion.div>
                  
                  {/* 6 people */}
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
                          <span className="font-medium text-stone-700">6 people</span>
                        </div>
                        <div className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">Best Value</div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-end gap-1 mb-2">
                        <span className="text-3xl font-bold text-amber-600">
                          ${activePricingTab === 'peak' ? '3,050' : '2,670'}
                        </span>
                        <span className="text-sm text-stone-600 mb-1">pp</span>
                      </div>
                      <p className="text-xs text-stone-500">per person</p>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <motion.button
                className="w-full py-4 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedSafariPackage('8 Days Kenya & Tanzania Classic Safari');
                  setIsBookingModalOpen(true);
                }}
              >
                <span>Book This Package</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-amber-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1528862973381-9bc5ed0c92fc?auto=format&fit=crop&q=80" 
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
              Ready for the Ultimate East African Safari?
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/90 mb-10"
            >
              Book your luxury safari adventure today and experience Kenya, Tanzania and Zanzibar in unparalleled comfort.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="px-8 py-4 bg-white text-amber-900 rounded-full font-medium hover:bg-amber-100 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSafariPackage('Classic Kenya & Tanzania');
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
                    setRequestPackageName('Classic Kenya & Tanzania');
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

export default ClassicKenyaTanzania;
