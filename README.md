# WeatherApp

# Application Météo React Native - Guide Complet

## 1. Configuration initiale

### Installation et setup
```bash
# Créer le projet Expo avec TypeScript
npx create-expo-app WeatherApp --template

# Naviguer dans le dossier
cd WeatherApp

# Installer les dépendances
npm install @react-navigation/native @react-navigation/bottom-tabs @react-native-async-storage/async-storage expo-linear-gradient @expo/vector-icons react-native-safe-area-context react-native-screens

# Pour Expo
npx expo install react-native-safe-area-context react-native-screens
```

### Configuration de l'API OpenWeatherMap
1. Créez un compte sur [OpenWeatherMap](https://openweathermap.org/api)
2. Obtenez votre clé API gratuite
3. Créez un fichier `.env` à la racine du projet :
```
EXPO_PUBLIC_WEATHER_API_KEY=votre_clé_api_ici
```

## 2. Structure du projet

```
WeatherApp/
├── App.tsx
├── src/
│   ├── components/
│   │   ├── WeatherCard.tsx
│   │   ├── SearchInput.tsx
│   │   └── HistoryItem.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   └── HistoryScreen.tsx
│   ├── services/
│   │   ├── weatherApi.ts
│   │   └── storage.ts
│   ├── types/
│   │   └── weather.ts
│   └── utils/
│       └── theme.ts
├── .env
└── package.json
```

## 3. Instructions de démarrage

1. **Clonez ou créez le projet** avec la structure ci-dessus
2. **Ajoutez votre clé API** dans le fichier `.env`
3. **Installez les dépendances** : `npm install`
4. **Lancez l'application** : `npx expo start`

## 4. Fonctionnalités implémentées

✅ Recherche de ville avec validation  
✅ Affichage des données météo avec carte visuelle  
✅ Gestion des erreurs réseau et villes non trouvées  
✅ Historique local avec AsyncStorage  
✅ Navigation entre écrans (Recherche/Historique)  
✅ Thème adaptatif (clair/sombre)  
✅ Interface responsive et élégante  
✅ TypeScript complet  
✅ SafeAreaView et ScrollView  

## 5. Améliorations possibles

- Prévisions sur 5 jours avec graphique
- Géolocalisation automatique
- Notifications météo
- Widgets personnalisés
- Animations de transition
- Tests unitaires

L'application est maintenant prête à être déployée et testée sur un appareil mobile ou émulateur !
