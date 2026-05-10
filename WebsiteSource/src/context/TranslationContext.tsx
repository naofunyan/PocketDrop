import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language } from '../translations';

// Infer the type from the en translation object
export type Translation = typeof translations.en;

interface TranslationContextType {
  lang: Language;
  t: Translation;
  toggleLanguage: () => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'vi' : 'en'));
  };

  return (
    <TranslationContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
