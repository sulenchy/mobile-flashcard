import { getDecks, setDecks, addNewDeck } from '../data/api';

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

export function handleInitialiseDb(desks) {
    return async (dispatch, getState) => {
        let items = await getDecks();
        if(!items || !Object.keys(items)) {
           items = await setDecks(desks)
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
    return async(dispatch, getState) => {
        await addNewDeck(deck);
        dispatch(addNewDeckAction(deck));
    }
}

export function addNewCard({card, deckId}) {
    return {
        type: ADD_NEW_CARD,
        card,
        deckId
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
