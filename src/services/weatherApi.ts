import { WeatherApiResponse, WeatherData } from '../types/weather';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class WeatherService {
  static async getWeatherByCity(city: string): Promise<WeatherData> {
    // Vérification de la clé API
    if (!API_KEY) {
      throw new Error('Clé API manquante. Vérifiez votre fichier .env');
    }

    if (API_KEY.length < 20) {
      throw new Error('Clé API invalide. Vérifiez votre configuration');
    }

    try {
      const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`;
      console.log('Appel API pour:', city); // Pour debug
      
      const response = await fetch(url);

      if (!response.ok) {
        switch (response.status) {
          case 401:
            throw new Error('Clé API invalide ou non activée. Vérifiez votre clé OpenWeatherMap');
          case 404:
            throw new Error('Ville non trouvée. Vérifiez l\'orthographe');
          case 429:
            throw new Error('Trop de requêtes. Attendez quelques minutes');
          case 500:
            throw new Error('Erreur du serveur météo. Réessayez plus tard');
          default:
            throw new Error(`Erreur réseau (${response.status})`);
        }
      }

      const data: WeatherApiResponse = await response.json();
      console.log('Données reçues:', data); // Pour debug
      
      return {
        id: data.id,
        name: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 10) / 10, // Arrondi à 1 décimale
        icon: data.weather[0].icon,
        timestamp: Date.now(),
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erreur API:', error.message);
        throw error;
      }
      console.error('Erreur inconnue:', error);
      throw new Error('Une erreur inattendue s\'est produite');
    }
  }

  static getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  // Méthode pour tester la clé API
  static async testApiKey(): Promise<boolean> {
    try {
      await this.getWeatherByCity('Paris');
      return true;
    } catch (error) {
      console.error('Test API échoué:', error);
      return false;
    }
  }
}
