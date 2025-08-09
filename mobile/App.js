import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from './src/screens/FeedScreen';
import UploadScreen from './src/screens/UploadScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
