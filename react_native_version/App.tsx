import React from 'react';
import { StyleSheet } from 'react-native';
import { OpenAPI } from './Generated';
import MainStackNavigator from './navigators/MainStackNavigator';

OpenAPI.BASE = 'http://192.168.0.28:8000';

export default function App() {
  return <MainStackNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
