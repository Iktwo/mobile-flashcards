import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class DeckView extends React.Component {
    constructor(props) {
        super(props);

        this.addCard = this.addCard.bind(this);
        this.startQuiz = this.startQuiz.bind(this);
    }

    componentDidMount() {

    }

    addCard() {
        this.props.navigation.navigate('NewCard', {deck: this.props.deck})
    }

    startQuiz() {
        this.props.navigation.navigate('Quiz', {deck: this.props.deck})
    }

    render() {
        let {deck} = this.props.navigation.state.params;

        return (
            <View style={{flex: 1}}>
                <Text style={{textAlign: 'center', fontSize: 30, margin: 20}}>
                    {deck.name}
                </Text>
                <Text style={{textAlign: 'center', fontSize: 20, margin: 10}}>
                    {`${deck.cards.length} cards`}
                </Text>

                <TouchableOpacity style={styles.button}
                                  onPress={this.addCard}
                                  color="#3498db"
                                  accessibilityLabel="Button to add a new card">
                    <Text style={{flex: 1, fontSize: 22, marginTop: 8, textAlign: 'center'}}>
                        Add Card
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                                  onPress={this.startQuiz}
                                  color="#3498db"
                                  accessibilityLabel="Button to start the quiz">
                    <Text style={{flex: 1, fontSize: 22, marginTop: 8, textAlign: 'center'}}>
                        Start Quiz
                    </Text>
                </TouchableOpacity>
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
    button: {
        marginTop: 8, marginLeft: 20, marginRight: 20,
        height: 48,
        borderColor: '#2387ca',
        backgroundColor: '#3498db',
        borderWidth: 1,
        borderRadius: 10,
    }
});
