import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { getDecks } from '../data/api';

function  Quiz({ route, navigation }){
    const defaultScore = { attempted:[], score:[] };
    const [totalCardNumber, setTotalCardNumber] = useState(0);
    const [currChoice, setCurrChoice] = useState(null)
    const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
    const [score, setScore] = useState(defaultScore)
    const [currCardNumber, setCurrCardNumber] = useState(0);
    const [decks, setDecks] = useState(null);
    const [quizEnd, setQuizEnd]  = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [currCard, setCurrCard] = useState(null);
    const { deckId } = route.params;

    useEffect(async() => {
        const unsubscribe = navigation.addListener('focus', async() => {
            setCurrCardNumber(0);
            setIsQuestionAnswered(false)
            setScore(defaultScore);
            const decks = await getDecks();
            setDecks(decks);
            setCurrCard(decks[deckId].questions[currCardNumber-1])
            setTotalCardNumber(decks[deckId].questions.length);
        });
        return unsubscribe;
    }, [navigation]);

    const attemptActions = ({choice, question}) => {
        if (choice === question.isCorrect) {
            const newScore = { attempted: score.attempted, score: score.score.concat(1)};
            setScore(newScore);
        }
        else {
            const newScore = { attempted: score.attempted, score: score.score.concat(0)};
            setScore(newScore);
        }
        setCurrChoice(null);
    }

    const handlePrevious = () => {
        let tempCardNumber = currCardNumber;
        if (tempCardNumber > 0){
            setCurrCardNumber(--tempCardNumber);
            setCurrCard(decks[deckId].questions[currCardNumber])
            setShowAnswer(false);
            setQuizEnd(false);
            setCurrChoice(null);
        }

        if(currCardNumber === totalCardNumber) {
            setQuizEnd(true);
        }
    }

    const handleNext = () => {
        let tempCardNumber = currCardNumber;
        if (tempCardNumber < totalCardNumber){
            setCurrCardNumber(++tempCardNumber);
            setCurrCard(decks[deckId].questions[currCardNumber]);
            setShowAnswer(false);
            setQuizEnd(false);
        }

        if(currCardNumber + 1 === totalCardNumber) {
            setQuizEnd(true);
        }
    }

    const handleCorrect = () => {
        const question = decks[deckId].questions[currCardNumber];
        let newScore;
        setCurrChoice(true);
        if(!score.attempted.includes(question.id)){
            newScore = { attempted: score.attempted.concat(question.id), score: score.score.concat(1)};
            setScore(newScore);
        }
        if (currCardNumber + 1 === totalCardNumber) {
            attemptActions({ choice: true, question});
            navigation.navigate('Score', { deckId, score: newScore, total: totalCardNumber });
        }
    }

    const handleInCorrect = () => {
        const question = decks[deckId].questions[currCardNumber];
        let newScore;
        setCurrChoice(false);
        if(!score.attempted.includes(question.id)){
            newScore = { attempted: score.attempted.concat(question.id), score: score.score.concat(0)};
            setScore(newScore);
        }
        if (currCardNumber + 1 === totalCardNumber) {
            attemptActions({ choice: false, question});
            navigation.navigate('Score', { deckId, score: newScore, total: totalCardNumber });
        }
    }

    return (
        <View style={ styles.center }>
            {
                totalCardNumber < 1 ?
                    <Text>Sorry, you cannot take a quiz because there are no cards in the deck</Text>:
                    <>
                        <View>
                            <Text>{`${ currCardNumber + 1 }/${totalCardNumber}`}</Text>
                        </View>
                        <Text />
                        <View>
                            <Text>{showAnswer ? decks[deckId].questions[currCardNumber].answer : decks[deckId].questions[currCardNumber].question}</Text>
                            <Pressable style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? 'white'
                                        : 'black',
                                }, styles.button]}
                                onPress={() => setShowAnswer(!showAnswer)}
                            >
                                <Text style={ styles.text }>{showAnswer ? 'Question' : 'Answer'}</Text>
                            </Pressable>
                        </View>
                        <Text />
                        <View>
                            <Pressable style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? 'white'
                                        : 'green',
                                }, styles.button]}
                                onPress={handleCorrect}
                            >
                                <Text style={ styles.text }>Correct</Text>
                            </Pressable>
                            <Pressable style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? 'white'
                                        : 'red',
                                }, styles.button]}
                                onPress={handleInCorrect}
                            >
                                <Text style={ styles.text }>Incorrect</Text>
                            </Pressable>
                        </View>
                        <Text />
                        <View>
                            <Pressable style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? 'white'
                                        : 'black',
                                    display: currCardNumber === 0 ? 'none' : 'flex'
                                }, styles.button]}
                                onPress={handlePrevious}
                            >
                                <Text style={ styles.text }>{'<'}</Text>
                            </Pressable>
                            <Pressable style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? 'white'
                                        : 'black',
                                        display: currCardNumber === totalCardNumber-1 ? 'none' : 'flex'
                                }, styles.button]}
                                onPress={handleNext}
                            >
                                <Text style={ styles.text }>{'>'}</Text>
                            </Pressable>
                        </View>
                    </>
            }
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

export default Quiz;