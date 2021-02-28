import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Movie } from '../Generated';
import { useFetch } from '../hooks/useFetch';

interface Props {}

const MovieList = (props: Props) => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState<any>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [editedMovie, setEditedMovie] = useState<Movie | null>(null);

  const [data, loading, error] = useFetch();

  useEffect(() => {
    setMovies(data);
  }, [data]);

  const movieClicked = (movie: Movie) => {
    navigation.navigate('Detail', {
      movie,
      title: movie.title,
      // token,
    });
  };
  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem('mr-token');
      if (!token) {
        props.navigation.navigate('Auth');
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logoutUser = async () => {
    AsyncStorage.removeItem('mr-token');
    props.navigation.navigate('Auth');
  };
  return (
    <View>
      <Image
        source={require('../assets/MR_logo.png')}
        style={{ width: '100%', height: 135, paddingTop: 30 }}
      />
      <Button onPress={() => logoutUser()} title="Logout" />

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => movieClicked(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: '#282C35',
  },
  itemText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default MovieList;
