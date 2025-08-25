import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { WeatherData } from '../types/weather';
import { WeatherService } from '../services/weatherApi';
import { useAppTheme } from '../utils/theme';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const { colors } = useAppTheme();

  const getGradientColors = () => {
    const temp = data.temperature;
    if (temp < 0) return ['#4A90E2', '#357ABD']; // Bleu froid
    if (temp < 15) return ['#7ED321', '#5BA016']; // Vert frais
    if (temp < 25) return ['#F5A623', '#E8940F']; // Orange chaud
    return ['#D0021B', '#B8001A']; // Rouge très chaud
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.cityName}>{data.name}</Text>
        <Text style={styles.country}>{data.country}</Text>
      </View>

      <View style={styles.mainInfo}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{data.temperature}°</Text>
          <Text style={styles.description}>{data.description}</Text>
        </View>
        <Image
          source={{ uri: WeatherService.getIconUrl(data.icon) }}
          style={styles.weatherIcon}
        />
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="water" size={20} color="white" />
          <Text style={styles.detailText}>Humidité: {data.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="leaf" size={20} color="white" />
          <Text style={styles.detailText}>Vent: {data.windSpeed} m/s</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    margin: 20,
    // Utilisation de boxShadow pour le web, elevation pour mobile
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
    } : {
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    }),
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  country: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  temperatureContainer: {
    flex: 1,
  },
  temperature: {
    fontSize: 64,
    fontWeight: '300',
    color: 'white',
  },
  description: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'capitalize',
    marginTop: 5,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    paddingTop: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
});
