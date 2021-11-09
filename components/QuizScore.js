import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';


function QuizScore({ navigation, route }){
    const [finalScore, setFinalScore] = useState(null);
    const { deckId, score, total } = route.params;

    useEffect(() => {
        const final = score.score.reduce((acc, cur) => acc +cur);
        console.log('score ===> ', final);
        setFinalScore(final);
    }, [])
    return (
        <View style={ styles.center }>
            <Text>Quiz score component</Text>
            <Text>Final Score: { finalScore } / { total }</Text>
            <View>
                <Pressable style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? 'white'
                            : 'black',
                    }, styles.button]}
                    onPress={() => navigation.navigate('Quiz', { deckId })}
                >
                    <Text style={ styles.text }>Restart Quiz</Text>
                </Pressable>
                <Pressable style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? 'white'
                            : 'black',
                    }, styles.button]}
                    onPress={() => navigation.navigate('DeckDetails', { title: deckId })}
                >
                    <Text style={ styles.text }>Bact to Deck</Text>
                </Pressable>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
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

export default QuizScore;