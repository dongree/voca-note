import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Main from './screens/main';

export default function App() {
  return (
    <View style={styles.container}>
      <Main />
      <StatusBar style="light" backgroundColor="#000000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
