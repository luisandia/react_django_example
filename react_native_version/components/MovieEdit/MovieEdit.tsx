import { RouteProp } from '@react-navigation/core';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Movie } from '../../Generated';
import { StackParamList } from '../../navigators/routes';
import { MovieEditRoute } from './routes';

type MovieEditScreenRouteProp = RouteProp<
  StackParamList,
  typeof MovieEditRoute
>;

interface Props {
  route: MovieEditScreenRouteProp;
}

export const MovieEdit = (props: Props) => {
  const { route } = props;
  const { movie } = route.params;
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);

  const saveMovie = async () => {
    if (movie.id) {
      const newMovie: Movie = { title, description };
      props.route.params.updateMovies(movie, newMovie);
    } else {
      const newMovie: Movie = { title, description };
      props.route.params.createMovies(newMovie);
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
