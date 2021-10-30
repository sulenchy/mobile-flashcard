import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import reducers from '../reducer';
import middlewares from '../middleware';
import { StyleSheet, Text, View } from 'react-native';
import Decks from './Decks';
import DeckView from './DeckView';
import NewCard from './NewCard';
import Quiz from './Quiz';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={ createStore(reducers, middlewares) }>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Decks} />
          <Stack.Screen
            name="DeckDetails"
            component={DeckView}
          />
          <Stack.Screen name="NewCard" component={NewCard} />
          <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
