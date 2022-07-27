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
    },
    coveredCard : {
        backgroundColor: 'grey'
    },
    removedCard : {
        borderWidth: 0,
    },
    emoji : {
        fontSize: '5vw'
    },
});

export default Card