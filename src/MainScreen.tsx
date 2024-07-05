import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

const MainScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Main Screen</Text>
      <Button title="Open Drawer" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      {/* Add your main screen content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Adjust background color as needed
  },
});

export default MainScreen;
