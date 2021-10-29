import React, { useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, Button, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { getDecks, setDecks, initialData } from '../data/api';
import { addNewCard, handleInitialiseDb, handleAddNewDeckAction } from '../actions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckList from './DeckList';
import NewDeck from './NewDeck';


function Decks({navigation, dispatch}) {
    const handleInitializeDb = ()=> {
        dispatch(handleInitialiseDb(initialData))
    }

    const handleAddNewDeck = () => {
        const newDeck = {
            Redux: {
                title: 'Redux',
                questions: [
                    {
                        question: 'What is redux store?',
                        answer: 'It is the universal ...'
                    }
                ]
            }
        }
        dispatch(handleAddNewDeckAction(newDeck))
    }

    const handleAddNewCard = () => {
        const newCard = {
            question: 'What is a card?',
            answer: 'The combination of cards is what make a deck meaningful.'
        }
        const deckId = 'React';
        dispatch(addNewCard({ deckId, card: newCard }));
    }

    const Tab = createBottomTabNavigator();

    return (
        <View style={{ height: '100%' }}>
            {/* <Text>This is Deck</Text>
            <Button onPress={ handleInitializeDb } title="Reset Database" />
            <Text />
            <Button onPress={ handleAddNewDeck } title="Add New Deck" />
            <Text />
            <Button onPress={ handleAddNewCard } title="Add New Card" />
            <Text />
            <Button
                title="View Cards"
                onPress={() => navigation.navigate('Cards')}
            /> */}
            {/** add a listview here */}
            
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
