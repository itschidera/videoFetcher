import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const url = "https://api.dailymotion.com/user/x1audmk/videos?limit=20&fields=id,title,thumbnail_240_url";

const Home = ({ navigation }) => {
  const [videoList, setVideoList] = useState([]);

  const fetchData = async () => {
    try {
      const apiResponse = await fetch(url);
      const data = await apiResponse.json();
      setVideoList(data.list);
    } catch (error) {
      console.log("Error Fetching Data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      
      <FlatList
        data={videoList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Details", { videoId: item.id })} style={styles.item}>
            {item.thumbnail_240_url ? (
              <Image source={{ uri: item.thumbnail_240_url }} style={styles.thumbnail} />
            ) : (
              <View style={styles.thumbnailPlaceholder} />
            )}
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Favourites")} style={styles.favouritesButton}>
        <Text style={styles.favouritesText}>VIEW FAVOURITES</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  item: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#00',
    shadowOpacity: 0.4,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  
  thumbnailPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  favouritesButton: {
    padding: 15,
    backgroundColor: '#FF8C69',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  favouritesText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  toolbar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  favouriteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  favouriteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
