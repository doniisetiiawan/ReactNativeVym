/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform, StatusBar,
} from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
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
    <ActionSheetProvider>

      <View style={styles.container}>
        <Text>
          Open up App.js to start working on your app!
        </Text>

        <Fetch />
      </View>
    </ActionSheetProvider>

  );
}
