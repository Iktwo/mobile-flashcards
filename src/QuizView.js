import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from "react-navigation";
import * as Notifications from "./utils/Notifications";

export default class QuizView extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'New Deck'
    };

    constructor(props) {
        super(props);
        this.state = {cardIndex: 0, showQuestion: true, points: 0};
        this.markCorrect = this.markCorrect.bind(this);
        this.markIncorrect = this.markIncorrect.bind(this);
    }

    markCorrect() {
        this.setState(previousState => {
            return {cardIndex: previousState.cardIndex + 1, showQuestion: true, points: previousState.points + 1}
        })
    }

    markIncorrect() {
        this.setState(previousState => {
            return {cardIndex: previousState.cardIndex + 1, showQuestion: true}
        })
    }

    restartQuiz() {
        this.setState({cardIndex: 0, showQuestion: true, points: 0})
    }

    render() {
        const {deck} = this.props.navigation.state.params;

        let questions;

        if (this.state.cardIndex < deck.cards.length) {
            questions = (
                <View style={{flex: 1}}>
                    <Text style={styles.text}>
                        {`${(this.state.cardIndex + 1)}/${deck.cards.length}`}
                    </Text>

                    <Text style={{fontSize: 32, marginTop: 8, textAlign: 'center'}}>
                        {this.state.showQuestion ? deck.cards[this.state.cardIndex].question : deck.cards[this.state.cardIndex].answer}
                    </Text>

                    <TouchableOpacity style={{margin: 8, height: 40}}
                                      onPress={
                                          () => this.setState(previousState => {
                                              return {showQuestion: !previousState.showQuestion}
                                          })
                                      }>
                        <Text style={styles.textLink}>
                            {this.state.showQuestion ? 'Answer' : 'Question'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonCorrect}
                                      onPress={this.markCorrect}
                                      accessibilityLabel="Mark question as correct">
                        <Text style={styles.buttonText}>
                            Correct
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonIncorrect}
                                      onPress={this.markIncorrect}
                                      accessibilityLabel="Mark question as incorrect">
                        <Text style={styles.buttonText}>
                            Incorrect
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            Notifications.clearLocalNotification();

            let date = new Date();
            date.setDate(date.getDate() + 1);
            date.setHours(20);
            date.setMinutes(0);

            // Schedule notification for tomorrow
            Notifications.setLocalNotification(date)
        }

        const results = (
            <View style={{flex: 1}}>
                <Text style={styles.textResults}>
                    {`Score: ${(this.state.points)}/${deck.cards.length}`}
                </Text>

                <TouchableOpacity style={styles.button}
                                  onPress={this.restartQuiz}
                                  accessibilityLabel="Restart Quiz">
                    <Text style={styles.buttonText}>
                        Restart Quiz
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                                  onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                                  accessibilityLabel="Back to Deck">
                    <Text style={styles.buttonText}>
                        Back to Deck
                    </Text>
                </TouchableOpacity>
            </View>
        );

        // alert(JSON.stringify(deck));

        return (
            <View style={{flex: 1, margin: 8}}>
                {this.state.cardIndex < deck.cards.length ? questions : results}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        textAlign: 'left'
    },
    textLink: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        color: '#3498db'
    },
    textResults: {
        fontSize: 32,
        textAlign: 'center',
        color: '#3498db'
    },
    button: {
        marginTop: 8,
        marginLeft: 20,
        marginRight: 20,
        height: 48,
        borderColor: '#2387ca',
        backgroundColor: '#3498db',
        borderWidth: 1,
        borderRadius: 10
    },
    buttonCorrect: {
        marginTop: 8,
        marginLeft: 20,
        marginRight: 20,
        height: 48,
        borderColor: '#27ae60',
        backgroundColor: '#2ecc71',
        borderWidth: 1,
        borderRadius: 10
    },
    buttonIncorrect: {
        marginTop: 8,
        marginLeft: 20,
        marginRight: 20,
        height: 48,
        borderColor: '#c0392b',
        backgroundColor: '#e74c3c',
        borderWidth: 1,
        borderRadius: 10
    },
    buttonText: {
        flex: 1,
        fontSize: 22,
        marginTop: 8,
        textAlign: 'center',
        color: '#ededed'
    }
});
