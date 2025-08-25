import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WeatherService } from '../services/weatherApi';

export const ApiDebugComponent: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<'testing' | 'valid' | 'invalid'>('testing');
  const [error, setError] = useState<string>('');

  const testApi = async () => {
    setApiStatus('testing');
    setError('');
    
    try {
      const isValid = await WeatherService.testApiKey();
      setApiStatus(isValid ? 'valid' : 'invalid');
    } catch (err) {
      setApiStatus('invalid');
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  useEffect(() => {
    testApi();
  }, []);

  const getStatusColor = () => {
    switch (apiStatus) {
      case 'testing': return '#FFA500';
      case 'valid': return '#4CAF50';
      case 'invalid': return '#F44336';
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'testing': return 'Test en cours...';
      case 'valid': return 'API fonctionnelle ✓';
      case 'invalid': return 'API non fonctionnelle ✗';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.status, { color: getStatusColor() }]}>
        {getStatusText()}
      </Text>
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      <TouchableOpacity style={styles.button} onPress={testApi}>
        <Text style={styles.buttonText}>Retester l'API</Text>
      </TouchableOpacity>
      
      <View style={styles.info}>
        <Text style={styles.infoTitle}>Configuration API :</Text>
        <Text style={styles.infoText}>
          Clé API: {process.env.EXPO_PUBLIC_WEATHER_API_KEY ? 
            `${process.env.EXPO_PUBLIC_WEATHER_API_KEY.substring(0, 8)}...` : 
            'Non définie'}
        </Text>
        <Text style={styles.infoText}>
          Longueur: {process.env.EXPO_PUBLIC_WEATHER_API_KEY?.length || 0} caractères
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: '#F44336',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  info: {
    width: '100%',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 2,
  },
});
