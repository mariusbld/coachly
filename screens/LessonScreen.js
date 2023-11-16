import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, TextInput } from 'react-native';
import { Audio } from 'expo-av';

export default function LessonScreen() {
  const [recording, setRecording] = React.useState();
  const [uri, setUri] = React.useState();
  const [stats, setStats] = React.useState({ text: "Hello, just testing this", wpm: 100});

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    setUri(uri);
    console.log('Recording stopped and stored at', uri);
    await sendFile();
  }

  async function sendFile() {
    var body = new FormData();
    body.append('file', {
       name: 'sound.mp4',
       type: 'audio/mp3',
       uri: uri
    });
    const API_URL = 'https://0b55-67-207-107-182.ngrok.io/upload';
    const API_URL_LIVE = 'https://1dec-67-207-107-182.ngrok-free.app/transcribe';
    // console.log("+++++++=========body=========++++++",body);
    try {
        const response = await fetch(API_URL_LIVE, {
          method: 'POST',
          body: body,
          headers: {
              // Headers may be set according to your API requirements
              'Accept': 'application/json',
              // 'Content-Type': 'multipart/form-data', // This is often not needed
          },
        });
        const responseJson = await response.json();
        console.log("+++++++=========responseJson=========++++++",responseJson);
        const { text, wpm } = responseJson;
        setStats({ text, wpm });
      } catch (error) {
        console.log(error);
      }
  }

  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(require(uri));
  //   setSound(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync();
  // }

  async function reset() {
    setStats(undefined);
  }

  if (stats) {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.textLogo}>Your Speech</Text> */}
        <Text style={styles.textLogo}>WPM: {stats.wpm}</Text>
        <TextInput style={styles.textSpeech}>{stats.text}</TextInput>
        <TouchableOpacity 
          style={styles.button} 
          onPress={reset}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
          <StatusBar style="auto" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {!!recording && <TouchableOpacity onPress={stopRecording}>
        <Image
          source={require('../assets/stop-icon.jpeg')}
          style={{ width: 100, height: 100 }}
        />
      </TouchableOpacity>}
      {!recording && <TouchableOpacity onPress={startRecording}>
        <Image
          source={require('../assets/mic-icon.png')}
          style={{ width: 100, height: 100 }}
        />
      </TouchableOpacity>}
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
    marginBottom: 20,
  },
  textSpeech: {
    backgroundColor: '#C2FEF3',
    fontSize: 18,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    minWidth: 300,
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
