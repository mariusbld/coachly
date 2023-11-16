import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <Button title='Start' />
      <Text>Craft Your Speech</Text>
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
  textLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});
