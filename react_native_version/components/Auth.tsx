import AsyncStorage from '@react-native-community/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ApiService, AuthService, OpenAPI } from '../Generated';
import { StackParamList } from '../navigators/MainStackNavigator';
import { MovieListRoute } from './MovieList';

export const AuthRoute = 'Auth';

type AuthScreenNavigationProp = StackNavigationProp<
  StackParamList,
  typeof AuthRoute
>;

export interface AuthParamsRoute {
  title?: string;
}

interface Props {
  navigation: AuthScreenNavigationProp;
}

const Auth = (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);

  const saveData = async (token: any) => {
    await AsyncStorage.setItem('mr-token', token);
  };

  const loginClicked = async () => {
    try {
      const response = await AuthService.createAuthToken({
        username,
        password,
      });
      saveData(response.token);
      OpenAPI.HEADERS = {
        Authorization: `Token ${response.token}`,
      };
      props.navigation.navigate(MovieListRoute, { title: 'List of movies' });
    } catch (e) {
      console.error(e);
      Alert.alert('Error', JSON.stringify(e.body));
    }
  };

  const registerClicked = async () => {
    try {
      await ApiService.createUser({ username, password });
      loginClicked();
    } catch (e) {
      console.error('error ', e.body);
      Alert.alert('Error', JSON.stringify(e.body));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />
      {isLoginView ? (
        <>
          <Button onPress={() => loginClicked()} title="Login" />
          <TouchableOpacity onPress={() => setIsLoginView(false)}>
            <Text style={styles.viewText}>
              Don&apos;t have an account? Register here.
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Button onPress={() => registerClicked()} title="Register" />
          <TouchableOpacity onPress={() => setIsLoginView(true)}>
            <Text style={styles.viewText}>
              Already have an account? Go back to login.
            </Text>
          </TouchableOpacity>
        </>
      )}
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
  viewText: {
    color: 'white',
    fontSize: 20,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Auth;
