import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Animated } from 'react-native';

export default function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleMouseEnter = () => {
    setIsHovered(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      {!submitted && <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          placeholder="Age"
          style={styles.input}
          value={age}
          onChangeText={text => setAge(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>}
      {submitted && (
        <TouchableOpacity
          style={isHovered ? [styles.card, styles.cardHover] : styles.card}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }} // Dummy profile image
            style={styles.profileImage}
          />
          <Text style={[styles.bioText, { opacity: fadeAnim }]}>
            {isHovered ? `${username}, ${age}` : 'Muhammad Ali first native App'}
          </Text>
        </TouchableOpacity>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // For shadow effect
  },
  cardHover: {
    backgroundColor: '#e0e0e0',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  bioText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
