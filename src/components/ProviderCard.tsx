import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Clock } from 'lucide-react';
import { Provider } from '../types';
import { Language } from '../hooks/useLanguage';

interface ProviderCardProps {
  provider: Provider;
  language: Language;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, language }) => {
  return (
    <motion.div
      className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm 
                 rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/50 
                 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/25 
                 transform hover:scale-105 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.img
              src={provider.image}
              alt={provider.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/50"
              whileHover={{ scale: 1.1 }}
            />
            <div>
              <h3 className="text-lg font-bold text-white">
                {language === 'ar' ? provider.nameAr : provider.name}
              </h3>
              <p className="text-cyan-400 text-sm">
                {language === 'ar' ? provider.serviceAr : provider.service}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {provider.verified && (
              <Shield className="w-5 h-5 text-cyan-400" />
            )}
            <div className={`w-3 h-3 rounded-full ${provider.online ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
          </div>
        </div>
        
        <p className="text-slate-300 text-sm mb-4">
          {language === 'ar' ? provider.descriptionAr : provider.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(provider.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                }`}
              />
            ))}
            <span className="text-white text-sm ml-2">{provider.rating}</span>
            <span className="text-slate-400 text-sm">({provider.reviews})</span>
          </div>
          
          <div className="text-cyan-400 font-bold">
            ${provider.price}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>{language === 'ar' ? provider.governorateAr : provider.governorate}</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{provider.online ? (language === 'ar' ? 'متاح الآن' : 'Available now') : (language === 'ar' ? 'غير متاح' : 'Offline')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};