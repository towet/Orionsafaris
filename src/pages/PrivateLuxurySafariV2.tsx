import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import {
  ArrowRight,
  Star,
  Sunrise,
  Tent,
  Search,
  Calendar,
  ChevronRight,
  MapPin
} from 'lucide-react';
import BookingModal from '../components/BookingModal';
import RequestItineraryModal from '../components/RequestItineraryModal';

const PrivateLuxurySafari = () => {
  // Animation controls
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSafariPackage, setSelectedSafariPackage] = useState('');

  // Request itinerary modal state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestPackageName, setRequestPackageName] = useState('');

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
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
    
  };

  // Safari highlights
  const highlights = [
    {
      title: "Big Five Game Drives in Maasai Mara",
      description: "Explore the 1,510 km² reserve famed as the best place in Kenya to see lions, leopards, elephants, buffalo, and rhinos—plus cheetahs and hippos—in their natural habitat",
      icon: Search
    },
    {
      title: "Spectacular Elephant Encounters in Amboseli",
      description: "Home to over 1,000 African elephants, Amboseli offers prime opportunities to observe large herds in swampy plains under the looming Mount Kilimanjaro",
      icon: Search
    },
    {
      title: "Iconic Mount Kilimanjaro Views",
      description: "Photograph Africa's tallest summit mirrored in Amboseli's salt pans and wetlands—a postcard image with wildlife foregrounds",
      icon: Search
    },
    {
      title: "Observation Hill Sundowners",
      description: "Climb Amboseli's Observation Hill at sunset to toast with cocktails as the plains below glow gold, then descend for a starlit bush dinner",
      icon: Sunrise
    },
    {
      title: "Comfortable Lodging Mix",
      description: "Stay in luxury tented camps in the Mara and mid-range lodges in Amboseli, each offering full board, en-suite facilities, and panoramic views",
      icon: Tent
    },
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
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Private Luxury Safari"
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
                Exclusive Safari Experience
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6"
            >
              Private Luxury Safari
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl"
            >
              Experience the ultimate in safari luxury with our exclusive 3-day, 2-night private safaris to Kenya's most iconic wildlife destinations.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span className="text-white">3 Days, 2 Nights</span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span className="text-white">Maasai Mara & Amboseli</span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-amber-400" />
                <span className="text-white">5-Star Experience</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button
                className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSafariPackage('Private Luxury Safari');
                  setIsBookingModalOpen(true);
                }}
              >
                <span>Book Your Private Safari</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setRequestPackageName('Private Luxury Safari');
                  setIsRequestModalOpen(true);
                }}
              >
                <span>Request Itinerary</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
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

      {/* Title Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-2"
            >
              Maasai Mara & Amboseli
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-black max-w-3xl mx-auto"
            >
              Traverse the legendary Mara plains in search of lions, cheetahs, and the Great Migration, then descend into Amboseli's watery swamps to watch majestic elephant herds roam beneath Africa's highest peak, Mount Kilimanjaro, on this 6-day adventure of wildlife wonders and cultural encounters.
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">Luxury Experience</a>
              <a className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">Private Safari</a>
              <a className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">Wildlife Viewing</a>
              <a className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">Cultural Encounters</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Safari Highlights Section */}
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
              Unforgettable Experiences
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6"
            >
              Safari Highlights
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
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
            <p className="text-lg text-stone-600">Tailored packages for an unforgettable private safari experience</p>
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

          {/* Maasai Mara Package */}
          <motion.div 
            className="max-w-4xl mx-auto mb-16 bg-white rounded-2xl overflow-hidden shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            <div className="bg-amber-900 text-white p-6">
              <h3 className="text-2xl font-bold">3 Days Maasai Mara Private Safari</h3>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-amber-900">Premium Package</h4>
                    <p className="text-stone-500">{activePricingTab === 'low' ? 'Jan - June (15% Commission)' : 'July - Dec (20% Commission)'}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-stone-600 mb-1">1 person</p>
                  <p className="text-xl font-bold text-amber-700">{activePricingTab === 'low' ? '$1,380' : '$2,020'}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-stone-600 mb-1">2-3 people</p>
                  <p className="text-xl font-bold text-amber-700">{activePricingTab === 'low' ? '$910 pp' : '$1,380 pp'}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-stone-600 mb-1">4-5 people</p>
                  <p className="text-xl font-bold text-amber-700">{activePricingTab === 'low' ? '$720 pp' : '$1,180 pp'}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-stone-600 mb-1">6-7 people</p>
                  <p className="text-xl font-bold text-amber-700">{activePricingTab === 'low' ? '$630 pp' : '$1,080 pp'}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="flex-1 py-4 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedSafariPackage('3 Days Maasai Mara Private Safari');
                    setIsBookingModalOpen(true);
                  }}
                >
                  <span>Book This Package</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  className="flex-1 py-4 bg-white border-2 border-amber-600 text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
          </motion.div>

          {/* Amboseli Package */}
          <motion.div 
            className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            <div className="bg-amber-800 text-white p-6">
              <h3 className="text-2xl font-bold">3 Days Amboseli Private Safari</h3>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-amber-900">Premium Package</h4>
                    <p className="text-stone-500">{activePricingTab === 'low' ? 'Jan - June (15% Commission)' : 'July - Dec (20% Commission)'}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-stone-600 mb-1">1 person</p>
                  <p className="text-xl font-bold text-amber-700">{activePricingTab === 'low' ? '$1,520' : '$1,720'}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-stone-600 mb-1">2-3 people</p>
                  <p className="text-xl font-bold text-amber-700">{activePricingTab === 'low' ? '$1,020 pp' : '$1,150 pp'}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-stone-600 mb-1">4-5 people</p>
                  <p className="text-xl font-bold text-amber-700">{activePricingTab === 'low' ? '$810 pp' : '$920 pp'}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-stone-600 mb-1">6-7 people</p>
                  <p className="text-xl font-bold text-amber-700">{activePricingTab === 'low' ? '$725 pp' : '$820 pp'}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="flex-1 py-4 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedSafariPackage('3 Days Amboseli Private Safari');
                    setIsBookingModalOpen(true);
                  }}
                >
                  <span>Book This Package</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  className="flex-1 py-4 bg-white border-2 border-amber-600 text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setRequestPackageName('3 Days Amboseli Private Safari');
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
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
              Ready for Your Private Luxury Safari?
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/90 mb-10"
            >
              Book your exclusive safari adventure today and experience Kenya's iconic wildlife destinations in unparalleled comfort.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="px-8 py-4 bg-white text-amber-900 rounded-full font-medium hover:bg-amber-100 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSafariPackage('Private Luxury Safari');
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
                    setRequestPackageName('Private Luxury Safari');
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

export default PrivateLuxurySafari;
