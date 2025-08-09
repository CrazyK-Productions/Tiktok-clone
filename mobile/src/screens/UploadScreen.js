import React from 'react';
import { View, Text, Button } from 'react-native';

export default function UploadScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Upload screen (coming soon)</Text>
      <Button title="Pick video" onPress={() => alert('Implement picking/uploading in next step')} />
    </View>
  );
}
