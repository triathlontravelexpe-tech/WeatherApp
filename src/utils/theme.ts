import { useColorScheme } from 'react-native';

export const useAppTheme = () => {
  const colorScheme = useColorScheme();
  
  const colors = {
    primary: '#4A90E2',
    secondary: '#7ED321',
    background: colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
    surface: colorScheme === 'dark' ? '#2d2d2d' : '#f5f5f5',
    text: colorScheme === 'dark' ? '#ffffff' : '#333333',
    textSecondary: colorScheme === 'dark' ? '#cccccc' : '#666666',
    border: colorScheme === 'dark' ? '#404040' : '#e0e0e0',
    error: '#FF4444',
  };

  return { colors, isDark: colorScheme === 'dark' };
};
