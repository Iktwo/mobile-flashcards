import React from 'react';
import { AsyncStorage, DeviceEventEmitter, FlatList, StyleSheet, Text, View } from 'react-native';
import DeckDelegate from "./components/DeckDelegate";

export default class DecksView extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Decks'
    };

    constructor(props) {
        super(props);
        this.state = {decks: {}};
    }

    componentDidMount() {
        this.getDecks();

        DeviceEventEmitter.addListener('AddedNewDeck', () => {
            this.getDecks()
        })
    }

    async getDecks() {
        let decks = await AsyncStorage.getItem('Decks');

        if (decks !== undefined) {
            decks = JSON.parse(decks);
        }

        this.setState({decks: decks})
    }

    render() {
        let {decks} = this.state;

        if (!decks || decks.length === 0) {
            return (
                <View style={{flex: 1}}>
                    <Text style={{flex: 1, textAlign: 'center', fontSize: 30, margin: 20}}>
                        You need to add a deck first.
                    </Text>
                </View>
            );
        } else {
            return (
                <View>
                    <FlatList data={decks}
                              keyExtractor={(item, index) => item.id}
                              renderItem={
                                  ({item}) =>
                                      <DeckDelegate key={item.id}
                                                    navigate={this.props.navigation.navigate}
                                                    deck={item}/>
                              }/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
