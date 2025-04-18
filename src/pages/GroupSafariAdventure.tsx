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
  Check
} from 'lucide-react';

const GroupSafariAdventure = () => {
  // State for package selection
  const [selectedPackage, setSelectedPackage] = useState<'five-day' | 'seven-day'>('five-day');
  
  // Animation controls
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  
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
                <span className="text-white">5-7 Days</span>
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
                <span className="text-white">$$2,999 / person</span>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="inline-block">
                <motion.button
                  className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedPackage === 'five-day' ? 'bg-amber-600 text-white shadow-md' : 'text-amber-900 hover:bg-amber-200'}`}
                onClick={() => setSelectedPackage('five-day')}
              >
                5-Day Safari
              </button>
              <button 
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedPackage === 'seven-day' ? 'bg-amber-600 text-white shadow-md' : 'text-amber-900 hover:bg-amber-200'}`}
                onClick={() => setSelectedPackage('seven-day')}
              >
                7-Day Safari
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
                    <div className="text-2xl font-bold">$$2,999</div>
                    <div className="text-sm">per person</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">
                    5 Days Lake Manyara, Serengeti and Ngorongoro Group Safari
                  </h3>
                  
                  <p className="text-lg text-black mb-6">
                    Embark on an exhilarating 5-day journey through Tanzania's premier wildlife destinations: Lake Manyara, Serengeti National Park, and the Ngorongoro Crater. Travel in comfort aboard custom-designed 4×4 safari vehicles, each equipped with a pop-up roof for optimal game viewing.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {safariFeatures.map((feature, index) => (
                      <motion.div 
                        key={index}
                        className="flex gap-4 items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-amber-900">{feature.title}</h4>
                          <p className="text-black">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.a
                    href="#itinerary"
                    className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 inline-flex"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
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
                    alt="7-Day Safari" 
                    className="w-full h-auto rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white px-6 py-4 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold">$$3,999</div>
                    <div className="text-sm">per person</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">
                    7 Days Extended Tanzania Group Safari
                  </h3>
                  
                  <p className="text-lg text-black mb-6">
                    Immerse yourself in the wonders of Tanzania with our comprehensive 7-day safari experience. This extended journey allows for deeper exploration of the Serengeti ecosystem and additional time to witness the incredible wildlife of Tanzania's northern circuit.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {safariFeatures.map((feature, index) => (
                      <motion.div 
                        key={index}
                        className="flex gap-4 items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-amber-900">{feature.title}</h4>
                          <p className="text-black">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.a
                    href="#itinerary"
                    className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 inline-flex"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
              Day by Day Experience
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6"
            >
              5-Day Safari Itinerary
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-black max-w-3xl mx-auto"
            >
              Experience the Essence of Tanzania with our carefully crafted 5-day Northern Circuit Safari.
            </motion.p>
          </motion.div>
          
          {/* Day 1 */}
          <motion.div 
            className="max-w-5xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <div className="relative">
              <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-amber-200 z-0" />
              
              <motion.div 
                className="relative z-10 flex gap-6 mb-12"
                variants={fadeInUpVariants}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex-grow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <motion.img 
                        src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80" 
                        alt="Arusha to Lake Manyara" 
                        className="w-full h-full object-cover md:h-64"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    <div className="p-6 md:w-2/3">
                      <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">
                        Arusha to Lake Manyara National Park
                      </h3>
                      
                      <p className="text-black mb-4">
                        Depart from Arusha and journey to Lake Manyara National Park. Enjoy a game drive in this lush park, renowned for its tree-climbing lions and diverse birdlife.
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-4">
                        <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>Lake Manyara</span>
                        </div>
                        <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                          <Compass className="w-4 h-4" />
                          <span>Game Drive</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Day 2 */}
            <div className="relative">
              <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-amber-200 z-0" />
              
              <motion.div 
                className="relative z-10 flex gap-6 mb-12"
                variants={fadeInUpVariants}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex-grow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <motion.img 
                        src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80" 
                        alt="Lake Manyara to Serengeti" 
                        className="w-full h-full object-cover md:h-64"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    <div className="p-6 md:w-2/3">
                      <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">
                        Lake Manyara to Serengeti National Park
                      </h3>
                      
                      <p className="text-black mb-4">
                        Travel to the Serengeti via the Ngorongoro Conservation Area. Arrive in the Serengeti for an afternoon game drive, exploring its vast plains and abundant wildlife.
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-4">
                        <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>Serengeti</span>
                        </div>
                        <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                          <Binoculars className="w-4 h-4" />
                          <span>Wildlife Viewing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Day 3 */}
            <div className="relative">
              <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-amber-200 z-0" />
              
              <motion.div 
                className="relative z-10 flex gap-6 mb-12"
                variants={fadeInUpVariants}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex-grow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <motion.img 
                        src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80" 
                        alt="Full Day in Serengeti" 
                        className="w-full h-full object-cover md:h-64"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    <div className="p-6 md:w-2/3">
                      <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">
                        Full Day in Serengeti National Park
                      </h3>
                      
                      <p className="text-black mb-4">
                        Spend the day exploring the Serengeti's diverse ecosystems. Track the movements of the Great Migration and search for the Big Five.
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-4">
                        <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                          <Sunrise className="w-4 h-4" />
                          <span>Sunrise Game Drive</span>
                        </div>
                        <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                          <Camera className="w-4 h-4" />
                          <span>Photography</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Day 4 */}
            <div className="relative">
              <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-amber-200 z-0" />
              
              <motion.div 
                className="relative z-10 flex gap-6 mb-12"
                variants={fadeInUpVariants}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex-grow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <motion.img 
                        src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80" 
                        alt="Serengeti to Ngorongoro" 
                        className="w-full h-full object-cover md:h-64"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    <div className="p-6 md:w-2/3">
                      <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">
                        Serengeti to Ngorongoro Conservation Area
                      </h3>
                      
                      <p className="text-black mb-4">
                        Embark on a morning game drive as you exit the Serengeti, heading towards the Ngorongoro Conservation Area. Optional stop at Olduvai Gorge to learn about early human history. Arrive at your lodge or camp perched on the crater rim, offering stunning views.
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-4">
                        <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>Ngorongoro</span>
                        </div>
                        <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                          <Mountain className="w-4 h-4" />
                          <span>Crater Views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Day 5 */}
            <div className="relative">
              <motion.div 
                className="relative z-10 flex gap-6"
                variants={fadeInUpVariants}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg">
                    5
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex-grow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <motion.img 
                        src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80" 
                        alt="Ngorongoro Crater to Arusha" 
                        className="w-full h-full object-cover md:h-64"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    <div className="p-6 md:w-2/3">
                      <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">
                        Ngorongoro Crater to Arusha
                      </h3>
                      
                      <p className="text-black mb-4">
                        Descend into the Ngorongoro Crater for a half-day game drive in this UNESCO World Heritage Site, renowned for its dense wildlife population. After a picnic lunch, ascend the crater and return to Arusha, concluding your safari adventure.
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-4">
                        <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                          <Binoculars className="w-4 h-4" />
                          <span>Crater Game Drive</span>
                        </div>
                        <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm">
                          <Utensils className="w-4 h-4" />
                          <span>Picnic Lunch</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Download Full Itinerary</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
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
    </div>
  );
};

export default GroupSafariAdventure;
