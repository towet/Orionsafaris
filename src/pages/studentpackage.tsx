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
  MapPin,
  BookOpen,
  Backpack,
  Users,
  Camera,
  Mountain
} from 'lucide-react';
import BookingModal from '../components/BookingModal';
import RequestItineraryModal from '../components/RequestItineraryModal';

const StudentPackage = () => {
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
      title: "Nairobi National Park Intro",
      description: "Launch your journey just 7 km from Nairobi's heart—spot rhinos, lions, buffalo and over 400 bird species against the city skyline",
      icon: Search
    },
    {
      title: "Giraffe Centre Feeding",
      description: "Hand-feed endangered Rothschild giraffes from a raised platform at Lang'ata's Giraffe Centre, supporting vital conservation education",
      icon: Mountain
    },
    {
      title: "Maasai Mara Great Migration",
      description: "Spend three days tracking 1.5 million wildebeest, zebras and gazelles as they thunder across the Mara River (July–October) in one of nature's grandest spectacles",
      icon: Camera
    },
    {
      title: "Big Five & Classic Game Drives",
      description: "Search for lions, elephants, leopards, buffalo and rhinos on open-roof 4×4 drives through Maasai Mara and Tsavo's red-earth plains",
      icon: Search
    },
    {
      title: "Amboseli Elephant Encounters",
      description: "Witness over 1,000 elephants in Amboseli National Park with Kilimanjaro's snow-capped peak as your backdrop during morning and evening drives",
      icon: Mountain
    },
    {
      title: "Tsavo's Wild Diversity",
      description: "Explore Tsavo East's dramatic landscapes—home to lion prides, giraffe herds and the famed \"red elephants\" dust-bathing in ochre soil",
      icon: Sunrise
    },
    {
      title: "Flamingo Spectacle at Lake Nakuru",
      description: "Gaze upon millions of pink flamingos along the alkaline shores of Lake Nakuru, and track black and white rhinos in this UNESCO Biosphere Reserve",
      icon: Camera
    },
    {
      title: "Hippo Boat Cruise on Lake Naivasha",
      description: "Drift among hippo pods and fish eagles on a scenic boat trip, and stroll Papyrus-lined shores in search of otters and birdlife",
      icon: Search
    },
    {
      title: "Small-Group Student Focus",
      description: "Group sizes capped at 12 for intimate learning, interpretation, and a supportive atmosphere on every drive and excursion",
      icon: Users
    },
    {
      title: "All-Inclusive Student Pricing",
      description: "Covers park fees, group 4×4 transport, boat cruise, accommodation (mid-range lodges & camps), meals, and conservation levies—no hidden costs",
      icon: Tent
    }
  ];

  // Student packages
  const packages = [
    {
      title: "2 Days Nairobi National Park & Giraffe Center",
      price: "$250",
      description: "A perfect weekend getaway for students to experience wildlife without leaving the city",
      features: ["City-based safari", "Giraffe feeding", "Educational talks", "Transport included"]
    },
    {
      title: "3 Days Maasai Mara Budget Safari",
      price: "$450",
      description: "Experience the iconic Maasai Mara on a student-friendly budget with shared accommodation",
      features: ["Great Migration viewing", "Big Five game drives", "Cultural village visit", "All meals included"]
    },
    {
      title: "4 Days Amboseli & Tsavo Safari",
      price: "$650",
      description: "Combine two of Kenya's most diverse parks with spectacular views of Mt. Kilimanjaro",
      features: ["Elephant encounters", "Red elephant viewing", "Kilimanjaro backdrop", "Mid-range accommodation"]
    },
    {
      title: "5 Days Lake Nakuru, Maasai Mara & Naivasha",
      price: "$750",
      description: "The ultimate student safari experience combining lakes, plains and incredible wildlife",
      features: ["Flamingo viewing", "Boat safari", "Big Five game drives", "Comprehensive package"]
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
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
              alt="Student Safari"
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
                Educational Safari Experience
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6"
            >
              Student Package
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl"
            >
              Affordable, educational safari experiences designed specifically for students exploring Kenya's wildlife and landscapes.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span className="text-white">2-5 Days</span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span className="text-white">Multiple Destinations</span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span className="text-white">Educational Focus</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button
                className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSafariPackage('Student Safari Package');
                  setIsBookingModalOpen(true);
                }}
              >
                <span>Book Student Safari</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setRequestPackageName('Student Safari Package');
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
              Day Student Discovery Safari
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-black max-w-3xl mx-auto"
            >
              Embark on a budget-friendly journey through Kenya's most captivating landscapes: urban safaris in Nairobi National Park, close encounters at the Giraffe Centre, the epic Great Migration in Maasai Mara, elephant spectacles in Amboseli, red-soil drives in Tsavo, pink-flamingo lakeside at Nakuru, and tranquil boat rides on Lake Naivasha—all with expert student-focused guiding and fully inclusive fees.
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">Student Friendly</a>
              <a className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">Educational</a>
              <a className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">Budget Safari</a>
              <a className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">Wildlife Experience</a>
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
              Educational Experiences
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

      {/* Packages Section */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6">Student Safari Packages</h2>
            <p className="text-lg text-stone-600">Affordable safari experiences designed specifically for students</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.map((pkg, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUpVariants}
              >
                <div className={`bg-amber-${900 - index * 100} text-white p-6`}>
                  <h3 className="text-2xl font-bold">{pkg.title}</h3>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6 pb-6 border-b border-amber-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <Backpack className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium text-amber-900">Student Package</h4>
                        <p className="text-stone-500">{pkg.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-amber-700">{pkg.price}</div>
                      <div className="text-sm text-stone-500">per student</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="font-medium text-amber-900 mb-3">Package Features:</h5>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <span className="text-stone-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      className="flex-1 py-4 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedSafariPackage(pkg.title);
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
                        setRequestPackageName(pkg.title);
                        setIsRequestModalOpen(true);
                      }}
                    >
                      <span>Request Itinerary</span>
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
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
              Ready for Your Educational Safari?
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/90 mb-10"
            >
              Book your student safari adventure today and experience Kenya's incredible wildlife and landscapes at student-friendly prices.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="px-8 py-4 bg-white text-amber-900 rounded-full font-medium hover:bg-amber-100 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSafariPackage('Student Safari Package');
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
                    setRequestPackageName('Student Safari Package');
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

export default StudentPackage;