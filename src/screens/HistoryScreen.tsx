import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { HistoryItem } from '../components/HistoryItem';
import { StorageService } from '../services/storage';
import { WeatherData } from '../types/weather';
import { useAppTheme } from '../utils/theme';

interface HistoryScreenProps {
  navigation: any;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const [history, setHistory] = useState<WeatherData[]>([]);
  const { colors } = useAppTheme();

  const loadHistory = async () => {
    const data = await StorageService.getHistory();
    setHistory(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const handleClearHistory = () => {
    Alert.alert(
      'Vider l\'historique',
      'Êtes-vous sûr de vouloir supprimer tout l\'historique ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await StorageService.clearHistory();
            setHistory([]);
          },
        },
      ]
    );
  };

  const handleItemPress = (item: WeatherData) => {
    navigation.navigate('Home', { weatherData: item });
  };

  const renderItem = ({ item }: { item: WeatherData }) => (
    <HistoryItem data={item} onPress={() => handleItemPress(item)} />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.title, { color: colors.text }]}>Historique des recherches</Text>
      {history.length > 0 && (
        <TouchableOpacity onPress={handleClearHistory}>
          <Ionicons name="trash-outline" size={24} color={colors.error} />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="time-outline" size={64} color={colors.textSecondary} />
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        Aucune recherche récente
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}-${item.timestamp}`}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
});
