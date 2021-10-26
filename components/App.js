import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducer';
import middlewares from '../middleware';
import { StyleSheet, Text, View } from 'react-native';
import Test from './test';


function App(props) {

  return (
    <Provider store={ createStore(reducers, middlewares) }>
      <View style={styles.container}>
        <Test />
        <StatusBar style="auto" />
      </View>
    </Provider>
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
