import React, { createContext, useContext, useEffect } from 'react';

interface SEOContextValue {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setKeywords: (keywords: string) => void;
}

const SEOContext = createContext<SEOContextValue | undefined>(undefined);

export const useSEO = () => {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEO must be used within an SEOProvider');
  }
  return context;
};

interface SEOProviderProps {
  children: React.ReactNode;
}

export const SEOProvider: React.FC<SEOProviderProps> = ({ children }) => {
  const setTitle = (title: string) => {
    document.title = title;
  };

  const setDescription = (description: string) => {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  };

  const setKeywords = (keywords: string) => {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);
  };

  return (
    <SEOContext.Provider value={{ setTitle, setDescription, setKeywords }}>
      {children}
    </SEOContext.Provider>
  );
};

// Custom hook for setting page meta data
export const usePageSEO = (title: string, description: string, keywords?: string) => {
  const { setTitle, setDescription, setKeywords } = useSEO();

  useEffect(() => {
    setTitle(`${title} | Recipeer`);
    setDescription(description);
    if (keywords) {
      setKeywords(keywords);
    }
  }, [title, description, keywords, setTitle, setDescription, setKeywords]);
};