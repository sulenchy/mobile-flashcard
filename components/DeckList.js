import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, StyleSheet, StatusBar, Pressable } from 'react-native';

function DeckList({decks, navigation}) {
    const DeckCard = ({ title, card_number }) => (
        <Pressable style={({ pressed }) => [
            {
            backgroundColor: pressed
                ? 'rgb(210, 230, 255)'
                : 'white'
            }, styles.item]}
            onPress={ () => {
                navigation.navigate('DeckDetails', {title});
             } }
        >
            <View style={styles.center}>
                <Text style={styles.deck_title}>{title}</Text>
                <Text style={styles.card_number}>{!card_number ? 0 : card_number} card{card_number > 1 && 's'}</Text>
            </View>
        </Pressable>
    );

    const renderDeckCard = ({ item }) => (
        <DeckCard title={item.title} card_number={item.questions && item.questions.length} />
    );

    return (
            <FlatList
                data={decks}
                renderItem={renderDeckCard}
                keyExtractor={item => item.id}
            />
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  center: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  deck_title: {
    fontSize: 25,
    paddingBottom: 5
  },
  card_number: {
    fontSize: 14,
  },
  item: {
      minHeight: 100,
      margin: 5,
      justifyContent: 'center',
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 5,
      shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    },
});

const mapStateToProps = (state) => {
    return{
        decks: Object.values(state).map((element, index) => ({id:index, ...element}))
    }
}

export default connect(mapStateToProps, null)(DeckList);
