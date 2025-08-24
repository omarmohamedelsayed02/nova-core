import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Globe, Menu } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { Theme } from '../hooks/useTheme';

interface HeaderProps {
  language: Language;
  theme: Theme;
  toggleLanguage: () => void;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  language, 
  theme, 
  toggleLanguage, 
  toggleTheme 
}) => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-cyan-500/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-1 bg-slate-900 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              NovaCore
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Services', 'Providers', 'Map', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 relative"
                whileHover={{ scale: 1.05 }}
              >
                {language === 'ar' ? 
                  { Home: 'الرئيسية', Services: 'الخدمات', Providers: 'المزودين', Map: 'الخريطة', Contact: 'تواصل' }[item] : 
                  item
                }
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-800/50 text-slate-300 hover:text-cyan-400 
                         border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            <motion.button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-slate-800/50 text-slate-300 hover:text-cyan-400 
                         border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 text-sm font-semibold">
                {language === 'ar' ? 'EN' : 'AR'}
              </span>
            </motion.button>

            <motion.button
              className="md:hidden p-2 rounded-lg bg-slate-800/50 text-slate-300 hover:text-cyan-400 
                         border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};