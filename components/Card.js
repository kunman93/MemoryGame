import { StyleSheet, Text, TouchableOpacity} from 'react-native';


const Card = ({cardId, cardContent, faceUpCard, removedCard, onCardPress}) => {

    if(removedCard){
        return (
            <TouchableOpacity 
                style={styles.removedCard}>
            </TouchableOpacity>
        );
    }

    if(faceUpCard){
        return (
            <TouchableOpacity 
                style={styles.faceUpCard}
                onPress={() => onCardPress(cardId)}>
                    <Text style={styles.emoji}>{cardContent}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => onCardPress(cardId)}>
                <Text style={styles.emoji}>{cardContent}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card : {
        alignItems: 'center',
        padding: 10,
        margin: 10,
        height: 50,
        width: 50,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'space-evenly',
        backgroundColor: 'grey'
    },
    faceUpCard : {
        alignItems: 'center',
        padding: 10,
        margin: 10,
        height: 50,
        width: 50,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'space-evenly',
    },
    removedCard : {
        alignItems: 'center',
        padding: 10,
        margin: 10,
        height: 50,
        width: 50,
        justifyContent: 'space-evenly'
    },
    emoji : {
        fontSize: 20
    },
});

export default Card