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
import { ApiService, Movie } from '../../Generated';
import { useFetch } from '../../hooks/useFetch';
import { StackParamList } from '../../navigators/routes';
import { authRoute } from '../Auth/routes';
import { MovieDetailRoute } from '../MovieDetail/routes';
import { MovieListRoute } from './routes';

type ProfileScreenNavigationProp = StackNavigationProp<
  StackParamList,
  typeof MovieListRoute
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export const MovieList = (props: Props) => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [data, loading, error] = useFetch();

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem('mr-token');
      if (token) {
        const response = await ApiService.listMovies();
        setMovies(response);
      } else {
        props.navigation.navigate(...authRoute());
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMovies(data);
    props.navigation.setParams({ updateMovies, deleteMovies, createMovies });
  }, [data]);

  const deleteMovies = async (movie: Movie) => {
    try {
      await ApiService.destroyMovie(movie.id!.toString());
      const newMovies = movies.filter((mov: Movie) => mov.id !== movie.id);
      setMovies([...newMovies]);
      let i = 0;
      while (i < movies.length) {
        if (movies[i].id === movie.id) {
          movies.splice(i, 1);
          break;
        } else {
          i += 1;
        }
      }
      props.navigation.navigate(MovieListRoute);
    } catch (er) {
      console.error(er);
    }
  };

  const updateMovies = async (movie: Movie, newMovie: Movie) => {
    try {
      const response = await ApiService.updateMovie(
        movie.id!.toString(),
        newMovie,
      );
      const newMovies = movies.filter((mov: Movie) => mov.id !== movie.id);
      setMovies([...newMovies, response]);
      props.navigation.navigate(MovieDetailRoute, {
        movie: response,
        title: response.title,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const createMovies = async (movie: Movie) => {
    try {
      const response = await ApiService.createMovie(movie);
      setMovies([...movies, response]);
      props.navigation.navigate(MovieListRoute);
    } catch (err) {
      console.error(err);
    }
  };

  const movieClicked = (movie: Movie) => {
    navigation.navigate(MovieDetailRoute, {
      movie,
      title: movie.title,
      deleteMovies,
      updateMovies,
      createMovies,
    });
  };

  const logoutUser = async () => {
    AsyncStorage.removeItem('mr-token');
    props.navigation.navigate(...authRoute({}));
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
        source={require('../../assets/MR_logo.png')}
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
