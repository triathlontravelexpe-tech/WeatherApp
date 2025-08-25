import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../utils/theme';

interface SearchInputProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');
  const { colors } = useAppTheme();

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    } else {
      Alert.alert('Erreur', 'Veuillez entrer le nom d\'une ville');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder="Rechercher une ville..."
        placeholderTextColor={colors.textSecondary}
        value={city}
        onChangeText={setCity}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        editable={!loading}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleSearch}
        disabled={loading}
      >
        <Ionicons 
          name={loading ? "hourglass" : "search"} 
          size={24} 
          color="white" 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 25,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
