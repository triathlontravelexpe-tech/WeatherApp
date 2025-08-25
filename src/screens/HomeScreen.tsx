import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchInput } from '../components/SearchInput';
import { WeatherCard } from '../components/WeatherCard';
import { ApiDebugComponent } from '../components/ApiDebugComponent';
import { WeatherService } from '../services/weatherApi';
import { StorageService } from '../services/storage';
import { WeatherData } from '../types/weather';
import { useAppTheme } from '../utils/theme';

export const HomeScreen: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const { colors } = useAppTheme();

  const handleSearch = async (city: string) => {
    setLoading(true);
    try {
      const data = await WeatherService.getWeatherByCity(city);
      setWeatherData(data);
      await StorageService.addToHistory(data);
    } catch (error) {
      Alert.alert(
        'Erreur',
        error instanceof Error ? error.message : 'Une erreur est survenue'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchInput onSearch={handleSearch} loading={loading} />
        {weatherData && <WeatherCard data={weatherData} />}
        <ApiDebugComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
