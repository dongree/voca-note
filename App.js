import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Dimensions, View } from 'react-native';
import Home from './screens/home';
import Management from './screens/management/main';
import Quiz from './screens/quiz';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export default function App() {
  return (
    <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={true}>
      <View style={styles.screen}>
        <Home />
      </View>
      <View style={styles.screen}>
        <Management />
      </View>
      <View style={styles.screen}>
        <Quiz />
      </View>
    </ScrollView>
    // <StatusBar style="auto" />
  );
}

const styles = StyleSheet.create({
  screen: {
    width: SCREEN_WIDTH,
  },
});
