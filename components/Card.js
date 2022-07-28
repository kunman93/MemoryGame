import { StyleSheet, Text, TouchableOpacity} from 'react-native';


const Card = ({cardId, cardContent, faceUpCard, removedCard, onCardPress}) => {

    if(removedCard){
        return (
            <TouchableOpacity 
                style={[styles.card, styles.removedCard]}>
            </TouchableOpacity>
        );
    }

    if(faceUpCard){
        return (
            <TouchableOpacity 
                style={styles.card}
                onPress={() => onCardPress(cardId)}>
                    <Text style={styles.emoji}>{cardContent}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity 
            style={[styles.card, styles.coveredCard]}
            onPress={() => onCardPress(cardId)}>
                <Text style={styles.emoji}>{cardContent}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card : {
        alignItems: 'center',
        padding: '1vw',
        margin: '1vw',
        height: '15vw',
        width: '15vw',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgb(6, 104, 104)',
        justifyContent: 'space-evenly',
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },
    coveredCard : {
        backgroundColor: 'grey'
    },
    removedCard : {
        borderWidth: 0,
        shadowOffset: 'None',
        shadowOpacity: 'None', // IOS
        shadowRadius: 'None', //IOS
        elevation: 'None', // Android
    },
    emoji : {
        fontSize: '5vw',
        textShadowColor: 'rgba(217, 217, 217, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
});

export default Card