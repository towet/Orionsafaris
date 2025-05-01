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
  Camera,
  Mountain,
  Bird,
  Users,
  Droplets
} from 'lucide-react';
import BookingModal from '../components/BookingModal';
import RequestItineraryModal from '../components/RequestItineraryModal';

const DayToursV2 = () => {
  // Animation controls
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  // State for destination selection
  const [selectedDestination, setSelectedDestination] = useState<'lake-nakuru' | 'amboseli'>('lake-nakuru');

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSafariPackage, setSelectedSafariPackage] = useState('Day Tour - Lake Nakuru');

  // Request itinerary modal state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestPackageName, setRequestPackageName] = useState('');

  // Update selected safari package when destination changes
  useEffect(() => {
    if (selectedDestination === 'lake-nakuru') {
      setSelectedSafariPackage('Day Tour - Lake Nakuru');
    } else {
      setSelectedSafariPackage('Day Tour - Amboseli');
    }
  }, [selectedDestination]);

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

  // Tour data
  const destinations = {
    'lake-nakuru': {
      name: 'Lake Nakuru National Park',
      description: "Pick your perfect day-trip adventure: hand-feed massive flocks of pink flamingos and track endangered rhinos at Lake Nakuru, or witness vast elephant herds framed by Mount Kilimanjaro's snowy peak in Amboseli—each with expert guiding, park fees and comfortable transport included.",
      image: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80',
      highlights: [
        {
          title: "Flamingo Spectacle at Lake Nakuru",
          description: "Marvel at up to 1.5 million pink flamingos lining the alkaline shores—the world's greatest bird spectacle",
          icon: Bird
        },
        {
          title: "Rhino Tracking in Nakuru",
          description: "Search for both black and white rhinos in their sanctuary, one of the only parks where you can reliably spot these endangered species",
          icon: Search
        },
        {
          title: "400+ Bird Species",
          description: "Over 400 bird species—including pelicans, cormorants and kingfishers—thrive in Lake Nakuru's woodlands and wetlands",
          icon: Bird
        },
        {
          title: "Maasai Community Visit",
          description: "Meet Maasai pastoralists en route—learn about traditional beadwork, spear-throwing and cattle-herding customs",
          icon: Users
        }
      ]
    },
    'amboseli': {
      name: 'Amboseli National Park',
      description: "Pick your perfect day-trip adventure: hand-feed massive flocks of pink flamingos and track endangered rhinos at Lake Nakuru, or witness vast elephant herds framed by Mount Kilimanjaro's snowy peak in Amboseli—each with expert guiding, park fees and comfortable transport included.",
      image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      highlights: [
        {
          title: "Iconic Kilimanjaro Views",
          description: "Capture Africa's highest summit mirrored in Amboseli's swamps—one of the park's most photographed scenes",
          icon: Mountain
        },
        {
          title: "Elephant Herds",
          description: "Witness vast elephant herds with some of the largest tuskers remaining in Africa, against the backdrop of Mount Kilimanjaro",
          icon: Search
        },
        {
          title: "Diverse Ecosystems",
          description: "Experience five different habitats ranging from the dried-up bed of Lake Amboseli to wetlands with sulphur springs",
          icon: Droplets
        },
        {
          title: "Maasai Community Visit",
          description: "Meet Maasai pastoralists en route—learn about traditional beadwork, spear-throwing and cattle-herding customs",
          icon: Users
        }
      ]
    }
  };

  // Get current destination data
  const currentDestination = destinations[selectedDestination];

  // Tour packages
  const packages = [
    {
      title: "Group Tour (6+ people)",
      price: "$180",
      description: "Perfect for budget travelers and social experiences",
      features: ["Shared 4x4 safari vehicle", "Professional guide", "Park entrance fees", "Bottled water"]
    },
    {
      title: "Private Tour (2-5 people)",
      price: "$250",
      description: "Exclusive experience with personalized attention",
      features: ["Private 4x4 safari vehicle", "Professional guide", "Park entrance fees", "Bottled water"]
    },
    {
      title: "Luxury Option",
      price: "$350",
      description: "Premium experience with added comforts",
      features: ["Luxury 4x4 safari vehicle", "Expert guide", "Park entrance fees", "Gourmet picnic lunch", "Premium binoculars"]
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
              src={currentDestination.image}
              alt={currentDestination.name}
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
                One-Day Safari Experience
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6"
            >
              {selectedDestination === 'lake-nakuru' ? 'Lake Nakuru' : 'Amboseli'}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl"
            >
              Experience the beauty of Kenya's wildlife in just one unforgettable day.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span className="text-white">1 Day</span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span className="text-white">{currentDestination.name}</span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-amber-400" />
                <span className="text-white">5-Star Experience</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
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

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button
                className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSafariPackage(`Day Tour - ${selectedDestination === 'lake-nakuru' ? 'Lake Nakuru' : 'Amboseli'}`);
                  setIsBookingModalOpen(true);
                }}
              >
                <span>Book Your Day Safari</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setRequestPackageName(`Day Tour - ${selectedDestination === 'lake-nakuru' ? 'Lake Nakuru' : 'Amboseli'}`);
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
              {currentDestination.name}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-black max-w-3xl mx-auto"
            >
              {currentDestination.description}
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">Wildlife Viewing</a>
              <a className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">Photography</a>
              <a className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">Day Trip</a>
              <a className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">Cultural Experience</a>
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {currentDestination.highlights.map((highlight, index) => (
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
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6">Tour Packages</h2>
            <p className="text-lg text-stone-600">Choose the perfect package for your day safari adventure</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <div>
                      <p className="text-stone-500">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-amber-700">{pkg.price}</div>
                      <div className="text-sm text-stone-500">per person</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="font-medium text-amber-900 mb-3">Package Includes:</h5>
                    <ul className="space-y-2">
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
                        setSelectedSafariPackage(`${pkg.title} - ${selectedDestination === 'lake-nakuru' ? 'Lake Nakuru' : 'Amboseli'}`);
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
                        setRequestPackageName(`${pkg.title} - ${selectedDestination === 'lake-nakuru' ? 'Lake Nakuru' : 'Amboseli'}`);
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
            src={currentDestination.image}
            alt={currentDestination.name}
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
              Ready for Your Day Safari?
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/90 mb-10"
            >
              Book your day safari adventure today and experience Kenya's incredible wildlife in just one unforgettable day.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="px-8 py-4 bg-white text-amber-900 rounded-full font-medium hover:bg-amber-100 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSafariPackage(`Day Tour - ${selectedDestination === 'lake-nakuru' ? 'Lake Nakuru' : 'Amboseli'}`);
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
                    setRequestPackageName(`Day Tour - ${selectedDestination === 'lake-nakuru' ? 'Lake Nakuru' : 'Amboseli'}`);
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

export default DayToursV2;
