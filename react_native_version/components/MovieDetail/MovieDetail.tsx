import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ApiService } from '../../Generated';
import { StackParamList } from '../../navigators/routes';
import { MovieDetailRoute } from './routes';

export type ProfileScreenNavigationProp = RouteProp<
  StackParamList,
  typeof MovieDetailRoute
>;

interface Props {
  route: ProfileScreenNavigationProp;
}

export const MovieDetail = (props: Props) => {
  const [highlight, setHeighlight] = useState(-1);
  const { route } = props;
  const { movie } = route.params;
  const avgRating = +movie?.avg_rating!;

  const rateClicked = async () => {
    try {
      movie!.stars = highlight;
      const { id } = movie!;
      const res = await ApiService.rateMovieMovie(id!.toString(), movie!);
      setHeighlight(0);
      Alert.alert('Rating', (res as any).message);
    } catch (e) {
      console.error(e);
      //   Alert.alert('Error', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        <FontAwesomeIcon
          style={avgRating > 0 ? styles.orange : styles.white}
          icon={faStar}
        />
        <FontAwesomeIcon
          style={avgRating > 1 ? styles.orange : styles.white}
          icon={faStar}
        />
        <FontAwesomeIcon
          style={avgRating > 2 ? styles.orange : styles.white}
          icon={faStar}
        />
        <FontAwesomeIcon
          style={avgRating > 3 ? styles.orange : styles.white}
          icon={faStar}
        />
        <FontAwesomeIcon
          style={avgRating > 4 ? styles.orange : styles.white}
          icon={faStar}
        />
        <Text style={styles.white}>{movie!.no_of_ratings}</Text>
      </View>
      <Text style={styles.description}>{movie!.description}</Text>

      <View style={{ borderBottomColor: 'white', borderBottomWidth: 2 }} />
      <Text style={styles.description}>Rate it !!!</Text>

      <View style={styles.starContainer}>
        <TouchableOpacity onPress={() => setHeighlight(1)}>
          <FontAwesomeIcon
            style={highlight > 0 ? styles.purple : styles.grey}
            icon={faStar}
            size={48}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setHeighlight(2)}>
          <FontAwesomeIcon
            style={highlight > 1 ? styles.purple : styles.grey}
            icon={faStar}
            size={48}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setHeighlight(3)}>
          <FontAwesomeIcon
            style={highlight > 2 ? styles.purple : styles.grey}
            icon={faStar}
            size={48}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setHeighlight(4)}>
          <FontAwesomeIcon
            style={highlight > 3 ? styles.purple : styles.grey}
            icon={faStar}
            size={48}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setHeighlight(5)}>
          <FontAwesomeIcon
            style={highlight > 4 ? styles.purple : styles.grey}
            icon={faStar}
            size={48}
          />
        </TouchableOpacity>
      </View>
      <Button title="Rate" onPress={() => rateClicked()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding: 10,
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
  description: {
    fontSize: 20,
    color: 'white',
    padding: 10,
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orange: {
    color: 'orange',
  },
  white: {
    color: 'white',
  },
  purple: {
    color: 'purple',
  },
  grey: {
    color: '#ccc',
  },
});
