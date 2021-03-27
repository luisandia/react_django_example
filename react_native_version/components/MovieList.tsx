import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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
import { ApiService, Movie } from '../Generated';
import { useFetch } from '../hooks/useFetch';
import { StackParamList } from '../navigators/MainStackNavigator';
import { AuthRoute } from './Auth';
import { MovieDetailRoute } from './MovieDetail';

export const MovieListRoute = 'MovieList';

type ProfileScreenNavigationProp = StackNavigationProp<
  StackParamList,
  typeof MovieListRoute
>;

export interface MovieListParamsRoute {
  title: string;
  updateMovies(movie: Movie): void;
}

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const MovieList = (props: Props) => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState<any>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [editedMovie, setEditedMovie] = useState<Movie | null>(null);

  const [data, loading, error] = useFetch();

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem('mr-token');
      if (token) {
        const response = await ApiService.listMovies();
        setMovies(response);
      } else {
        props.navigation.navigate(AuthRoute);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMovies(data);
    props.navigation.setParams({ updateMovies });
  }, [data]);

  const updateMovies = (movie: Movie) => {
    setMovies([...movies, movie]);
  };

  const movieClicked = (movie: Movie) => {
    navigation.navigate(MovieDetailRoute, {
      movie,
      title: movie.title,
    });
  };

  const logoutUser = async () => {
    AsyncStorage.removeItem('mr-token');
    props.navigation.navigate(AuthRoute);
  };

  if (loading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

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
