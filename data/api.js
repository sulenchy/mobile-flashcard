import AsyncStorage from '@react-native-async-storage/async-storage';

// helpers functions: getDecks, getDeck, addNewDeck, AddCardToDeck

export const MOBILE_FLASHCARD_KEY = '@MOBILE_FLASHCARD_KEY';

export const setDecks = async (value) => {
  try {
    const jsconDecks = JSON.stringify(value)
    await AsyncStorage.setItem(MOBILE_FLASHCARD_KEY, jsconDecks)
  } catch(e) {
    return { message: e.message }
  }
}

export const getDecks = async () => {
  try {
    const jsconDecks = await AsyncStorage.getItem(MOBILE_FLASHCARD_KEY);
    return jsconDecks != null ? JSON.parse(jsconDecks) : null
  } catch(e) {
    return { message: e.message }
  }
}

export const addNewDeck = async(deck) => {
    try {
        const jsonDecks = await AsyncStorage.getItem(MOBILE_FLASHCARD_KEY);
        const currentDecks = jsonDecks != null ? JSON.parse(jsonDecks) : null;
        await AsyncStorage.setItem(MOBILE_FLASHCARD_KEY, JSON.stringify({...currentDecks, deck}))
    } catch(e) {
        return { message: e.message }
    }
}

export const addNewCard = async({deckId, card}) => {
  try {
        const jsonDecks = await AsyncStorage.getItem(MOBILE_FLASHCARD_KEY);
        const decks = jsonDecks != null ? JSON.parse(jsonDecks) : null;
        decks[deckId].questions.push(card);
        await AsyncStorage.setItem(MOBILE_FLASHCARD_KEY, JSON.stringify(decks))
    } catch(e) {
        return { message: e.message }
    }
}

export const initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
