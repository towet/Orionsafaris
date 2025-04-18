import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Camera, 
  Coffee, 
  Compass, 
  Binary as Binoculars, 
  Sunrise, 
  Sunset, 
  Mountain, 
  Leaf as Paw, 
  ChevronDown,
  ArrowRight
} from 'lucide-react';

const SerengetiNgorongoroSafari = () => {
  const [activeDay, setActiveDay] = useState(1);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 800 && scrollPosition < 1400) {
        setActiveDay(1);
      } else if (scrollPosition >= 1400 && scrollPosition < 2000) {
        setActiveDay(2);
      } else if (scrollPosition >= 2000 && scrollPosition < 2600) {
        setActiveDay(3);
      } else if (scrollPosition >= 2600) {
        setActiveDay(4);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y,
            scale
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </motion.div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-1 bg-amber-500/80 text-white rounded-full text-sm font-medium">
                4-Day Safari Adventure
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-serif font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Serengeti & Ngorongoro <br />
              <span className="text-amber-400">Mid-Range Safari</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Embark on a thrilling 4-day safari through Tanzania's most iconic landscapes, witnessing the majestic Big Five and exploring vast plains.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-amber-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book This Safari
              </motion.button>
              
              <motion.button
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-full text-lg font-medium hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Itinerary
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center"
            >
              <span className="text-white/70 mb-2">Scroll to explore</span>
              <ChevronDown className="w-6 h-6 text-amber-500" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Safari Overview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium inline-block mb-4">
              Safari Overview
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
              Experience the Magic of Tanzania
            </h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Embark on a thrilling 4-day safari through Tanzania's most iconic landscapes. From the moment you depart Arusha until your return, every day is filled with extraordinary wildlife encounters and breathtaking landscapes.
            </p>
          </motion.div>
          
          {/* Safari Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { 
                icon: <Paw className="w-8 h-8 text-amber-600" />, 
                title: "Big Five Sightings", 
                description: "Opportunities to see lions, elephants, buffalo, leopards, and rhinos in their natural habitat." 
              },
              { 
                icon: <Mountain className="w-8 h-8 text-amber-600" />, 
                title: "Ngorongoro Crater", 
                description: "Explore the world's largest intact volcanic caldera, home to over 25,000 animals." 
              },
              { 
                icon: <Sunrise className="w-8 h-8 text-amber-600" />, 
                title: "Serengeti Plains", 
                description: "Witness the endless plains of the Serengeti, famous for the Great Migration." 
              },
              { 
                icon: <Camera className="w-8 h-8 text-amber-600" />, 
                title: "Photography Paradise", 
                description: "Capture stunning landscapes and wildlife in perfect lighting conditions." 
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-stone-50 p-6 rounded-xl hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">{feature.title}</h3>
                <p className="text-stone-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Safari Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6">
                A Compact Yet Comprehensive Adventure
              </h3>
              <p className="text-lg text-stone-600 mb-6">
                This 4-day safari offers an unforgettable glimpse into the heart of East Africa. From the moment you depart Arusha until your return, every day is filled with extraordinary wildlife encounters and breathtaking landscapes.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: <Calendar className="w-5 h-5 text-amber-600" />, text: "4 Days, 3 Nights" },
                  { icon: <MapPin className="w-5 h-5 text-amber-600" />, text: "Serengeti & Ngorongoro" },
                  { icon: <Coffee className="w-5 h-5 text-amber-600" />, text: "Mid-Range Accommodations" },
                  { icon: <Compass className="w-5 h-5 text-amber-600" />, text: "Professional Safari Guide" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      {item.icon}
                    </div>
                    <span className="text-stone-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <motion.button
                className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Download Full Itinerary</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
            
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[4/3]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1500&q=80" 
                alt="Safari Experience"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Stats */}
              <motion.div
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <Binoculars className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="text-xs text-stone-500">Wildlife Species</p>
                    <p className="text-xl font-bold text-stone-800">60+</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <Sunset className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="text-xs text-stone-500">Scenic Viewpoints</p>
                    <p className="text-xl font-bold text-stone-800">12+</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Itinerary Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium inline-block mb-4">
              Safari Itinerary
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
              Your Day-by-Day Adventure
            </h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Every day of your safari is carefully planned to maximize wildlife viewing and unique experiences.
            </p>
          </motion.div>
          
          {/* Interactive Day Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[1, 2, 3, 4].map((day) => (
              <motion.button
                key={day}
                className={`relative px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                  activeDay === day 
                    ? `bg-amber-600 text-white shadow-md` 
                    : 'bg-white text-stone-600 hover:bg-stone-100'
                }`}
                onClick={() => setActiveDay(day)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium">Day {day}</span>
                {activeDay === day && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Day Content */}
          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Day 1 */}
            <motion.div 
              className={`p-8 ${activeDay === 1 ? 'block' : 'hidden'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeDay === 1 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-600 mb-4">
                    Day 1: Arusha to Ngorongoro Crater
                  </h3>
                  <p className="text-stone-600 mb-6">
                    Depart from Arusha and journey to the Ngorongoro Conservation Area. Descend into the Ngorongoro Crater for an afternoon game drive, exploring this UNESCO World Heritage Site teeming with diverse wildlife, including the Big Five. Overnight stay at a lodge on the crater rim.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Sunrise className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">Morning</h4>
                        <p className="text-stone-600">Departure from Arusha, scenic drive to Ngorongoro Conservation Area</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Coffee className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">Afternoon</h4>
                        <p className="text-stone-600">Descend into the Ngorongoro Crater, game drive with picnic lunch</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Sunset className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">Evening</h4>
                        <p className="text-stone-600">Sunset views from the crater rim, dinner and overnight at lodge</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-stone-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Ngorongoro Conservation Area</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coffee className="w-4 h-4" />
                      <span>Full Board</span>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  className="relative h-80 lg:h-auto rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1500&q=80" 
                    alt="Ngorongoro Crater"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h4 className="text-white font-medium">Ngorongoro Crater</h4>
                    <p className="text-white/80 text-sm">UNESCO World Heritage Site</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Day 2 */}
            <motion.div 
              className={`p-8 ${activeDay === 2 ? 'block' : 'hidden'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeDay === 2 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-600 mb-4">
                    Day 2: Ngorongoro to Serengeti National Park
                  </h3>
                  <p className="text-stone-600 mb-6">
                    After breakfast, drive through the scenic highlands to the Serengeti National Park. En route, visit the Olduvai Gorge, known as the "Cradle of Mankind." Arrive in the Serengeti for an afternoon game drive across its vast plains. Overnight at a tented camp in the heart of the park.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Sunrise className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">Morning</h4>
                        <p className="text-stone-600">Breakfast at lodge, departure to Serengeti via scenic highlands</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Mountain className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">Midday</h4>
                        <p className="text-stone-600">Visit to Olduvai Gorge archaeological site, picnic lunch</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Paw className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">Afternoon</h4>
                        <p className="text-stone-600">Enter Serengeti National Park, game drive en route to camp</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-stone-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Serengeti National Park</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coffee className="w-4 h-4" />
                      <span>Full Board</span>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  className="relative h-80 lg:h-auto rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1500&q=80" 
                    alt="Serengeti National Park"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h4 className="text-white font-medium">Serengeti National Park</h4>
                    <p className="text-white/80 text-sm">Endless Plains</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Day 3 */}
            <motion.div 
              className={`p-8 ${activeDay === 3 ? 'block' : 'hidden'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeDay === 3 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-600 mb-4">
                    Day 3: Full Day in Serengeti National Park
                  </h3>
                  <p className="text-stone-600 mb-6">
                    Spend the day exploring the Serengeti's diverse ecosystems. Witness the Great Migration (seasonal) and search for predators like lions, leopards, and cheetahs. Enjoy a picnic lunch in the bush and continue game viewing until sunset. Overnight at your Serengeti accommodation.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Sunrise className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">Early Morning</h4>
                        <p className="text-stone-600">Dawn game drive to catch predators on the hunt</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Camera className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">Mid-day</h4>
                        <p className="text-stone-600">Picnic lunch in the bush, wildlife photography opportunities</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Sunset className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">Afternoon to Evening</h4>
                        <p className="text-stone-600">Extended game drive, sunset in the Serengeti, dinner at camp</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-stone-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Central Serengeti</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coffee className="w-4 h-4" />
                      <span>Full Board</span>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  className="relative h-80 lg:h-auto rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1504173010664-32509aeebb62?auto=format&fit=crop&w=1500&q=80" 
                    alt="Serengeti Wildlife"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h4 className="text-white font-medium">Serengeti Wildlife</h4>
                    <p className="text-white/80 text-sm">Big Cats and Herbivores</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Day 4 */}
            <motion.div 
              className={`p-8 ${activeDay === 4 ? 'block' : 'hidden'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeDay === 4 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-600 mb-4">
                    Day 4: Serengeti to Arusha
                  </h3>
                  <p className="text-stone-600 mb-6">
                    Embark on a morning game drive as you exit the Serengeti, capturing final glimpses of its wildlife. Return to Arusha by road or opt for a scenic flight (additional cost), concluding your unforgettable safari adventure.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Sunrise className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">Early Morning</h4>
                        <p className="text-stone-600">Final game drive in Serengeti, breakfast at camp</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Compass className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">Mid-day</h4>
                        <p className="text-stone-600">Journey back to Arusha with picnic lunch en route</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Coffee className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">Late Afternoon</h4>
                        <p className="text-stone-600">Arrive in Arusha, transfer to hotel or airport</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-stone-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Return to Arusha</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Breakfast & Lunch</span>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  className="relative h-80 lg:h-auto rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1682686581362-796145f0e123?auto=format&fit=crop&w=1500&q=80" 
                    alt="Safari Landscape"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h4 className="text-white font-medium">Journey's End</h4>
                    <p className="text-white/80 text-sm">Memories to Last a Lifetime</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-amber-600 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay" />
            </div>
            
            <div className="relative z-10 px-6 py-16 md:px-12 lg:px-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                  Ready to Embark on Your Safari Adventure?
                </h2>
                <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
                  Book your 4-day Serengeti and Ngorongoro Mid-Range Safari today and prepare for an unforgettable journey through Tanzania's most iconic landscapes.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    className="bg-white text-amber-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-amber-50 transition-colors shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </motion.button>
                  
                  <motion.button
                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Us
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SerengetiNgorongoroSafari;
