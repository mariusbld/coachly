import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textLogo}>[Coachly Logo]</Text>
      <Button title='Start Lesson' onPress={() => navigation.navigate('Lesson')} />
      <Button title='Craft Speech' onPress={() => navigation.navigate('Speech')} />
      <Button title='View Progress' onPress={() => navigation.navigate('Progress')} />
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
