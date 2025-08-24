import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { services } from '../data/services';
import { Language } from '../hooks/useLanguage';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface NovaAIChatProps {
  language: Language;
}

export const NovaAIChat: React.FC<NovaAIChatProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: language === 'ar' ? 
        'مرحبا! أنا Nova AI. كيف يمكنني مساعدتك في العثور على الخدمة المناسبة؟' : 
        'Hello! I\'m Nova AI. How can I help you find the right service?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simple AI response logic
    setTimeout(() => {
      const botResponse = generateResponse(inputText, language);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputText('');
  };

  const generateResponse = (input: string, lang: Language): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('program') || lowerInput.includes('develop') || lowerInput.includes('برمج') || lowerInput.includes('تطوير')) {
      return lang === 'ar' ? 
        'يمكنني مساعدتك في العثور على أفضل المطورين! لدينا خبراء في تطوير المواقع والتطبيقات.' :
        'I can help you find the best developers! We have experts in web and mobile development.';
    }
    
    if (lowerInput.includes('design') || lowerInput.includes('تصميم')) {
      return lang === 'ar' ? 
        'رائع! لدينا مصممين مبدعين متخصصين في UI/UX والتصميم الجرافيكي.' :
        'Great! We have creative designers specialized in UI/UX and graphic design.';
    }
    
    if (lowerInput.includes('clean') || lowerInput.includes('نظافة')) {
      return lang === 'ar' ? 
        'نوفر خدمات تنظيف احترافية للمنازل والمكاتب بأسعار مناسبة.' :
        'We provide professional cleaning services for homes and offices at affordable prices.';
    }

    return lang === 'ar' ? 
      'يمكنني مساعدتك في العثور على الخدمة المناسبة. هل تريد رؤية جميع الخدمات المتاحة؟' :
      'I can help you find the right service. Would you like to see all available services?';
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-purple-600 
                   text-white p-4 rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 
                   transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bot className="w-6 h-6" />
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-slate-900/95 backdrop-blur-lg 
                       rounded-xl border border-cyan-500/30 shadow-xl shadow-cyan-500/20"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-cyan-500/20">
              <div className="flex items-center space-x-2">
                <Bot className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-white font-semibold">Nova AI</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-slate-400">
                      {language === 'ar' ? 'متاح' : 'Online'}
                    </span>
                  </div>
                </div>
              </div>
              
              <motion.button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-3">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.isBot 
                        ? 'bg-slate-700/50 text-white border border-cyan-500/20' 
                        : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    }`}>
                      {message.isBot && <Sparkles className="w-4 h-4 inline mr-1 text-cyan-400" />}
                      {message.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t border-cyan-500/20">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
                  className="flex-1 bg-slate-800/50 border border-cyan-500/20 rounded-lg px-3 py-2 
                           text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 p-2 rounded-lg 
                           text-white hover:shadow-lg hover:shadow-cyan-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};