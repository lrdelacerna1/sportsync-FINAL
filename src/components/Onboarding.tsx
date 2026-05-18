import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import welcome1Img from '../assets/images/welcome1.jpg';
import welcome2Img from '../assets/images/welcome2.jpg';
import welcome3Img from '../assets/images/welcome3.jpg';

const steps = [
  {
    title: "Welcome to SportSync",
    description: "Your ultimate sports ecosystem. Match, book, and play with ease.",
    color: "bg-brand",
    image: welcome1Img        // ← your welcome1.jpg
  },
  {
    title: "Find Your Squad",
    description: "Join existing games, find partners at your skill level, and build your local community.",
    color: "bg-brand-orange",
    image: welcome2Img        // ← your welcome2.jpg
  },
  {
    title: "Seamless Booking",
    description: "Pickleball, Yoga, or Badminton – book premium courts and studios in seconds.",
    color: "bg-blue-500",
    image: welcome3Img        // ← your welcome3.jpg
  }
];

export const Onboarding: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="h-full flex flex-col bg-dark-bg relative">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
        >
            {/* Explicit dark gradient to keep white text readable on images */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <img 
                src={steps[currentStep].image} 
                alt="Sports"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
            />
        </motion.div>
      </AnimatePresence>

      <div className="flex-1" />

      <div className="relative z-20 p-8 pb-16 flex flex-col gap-6">
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'w-10 bg-brand-neon' : 'w-4 bg-white/30'}`} 
            />
          ))}
        </div>

        <div>
          <motion.h1 
            key={`title-${currentStep}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-black italic leading-tight uppercase tracking-tighter mb-4 text-white break-words"
          >
            {steps[currentStep].title}
          </motion.h1>
          <motion.p 
            key={`desc-${currentStep}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-sm font-medium leading-relaxed max-w-[280px]"
          >
            {steps[currentStep].description}
          </motion.p>
        </div>

        <button 
          onClick={next}
          className="bg-brand-neon text-black py-5 px-8 rounded-2xl flex items-center justify-between group overflow-hidden relative mt-4 shadow-2xl shadow-brand-neon/20"
        >
          <span className="relative z-10 text-sm font-black uppercase tracking-widest">
            {currentStep === steps.length - 1 ? 'Start Playing' : 'Next Step'}
          </span>
          <ChevronRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
          <motion.div 
            className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
          />
        </button>
      </div>
    </div>
  );
}
