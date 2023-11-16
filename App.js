import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LessonScreen from './screens/LessonScreen';
import ProgressScreen from './screens/ProgressScreen';
import CraftSpeechScreen from './screens/CraftSpeechScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Voice Coach" component={LessonScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="CraftSpeech" component={CraftSpeechScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
