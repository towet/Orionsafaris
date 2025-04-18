import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
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
  Search as Binoculars
} from 'lucide-react';

const MigrationSafari = () => {
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

  // Safari itinerary data
  const itineraryData = [
    {
      day: 1,
      title: "Nairobi to Maasai Mara",
      description: "Depart from Nairobi and journey through the scenic Great Rift Valley to the renowned Maasai Mara National Reserve.",
      icon: Compass,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
    },
    {
      day: 2,
      title: "Explore Maasai Mara (Day 1)",
      description: "Engage in thrilling game drives to observe the Big Five and the dramatic river crossings of the Great Migration.",
      icon: Binoculars,
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80"
    },
    {
      day: 3,
      title: "Explore Maasai Mara (Day 2)",
      description: "Continue exploring the Maasai Mara with more game drives and opportunities to witness the migration.",
      icon: Camera,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
    },
    {
      day: 4,
      title: "Maasai Mara to Serengeti",
      description: "Cross into Tanzania, transitioning seamlessly into the vast plains of the Serengeti National Park.",
      icon: MapPin,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
    },
    {
      day: 5,
      title: "Discover Serengeti (Day 1)",
      description: "Delve into the heart of the Serengeti with extensive game drives, capturing the essence of its diverse wildlife and landscapes.",
      icon: Sunrise,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
    },
    {
      day: 6,
      title: "Discover Serengeti (Day 2)",
      description: "Continue exploring the Serengeti, focusing on different areas and wildlife habitats.",
      icon: Tent,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
    },
    {
      day: 7,
      title: "Serengeti to Arusha",
      description: "Conclude your safari with a scenic drive to Arusha, reflecting on an unforgettable adventure.",
      icon: Compass,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
    }
  ];

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
                <div className="text-2xl font-bold">$$4,999</div>
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
      
      {/* Itinerary Section */}
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
              Follow the journey of the Great Migration through Kenya and Tanzania with our carefully crafted itinerary.
            </motion.p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            {itineraryData.map((day, index) => (
              <motion.div 
                key={index}
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
              >
                {index < itineraryData.length - 1 && (
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
                  
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex-grow">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img 
                          src={day.image} 
                          alt={day.title} 
                          className="w-full h-full object-cover md:h-64"
                        />
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
                          <span className="font-medium">Day {day.day} Highlight</span>
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
      
      {/* Gallery Section */}
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
              Visual Journey
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-6"
            >
              Safari Gallery
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-black max-w-3xl mx-auto"
            >
              Preview the breathtaking landscapes and wildlife encounters awaiting you on this extraordinary safari.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl shadow-lg group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <img 
                  src={`https://images.unsplash.com/photo-${1516426122078 + index * 1000}-c23e76319801?auto=format&fit=crop&q=80`} 
                  alt={`Safari Gallery ${item}`} 
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <h4 className="text-white font-bold text-lg">Wildlife Encounter {item}</h4>
                    <p className="text-white/80">Maasai Mara, Kenya</p>
                  </div>
                </div>
              </motion.div>
            ))}
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
              >
                <span>Book Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Download Itinerary</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MigrationSafari;
