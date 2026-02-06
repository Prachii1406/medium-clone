import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = '@app_theme';

interface ThemeColors {
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
  };
  border: string;
  accent: string;
}

const lightColors: ThemeColors = {
  background: '#FFFFFF',
  surface: '#F8F8F8',
  text: {
    primary: '#000000',
    secondary: '#6B6B6B',
  },
  border: '#E6E6E6',
  accent: '#1A8917',
};

const darkColors: ThemeColors = {
  background: '#0A0A0A',
  surface: '#1A1A1A',
  text: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3',
  },
  border: '#2A2A2A',
  accent: '#1A8917',
};

interface ThemeContextType {
  theme: Theme;
  activeTheme: 'light' | 'dark';
  colors: ThemeColors;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(true);
  const systemColorScheme = useColorScheme();

  // Load saved theme on mount
  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
        setThemeState(savedTheme as Theme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const getActiveTheme = (): 'light' | 'dark' => {
    if (theme === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return theme;
  };

  const activeTheme = getActiveTheme();
  const colors = activeTheme === 'light' ? lightColors : darkColors;

  // Don't render children until theme is loaded
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, activeTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};