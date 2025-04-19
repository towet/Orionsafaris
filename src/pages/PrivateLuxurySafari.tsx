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
  Coffee,
  Search as Binoculars,
  Heart,
  Award,
  Utensils,
  Wifi,
  Sunset,
  Globe
} from 'lucide-react';
import BookingModal from '../components/BookingModal';

const PrivateLuxurySafari = () => {
  // Animation controls
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const [activeTab, setActiveTab] = useState('maasai');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSafariPackage, setSelectedSafariPackage] = useState('Private Luxury Safari');
  
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

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Safari itinerary data for Maasai Mara
  const maasaiMaraItinerary = [
    {
      day: 1,
      title: "Nairobi to Maasai Mara",
      description: "After breakfast, depart from Nairobi and journey through the scenic Great Rift Valley to the renowned Maasai Mara National Reserve. Enjoy a game drive en route to your luxury camp.",
      icon: Compass,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
    },
    {
      day: 2,
      title: "Full Day in Maasai Mara",
      description: "Spend a full day exploring the Maasai Mara with morning and afternoon game drives. Search for the Big Five and witness the incredible biodiversity of this world-famous reserve.",
      icon: Binoculars,
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80"
    },
    {
      day: 3,
      title: "Maasai Mara to Nairobi",
      description: "After a final morning game drive and breakfast, depart for Nairobi, arriving in the late afternoon with memories to last a lifetime.",
      icon: Camera,
      image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80"
    }
  ];

  // Safari itinerary data for Amboseli
  const amboseliItinerary = [
    {
      day: 1,
      title: "Nairobi to Amboseli",
      description: "Depart from Nairobi after breakfast and travel to Amboseli National Park, known for its spectacular views of Mount Kilimanjaro. Enjoy an afternoon game drive.",
      icon: Compass,
      image: "https://images.unsplash.com/photo-1504173010664-32509aeebb62?auto=format&fit=crop&q=80"
    },
    {
      day: 2,
      title: "Full Day in Amboseli",
      description: "Spend a full day exploring Amboseli with morning and afternoon game drives. Look for the park's famous elephant herds against the backdrop of Africa's highest mountain.",
      icon: Binoculars,
      image: "https://images.unsplash.com/photo-1682686581362-796145f0e123?auto=format&fit=crop&q=80"
    },
    {
      day: 3,
      title: "Amboseli to Nairobi",
      description: "After a final morning game drive and breakfast, return to Nairobi, arriving in the late afternoon with incredible memories and photographs.",
      icon: Camera,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
    }
  ];

  // Safari highlights
  const highlights = [
    {
      title: "Private Safari Experience",
      description: "Enjoy the exclusivity of a private safari vehicle and guide, allowing for a personalized and intimate wildlife experience.",
      icon: Users
    },
    {
      title: "Luxury Accommodations",
      description: "Stay in premium lodges and tented camps that blend authentic safari experience with modern comforts and amenities.",
      icon: Tent
    },
    {
      title: "Professional Photography",
      description: "Capture stunning wildlife moments with guidance from our professional photography guides.",
      icon: Camera
    },
    {
      title: "Gourmet Dining",
      description: "Indulge in exquisite cuisine prepared by private chefs using fresh, local ingredients.",
      icon: Utensils
    }
  ];

  // Luxury amenities
  const luxuryAmenities = [
    {
      title: "Private Butler Service",
      description: "Dedicated butler to cater to your every need throughout your stay.",
      icon: Coffee
    },
    {
      title: "Spa Treatments",
      description: "Rejuvenating spa treatments available in the comfort of your accommodation.",
      icon: Heart
    },
    {
      title: "Premium Wifi",
      description: "Stay connected with high-speed internet access even in remote locations.",
      icon: Wifi
    },
    {
      title: "Sundowner Experiences",
      description: "Exclusive sunset cocktails in breathtaking locations across the savannah.",
      icon: Sunset
    },
    {
      title: "Cultural Experiences",
      description: "Private visits to authentic Maasai villages for cultural immersion.",
      icon: Globe
    },
    {
      title: "Award-Winning Guides",
      description: "Expert guides with extensive knowledge of wildlife, ecology, and photography.",
      icon: Award
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
              src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80" 
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
            
            <motion.div variants={itemVariants}>
              <div className="inline-block">
                <motion.button
                  className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedSafariPackage('Private Luxury Safari - Maasai Mara');
                    setIsBookingModalOpen(true);
                  }}
                >
                  <span>Book Your Private Safari</span>
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
              Exclusive Private Safaris
              <span className="block text-xl md:text-2xl text-amber-600 mt-2">Maasai Mara & Amboseli</span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-black mb-8"
            >
              Embark on an exclusive 3-day, 2-night private safari to Kenya's renowned wildlife destinations. Choose between the iconic Maasai Mara National Reserve or the majestic Amboseli National Park with Mount Kilimanjaro as your backdrop. These adventures offer intimate encounters with Africa's iconic wildlife, including the Big Five, amidst breathtaking landscapes.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                Private safari vehicle
              </span>
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                Luxury accommodations
              </span>
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                Gourmet dining
              </span>
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                Cultural experiences
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
                src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80" 
                alt="Luxury Safari Experience" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white px-6 py-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">$5,999</div>
                <div className="text-sm">per person</div>
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
      
      {/* Destinations Tabs Section */}
      <section className="py-20 bg-amber-50">
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
              Choose Your Destination
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6"
            >
              Two Iconic Destinations
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-black max-w-3xl mx-auto mb-12"
            >
              Select between two of Kenya's most magnificent safari destinations, each offering unique wildlife experiences and breathtaking landscapes.
            </motion.p>
            
            <div className="flex justify-center mb-12">
              <motion.div 
                className="inline-flex bg-white rounded-full p-1 shadow-md"
                variants={scaleUpVariants}
              >
                <button 
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${activeTab === 'maasai' ? 'bg-amber-600 text-white' : 'text-amber-900 hover:bg-amber-100'}`}
                  onClick={() => setActiveTab('maasai')}
                >
                  Maasai Mara Safari
                </button>
                <button 
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${activeTab === 'amboseli' ? 'bg-amber-600 text-white' : 'text-amber-900 hover:bg-amber-100'}`}
                  onClick={() => setActiveTab('amboseli')}
                >
                  Amboseli Safari
                </button>
              </motion.div>
            </div>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {activeTab === 'maasai' ? (
              <motion.div
                key="maasai"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">Maasai Mara National Reserve</h3>
                  <p className="text-black mb-6">
                    Experience the iconic Maasai Mara, home to the Great Migration and the Big Five. This world-renowned reserve offers unparalleled wildlife viewing opportunities and stunning savannah landscapes.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-3 h-3 text-white" />
                      </span>
                      <span>Home to all of the Big Five</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-3 h-3 text-white" />
                      </span>
                      <span>Witness the Great Migration (seasonal)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-3 h-3 text-white" />
                      </span>
                      <span>Authentic Maasai cultural experiences</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-3 h-3 text-white" />
                      </span>
                      <span>Luxury tented camps and lodges</span>
                    </li>
                  </ul>
                  <motion.button
                    className="px-6 py-3 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedSafariPackage('Private Luxury Safari - Maasai Mara');
                      setIsBookingModalOpen(true);
                    }}
                  >
                    <span>View Detailed Itinerary</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80" 
                    alt="Maasai Mara" 
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl flex items-end">
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-white mb-2">
                        <MapPin className="w-5 h-5" />
                        <span className="font-medium">Maasai Mara, Kenya</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-white ml-1">5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="amboseli"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">Amboseli National Park</h3>
                  <p className="text-black mb-6">
                    Discover Amboseli National Park, famous for its large elephant herds and stunning views of Mount Kilimanjaro. This park offers a unique safari experience with diverse ecosystems and abundant wildlife.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-3 h-3 text-white" />
                      </span>
                      <span>Spectacular views of Mount Kilimanjaro</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-3 h-3 text-white" />
                      </span>
                      <span>Famous for large elephant herds</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-3 h-3 text-white" />
                      </span>
                      <span>Diverse bird species in wetland areas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-3 h-3 text-white" />
                      </span>
                      <span>Premium lodges with mountain views</span>
                    </li>
                  </ul>
                  <motion.button
                    className="px-6 py-3 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedSafariPackage('Private Luxury Safari - Amboseli');
                      setIsBookingModalOpen(true);
                    }}
                  >
                    <span>View Detailed Itinerary</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1682686581362-796145f0e123?auto=format&fit=crop&q=80" 
                    alt="Amboseli" 
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl flex items-end">
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-white mb-2">
                        <MapPin className="w-5 h-5" />
                        <span className="font-medium">Amboseli, Kenya</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-white ml-1">5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Itinerary Section */}
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
              Day by Day
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6"
            >
              Safari Itinerary
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-black max-w-3xl mx-auto"
            >
              Experience the perfect blend of adventure and luxury with our carefully crafted itinerary.
            </motion.p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            {(activeTab === 'maasai' ? maasaiMaraItinerary : amboseliItinerary).map((day, index) => (
              <motion.div 
                key={index}
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
              >
                {index < (activeTab === 'maasai' ? maasaiMaraItinerary : amboseliItinerary).length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-amber-200 z-0" />
                )}
                
                <motion.div 
                  className="relative z-10 flex gap-6 mb-12"
                  variants={fadeInUpVariants}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg">
                      {day.day}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex-grow hover:shadow-xl transition-shadow duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3 relative overflow-hidden">
                        <motion.img 
                          src={day.image} 
                          alt={day.title} 
                          className="w-full h-full object-cover md:h-64"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4">
                            <span className="text-white font-medium">Day {day.day} Highlight</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 md:w-2/3">
                        <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">
                          {day.title}
                        </h3>
                        
                        <p className="text-black mb-4">
                          {day.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-amber-600">
                          <day.icon className="w-5 h-5" />
                          <span className="font-medium">Day {day.day} Experience</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Luxury Amenities Section */}
      <section className="py-20 bg-amber-50">
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
              Exclusive Benefits
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6"
            >
              Luxury Amenities
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-black max-w-3xl mx-auto"
            >
              Indulge in premium services and amenities designed to elevate your safari experience to unprecedented levels of comfort and luxury.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {luxuryAmenities.map((amenity, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={scaleUpVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-6 mx-auto">
                  <amenity.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3 text-center">{amenity.title}</h3>
                <p className="text-black text-center">{amenity.description}</p>
              </motion.div>
            ))}
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
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 relative"
              variants={fadeInUpVariants}
              whileHover={{ y: -10 }}
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">&ldquo;</span>
              </div>
              <div className="pt-4">
                <p className="text-black mb-6 italic">"Our private safari exceeded all expectations. The attention to detail, from our knowledgeable guide to the luxurious accommodations, made this trip truly unforgettable."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80" alt="Sarah Johnson" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900">Sarah Johnson</h4>
                    <p className="text-sm text-black">New York, USA</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 relative"
              variants={fadeInUpVariants}
              whileHover={{ y: -10 }}
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">&ldquo;</span>
              </div>
              <div className="pt-4">
                <p className="text-black mb-6 italic">"The private safari to Amboseli was magical. Watching elephants with Kilimanjaro in the background while sipping champagne is an experience I'll cherish forever."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80" alt="David Chen" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900">David Chen</h4>
                    <p className="text-sm text-black">Singapore</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 relative"
              variants={fadeInUpVariants}
              whileHover={{ y: -10 }}
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">&ldquo;</span>
              </div>
              <div className="pt-4">
                <p className="text-black mb-6 italic">"The private butler service and gourmet dining in the middle of the Maasai Mara was beyond anything I could have imagined. A perfect blend of wilderness and luxury."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80" alt="Emma Thompson" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900">Emma Thompson</h4>
                    <p className="text-sm text-black">London, UK</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-amber-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80" 
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
              Ready for Your Luxury Safari Adventure?
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/90 mb-10"
            >
              Book your private safari experience today and discover the perfect blend of adventure and luxury in Africa's most iconic wildlife destinations.
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
                <span>Book Your Safari</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Download Brochure</span>
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
    </div>
  );
};

export default PrivateLuxurySafari;
