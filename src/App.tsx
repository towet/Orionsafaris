import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Compass, Option as Lion, Calendar, Users, ChevronRight, Menu, X, MapPin, Star, Camera, Coffee, Beef as Jeep, Binary as Binoculars, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Youtube, CheckCircle, AlertCircle } from 'lucide-react';
import logo from './assets/logo.png';

// Import custom components
import ScrollIndicator from './components/ScrollIndicator';
import ScrollToTop from './components/ScrollToTop';
import MobileNav from './components/MobileNav';
import ImagePreloader from './components/ImagePreloader';
import BookingModal from './components/BookingModal';
import FloatingChatButton from './components/FloatingChatButton';

// Import pages
import HomePage from './pages/HomePage';
import ClassicKenyaTanzania from './pages/ClassicKenyaTanzania';
import SerengetiNgorongoroSafari from './pages/studentpackage';
import MigrationSafari from './pages/MigrationSafari';
import GroupSafariAdventure from './pages/GroupSafariAdventure';
import PrivateLuxurySafariV2 from './pages/PrivateLuxurySafariV2';
import DayToursV2 from './pages/DayToursV2';

// Import animation utilities
import { scrollToElement } from './utils/animations';

function App() {
  // State management
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null); // Used in booking form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    package: '',
    subject: '',
    message: ''
  });
  
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSafariPackage, setSelectedSafariPackage] = useState('');
  
  // Define data arrays first
  // Safari packages data
  const packages = [
    {
      title: "Migration Safaris",
      subtitle: "Maasai Mara & Serengeti",
      duration: "8 Days",
      price: "$4,999",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1500&q=80",
      description: "Witness the great migration across the African plains.",
      highlights: ["Witness wildebeest migration", "Luxury camping", "Professional photography", "Cultural visits"]
    },
    {
      title: "Classic Kenya & Tanzania",
      subtitle: "Dual Country Experience",
      duration: "6 Days",
      price: "$3,499",
      image: "https://images.unsplash.com/photo-1504173010664-32509aeebb62?auto=format&fit=crop&w=1500&q=80",
      description: "Experience the best of both countries in one journey.",
      highlights: ["Big Five sightings", "Cross-border adventure", "Local cuisine", "Expert guides"]
    },
    {
      title: "Group Safari Adventure",
      subtitle: "Lake Manyara & Serengeti",
      duration: "7 Days",
      price: "$2,999",
      image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1500&q=80",
      description: "Perfect for social travelers and group experiences.",
      highlights: ["Group activities", "Shared experiences", "Comfortable lodges", "Game drives"]
    },
    {
      title: "Private Luxury Safari",
      subtitle: "Maasai Mara & Amboseli",
      duration: "5 Days",
      price: "$5,999",
      image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1500&q=80",
      description: "Exclusive private tours with luxury accommodations.",
      highlights: ["Private guide", "Luxury lodges", "Helicopter tours", "Champagne sundowners"]
    },
    {
      title: "Student package",
      subtitle: "Day Student Discovery Safari",
      duration: "4-7 Days",
      price: "$180",
      image: "https://images.unsplash.com/photo-1682686581362-796145f0e123?auto=format&fit=crop&w=1500&q=80",
      description: "a 4 day exciting tour in the ranges of gngong and serengeti.",
      highlights: ["Educational talks", "Research activities", "Field studies", "Conservation projects"]
    },
    {
      title: "Day Tours",
      subtitle: "Nairobi National Park",
      duration: "1 Day",
      price: "$299",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1500&q=80",
      description: "Perfect for short stays and quick adventures.",
      highlights: ["City proximity", "Quick safari", "Guided tour", "Local wildlife"]
    }
  ];

  // Popular destinations data
  const destinations = [
    {
      name: "Serengeti National Park",
      location: "Tanzania",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1500&q=80",
      rating: 4.9,
      description: "Home to the great migration and endless plains"
    },
    {
      name: "Maasai Mara",
      location: "Kenya",
      image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1500&q=80",
      rating: 4.8,
      description: "Kenya's most famous safari destination"
    },
    {
      name: "Ngorongoro Crater",
      location: "Tanzania",
      image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1500&q=80",
      rating: 4.7,
      description: "A natural amphitheater teeming with wildlife"
    }
  ];

  // Customer testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "United States",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
      text: "An unforgettable experience that exceeded all expectations. The attention to detail and luxury accommodations were outstanding.",
      rating: 5,
      title: "Adventure Enthusiast"
    },
    {
      name: "David Chen",
      location: "Singapore",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
      text: "The wildlife sightings were incredible, and our guide's knowledge made the experience even more enriching.",
      rating: 5,
      title: "Photography Lover"
    },
    {
      name: "Emma Thompson",
      location: "United Kingdom",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80",
      text: "A perfect blend of adventure and luxury. The Maasai Mara experience was truly life-changing.",
      rating: 5,
      title: "First-time Safari Goer"
    }
  ];
  
  // Hero slider images
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Optimize image URLs with lower quality during initial load
  const heroImages = [
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1682686581362-796145f0e123?auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1504173010664-32509aeebb62?auto=format&fit=crop&w=1500&q=80"
  ];
  
  // Collect all images used in the app for preloading
  const allImages = [
    ...heroImages,
    ...destinations.map(dest => dest.image),
    ...testimonials.map(test => test.image),
    ...packages.map(pkg => pkg.image),
    logo
  ];
  
  // Navigation links for mobile menu
  const navLinks = [
    { label: 'Home', href: '#hero', isRouter: false },
    { label: 'About', href: '#about', isRouter: false },
    { label: 'Safari Packages', href: '#packages', isRouter: false },
    { label: 'Testimonials', href: '#testimonials', isRouter: false },
    { label: 'Explore', href: '/explore', isRouter: true },
    { label: 'Contact', href: '#contact', isRouter: false }
  ];

  // Handle scroll events and check for mobile viewport
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    // Initial check
    handleResize();
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = allImages.length;
    
    const preloadImage = (url: string) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / totalImages) * 100));
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / totalImages) * 100));
      };
      img.src = url;
    };
    
    allImages.forEach(preloadImage);
  }, [allImages]);
  
  // Hero image slider effect - only start after images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [heroImages.length, imagesLoaded]);

  const handleBookNow = (packageTitle?: string) => {
    setSelectedPackage(packageTitle || null);
    setShowBookingModal(true);
    setFormData(prev => ({ ...prev, package: packageTitle || '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData);
    setShowBookingModal(false);
    alert('Thank you for your booking request! We will contact you shortly.');
  };

  // Features data
  const features = [
    {
      icon: Compass,
      title: "ANCHOR",
      heading: "Secure Your Place in Africa's Timeless Heart",
      description: "With our tailored itineraries and luxurious yet intimate lodges, you'll anchor your journey in Africa's rich heritage.",
      cta: "Secure your journey now and become grounded in Africa's ancient spirit.",
      buttonText: "Book Your Anchored Safari →",
      color: "amber"
    },
    {
      icon: Camera,
      title: "IGNITE",
      heading: "Light the Spark of Endless Discovery",
      description: "Our adventures are designed to ignite your passion—whether it's through heart-pounding game drives, awe-inspiring safari walks, or intimate cultural encounters with local communities.",
      cta: "Launch your journey into new realms of discovery—feel the fire of adventure.",
      buttonText: "Ignite Your Safari Adventure →",
      color: "orange"
    },
    {
      icon: Users,
      title: "CONNECT",
      heading: "Form Meaningful Bonds with Nature and Culture",
      description: "Our safaris go beyond observation—they forge deep, personal connections.",
      cta: "Embrace the heart of Africa by connecting with its people and landscapes.",
      buttonText: "Connect with Africa Now →",
      color: "amber"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden">
      {/* Image Preloader */}
      <ImagePreloader imageUrls={allImages} />
      
      {/* Loading Screen */}
      <AnimatePresence>
        {!imagesLoaded && (
          <motion.div 
            className="fixed inset-0 bg-amber-900 z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={logo} alt="Orion Safaris Logo" className="h-32 mb-8 animate-pulse" />
            <div className="w-64 h-2 bg-amber-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-amber-500"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-amber-200 mt-4 font-medium">Loading your safari adventure... {loadingProgress}%</p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Scroll progress indicator */}
      <ScrollIndicator />
      
      {/* Scroll to top button */}
      <ScrollToTop />
      
      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        links={navLinks} 
      />
      
      {/* Header */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#hero" className="flex items-center">
              <img 
                src={logo} 
                alt="Orion Safaris Logo" 
                className={`h-16 md:h-20 transition-all duration-300 ${isScrolled ? 'brightness-90' : 'brightness-110'}`} 
              />
            </a>
            
            {/* Desktop Navigation */}
            <nav className={`hidden ${isTablet ? 'md:flex' : 'sm:flex'} items-center space-x-1 sm:space-x-2 md:space-x-6`}>
              {navLinks.map((link, index) => 
                link.isRouter ? (
                  <Link
                    key={index}
                    to={link.href}
                    className={`px-2 py-2 text-sm md:text-base font-medium ${isScrolled ? 'text-stone-700 hover:text-amber-600' : 'text-white hover:text-amber-300'} transition-colors relative`}
                  >
                    {link.label}
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                ) : (
                  <motion.a
                    key={index}
                    href={link.href}
                    className={`px-2 py-2 text-sm md:text-base font-medium ${isScrolled ? 'text-stone-700 hover:text-amber-600' : 'text-white hover:text-amber-300'} transition-colors relative`}
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetId = link.href.substring(1);
                      scrollToElement(targetId, 80);
                    }}
                  >
                    {link.label}
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                )
              )}
              <motion.button
                className={`ml-4 px-5 py-2 rounded-full ${isScrolled ? 'bg-amber-600 text-white' : 'bg-white text-amber-600'} font-medium hover:bg-amber-700 hover:text-white transition-colors btn-pulse`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSafariPackage('General Safari Booking');
                  setIsBookingModalOpen(true);
                }}
              >
                Book Now
              </motion.button>
            </nav>
            
            {/* Mobile Menu Button */}
            <motion.button
              className={`${isTablet || isMobile ? 'flex' : 'sm:hidden flex'} items-center justify-center p-2 rounded-md ${isScrolled ? 'text-stone-700' : 'text-white'}`}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.header>
      
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slider with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <motion.div 
              key={index}
              className="absolute inset-0 w-full h-full"
              style={{ 
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                y: isScrolled ? (isMobile ? -20 : isTablet ? -35 : -50) : 0,
                willChange: "transform"
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentHeroImage === index ? 1 : 0,
                scale: currentHeroImage === index ? 1 : 1.1
              }}
              transition={{ 
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 6, ease: "easeOut" }
              }}
            />
          ))}
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        
        {/* Content */}
        <motion.div 
          className={`relative z-10 text-center px-4 sm:px-6 max-w-5xl ${isMobile ? 'pt-16' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 whitespace-normal lg:whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Guided by the STARS,<br className="sm:inline md:inline lg:hidden" /> Grounded in Africa
          </motion.h1>
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center space-x-3 bg-black/30 px-6 py-2 rounded-full">
              <span className="text-amber-400 font-medium tracking-widest">ANCHOR</span>
              <span className="text-white text-xl">•</span>
              <span className="text-amber-400 font-medium tracking-widest">IGNITE</span>
              <span className="text-white text-xl">•</span>
              <span className="text-amber-400 font-medium tracking-widest">CONNECT</span>
            </div>
          </motion.div>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Our promise to ground you in Africa, spark your adventure, and link you to its soul. Let Orion Safaris guide your transformational journey.
          </motion.p>
          <motion.div 
            className={`flex flex-col sm:flex-row items-center justify-center ${isMobile ? 'gap-6 mb-12' : 'gap-4'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.button
              onClick={() => scrollToElement('packages', 80)}
              className="bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-amber-700 transition-colors btn-pulse"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Packages
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Slider Indicators */}
        <motion.div
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${currentHeroImage === index ? 'bg-amber-500 w-8' : 'bg-white/60'}`}
              onClick={() => setCurrentHeroImage(index)}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div 
            className="w-8 h-12 border-2 border-white/60 rounded-full mx-auto mb-2 flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div 
              className="w-1.5 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
          <span className="text-sm font-light tracking-wider">Scroll Down</span>
        </motion.div>
      </section>

      {/* Features Section */}
      <div className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4">Our Safari Philosophy</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Experience Africa through our three core principles that guide every journey we create
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
              >
                {/* Decorative background gradient */}
                <div className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-${feature.color}-200 to-${feature.color}-400 opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Icon with animated background */}
                <motion.div 
                  className={`relative z-10 w-16 h-16 rounded-2xl bg-${feature.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                  whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </motion.div>
                
                {/* Title with animated underline */}
                <div className="relative inline-block mb-4">
                  <h3 className="text-xl font-bold tracking-wider text-stone-800">{feature.title}</h3>
                  <motion.div 
                    className={`h-1 bg-${feature.color}-500 mt-1 rounded`}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
                
                {/* Heading */}
                <h4 className="text-2xl font-serif font-semibold mb-4 text-stone-800">{feature.heading}</h4>
                
                {/* Description */}
                <p className="text-stone-600 mb-6 leading-relaxed">{feature.description}</p>
                
                {/* Call to action text */}
                <p className="text-stone-700 italic mb-6">{feature.cta}</p>
                
                {/* Button with hover effects */}
                <motion.button
                  className={`relative overflow-hidden px-6 py-3 rounded-full bg-${feature.color}-600 text-white font-medium group-hover:bg-${feature.color}-700 transition-colors duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBookNow()}
                >
                  <span className="relative z-10">{feature.buttonText}</span>
                  <motion.div 
                    className={`absolute inset-0 bg-${feature.color}-700`}
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Lion, stat: "50+", label: "Safari Destinations" },
              { icon: Calendar, stat: "15+", label: "Years Experience" },
              { icon: Users, stat: "10k+", label: "Happy Travelers" },
              { icon: Compass, stat: "100%", label: "Success Rate" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <item.icon className="w-12 h-12 mx-auto text-amber-600 mb-4" />
                <div className="text-4xl font-bold text-stone-800 mb-2">{item.stat}</div>
                <div className="text-stone-600">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif text-stone-800 mb-6">Discover Your Perfect African Adventure</h2>
              <p className="text-lg text-stone-600">
                At Orion Safaris, we believe a safari is more than a journey—it's a soulful connection to Africa's timeless spirit. We craft immersive experiences that ground you in the continent's rich landscapes and cultures, ignite your sense of wonder, and connect you deeply with its people and wildlife. From the vast savannahs of the Maasai Mara to the serene beaches of the Indian Ocean, every adventure with us is personalized, authentic, and unforgettable.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Camera, text: "Professional Photography" },
                  { icon: Coffee, text: "Luxury Accommodations" },
                  { icon: Jeep, text: "Modern Safari Vehicles" },
                  { icon: Binoculars, text: "Expert Wildlife Guides" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <feature.icon className="w-5 h-5 text-amber-600" />
                    <span className="text-stone-700">{feature.text}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => handleBookNow()}
                className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors"
              >
                Learn More
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-[600px] rounded-2xl overflow-hidden group"
            >
              <img 
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
                alt="Safari Experience"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Explore Section */}
      <section id="explore" className="relative">
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">Discover Our Safari Packages</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Carefully curated experiences that showcase the best of African wildlife, landscapes, and culture
            </p>
          </motion.div>
          
          {/* Packages Grid */}
          <div className={`grid grid-cols-1 ${isMobile ? '' : isTablet ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
            {packages.map((pkg, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-custom hover-scale"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: isMobile ? 0.1 : index * 0.1 }}
              >
                <div className="relative h-60 overflow-hidden">
                  <motion.img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-serif mb-2 text-amber-400">{pkg.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.highlights.map((feature, i) => (
                      <span 
                        key={i} 
                        className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <p className="text-stone-600 mb-6">{pkg.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-stone-700">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                    <motion.button
                      className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (pkg.title === "Migration Safaris") {
                          window.location.href = "/migration-safari";
                        } else if (pkg.title === "Classic Kenya & Tanzania") {
                          window.location.href = "/classic-kenya-tanzania";
                        } else if (pkg.title === "Private Luxury Safari") {
                          window.location.href = "/private-luxury-safari";
                        } else if (pkg.title === "Group Safari Adventure") {
                          window.location.href = "/group-safari-adventure";
                        } else if (pkg.title === "Student package") {
                          window.location.href = "/serengeti-ngorongoro-safari";
                        } else if (pkg.title === "Day Tours") {
                          window.location.href = "/day-tours";
                        } else {
                          handleBookNow(pkg.title);
                        }
                      }}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <div id="destinations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-stone-800 mb-4">
              Top Safari Destinations
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Explore Africa's most breathtaking locations, where wildlife and nature create unforgettable moments.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-2xl font-serif mb-2">{destination.name}</h3>
                    <p className="text-stone-300 mb-3">{destination.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{destination.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-amber-400" />
                        <span>{destination.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">What Our Adventurers Say</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Hear from travelers who have experienced the magic of our safaris
            </p>
          </motion.div>
          
          {/* Testimonials Slider */}
          <div className={`max-w-5xl mx-auto ${isMobile ? 'px-2' : isTablet ? 'px-4' : 'px-8'}`}>
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={isMobile ? 16 : isTablet ? 24 : 30}
              slidesPerView={isMobile ? 1 : isTablet ? 1.5 : 'auto'}
              centeredSlides={true}
              loop={true}
              pagination={{ clickable: true }}
              navigation={!isMobile && !isTablet}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div 
                    className={`bg-white rounded-xl ${isMobile ? 'p-5' : isTablet ? 'p-6' : 'p-8'} shadow-custom mb-10`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Rating */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-500' : 'text-gray-300'}`} 
                          fill={i < testimonial.rating ? 'currentColor' : 'none'} 
                        />
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="text-stone-700 mb-6 flex-grow">"{testimonial.text}"</p>
                    
                    {/* Author */}
                    <div className="flex items-center mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">{testimonial.name}</h4>
                        <div className="flex items-center text-sm text-stone-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{testimonial.location}</span>
                        </div>
                        <p className="text-xs text-stone-500 mt-1">{testimonial.title}</p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">Get in Touch</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Have questions or ready to book your safari adventure? We're here to help!
            </p>
          </motion.div>
          
          <div className={`max-w-6xl mx-auto grid ${isMobile ? 'grid-cols-1 gap-10' : isTablet ? 'grid-cols-1 md:grid-cols-2 gap-12' : 'grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16'}`}>
            {/* Contact Form */}
            <motion.div 
              className="bg-stone-50 rounded-xl p-6 md:p-8 shadow-custom"
              initial={{ opacity: 0, x: isMobile ? 0 : isTablet ? -20 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6">Send Us a Message</h3>
              <form className="space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setSubmitStatus('idle');
                
                try {
                  const response = await fetch('/.netlify/functions/send-email', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contactFormData),
                  });
                  
                  if (response.ok) {
                    setSubmitStatus('success');
                    setContactFormData({ name: '', email: '', subject: '', message: '' });
                  } else {
                    setSubmitStatus('error');
                  }
                } catch (error) {
                  console.error('Error submitting form:', error);
                  setSubmitStatus('error');
                } finally {
                  setIsSubmitting(false);
                }
              }}>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                  <motion.input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                    value={contactFormData.name}
                    onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
                    required
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                  <motion.input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                    required
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Subject</label>
                  <motion.select 
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    value={contactFormData.subject}
                    onChange={(e) => setContactFormData({...contactFormData, subject: e.target.value})}
                    required
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Safari Booking</option>
                    <option value="inquiry">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </motion.select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
                  <motion.textarea 
                    rows={5} 
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                    required
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  ></motion.textarea>
                </div>
                <motion.button 
                  type="submit"
                  className="bg-amber-600 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-700 transition-colors btn-pulse"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </span>
                </motion.button>
                
                {submitStatus === 'success' && (
                  <motion.div 
                    className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div 
                    className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span>There was an error sending your message. Please try again.</span>
                  </motion.div>
                )}
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div 
              className={`${isMobile || isTablet ? 'order-first' : ''} flex flex-col justify-center`}
              initial={{ opacity: 0, x: isMobile ? 0 : isTablet ? 20 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-1">Our Location</h4>
                    <p className="text-stone-600">Prudential building wabera street nairobi kenya</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-1">Phone</h4>
                    <p className="text-stone-600">07468388812</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-1">Email</h4>
                    <p className="text-stone-600">bookings@orionsafaris.info</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-1">Office Hours</h4>
                    <p className="text-stone-600">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-stone-600">Saturday: 10AM - 4PM</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Social Media */}
              <div className="mt-8">
                <h4 className="font-medium text-stone-800 mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                    <motion.a
                      key={social}
                      href={`#${social}`}
                      className="bg-stone-100 p-3 rounded-full text-stone-600 hover:bg-amber-100 hover:text-amber-600 transition-colors"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social === 'facebook' && <Facebook className="w-5 h-5" />}
                      {social === 'twitter' && <Twitter className="w-5 h-5" />}
                      {social === 'instagram' && <Instagram className="w-5 h-5" />}
                      {social === 'youtube' && <Youtube className="w-5 h-5" />}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-10' : isTablet ? 'grid-cols-2 gap-8' : 'grid-cols-2 md:grid-cols-4 gap-8'} mb-12`}>
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-serif font-bold mb-4 text-amber-500">Orion Safaris</h3>
              <p className="text-stone-400 mb-4">
                Discover the magic of African wildlife with our premium safari experiences. Creating unforgettable memories since 2005.
              </p>
              <div className="flex space-x-3 mt-6">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                  <motion.a
                    key={social}
                    href={`#${social}`}
                    className="bg-stone-800 p-2 rounded-full text-stone-400 hover:bg-amber-600 hover:text-white transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social === 'facebook' && <Facebook className="w-5 h-5" />}
                    {social === 'twitter' && <Twitter className="w-5 h-5" />}
                    {social === 'instagram' && <Instagram className="w-5 h-5" />}
                    {social === 'youtube' && <Youtube className="w-5 h-5" />}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: isMobile ? 0.1 : isTablet ? 0.1 : 0.2 }}
            >
              <h3 className="text-xl font-serif font-bold mb-4 text-amber-500">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'About Us', 'Safari Packages', 'Testimonials', 'Contact'].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <a 
                      href={`#${link.toLowerCase().replace(' ', '-')}`}
                      className="text-stone-500 hover:text-amber-500 transition-colors flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 mr-1" />
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Safari Packages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: isMobile ? 0.2 : isTablet ? 0.2 : 0.3 }}
              className={isMobile || isTablet ? 'mt-4' : ''}
            >
              <h3 className="text-xl font-serif font-bold mb-4 text-amber-500">Safari Packages</h3>
              <ul className="space-y-2">
                {packages.slice(0, 5).map((pkg, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <a 
                      href="#packages"
                      className="text-stone-500 hover:text-amber-500 transition-colors flex items-center"
                      onClick={() => {
                        setSelectedPackage(pkg.title);
                      }}
                    >
                      <ChevronRight className="w-4 h-4 mr-1" />
                      {pkg.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: isMobile ? 0.3 : isTablet ? 0.3 : 0.4 }}
              className={isMobile || isTablet ? 'mt-4' : ''}
            >
              <h3 className="text-xl font-serif font-bold mb-4 text-amber-500">Newsletter</h3>
              <p className="text-stone-400 mb-4">
                Subscribe to our newsletter for the latest safari updates and special offers.
              </p>
              <form className={`flex ${isTablet ? 'flex-row' : 'flex-col sm:flex-row'} gap-2`}>
                <motion.input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 rounded-full bg-stone-800 text-white border border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.button 
                  type="submit"
                  className="px-4 py-2 rounded-full bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-stone-800 my-8"></div>
          
          {/* Bottom Footer */}
          <div className={`${isMobile ? 'flex flex-col space-y-4' : isTablet ? 'flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center' : 'flex justify-between items-center'}`}>
            <motion.p 
              className="text-stone-500 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              &copy; {new Date().getFullYear()} Orion Safaris. All rights reserved.
            </motion.p>
            
            <motion.div 
              className={`flex ${isMobile ? 'flex-col space-y-2' : isTablet ? 'flex-row space-x-4' : 'space-x-6'}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a href="#privacy" className="text-stone-500 hover:text-amber-500 text-sm transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-stone-500 hover:text-amber-500 text-sm transition-colors">Terms of Service</a>
              <a href="#faq" className="text-stone-500 hover:text-amber-500 text-sm transition-colors">FAQ</a>
              <a href="#sitemap" className="text-stone-500 hover:text-amber-500 text-sm transition-colors">Sitemap</a>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-serif font-bold text-stone-800">
                    {selectedPackage ? `Book ${selectedPackage}` : 'Book Your Safari'}
                  </h3>
                  <motion.button
                    onClick={() => setShowBookingModal(false)}
                    className="text-stone-500 hover:text-stone-700 transition-colors"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="+1 (123) 456-7890"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-stone-700 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-stone-700 mb-1">Safari Package</label>
                    <select
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a package</option>
                      {packages.map((pkg) => (
                        <option key={pkg.title} value={pkg.title}>{pkg.title}</option>
                      ))}
                    </select>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-stone-700 mb-1">Additional Notes</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Tell us about your specific requirements or questions..."
                    ></textarea>
                  </motion.div>
                  <motion.button
                    type="submit"
                    className="w-full bg-amber-600 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-700 transition-colors btn-pulse mt-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Submit Booking Request
                      <Send className="w-4 h-4" />
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        safariPackage={selectedSafariPackage} 
      />

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
}

export default App;