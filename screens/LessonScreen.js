import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';

export default function LessonScreen() {
  const [recording, setRecording] = React.useState();
  const [uri, setUri] = React.useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
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
  }

  async function sendFile() {
    var body = new FormData();
    body.append('inputFile', {
       name: 'sound.mp4',
       type: 'audio/mp3',
       uri: uri
    });
    // console.log("+++++++=========body=========++++++",body);
    try {
        const response = await fetch('https://0b55-67-207-107-182.ngrok.io/upload', {
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

  return (
    <View style={styles.container}>
      {!!recording && <TouchableOpacity onPress={startRecording}>
        <Image
          source={require('../assets/stop-icon.jpeg')}
          style={{ width: 120, height: 120 }} // Adjust the size as needed
        />
      </TouchableOpacity>}
      {!recording && <TouchableOpacity onPress={startRecording}>
        <Image
          source={require('../assets/mic-icon.png')}
          style={{ width: 120, height: 120 }} // Adjust the size as needed
        />
      </TouchableOpacity>}
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Text>{recording ? "recording" : "stopped"}</Text>
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
