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
  Plane,
  Palmtree,
  Waves,
  Sun,
  Heart,
  Award,
  Check,
  Info,
  DollarSign
} from 'lucide-react';

const ClassicKenyaTanzania = () => {
  // Animation controls
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const [activeDay, setActiveDay] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoPlay] = useState(true); // Always on
  const autoPlayRef = useRef<number | null>(null);
  const [activePricingTab, setActivePricingTab] = useState('low');
  
  useEffect(() => {
    if (isHeroInView) {
      controls.start('visible');
    }
  }, [controls, isHeroInView]);

  // Auto-play effect for day selector
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = window.setInterval(() => {
        setActiveDay(prev => prev === 10 ? 1 : prev + 1);
      }, 5000); // Change day every 5 seconds
    } else if (autoPlayRef.current) {
      window.clearInterval(autoPlayRef.current);
    }
    
    return () => {
      if (autoPlayRef.current) {
        window.clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay]);

  // Scroll progress animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      
      setScrollProgress(scrollPercent);
      
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

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  // Safari itinerary data
  const itineraryData = [
    {
      day: 1,
      title: "Nairobi to Maasai Mara",
      description: "Fly into the heart of the Maasai Mara and settle into your luxury safari lodge.",
      icon: Plane,
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80"
    },
    {
      day: 2,
      title: "Explore Maasai Mara",
      description: "Embark on thrilling game drives to witness the Big Five and the spectacular Great Migration.",
      icon: Binoculars,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
    },
    {
      day: 3,
      title: "Maasai Mara Adventures",
      description: "Continue exploring with more game drives and opportunities to witness the migration.",
      icon: Camera,
      image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80"
    },
    {
      day: 4,
      title: "Maasai Mara to Serengeti",
      description: "Cross into Tanzania's Serengeti National Park via a scenic flight, arriving in time for an afternoon game drive.",
      icon: Plane,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
    },
    {
      day: 5,
      title: "Discover Serengeti",
      description: "Delve deeper into the Serengeti's vast plains, observing diverse wildlife in their natural habitat.",
      icon: Compass,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
    },
    {
      day: 6,
      title: "Serengeti to Zanzibar",
      description: "Fly to the enchanting island of Zanzibar and transfer to your beachfront resort.",
      icon: Plane,
      image: "https://images.unsplash.com/photo-1512552288940-3a300922a275?auto=format&fit=crop&q=80"
    },
    {
      day: 7,
      title: "Zanzibar Beach Day",
      description: "Unwind on pristine beaches and enjoy the crystal-clear waters of the Indian Ocean.",
      icon: Waves,
      image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80"
    },
    {
      day: 8,
      title: "Stone Town Exploration",
      description: "Explore historic Stone Town, a UNESCO World Heritage site with rich cultural heritage.",
      icon: MapPin,
      image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?auto=format&fit=crop&q=80"
    },
    {
      day: 9,
      title: "Spice Tour & Snorkeling",
      description: "Indulge in optional activities like spice tours and snorkeling in Zanzibar's coral reefs.",
      icon: Palmtree,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80"
    },
    {
      day: 10,
      title: "Zanzibar to Home",
      description: "Transfer to the airport for your international flight home, concluding your unforgettable East African adventure.",
      icon: Plane,
      image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?auto=format&fit=crop&q=80"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      quote: "The Kenya & Tanzania safari exceeded all my expectations. The seamless transitions between destinations and the luxury accommodations made this trip truly unforgettable.",
      rating: 5
    },
    {
      name: "David Chen",
      location: "Sydney, Australia",
      quote: "Witnessing the Great Migration in the Maasai Mara was a dream come true. The guides were incredibly knowledgeable and the fly-in experience saved us valuable time.",
      rating: 5
    },
    {
      name: "Emma Williams",
      location: "London, UK",
      quote: "The perfect balance of safari adventure and beach relaxation. Zanzibar was the ideal way to conclude our East African journey.",
      rating: 5
    }
  ];

  return (
    <div className="bg-stone-50 text-stone-900 overflow-x-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200 z-50">
        <div 
          id="scroll-indicator" 
          className="h-full bg-amber-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80" 
            alt="Safari Landscape" 
            className="w-full h-full object-cover parallax"
            data-speed="-0.2"
          />
        </div>
        
        <motion.div 
          className="container mx-auto px-4 relative z-20 text-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div 
            className="inline-block mb-6 bg-amber-600/80 backdrop-blur-sm px-6 py-2 rounded-full"
            variants={itemVariants}
          >
            <span className="text-white font-medium tracking-wider uppercase text-sm">10 Days Luxury Fly-In Safari</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg"
            variants={itemVariants}
          >
            Classic Kenya & Tanzania
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-md"
            variants={itemVariants}
          >
            Experience the pinnacle of African adventure with our exclusive fly-in safari
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <motion.button
              className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Begin Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            variants={itemVariants}
            animate={{ 
              y: [0, 10, 0],
              transition: { 
                repeat: Infinity, 
                duration: 1.5 
              }
            }}
          >
            <ChevronRight className="w-8 h-8 text-white rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              variants={fadeInUpVariants}
              className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-6"
            >
              Embark on the Ultimate East African Luxury Safari & Beach Escape
            </motion.h2>
            
            <motion.p 
              variants={fadeInUpVariants}
              className="text-lg text-stone-700 mb-10"
            >
              Experience the pinnacle of African adventure with our exclusive fly-in safari, seamlessly blending the untamed beauty of the Maasai Mara and Serengeti with the serene beaches of Zanzibar.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              <motion.div 
                className="bg-stone-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={scaleInVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plane className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Luxury Fly-In Experience</h3>
                <p className="text-stone-600">Maximize your time with convenient flights between destinations.</p>
              </motion.div>
              
              <motion.div 
                className="bg-stone-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={scaleInVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Iconic Wildlife</h3>
                <p className="text-stone-600">Witness the Big Five and the Great Migration in their natural habitat.</p>
              </motion.div>
              
              <motion.div 
                className="bg-stone-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={scaleInVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Beach Paradise</h3>
                <p className="text-stone-600">Conclude your safari with relaxation on Zanzibar's pristine beaches.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Itinerary Timeline Section */}
      <section className="py-20 bg-stone-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80" 
            alt="Safari Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              variants={fadeInUpVariants}
              className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4"
            >
              Your 10-Day Safari & Beach Adventure
            </motion.h2>
            
            <motion.p 
              variants={fadeInUpVariants}
              className="text-lg text-stone-700 max-w-3xl mx-auto"
            >
              An expertly crafted itinerary blending wildlife encounters with cultural experiences and beach relaxation.
            </motion.p>
          </motion.div>
          
          {/* Day selector */}
          <motion.div 
            className="flex flex-col items-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div className="flex items-center mb-4">
              <motion.p 
                variants={itemVariants}
                className="text-stone-600 font-medium flex items-center"
              >
                <span className="w-3 h-3 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                Auto-playing: <span className="text-amber-700 font-bold ml-1">Day {activeDay}</span>
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-2 relative"
              variants={containerVariants}
            >
              {itineraryData.map((day) => (
                <motion.button
                  key={day.day}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all ${activeDay === day.day ? 'bg-amber-600 text-white shadow-lg scale-105' : 'bg-white text-stone-700 hover:bg-amber-50'}`}
                  onClick={() => {
                    setActiveDay(day.day);
                    // Autoplay continues even after clicking
                  }}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  // Autoplay always stays on
                >
                  <span>Day {day.day}</span>
                  {activeDay === day.day && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 mx-auto w-2/3"
                      layoutId="activeDay"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
            
            <motion.div 
              className="w-full max-w-md h-1 bg-stone-200 rounded-full overflow-hidden mt-2"
              variants={itemVariants}
            >
              <motion.div 
                className="h-full bg-amber-500"
                initial={{ width: `${(1/10) * 100}%` }}
                animate={{ width: `${(activeDay/10) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
          
          {/* Day details */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {itineraryData.map((day) => (
                activeDay === day.day && (
                  <motion.div 
                    key={day.day}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-4">
                            <day.icon className="w-5 h-5" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-semibold">
                            Day {day.day}: {day.title}
                          </h3>
                        </div>
                        
                        <p className="text-stone-700 mb-6">{day.description}</p>
                        
                        <div className="flex flex-wrap gap-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800">
                            <Calendar className="w-4 h-4 mr-1" /> Full Day
                          </span>
                          
                          {day.day <= 5 && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                              <Camera className="w-4 h-4 mr-1" /> Wildlife Viewing
                            </span>
                          )}
                          
                          {day.day >= 6 && day.day <= 9 && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                              <Waves className="w-4 h-4 mr-1" /> Beach Activities
                            </span>
                          )}
                          
                          {(day.day === 4 || day.day === 6 || day.day === 10) && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                              <Plane className="w-4 h-4 mr-1" /> Flight Included
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <img 
                          src={day.image} 
                          alt={day.title} 
                          className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            
            <div className="flex justify-between mt-6">
              <motion.button
                className="px-4 py-2 bg-white text-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors shadow flex items-center gap-1"
                onClick={() => setActiveDay(prev => Math.max(1, prev - 1))}
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.95 }}
                disabled={activeDay === 1}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                <span>Previous Day</span>
              </motion.button>
              
              <motion.button
                className="px-4 py-2 bg-white text-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors shadow flex items-center gap-1"
                onClick={() => setActiveDay(prev => Math.min(10, prev + 1))}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.95 }}
                disabled={activeDay === 10}
              >
                <span>Next Day</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Accommodations Section */}
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
              variants={fadeInUpVariants}
              className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4"
            >
              Luxury Accommodations
            </motion.h2>
            
            <motion.p 
              variants={fadeInUpVariants}
              className="text-lg text-stone-700 max-w-3xl mx-auto"
            >
              Immerse yourself in comfort and elegance at our carefully selected luxury lodges and resorts.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            <motion.div 
              className="rounded-xl overflow-hidden shadow-lg group relative"
              variants={scaleInVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80" 
                  alt="Luxury Safari Lodge" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-1">Maasai Mara Luxury Lodge</h3>
                  <p className="text-white/80 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" /> Maasai Mara, Kenya
                  </p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-700 mb-4">Nestled in the heart of the Maasai Mara, this luxury lodge offers panoramic views of the savanna and exceptional wildlife viewing.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-stone-100 text-stone-700">
                    <Tent className="w-3 h-3 mr-1" /> Luxury Tents
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-stone-100 text-stone-700">
                    <Users className="w-3 h-3 mr-1" /> Private Balcony
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-stone-100 text-stone-700">
                    <Sunrise className="w-3 h-3 mr-1" /> Infinity Pool
                  </span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-xl overflow-hidden shadow-lg group relative"
              variants={scaleInVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&q=80" 
                  alt="Serengeti Safari Camp" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-1">Serengeti Safari Camp</h3>
                  <p className="text-white/80 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" /> Serengeti, Tanzania
                  </p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-700 mb-4">Experience the magic of the Serengeti from this exclusive safari camp, perfectly positioned for migration viewing.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-stone-100 text-stone-700">
                    <Tent className="w-3 h-3 mr-1" /> Luxury Tents
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-stone-100 text-stone-700">
                    <Users className="w-3 h-3 mr-1" /> Private Guide
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-stone-100 text-stone-700">
                    <Sunrise className="w-3 h-3 mr-1" /> Bush Dining
                  </span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-xl overflow-hidden shadow-lg group relative"
              variants={scaleInVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80" 
                  alt="Zanzibar Beach Resort" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-1">Zanzibar Luxury Resort</h3>
                  <p className="text-white/80 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" /> Zanzibar, Tanzania
                  </p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-700 mb-4">Unwind in paradise at this beachfront resort, offering pristine white sands, crystal-clear waters, and exceptional service.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-stone-100 text-stone-700">
                    <Palmtree className="w-3 h-3 mr-1" /> Beachfront
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-stone-100 text-stone-700">
                    <Waves className="w-3 h-3 mr-1" /> Private Pool
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-stone-100 text-stone-700">
                    <Sun className="w-3 h-3 mr-1" /> Spa Services
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              variants={fadeInUpVariants}
              className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4"
            >
              Guest Experiences
            </motion.h2>
            
            <motion.p 
              variants={fadeInUpVariants}
              className="text-lg text-stone-700 max-w-3xl mx-auto"
            >
              Hear from travelers who have experienced our Classic Kenya & Tanzania safari.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg relative"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="absolute -top-5 -right-5 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-amber-700 font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-stone-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Price Details Section */}
      <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleInVariants}
          >
            {/* Header with price */}
            <motion.div 
              className="bg-gradient-to-r from-amber-800 to-amber-600 rounded-t-2xl p-8 md:p-12 relative overflow-hidden shadow-xl"
              variants={fadeInUpVariants}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full -ml-10 -mb-10 blur-xl"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">Package Details</h2>
                  <p className="text-amber-100">All-inclusive luxury safari experience</p>
                </div>
                <div className="mt-6 md:mt-0 bg-white/20 backdrop-blur-sm px-6 py-4 rounded-xl">
                  <div className="text-5xl font-bold text-white">
                    $4,777 
                    <motion.span 
                      className="text-lg font-normal text-amber-100 block md:inline md:ml-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      per person
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Content area */}
            <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-b-2xl shadow-xl">
              {/* Inclusions */}
              <motion.div 
                className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-amber-100"
                variants={fadeInUpVariants}
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mr-4 shadow-md"
                    whileHover={{ rotate: 10, scale: 1.05 }}
                  >
                    <span className="text-lg font-bold">✓</span>
                  </motion.div>
                  <h3 className="text-2xl font-serif text-amber-900">Inclusions</h3>
                </div>
                
                <ul className="space-y-4">
                  {[
                    'All internal flights between destinations',
                    'Luxury accommodation throughout the safari',
                    'Expert guides and private game drives',
                    'All meals and selected beverages',
                    'Park and conservation fees',
                    'Airport transfers and ground transportation'
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mr-3 mt-0.5 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="text-stone-700 group-hover:text-amber-900 transition-colors">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Important Information */}
              <motion.div 
                className="p-8 md:p-12 bg-stone-50 rounded-br-2xl"
                variants={fadeInUpVariants}
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="w-12 h-12 bg-stone-200 text-stone-700 rounded-full flex items-center justify-center mr-4 shadow-md"
                    whileHover={{ rotate: -10, scale: 1.05 }}
                  >
                    <span className="text-lg font-bold">i</span>
                  </motion.div>
                  <h3 className="text-2xl font-serif text-stone-800">Important Information</h3>
                </div>
                
                <ul className="space-y-4">
                  {[
                    'International flights not included',
                    'Visa fees and travel insurance extra',
                    'Premium alcoholic beverages charged separately',
                    'Optional activities in Zanzibar available at additional cost',
                    'Minimum 2 travelers required for booking'
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start group"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mr-3">
                        <Info className="w-3 h-3" />
                      </span>
                      <span className="text-stone-600">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            {/* 8 Days Kenya & Tanzania Classic Safari Pricing */}
            <motion.div
              className="mt-12 bg-white rounded-xl overflow-hidden shadow-lg border border-amber-100"
              variants={fadeInUpVariants}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 px-8 py-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-white" />
                  <h3 className="text-2xl font-serif text-white">8 Days Kenya & Tanzania Classic Safari</h3>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-full">
                      <Calendar className="w-4 h-4 text-amber-600 mr-1.5" />
                      <span className="text-sm font-medium text-amber-800">8 Days</span>
                    </div>
                    <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-full">
                      <MapPin className="w-4 h-4 text-amber-600 mr-1.5" />
                      <span className="text-sm font-medium text-amber-800">Kenya & Tanzania</span>
                    </div>
                    <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-full">
                      <Binoculars className="w-4 h-4 text-amber-600 mr-1.5" />
                      <span className="text-sm font-medium text-amber-800">Classic Safari</span>
                    </div>
                  </div>
                </div>
                
                {/* Pricing Tabs */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-medium text-stone-800">Pricing Options</h4>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-amber-600" />
                      <span className="text-sm text-stone-600">USD</span>
                    </div>
                  </div>
                  
                  {/* Season Toggle */}
                  <div className="bg-stone-100 p-1 rounded-full flex mb-8">
                    <motion.button
                      className={`relative py-2.5 px-4 rounded-full text-sm font-medium flex-1 ${activePricingTab === 'low' ? 'bg-white text-amber-600 shadow-sm' : 'text-stone-600'}`}
                      onClick={() => setActivePricingTab('low')}
                      whileHover={activePricingTab !== 'low' ? { y: -1 } : {}}
                      whileTap={activePricingTab !== 'low' ? { y: 0 } : {}}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Sun className="w-4 h-4" />
                        Low Season (Jan-Jun)
                      </span>
                    </motion.button>
                    
                    <motion.button
                      className={`relative py-2.5 px-4 rounded-full text-sm font-medium flex-1 ${activePricingTab === 'peak' ? 'bg-white text-amber-600 shadow-sm' : 'text-stone-600'}`}
                      onClick={() => setActivePricingTab('peak')}
                      whileHover={activePricingTab !== 'peak' ? { y: -1 } : {}}
                      whileTap={activePricingTab !== 'peak' ? { y: 0 } : {}}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Star className="w-4 h-4" />
                        Peak Season (Jul-Dec)
                      </span>
                    </motion.button>
                  </div>
                  
                  {/* Low Season Pricing Cards */}
                  <AnimatePresence mode="wait">
                    {activePricingTab === 'low' && (
                      <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
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
                              <span className="text-3xl font-bold text-amber-600">$4,777</span>
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
                              <span className="text-3xl font-bold text-amber-600">$3,770</span>
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
                              <span className="text-3xl font-bold text-amber-600">$2,940</span>
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
                              <span className="text-3xl font-bold text-amber-600">$2,670</span>
                              <span className="text-sm text-stone-600 mb-1">pp</span>
                            </div>
                            <p className="text-xs text-stone-500">per person</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                    
                    {/* Peak Season Pricing Cards */}
                    {activePricingTab === 'peak' && (
                      <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
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
                              <span className="text-3xl font-bold text-amber-600">$4,976</span>
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
                              <span className="text-3xl font-bold text-amber-600">$4,220</span>
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
                              <span className="text-3xl font-bold text-amber-600">$3,340</span>
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
                              <span className="text-3xl font-bold text-amber-600">$3,050</span>
                              <span className="text-sm text-stone-600 mb-1">pp</span>
                            </div>
                            <p className="text-xs text-stone-500">per person</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div 
              className="mt-8"
              variants={fadeInUpVariants}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
            >
              <motion.button
                className="w-full py-5 bg-gradient-to-r from-amber-700 to-amber-500 text-white rounded-xl font-medium shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 overflow-hidden relative group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                <span className="relative flex items-center text-lg font-semibold">
                  Reserve Your Safari
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ClassicKenyaTanzania;
