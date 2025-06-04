import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import { 
  Leaf as Tree, 
  Users, 
  Footprints, 
  Umbrella, 
  Stars, 
  Utensils,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Globe,
  Heart
} from 'lucide-react';

type ExperienceType = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  color: string;
  tags: string[];
  route?: string;
};

const ExploreSection: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<number>(0);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const navigate = useNavigate();
  
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const experiences: ExperienceType[] = [
    {
      id: 1,
      title: "Impact Travel",
      description: "Join our tree-planting initiatives, contributing to Kenya's \"One Tourist, One Tree\" campaign aimed at enhancing forest cover and combating climate change. Participate in reforestation efforts that leave a lasting legacy for generations to come.",
      icon: Tree,
      image: "https://pre-webunwto.s3.eu-west-1.amazonaws.com/2022-10/african-tourism-united-to-transform-sector-for-growth-and-opportunity.jpg?VersionId=Y6oTW9yYB2euw24Up2gCaD3RbsoYMyJ6",
      color: "amber",
      tags: ["Sustainability", "Conservation", "Community"]
    },
    {
      id: 2,
      title: "Cultural Immersion",
      description: "Engage with local communities, such as the Maasai and Samburu tribes, to learn about their traditions, customs, and way of life. These authentic encounters offer a deeper understanding of Africa's diverse cultures.",
      icon: Users,
      image: "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?auto=format&fit=crop&q=80",
      color: "amber",
      tags: ["Heritage", "Traditions", "Local Life"]
    },
    {
      id: 3,
      title: "Nature Walks",
      description: "Embark on guided nature walks through Kenya's stunning landscapes, from the plains of the Masai Mara to the forests of Mount Kenya. Experience the sights, sounds, and scents of the wild up close, gaining a new appreciation for the natural world.",
      icon: Footprints,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80",
      color: "amber",
      tags: ["Wildlife", "Guided Tours", "Photography"]
    },
    {
      id: 4,
      title: "Bush and Beach",
      description: "Combine thrilling wildlife safaris with relaxing beach escapes. Explore iconic parks like Amboseli and Tsavo, then unwind on the pristine shores of Diani Beach, enjoying the perfect balance of adventure and relaxation.",
      icon: Umbrella,
      image: "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&q=80",
      color: "amber",
      tags: ["Safari", "Relaxation", "Coastal"]
    },
    {
      id: 5,
      title: "Stargazing",
      description: "Experience the magic of Africa's night skies. Our remote camps offer unparalleled stargazing opportunities, allowing you to marvel at the stars and feel a profound connection to the universe.",
      icon: Stars,
      image: "https://www.spaziosafari.com/wp-content/uploads/2025/01/spaziosafari-esperienze-stellari-kilimanjaro-1024x682.jpg",
      color: "amber",
      tags: ["Night Sky", "Astronomy", "Serenity"]
    },
    {
      id: 6,
      title: "Culinary Journeys",
      description: "Delight in traditional African cuisine, from nyama choma to sukuma wiki. Participate in cooking classes and local food tours that immerse you in the region's rich culinary traditions.",
      icon: Utensils,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80",
      color: "amber",
      tags: ["Food", "Cooking", "Flavors"]
    }
  ];
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Auto-transition effect for experiences
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleExperienceClick((selectedExperience + 1) % experiences.length);
      }
    }, 5000); // Change experience every 5 seconds
    
    return () => clearInterval(interval);
  }, [selectedExperience, isAnimating, experiences.length]);
  
  const handleExperienceClick = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedExperience(index);
    
    const experience = experiences[index];
    if (experience.route) {
      navigate(experience.route);
      return;
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };
  
  const scrollToExperience = (index: number) => {
    if (experienceRefs.current[index]) {
      experienceRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const imageVariants = {
    initial: { scale: 1.2, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 1.2,
        ease: "easeOut"
      }
    },
    exit: { 
      scale: 1.1, 
      opacity: 0,
      transition: { 
        duration: 0.6,
        ease: "easeIn"
      }
    }
  };

  return (
    <section id="explore" className="py-24 bg-amber-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4 inline-block">
              Discover Africa
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-6 relative">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore with Orion Safaris
            </motion.span>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-0 left-1/2 h-1 bg-amber-600 transform -translate-x-1/2"
            />
          </h2>
          
          <motion.p 
            className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Journeys That Anchor, Ignite, and Connect
          </motion.p>
          
          <motion.p 
            className="mt-4 text-stone-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            At Orion Safaris, we offer more than just travel—we provide transformative experiences that ground you in Africa's rich landscapes, ignite your sense of wonder, and connect you deeply with its people and wildlife. Here's how you can explore:
          </motion.p>
        </motion.div>
        
        {/* Interactive Experience Selector */}
        <div className="mb-16">
          <motion.div 
            className="flex flex-wrap justify-center gap-3 md:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {experiences.map((experience, index) => (
              <motion.button
                key={experience.id}
                variants={itemVariants}
                className={`relative px-4 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                  selectedExperience === index 
                    ? `bg-stone-100 text-stone-800 shadow-md` 
                    : 'bg-white text-stone-600 hover:bg-stone-100'
                }`}
                onClick={() => {
                  handleExperienceClick(index);
                  scrollToExperience(index);
                }}
                onMouseEnter={() => setHoveredExperience(index)}
                onMouseLeave={() => setHoveredExperience(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <experience.icon className={`w-5 h-5 ${selectedExperience === index ? 'text-stone-600' : 'text-stone-500'}`} />
                <span className="font-medium">{experience.title}</span>
                {selectedExperience === index && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-stone-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {hoveredExperience === index && hoveredExperience !== selectedExperience && (
                  <motion.span
                    className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-stone-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
        
        {/* Featured Experience Display */}
        <div 
          className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl mb-16"
        >
          {/* Experience indicators */}
          <div className="absolute top-4 left-0 right-0 z-30 flex justify-center gap-2">
            {experiences.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${selectedExperience === index ? 'bg-amber-500 w-8' : 'bg-white/60'}`}
                onClick={() => handleExperienceClick(index)}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedExperience}
              className="absolute inset-0"
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              <img 
                src={experiences[selectedExperience].image} 
                alt={experiences[selectedExperience].title}
                className="w-full h-full object-cover"
              />
              
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-500/20 text-stone-100 mb-4`}>
                  {React.createElement(experiences[selectedExperience].icon, { className: "w-4 h-4" })}
                  <span className="text-sm font-medium">{experiences[selectedExperience].title}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                  {experiences[selectedExperience].title} Experience
                </h3>
                
                <p className="text-white/90 text-lg max-w-3xl mb-6">
                  {experiences[selectedExperience].description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {experiences[selectedExperience].tags.map((tag, i) => (
                    <span 
                      key={i}
                      className={`bg-stone-500/30 text-white text-xs px-3 py-1 rounded-full`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <motion.button
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-stone-500 text-white rounded-full font-medium hover:bg-stone-600 transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Discover This Experience</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation arrows removed */}
        </div>
        
        {/* Detailed Experience Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              ref={el => experienceRefs.current[index] = el}
              variants={itemVariants}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group relative ${
                selectedExperience === index ? `ring-2 ring-stone-500 ring-offset-2` : ''
              }`}
            >
              <div className="h-48 overflow-hidden relative">
                <motion.div
                  className="absolute top-3 right-3 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-stone-500/90 text-white text-xs`}>
                    <Sparkles className="w-3 h-3" />
                    <span>Experience</span>
                  </span>
                </motion.div>
                
                <img 
                  src={experience.image} 
                  alt={experience.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-amber-950/60 to-transparent opacity-60`} />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center`}>
                    <experience.icon className={`w-6 h-6 text-amber-600`} />
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Heart className={`w-4 h-4 text-amber-500`} />
                    <span className="text-sm text-amber-600">Save</span>
                  </div>
                </div>
                
                <h3 className={`text-xl font-serif font-bold mb-2 text-amber-900 group-hover:text-amber-700 transition-colors cursor-pointer`} onClick={() => handleExperienceClick(index)}>
                  {experience.title}
                </h3>
                
                <p className="text-black mb-4">
                  {experience.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {experience.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className={`bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {experience.route && (
                  <div className="flex justify-end">
                    <button 
                      onClick={() => handleExperienceClick(index)}
                      className="text-amber-600 font-medium flex items-center gap-1 hover:text-amber-700 transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to Action */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
          >
            <Globe className="w-8 h-8 text-amber-600" />
          </motion.div>
          
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-amber-900 mb-4">
            Ready to Embark on Your African Journey?
          </h3>
          
          <p className="text-black max-w-2xl mx-auto mb-8">
            Let us craft a personalized experience that anchors you in Africa's heritage, ignites your sense of adventure, and connects you with the continent's soul.
          </p>
          
          <motion.button
            className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Planning Your Safari
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreSection;
