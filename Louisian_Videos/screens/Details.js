import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Details = ({ route }) => {
  const { videoId } = route.params;
  const url = `https://api.dailymotion.com/video/${videoId}?fields=thumbnail_240_url,description,views_total,title,created_time`;
  const [video, setVideo] = useState(null);
  const [favorite, setFavorite] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setVideo(data);
    } catch (error) {
      console.log("Error Fetching Data", error);
    }
  };

  const handleFavorites = async () => {
    try {
      await addDoc(collection(db, 'favorites'), {
        id: videoId,
        title: video.title,
      });
      setFavorite(true);
      alert('Video has been added to favorites!');
    } catch (error) {
      console.error("Could not add to favorites: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!video) return <View style={styles.loadingContainer}><Text style={styles.loadingText}>Loading...</Text></View>;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image source={{ uri: video.thumbnail_240_url }} style={styles.thumbnail} />
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.views}>Views: {video.views_total}</Text>
        <Text style={styles.description}>{video.description}</Text>
        <TouchableOpacity style={styles.button} onPress={handleFavorites}>
          <Text style={styles.buttonText}>{favorite ? 'Favorited' : 'Add to Favorites'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  views: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF8C69',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
});

export default Details;
