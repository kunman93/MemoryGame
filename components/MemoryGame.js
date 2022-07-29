import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import emojis from '../assets/emojis';
import Card from './Card'

const drinksEmojis = emojis.drinks
const initialCardSequence = [12, 7, 2, 14, 10, 0, 7, 4, 9, 2, 5, 12, 14, 13, 1,
                            4, 13, 8, 8, 3, 10, 6, 3, 11, 0, 6, 9, 11, 1, 5]

const rows = 6
const cols = 5

const defineEventHandlers = (
    currentPlayer, setCurrentPlayer,                                            
    player1Score, setPlayer1Score,
    player2Score, setPlayer2Score,
    cardContents, setCardContents, 
    faceUpCards, setFaceUpCards, 
    removedCards, setRemovedCards,
    cardSequence, setCardSequence) => {

    const emojiSequence = cardSequence.map((emojiId) => drinksEmojis[emojiId][1])

    const onCardPress = (cardId) => {
        // the below lines: updatedCardContents = [...cardContents] are important!!
        const updatedCardContents = [...cardContents]
        const updatedFaceUpCards = [...faceUpCards]

        if(!isCardFacedUp(cardId)){
            if(!areTwoCardsFacedUp()){
                faceUpCard(cardId, updatedCardContents, updatedFaceUpCards)
                checkIfCardsMatch(updatedCardContents, updatedFaceUpCards)
            }
            if(areTwoCardsFacedUp()){
                keepTheCardCovered(cardId, updatedCardContents, updatedFaceUpCards)
            }
        }
    }

    const isCardFacedUp = (cardId) => faceUpCards[cardId]

    const areTwoCardsFacedUp = () => faceUpCards.filter(Boolean).length === 2

    const faceUpCard = (cardId, updatedCardContents, updatedFaceUpCards) =>  {
        // Previously, I worked with cardContents instead of creating a copy of updatedCardContents, this messed up everything
        updatedCardContents[cardId] = emojiSequence[cardId]
        setCardContents(updatedCardContents)
        updatedFaceUpCards[cardId] = true
        setFaceUpCards(updatedFaceUpCards)
    }

    const keepTheCardCovered = (cardId, updatedCardContents, updatedFaceUpCards) => {
        // Previously, I worked with cardContents instead of creating a copy of updatedCardContents, this messed up everything
        updatedCardContents[cardId] = ""
        setCardContents(updatedCardContents)
        updatedFaceUpCards[cardId] = false
        setFaceUpCards(updatedFaceUpCards)
    }

    const checkIfCardsMatch = (cardContents, faceUpCards) => {
        const faceUpCardContents = cardContents.filter((cardContent) => cardContent !== "")
        const indicesOfFaceUpCards = faceUpCards.reduce((out, bool, index) => bool ? out.concat(index) : out, [])

        // why are these lines needed for setTimeout to work?????
        const updatedRemovedCards = [...removedCards]
        const updatedFaceUpCards = [...faceUpCards]
        const updatedCardContents = [...cardContents]

        if(areCardsMatching(faceUpCardContents)) {
            removeMatchingCards(indicesOfFaceUpCards, updatedRemovedCards, updatedCardContents, updatedFaceUpCards)
            updateCurrentPlayerScore()

        }else if(faceUpCardContents.length === 2){
            coverTheNotMatchingCards(indicesOfFaceUpCards, updatedCardContents, updatedFaceUpCards)
        }
    }

    const areCardsMatching = (faceUpCardContents) => {
        return (faceUpCardContents.length === 2) && (faceUpCardContents[0] === faceUpCardContents[1])
    }

    const removeMatchingCards = (indicesOfFaceUpCards, updatedRemovedCards, updatedCardContents, updatedFaceUpCards) => {
        indicesOfFaceUpCards.forEach((indexofMatchedCard) => {
            updatedRemovedCards[indexofMatchedCard] = true
            updatedCardContents[indexofMatchedCard] = ""
            updatedFaceUpCards[indexofMatchedCard] = false
        })

        setTimeout(() => {
            setRemovedCards(updatedRemovedCards)
            setFaceUpCards(updatedFaceUpCards)
            setCardContents(updatedCardContents)
        },1000)
    }

    const updateCurrentPlayerScore = () => {
        if(currentPlayer === "Player 1"){
            setPlayer1Score(player1Score + 1)
        }else{
            setPlayer2Score(player2Score + 1)
        }
    }

    const coverTheNotMatchingCards = (indicesOfFaceUpCards, updatedCardContents, updatedFaceUpCards) => {
        indicesOfFaceUpCards.forEach((indexofMatchedCard) => {
            updatedCardContents[indexofMatchedCard] = ""
            updatedFaceUpCards[indexofMatchedCard] = false
        })

        setTimeout(() => {
            setFaceUpCards(updatedFaceUpCards)
            setCardContents(updatedCardContents)
            updatePlayerTurn()
        },1000)        
    }

    const updatePlayerTurn = () => {
        if(currentPlayer === "Player 1"){
            setCurrentPlayer("Player 2")
        }else{
            setCurrentPlayer("Player 1")
        }
    }

    const onNewGamePress = () => {
        setCurrentPlayer("Player 1")
        setPlayer1Score(0)
        setPlayer2Score(0)
        setCardContents(Array(rows*cols).fill(""))
        setFaceUpCards(Array(rows*cols).fill(false))
        setRemovedCards(Array(rows*cols).fill(false))
        setCardSequence([...cardSequence].sort(() => Math.random() - 0.5))
    }

    return [onCardPress, onNewGamePress]
}

