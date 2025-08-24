import { useState, useCallback } from 'react';

export type Language = 'en' | 'ar';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  }, []);

  const isRTL = language === 'ar';

  return {
    language,
    toggleLanguage,
    isRTL
  };
};