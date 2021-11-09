import { getDecks, setDecks, addNewDeck, addNewCard, initialData } from '../data/api';

export const ADD_NEW_DECK = 'ADD_NEW_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';
export const RECEIVE_CARD = 'RECEIVE_CARD';
export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const INITIALISE_DB =  'INITIALISE_DB';


function initialiseDb(decks) {
    return {
        type: INITIALISE_DB,
        decks
    }
}

export function handleInitialiseDb() {
    return async (dispatch) => {
        let items = await getDecks();
        if(!items || !Object.keys(items).length) {
           items = await setDecks(initialData)
        }
        dispatch(initialiseDb(items))
    }
}

function addNewDeckAction(deck) {
    return {
        type: ADD_NEW_DECK,
        deck
    }
}

export function handleAddNewDeckAction(deck) {
    return async(dispatch) => {
        await addNewDeck(deck);
        dispatch(addNewDeckAction(deck));
    }
}

export function addNewCardAction({card, deckId}) {
    return {
        type: ADD_NEW_CARD,
        card,
        deckId
    }
}

export function handleAddnewCard({card, deckId}){
    return async(dispatch) => {
        await addNewCard({card, deckId});
        dispatch(addNewCardAction({card, deckId}));
    }
}

export function receiveDesks(decks) {
    return {
        type: RECEIVE_DECKS,
    }
}

export function receiveCard(card){
    return {
        type: RECEIVE_CARD,
        card
    }
}

export function receiveCardsForDeck(cards) {
    return {
        type: RECEIVE_CARDS,
        cards,
    }
}
