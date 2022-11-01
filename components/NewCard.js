import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { handleAddnewCard } from '../actions';


function  NewCard({ route, dispatch }){
    const { deckId } = route.params;
  const [question, onChangeQuestion] = useState('');
  const [answer, onChangeAnswer] = useState('');

  const handleSubmit = () => {
      try{
        dispatch(handleAddnewCard({
            card: {
                question,
                answer
            },
            deckId
        }))
        onChangeQuestion('');
        onChangeAnswer('');
      }
      catch(err) {
          return err.message
      }
  }

    return (
        <View style={styles.center}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeQuestion}
                value={question}
                placeholder="Enter question"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeAnswer}
                value={answer}
                placeholder="Enter answer"
                keyboardType="default"
            />
            <Pressable style={({ pressed }) => [
                {
                backgroundColor: pressed
                    ? 'white'
                    : 'black'
                }, styles.button]}
                onPress={handleSubmit}
            >
                <Text style={ styles.text }>Submit</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        alignItems: 'center',
    },
    input: {
    height: 40,
    margin: 12,
    marginHorizontal: 40,
    borderWidth: 1,
    padding: 10,
    width: '90%'
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

export default connect()(NewCard);
