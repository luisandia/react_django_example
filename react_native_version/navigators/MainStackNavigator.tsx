import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { Button } from 'react-native';
import Auth, { AuthRoute } from '../components/Auth';
import MovieDetail, {
  MovieDetailRoute,
  MovieParamsRoute,
} from '../components/MovieDetail';
import MovieList, { MovieListRoute } from '../components/MovieList';

export type StackParamList = {
  [MovieListRoute]: { title: string };
  [MovieDetailRoute]: MovieParamsRoute;
  [AuthRoute]: { title: string };
};

const Stack = createStackNavigator<StackParamList>();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName={MovieListRoute}
      screenOptions={({ navigation }) => ({
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
              navigation.navigation.navigate('Edit', {
                movie: { title: '', description: '' },
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
