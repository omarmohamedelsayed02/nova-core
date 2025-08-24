import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Star, MapPin, Users, Clock, Award } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { TypewriterText } from './components/TypewriterText';
import { GlowButton } from './components/GlowButton';
import { ServiceCard } from './components/ServiceCard';
import { ProviderCard } from './components/ProviderCard';
import { EgyptMap } from './components/EgyptMap';
import { NovaAIChat } from './components/NovaAIChat';

import { services } from './data/services';
import { providers } from './data/providers';

function App() {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedGovernorate, setSelectedGovernorate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProviders = providers.filter(provider => {
    const matchesService = !selectedService || provider.service === selectedService;
    const matchesGovernorate = !selectedGovernorate || provider.governorate === selectedGovernorate;
    const matchesSearch = !searchTerm || 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.nameAr.includes(searchTerm);
    return matchesService && matchesGovernorate && matchesSearch;
  });

  const heroTexts = language === 'ar' ? 
    ['المستقبل هنا', 'خدمات ذكية', 'تقنية 2050', 'نوفا كور'] :
    ['The Future is Here', 'Smart Services', '2050 Technology', 'NovaCore'];

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'} transition-all duration-300`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Toaster position="top-right" />
      
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundImage: [
              'radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(0, 255, 255, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Header 
        language={language}
        theme={theme}
        toggleLanguage={toggleLanguage}
        toggleTheme={toggleTheme}
      />

      <div className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="pt-20 min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-6"
                style={{
                  textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                }}
              >
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Nova
                </span>
                <motion.span
                  className="text-white"
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(139, 92, 246, 0.5)',
                      '0 0 40px rgba(139, 92, 246, 0.8)',
                      '0 0 20px rgba(139, 92, 246, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Core
                </motion.span>
              </motion.h1>

              <div className="text-2xl md:text-4xl text-cyan-400 mb-8 h-16 flex items-center justify-center">
                <TypewriterText texts={heroTexts} speed={150} />
              </div>

              <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                {language === 'ar' ? 
                  'منصة مستقبلية تجمع كل مقدمي الخدمات في مكان واحد. من البرمجة والتصميم إلى الصيانة والنظافة - كل ما تحتاجه بضغطة زر واحدة.' :
                  'A futuristic platform that brings all service providers together in one place. From programming and design to maintenance and cleaning - everything you need at the click of a button.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <GlowButton size="lg">
                  <Sparkles className="w-5 h-5 mr-2 inline" />
                  {language === 'ar' ? 'ابدأ الآن' : 'Start Now'}
                </GlowButton>
                
                <GlowButton variant="secondary" size="lg">
                  <Zap className="w-5 h-5 mr-2 inline" />
                  {language === 'ar' ? 'جرّب Nova AI' : 'Try Nova AI'}
                </GlowButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  {language === 'ar' ? 'خدماتنا' : 'Our Services'}
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                {language === 'ar' ? 
                  'اكتشف مجموعة متنوعة من الخدمات المتاحة على منصة NovaCore' :
                  'Discover a diverse range of services available on the NovaCore platform'
                }
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ServiceCard
                    service={service}
                    language={language}
                    onClick={() => setSelectedService(service.name)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Providers Section */}
        <section id="providers" className="py-20 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  {language === 'ar' ? 'مزودو الخدمة' : 'Service Providers'}
                </span>
              </h2>
              
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'ابحث عن مزود خدمة...' : 'Search for a provider...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-slate-800/50 border border-cyan-500/20 rounded-lg px-4 py-3 
                           text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 
                           backdrop-blur-sm"
                />
                
                <select
                  value={selectedService || ''}
                  onChange={(e) => setSelectedService(e.target.value || null)}
                  className="bg-slate-800/50 border border-cyan-500/20 rounded-lg px-4 py-3 
                           text-white focus:outline-none focus:border-cyan-400 backdrop-blur-sm"
                >
                  <option value="">{language === 'ar' ? 'كل الخدمات' : 'All Services'}</option>
                  {services.map(service => (
                    <option key={service.id} value={service.name}>
                      {language === 'ar' ? service.nameAr : service.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProviders.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProviderCard provider={provider} language={language} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section id="map" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  {language === 'ar' ? 'الخريطة التفاعلية' : 'Interactive Map'}
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <EgyptMap
                language={language}
                selectedGovernorate={selectedGovernorate}
                onGovernorateSelect={setSelectedGovernorate}
              />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  {language === 'ar' ? 'مميزات NovaCore' : 'NovaCore Features'}
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: language === 'ar' ? 'سرعة فائقة' : 'Lightning Fast',
                  description: language === 'ar' ? 'استجابة فورية للطلبات' : 'Instant response to requests'
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: language === 'ar' ? 'أمان متقدم' : 'Advanced Security',
                  description: language === 'ar' ? 'حماية شاملة للبيانات' : 'Comprehensive data protection'
                },
                {
                  icon: <Star className="w-8 h-8" />,
                  title: language === 'ar' ? 'تقييمات حية' : 'Live Ratings',
                  description: language === 'ar' ? 'تقييمات محدثة لحظيًا' : 'Real-time updated ratings'
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: language === 'ar' ? 'مجتمع متنوع' : 'Diverse Community',
                  description: language === 'ar' ? 'آلاف المزودين المعتمدين' : 'Thousands of verified providers'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm 
                           rounded-xl p-8 border border-cyan-500/20 hover:border-cyan-400/50 
                           text-center group hover:scale-105 transition-all duration-300"
                >
                  <motion.div
                    className="text-cyan-400 mb-4 flex justify-center"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  {language === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
                </span>
              </h2>
              
              <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                {language === 'ar' ? 
                  'جاهز لتجربة مستقبل الخدمات الذكية؟ انضم إلى NovaCore اليوم' :
                  'Ready to experience the future of smart services? Join NovaCore today'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <GlowButton size="lg">
                  <MapPin className="w-5 h-5 mr-2 inline" />
                  {language === 'ar' ? 'انضم كعميل' : 'Join as Client'}
                </GlowButton>
                
                <GlowButton variant="secondary" size="lg">
                  <Award className="w-5 h-5 mr-2 inline" />
                  {language === 'ar' ? 'انضم كمزود خدمة' : 'Join as Provider'}
                </GlowButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-slate-900/90 border-t border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                className="flex items-center justify-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  NovaCore
                </span>
              </motion.div>
              
              <p className="text-slate-400 mb-4">
                {language === 'ar' ? 
                  '© 2025 NovaCore. جميع الحقوق محفوظة. مستقبل الخدمات الذكية.' :
                  '© 2025 NovaCore. All rights reserved. The future of smart services.'
                }
              </p>
            </div>
          </div>
        </footer>
      </div>

      <NovaAIChat language={language} />
    </div>
  );
}

export default App;