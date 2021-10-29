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
import Cards from './Cards';
import DeckView from './DeckView';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={ createStore(reducers, middlewares) }>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Decks} />
          <Stack.Screen name="Cards" component={Cards} />
          <Stack.Screen name="DeckDetails" component={DeckView} />
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
