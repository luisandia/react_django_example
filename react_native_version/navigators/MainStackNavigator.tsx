import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { Button } from 'react-native';
import Auth from '../components/Auth';
import { authRouteName } from '../components/Auth/routes';
import { MovieDetail } from '../components/MovieDetail';
import { MovieDetailRoute } from '../components/MovieDetail/routes';
import { MovieEdit } from '../components/MovieEdit';
import { MovieEditRoute } from '../components/MovieEdit/routes';
import { MovieList } from '../components/MovieList';
import { MovieListRoute } from '../components/MovieList/routes';
import { StackParamList } from './routes';

const Stack = createStackNavigator<StackParamList>();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName={MovieListRoute}
      screenOptions={({ navigation, route }) => ({
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
      })}
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
                    ...route.params,
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
            headerRight: () => (
              <Button
                title="Remove"
                color="#282C35"
                onPress={() => route.params.deleteMovies(route.params.movie)}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name={authRouteName}
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
