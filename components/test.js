import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { getDecks, setDecks, initialData } from '../data/api';
import { addNewCard, handleInitialiseDb, handleAddNewDeckAction } from '../actions';


function Test(props) {

    useEffect(async () => {
        const { dispatch } = props;
    }, [])

    const handleInitializeDb = ()=> {
        const { dispatch } = props;
        dispatch(handleInitialiseDb(initialData))
    }

    const handleAddNewDeck = () => {
        const { dispatch } = props;
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
        const { dispatch } = props;
        const newCard = {
            question: 'What is a card?',
            answer: 'The combination of cards is what make a deck meaningful.'
        }
        const deckId = 'React';
        dispatch(addNewCard({ deckId, card: newCard }));
    }

    return (
        <View>
            <Text>This is test component</Text>
            <Button onPress={ handleInitializeDb } title="Reset Database" />
            <Text />
            <Button onPress={ handleAddNewDeck } title="Add New Deck" />
            <Text />
            <Button onPress={ handleAddNewCard } title="Add New Card" />
        </View>
    )
}


const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default connect()(Test);
