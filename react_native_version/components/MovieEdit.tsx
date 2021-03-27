import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ApiService, Movie } from '../Generated';
import { StackParamList } from '../navigators/MainStackNavigator';
import { MovieDetailRoute } from './MovieDetail';
import { MovieListRoute } from './MovieList';

export const MovieEditRoute = 'MovieEdit';

type MovieEditScreenNavigationProp = StackNavigationProp<
  StackParamList,
  typeof MovieEditRoute
>;

type MovieEditScreenRouteProp = RouteProp<
  StackParamList,
  typeof MovieEditRoute
>;

export interface MovieEditParamsRoute {
  title: string;
  movie: Movie;
  updateMovies(movie: Movie): void;
}

interface Props {
  navigation: MovieEditScreenNavigationProp;
  route: MovieEditScreenRouteProp;
}

const MovieEdit = (props: Props) => {
  const { movie } = props.route.params;
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);

  const saveMovie = async () => {
    if (movie.id) {
      try {
        const NewMovie: Movie = { title, description };
        const response = await ApiService.updateMovie(
          movie.id!.toString(),
          NewMovie,
        );
        props.navigation.navigate(MovieDetailRoute, {
          movie: response,
          title: response.title,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const newMovie: Movie = { title, description };
        const response = await ApiService.createMovie(newMovie);
        props.route.params.updateMovies(response);

        props.navigation.navigate(MovieListRoute);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      <Button onPress={() => saveMovie()} title={movie.id ? 'Edit' : 'Add'} />
    </View>
  );
};

export default MovieEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding: 10,
  },
  label: {
    fontSize: 24,
    color: 'white',
    padding: 10,
  },
  input: {
    fontSize: 24,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
  },
});
