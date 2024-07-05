import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

// Function to generate a random captcha
const generateCaptcha = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  useEffect(() => {
    // Initialize captcha on component mount
    setCaptcha(generateCaptcha());
  }, []);

  const handleLogin = async () => {
    // Check if captcha entered matches the generated captcha
    if (captchaInput !== captcha) {
      Alert.alert('Captcha Error', 'The captcha entered is incorrect. Please try again.');
      // Regenerate captcha and clear input field
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }

    try {
      // Make API request to check username and password
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });

      if (response.data.success) {
        // Navigate to MainScreen if login is successful
        navigation.replace('Main');
      } else {
        // Show error message if login fails
        Alert.alert('Login Error', response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Login Error', 'An error occurred during login. Please try again.');
    }
  };

  const navigateToSignup = () => {
    // Navigate to SignupScreen when sign up link is pressed
    navigation.navigate('Signup');
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic or navigation here
    console.log('Forgot Password');
  };

  return (
    <ImageBackground source={require('./assets/bg.jpg')} style={styles.background}>
      <View style={styles.container}>
        {/* Username input */}
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
        />
        
        {/* Password input */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />
        
        {/* Captcha display */}
        <Text style={styles.label}>Captcha: {captcha}</Text>
        <TextInput
          style={styles.input}
          value={captchaInput}
          onChangeText={setCaptchaInput}
          placeholder="Enter the above captcha"
        />
        
        {/* Login button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        {/* Forgot Password link */}
        <Text style={styles.link} onPress={handleForgotPassword}>Forgot Password?</Text>
        
        {/* Sign Up Link */}
        <TouchableOpacity onPress={navigateToSignup}>
          <Text style={styles.signupLink}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Styles for the LoginScreen component
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background to make text readable
  },
  label: {
    marginBottom: 8,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 15,
    paddingLeft: 8,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#D3B3F0', // Light purple color for button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  link: {
    color: '#6D597A',
    marginTop: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  signupLink: {
    marginTop: 16,
    textAlign: 'center',
    color: '#6D597A',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
