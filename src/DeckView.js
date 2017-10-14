import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class DeckView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={{flex: 1, textAlign: 'center', fontSize: 30, margin: 20}}>
                    You need to add a deck first.
                </Text>
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
