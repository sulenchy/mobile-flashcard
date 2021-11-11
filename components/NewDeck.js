import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { handleAddNewDeckAction } from '../actions';
import { connect } from 'react-redux';

function NewDeck({dispatch}) {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    console.log({title})
      try{
        dispatch(handleAddNewDeckAction({
            title,
            questions: []
        }));
        setTitle('');
      }
      catch(err) {
          return err.message
      }
  }

  return (
    <View style={styles.center}>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Enter title"
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

export default connect()(NewDeck);
