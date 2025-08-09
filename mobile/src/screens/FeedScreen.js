import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { API_BASE_URL } from '../config';

const HEIGHT = Dimensions.get('window').height;

export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // For demo: no auth, fetch seeded posts from public endpoint if available
    fetch(`${API_BASE_URL}/api/posts/feed`, { headers: { Authorization: 'Bearer demo' } })
      .then(r => r.json())
      .then(data => setPosts(data.posts || []))
      .catch(e => console.log('Feed error', e));
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ height: HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
      <Video
        source={{ uri: item.videoUrl }}
        style={{ width: '100%', height: '70%' }}
        useNativeControls={false}
        resizeMode="cover"
        shouldPlay
        isLooping
      />
      <Text>{item.caption}</Text>
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={p => p.id}
      pagingEnabled
    />
  );
}
