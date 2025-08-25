import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WeatherData } from '../types/weather';
import { useAppTheme } from '../utils/theme';

interface HistoryItemProps {
  data: WeatherData;
  onPress: () => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ data, onPress }) => {
  const { colors } = useAppTheme();

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
    >
      <View style={styles.leftContent}>
        <Text style={[styles.cityName, { color: colors.text }]}>
          {data.name}, {data.country}
        </Text>
        <Text style={[styles.date, { color: colors.textSecondary }]}>
          {formatDate(data.timestamp)}
        </Text>
      </View>
      
      <View style={styles.rightContent}>
        <Text style={[styles.temperature, { color: colors.text }]}>
          {data.temperature}°
        </Text>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    marginTop: 2,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
});
