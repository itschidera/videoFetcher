import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';

const Favourites = ({ navigation }) => {
  const [favoriteVideos, setFavoriteVideos] = useState([]);

  useEffect(() => {
    const fetchFavoriteVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'favorites'));
        const favouriteVids = querySnapshot.docs.map(doc => ({ videoId: doc.id, ...doc.data() }));
        setFavoriteVideos(favouriteVids);
      } catch (error) {
        console.error("Unable to fetch favorites: ", error);
      }
    };

    fetchFavoriteVideos();
  }, []);

  const handleClearFavorites = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'favorites'));
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      setFavoriteVideos([]);
    } catch (error) {
      console.error("Unable to clear favorites: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={() => navigation.navigate('Details', { videoId: item.id })}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favoriteVideos.length === 0 ? (
        <Text style={styles.noFavorites}>No favorites found</Text>
      ) : (
        <FlatList
          data={favoriteVideos}
          renderItem={renderItem}
          keyExtractor={item => item.videoId}
          contentContainerStyle={styles.listContent}
        />
      )}
      <TouchableOpacity
        onPress={handleClearFavorites}
        style={[styles.button, { backgroundColor: favoriteVideos.length === 0 ? '#b0b0b0' : '#FF6347' }]}
        disabled={favoriteVideos.length === 0}
      >
        <Text style={styles.buttonText}>Clear Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  itemTitle: {
    fontSize: 18,
    color: '#333333',
    flex: 1,
  },
  noFavorites: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666666',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Favourites;
