import React, { useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, Button, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { getDecks, setDecks } from '../data/api';
import { addNewCard, handleInitialiseDb, handleAddNewDeckAction } from '../actions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckList from './DeckList';
import NewDeck from './NewDeck';


function Decks({navigation, dispatch}) {
    // This is necessary to reset the local storage in case one mess up with it
    useEffect(() => {
        dispatch(handleInitialiseDb());
    }, null)

    const Tab = createBottomTabNavigator();

    return (
        <View style={{ height: '100%' }}>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="View Decks" component={DeckList} />
                <Tab.Screen name="Add New" component={NewDeck} />
            </Tab.Navigator>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default connect()(Decks);
