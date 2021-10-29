import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


function DeckView({ route }){
    const { title, card_number } = route.params;

    return (
        <View style={styles.center}>
                <Text style={styles.deck_title}>{title}</Text>
                <Text style={styles.card_number}>{!card_number ? 0 : card_number} card{card_number > 1 && 's'}</Text>
            </View>
    );
}

const styles = StyleSheet.create({
  deck_title: {
    fontSize: 25,
    paddingBottom: 5
  },
  card_number: {
    fontSize: 14,
  },
});

export default DeckView;