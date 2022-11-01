import {
    ADD_NEW_DECK,
    RECEIVE_DECKS,
    ADD_NEW_CARD,
    RECEIVE_CARD,
    RECEIVE_CARDS,
    INITIALISE_DB
} from '../actions';


function decks (state = {}, action) {
    switch(action.type){
        case INITIALISE_DB:
            return {
                ...state,
                ...action.decks
            }
        case RECEIVE_DECKS:
            return {
                ...state,
            }
        case ADD_NEW_DECK:
            return {
                ...state,
                ...{[action.deck.title]: action.deck}
            }
        case RECEIVE_CARD:
            return {
                ...state,
                ...action.card
            }
        
        case ADD_NEW_CARD:
            return {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId], 
                    questions: state[action.deckId].questions.concat(action.card)
                }
            }
        case RECEIVE_CARDS:
            return {
                cardsForDeck: [...state[action.deskId].questions]
            }
        default:
            return state
    }
}

export default decks;
