import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class DeckDelegate extends React.Component {
    render() {
        return (
            <TouchableOpacity style={{flex: 1, margin: 8}} onPress={() => this.props.navigate('Deck', {deck: this.props.deck})}>
                <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>{this.props.deck.name}</Text>
                <Text style={{flex: 1, textAlign: 'center'}}>{this.props.deck.cards.length} cards</Text>
            </TouchableOpacity>
        );
    }
}

DeckDelegate.propTypes = {
    deck: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired
};