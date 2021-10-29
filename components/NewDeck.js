import React, { useState } from 'react';
import { Alert, View, Text, StyleSheet, StatusBar, Button, TextInput } from 'react-native';

function NewDeck() {
    const [title, setTitle] = useState('');
    return (
        <View style={ styles.center }>
            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Enter title"
                keyboardType="numeric"
            />
            <Button
                style={ styles.btn }
                title="Left button"
                onPress={() => Alert.alert('Left button pressed')}
            />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btn: {
      margin: 12,
      padding: 10
  },
});

export default NewDeck;
