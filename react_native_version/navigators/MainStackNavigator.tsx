import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { Button } from 'react-native';
import Auth, { AuthParamsRoute, AuthRoute } from '../components/Auth';
import MovieDetail, {
  MovieDetailRoute,
  MovieParamsRoute,
} from '../components/MovieDetail';
import MovieEdit, {
  MovieEditParamsRoute,
  MovieEditRoute,
} from '../components/MovieEdit';
import MovieList, {
  MovieListParamsRoute,
  MovieListRoute,
} from '../components/MovieList';

export type StackParamList = {
  [MovieListRoute]: MovieListParamsRoute | undefined;
  [MovieDetailRoute]: MovieParamsRoute;
  [MovieEditRoute]: MovieEditParamsRoute;
  [AuthRoute]: AuthParamsRoute | undefined;
};

const Stack = createStackNavigator<StackParamList>();

const removeClicked = (props: any) => {
  const movie = props.navigation.getParam('movie');
  console.log(movie);
  fetch(`http://192.168.1.5:8000/api/movies/${movie.id}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token 64c0575cb66424b929998851a8a5bb7b8b233815`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      props.navigation.navigate('MovieList');
    })
    .catch((error) => console.log(error));
};

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName={MovieListRoute}
      screenOptions={({ navigation, route }) => {
        return {
          headerStyle: {
            backgroundColor: 'orange',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
          headerRight: () => (
            <Button
              title="Add New"
              color="#282C35"
              onPress={() =>
                navigation.navigate(MovieEditRoute, {
                  movie: { title: '', description: '' },
                  ...route.params,
                })
              }
            />
          ),
        };
      }}
    >
      <Stack.Screen
        name={MovieListRoute}
        component={MovieList}
        options={({ navigation }) => ({
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          title: 'List of movies',
        })}
      />
      <Stack.Screen
        name={MovieDetailRoute}
        component={MovieDetail}
        options={(props) => {
          const { route } = props;
          return {
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            title: route.params.title,
            headerRight: () => (
              <Button
                title="Edit"
                color="#282C35"
                onPress={() =>
                  props.navigation.navigate(MovieEditRoute, {
                    movie: route.params.movie,
                  })
                }
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name={MovieEditRoute}
        component={MovieEdit}
        options={(props) => {
          const { route } = props;
          return {
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            title: route.params.title,
            headerStyle: {
              backgroundColor: 'orange',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
            headerRight: (props) => (
              <Button
                title="Remove"
                color="#282C35"
                onPress={() => removeClicked(props)}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name={AuthRoute}
        component={Auth}
        options={{
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          title: 'Login',
        }}
      />
    </Stack.Navigator>
  );
}

export default function MainStackMavigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
