import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import DecksView from "./src/DecksView";
import NewDeckView from "./src/NewDeckView";
import DeckView from "./src/DeckView";

const MainScreen = TabNavigator({
    Decks: {
        screen: DecksView,
    },
    NewDeck: {
        screen: NewDeckView,
    },
});

const FlashCardsApp = StackNavigator({
    Home: {
        screen: MainScreen,
        navigationOptions: {
            title: 'Home',
            header: false
        },
    },
    Deck: {
        screen: DeckView,
        navigationOptions: {
            title: 'Deck'
        },
    },
}, {
    initialRouteName: 'Home'
});


export default class App extends React.Component {
    render() {
        return <FlashCardsApp/>;
    }
}
