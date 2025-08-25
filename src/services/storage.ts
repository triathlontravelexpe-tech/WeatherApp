import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData } from '../types/weather';

const HISTORY_KEY = 'weather_history';
const MAX_HISTORY_ITEMS = 10;

export class StorageService {
  static async getHistory(): Promise<WeatherData[]> {
    try {
      const historyJson = await AsyncStorage.getItem(HISTORY_KEY);
      return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      return [];
    }
  }

  static async addToHistory(weatherData: WeatherData): Promise<void> {
    try {
      const history = await this.getHistory();
      
      // Supprimer l'élément s'il existe déjà
      const filteredHistory = history.filter(item => item.id !== weatherData.id);
      
      // Ajouter au début
      const newHistory = [weatherData, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
      
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Erreur lors de l\'ajout à l\'historique:', error);
    }
  }

  static async clearHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'historique:', error);
    }
  }
}
