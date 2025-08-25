import { WeatherApiResponse, WeatherData } from '../types/weather';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class WeatherService {
  static async getWeatherByCity(city: string): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Ville non trouvée');
        }
        throw new Error('Erreur réseau');
      }

      const data: WeatherApiResponse = await response.json();
      
      return {
        id: data.id,
        name: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
        timestamp: Date.now(),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Une erreur inattendue s\'est produite');
    }
  }

  static getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}
