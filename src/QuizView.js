import React from 'react';
import {
    AsyncStorage,
    DeviceEventEmitter,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import uuidv4 from 'uuid/v4';

export default class QuizView extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'New Deck'
    };

    constructor(props) {
        super(props);
        this.state = {text: '', modalVisible: false};
        this.onPressAddDeck = this.onPressAddDeck.bind(this);
    }

    async onPressAddDeck() {
        Keyboard.dismiss();

        if (this.state.text.trim() === '') {
            alert("Text can't be empty")
        } else {
            try {
                let decks = await AsyncStorage.getItem('Decks');

                if (decks === null) {
                    decks = [];
                } else {
                    decks = JSON.parse(decks);
                }

                decks.push({id: uuidv4(), name: this.state.text, cards: []});

                await AsyncStorage.setItem('Decks', JSON.stringify(decks));

                this.setState({text: ""});

                this.props.navigation.navigate('Decks');

                DeviceEventEmitter.emit('AddedNewDeck');
            } catch (error) {
                alert(`Could not create deck ${error}`);
            }
        }
    }

    render() {
        return (
            <View style={{flex: 1, margin: 8}}>

                <View style={{flex: 1}}/>

                <Text style={{fontSize: 32, marginTop: 8, textAlign: 'center'}}>Quiz view?</Text>
            </View>
        );
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
