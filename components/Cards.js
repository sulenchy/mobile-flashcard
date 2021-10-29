import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


function Cards({navigation}) {
    return (
        <View>
            <Text>You can view some cards here. Hurray!!!</Text>
            <Button
                title="Go to Decks"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}

export default Cards;