const MemoryGame = () => {

    let cardId = 0

    const [currentPlayer, setCurrentPlayer] = useState("Player 1")
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)
    const [cardContents, setCardContents] = useState(Array(rows*cols).fill(""));
    const [faceUpCards, setFaceUpCards] = useState(Array(rows*cols).fill(false));
    const [removedCards, setRemovedCards] = useState(Array(rows*cols).fill(false));
    const [cardSequence, setCardSequence] = useState(initialCardSequence)

    const [onCardPress, onNewGamePress] = defineEventHandlers(currentPlayer, setCurrentPlayer,
                                            player1Score, setPlayer1Score,
                                            player2Score, setPlayer2Score,
                                            cardContents, setCardContents,
                                            faceUpCards, setFaceUpCards,
                                            removedCards, setRemovedCards,
                                            cardSequence, setCardSequence)

    return (
        <View style={styles.memoryGameContainer}>
            <View style={styles.playerInfoContainer}>
                <Text style={styles.playerTurnText}>{currentPlayer}</Text>
                <Text style={styles.playerScoreText}>Score: {currentPlayer === "Player 1" ? player1Score : player2Score}</Text>
            </View>
            <View style={styles.cardsContainer}>
                {
                        [...Array(rows).keys()].map(row => {
                            return <View style={styles.cardsRowContainer}>
                                {[...Array(cols).keys()].map(col => {
                                    return <Card 
                                                cardId={cardId} 
                                                cardContent={cardContents[cardId]}
                                                faceUpCard={faceUpCards[cardId]}
                                                removedCard={removedCards[cardId++]}
                                                onCardPress={onCardPress}
                                            />
                                })}
                            </View>
                        })
                }
            </View>
            <TouchableOpacity style={styles.newGameButton}>
                <Text style={styles.newGameText} onPress={onNewGamePress}>New Game</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    memoryGameContainer: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgb(63, 136, 136)',
    },
    playerInfoContainer: {
        paddingBottom: 20,
        alignItems: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    playerTurnText: {
        fontFamily: 'IndieFlower-Regular',
        fontSize: '12vw',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    playerScoreText : {
        fontFamily: 'IndieFlower-Regular',
        fontSize: '8vw',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    cardsContainer : {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
    },
    cardsRowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    newGameButton : {
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgb(6, 104, 104)',
        backgroundColor: 'grey',
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },
    newGameText : {
        fontFamily: 'IndieFlower-Regular',
        fontSize: '8vw',
        fontWeight: 'bold',
    },
});

export default MemoryGame