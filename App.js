import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import MemoryGame from './components/MemoryGame'

export default function App() {
  return (
  <MemoryGame />
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
