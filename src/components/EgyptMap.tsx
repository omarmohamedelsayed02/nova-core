import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { governorates } from '../data/governorates';
import { Language } from '../hooks/useLanguage';

interface EgyptMapProps {
  language: Language;
  selectedGovernorate?: string;
  onGovernorateSelect: (governorate: string) => void;
}

export const EgyptMap: React.FC<EgyptMapProps> = ({ 
  language, 
  selectedGovernorate, 
  onGovernorateSelect 
}) => {
  const [hoveredGov, setHoveredGov] = useState<string | null>(null);

  return (
    <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm 
                    rounded-xl border border-cyan-500/20 p-6 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-600/5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <h3 className="text-2xl font-bold text-white mb-4 text-center">
        {language === 'ar' ? 'خريطة مصر التفاعلية' : 'Interactive Egypt Map'}
      </h3>
      
      <div className="relative">
        <svg viewBox="0 0 500 600" className="w-full h-96 mx-auto">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Egypt outline */}
          <path
            d="M200 150 L380 150 L390 180 L400 220 L410 280 L420 350 L410 420 L400 480 L380 520 L350 540 L300 550 L250 545 L220 530 L200 500 L190 450 L185 400 L180 350 L175 300 L170 250 L180 200 Z"
            fill="rgba(20, 184, 166, 0.1)"
            stroke="rgba(20, 184, 166, 0.3)"
            strokeWidth="2"
            className="transition-all duration-300"
          />
          
          {governorates.map((gov) => (
            <motion.g key={gov.id}>
              <motion.circle
                cx={gov.x}
                cy={gov.y}
                r={8}
                fill={selectedGovernorate === gov.name ? '#00ffff' : '#14b8a6'}
                className="cursor-pointer filter drop-shadow-lg"
                style={{ filter: 'url(#glow)' }}
                whileHover={{ 
                  scale: 1.5,
                  fill: '#00ffff'
                }}
                onHoverStart={() => setHoveredGov(gov.name)}
                onHoverEnd={() => setHoveredGov(null)}
                onClick={() => onGovernorateSelect(gov.name)}
                animate={{
                  scale: selectedGovernorate === gov.name ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: selectedGovernorate === gov.name ? Infinity : 0 }}
              />
              
              {(hoveredGov === gov.name || selectedGovernorate === gov.name) && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <rect
                    x={gov.x - 40}
                    y={gov.y - 40}
                    width="80"
                    height="25"
                    fill="rgba(0, 0, 0, 0.8)"
                    stroke="rgba(20, 184, 166, 0.5)"
                    rx="4"
                  />
                  <text
                    x={gov.x}
                    y={gov.y - 25}
                    fill="white"
                    fontSize="10"
                    textAnchor="middle"
                    className="font-semibold"
                  >
                    {language === 'ar' ? gov.nameAr : gov.name}
                  </text>
                  <text
                    x={gov.x}
                    y={gov.y - 15}
                    fill="#14b8a6"
                    fontSize="8"
                    textAnchor="middle"
                  >
                    {gov.providers} {language === 'ar' ? 'مزود' : 'providers'}
                  </text>
                </motion.g>
              )}
            </motion.g>
          ))}
        </svg>
      </div>
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {governorates.map((gov) => (
          <motion.button
            key={gov.id}
            onClick={() => onGovernorateSelect(gov.name)}
            className={`p-2 rounded-lg text-xs transition-all duration-200 ${
              selectedGovernorate === gov.name
                ? 'bg-cyan-500 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {language === 'ar' ? gov.nameAr : gov.name}
            <div className="text-cyan-400 font-semibold">{gov.providers}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};