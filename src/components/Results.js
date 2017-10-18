import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

class Results extends React.Component {
    render() {
        const {deck, restartQuiz, back, points} = this.props;

        return (
            <View style={{flex: 1}}>
                <Text style={styles.textResults}>
                    {`Score: ${(points)}/${deck.cards.length}`}
                </Text>

                <TouchableOpacity style={styles.button}
                                  onPress={restartQuiz}
                                  accessibilityLabel="Restart Quiz">
                    <Text style={styles.buttonText}>
                        Restart Quiz
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                                  onPress={back}
                                  accessibilityLabel="Back to Deck">
                    <Text style={styles.buttonText}>
                        Back to Deck
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    buttonText: {
        flex: 1,
        fontSize: 22,
        marginTop: 8,
        textAlign: 'center',
        color: '#ededed'
    }
});

Results.propTypes = {
    deck: PropTypes.object.isRequired,
    restartQuiz: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired,
    points: PropTypes.number.isRequired
};

export default Results;