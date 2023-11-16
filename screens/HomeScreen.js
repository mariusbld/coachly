import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Image
          source={require('../assets/coachly-logo.jpeg')}
          style={{ width: 320, height: 320 }} // Adjust the size as needed
        />
      {/* <Button style={styles.actionButton} title='Voice Coach' onPress={() => navigation.navigate('Voice Coach')} />
      <Button title='View Progress' onPress={() => navigation.navigate('Progress')} /> */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Voice Coach')}
      >
        <Text style={styles.buttonText}>Voice Coach</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Progress')}
      >
        <Text style={styles.buttonText}>View Progress</Text>
      </TouchableOpacity>
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
  },
  actionButton: {
    color: '#ff0000',
    fontSize: 24,
  },
  button: {
    margin: 4,
    backgroundColor: '#028a87',
    padding: 12,
    borderRadius: 5,
    width: 180,
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
  },
});
