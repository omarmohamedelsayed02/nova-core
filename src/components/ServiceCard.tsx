import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../types';
import { Language } from '../hooks/useLanguage';

interface ServiceCardProps {
  service: Service;
  language: Language;
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, language, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm 
                 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 
                 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/20 
                 cursor-pointer transition-all duration-300"
      whileHover={{ 
        scale: 1.05, 
        rotate: [0, -1, 1, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 
                      rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 text-center">
        <motion.div
          className="text-4xl mb-3"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {service.icon}
        </motion.div>
        
        <h3 className="text-xl font-bold text-cyan-400 mb-2">
          {language === 'ar' ? service.nameAr : service.name}
        </h3>
        
        <p className="text-slate-300 text-sm">
          {language === 'ar' ? service.descriptionAr : service.description}
        </p>
        
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};