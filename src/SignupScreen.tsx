import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox } from 'react-native-elements';
import { register } from '../api'; // Import the register function from api.js

// Function to generate a random captcha
const generateCaptcha = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

// Function to validate email format
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const SignupScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [salutation, setSalutation] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // Initialize captcha on component mount
    setCaptcha(generateCaptcha());
  }, []);

  const handleSignup = async () => {
    // Check if all required fields are filled
    if (!salutation || !name || !email || !phoneNumber || !address || !password || !confirmPassword || !captchaInput || !agreeTerms) {
      Alert.alert('Validation Error', 'Please fill out all fields and agree to the terms and conditions.');
      return;
    }

    // Check if email is valid
    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    // Check if captcha entered matches the generated captcha
    if (captchaInput !== captcha) {
      Alert.alert('Captcha Error', 'The captcha entered is incorrect. Please try again.');
      // Regenerate captcha and clear input field
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }

    // Collect user data
    const userData = {
      salutation,
      name,
      email,
      phoneNumber,
      dateOfBirth,
      address,
      password
    };

    try {
      const response = await register(userData);
      Alert.alert('Success', 'Registration successful');
      // Navigate to the main screen or login screen
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Registration Error', 'An error occurred during registration. Please try again.');
    }
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  return (
    <ImageBackground source={require('./assets/bg.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Salutation</Text>
          <Picker
            selectedValue={salutation}
            onValueChange={(itemValue) => setSalutation(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Mr" value="Mr" />
            <Picker.Item label="Mrs" value="Mrs" />
            <Picker.Item label="Miss" value="Miss" />
          </Picker>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address"
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text>{dateOfBirth.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, styles.addressInput]}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            multiline
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
          />
          <Text style={styles.label}>Captcha: {captcha}</Text>
          <TextInput
            style={styles.input}
            value={captchaInput}
            onChangeText={setCaptchaInput}
            placeholder="Enter the above captcha"
          />
          <View style={styles.agreementContainer}>
            <CheckBox
              title="I agree to the Terms and Conditions"
              checked={agreeTerms}
              onPress={() => setAgreeTerms(!agreeTerms)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background to make text readable
    borderRadius: 5,
    padding: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  addressInput: {
    height: 80, // Increase height for multiline input
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
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
});

export default SignupScreen;
