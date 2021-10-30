import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { getDecks } from '../data/api';

function DeckView({ route, navigation }){
    const [cardNumber, setCardNumber] = useState(0);
    const { title } = route.params;

    React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async() => {
        const decks = await getDecks();
        setCardNumber(decks[title].questions.length);
    });

    return unsubscribe;
  }, [navigation]);

    return (
        <View style={styles.center}>
            <View style={ [ styles.half, {justifyContent: 'center', alignItems: 'center'} ] }>
                <Text style={styles.deck_title}>{title}</Text>
                <Text style={styles.card_number}>{!cardNumber ? 0 : cardNumber} card{cardNumber > 1 && 's'}</Text>
            </View>
            <View style={ styles.half }>
                <Pressable style={({ pressed }) => [
                    {
                    backgroundColor: pressed
                        ? 'white'
                        : 'black'
                    }, styles.button]}
                    onPress={() => navigation.navigate('NewCard', { deckId: title })}
                >
                    <Text style={ styles.text }>Add Card</Text>
                </Pressable>
                <Pressable style={({ pressed }) => [
                    {
                    backgroundColor: pressed
                        ? 'white'
                        : 'black'
                    }, styles.button]}
                    onPress={() => navigation.navigate('Quiz')}
                >
                    <Text style={ styles.text }>Start Quiz</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        width: '100%',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    half: {
        flex: 1,
    },
    deck_title: {
        fontSize: 25,
        paddingBottom: 5
    },
    card_number: {
        fontSize: 14,
        marginBottom: 10
    },
    button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: 'black',
    marginBottom: 10,
    width: 150
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default DeckView;
