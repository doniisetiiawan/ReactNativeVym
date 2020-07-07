/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform, StatusBar,
} from 'react-native';
import Fetch from './app/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>
        Open up App.js to start working on your app!
      </Text>
      <Fetch />
    </View>
  );
}
