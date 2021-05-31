import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Image,
    TouchableOpacity
} from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


import { styles } from './styles';


export default function QuizTest() {
    const questions = [
        {
            questionText: 'What is the capital of France?',
            answerOptions: [
                { answerText: 'New York', isCorrect: false },
                { answerText: 'London', isCorrect: false },
                { answerText: 'Paris', isCorrect: true },
                { answerText: 'Dublin', isCorrect: false },
            ],
        },
        {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
                { answerText: 'Jeff Bezos', isCorrect: false },
                { answerText: 'Elon Musk', isCorrect: true },
                { answerText: 'Bill Gates', isCorrect: false },
                { answerText: 'Tony Stark', isCorrect: false },
            ],
        },
        {
            questionText: 'The iPhone was created by which company?',
            answerOptions: [
                { answerText: 'Apple', isCorrect: true },
                { answerText: 'Intel', isCorrect: false },
                { answerText: 'Amazon', isCorrect: false },
                { answerText: 'Microsoft', isCorrect: false },
            ],
        },
        {
            questionText: 'How many Harry Potter books are there?',
            answerOptions: [
                { answerText: '1', isCorrect: false },
                { answerText: '4', isCorrect: false },
                { answerText: '6', isCorrect: false },
                { answerText: '7', isCorrect: true },
            ],
        },

    ];

    //variables

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);


    // Get Current User
    const currentUserID = auth().currentUser.uid;

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1); // If answer if true Increase score
        }

        const nextQuestion = currentQuestion + 1; // then go to next question.
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const GiveTestAgain = () => {

        // resetting all variables values.
        setScore(0);
        setCurrentQuestion(0);
        setShowScore(false);
    }


    const _scoreMessage = (score) => {
        if (score <= 1) {
            return (<View style={styles.innerContainer} >
                <View style={{ flexDirection: "row" }} >
                    <Icon name="trophy" size={30} color="white" />
                </View>
                <Text style={styles.score}>You need to work hard</Text>
                <Text style={styles.score}>You scored {score} out of {questions.length} </Text>
            </View>)
        } else if (score > 2 && score < 3) {
            return (<View style={styles.innerContainer} >
                <View style={{ flexDirection: "row" }} >
                    <Icon name="trophy" size={30} color="white" />
                    <Icon name="trophy" size={30} color="white" />
                </View>
                <Text style={styles.score}>You are good</Text>
                <Text style={styles.score}>You scored {score} out of {questions.length} </Text>
            </View>)
        } else if (score >= 4) {

            //If test passed!
            firestore()
            .collection('teachers')
            .doc(currentUserID)
            .update({
                Verified : true
            })
            .then(() => {
                console.log('Account Verified!');
            });

            return (<View style={styles.innerContainer}>
                <View style={{ flexDirection: "row" }} >
                    <Icon name="trophy" size={30} color="white" />
                    <Icon name="trophy" size={30} color="white" />
                    <Icon name="trophy" size={30} color="white" />
                </View>
                <Text style={styles.score}>You are the master</Text>
                <Text style={styles.score}>Congrats you scored {score} out of {questions.length} </Text>
                <Text style={styles.score}>Your account is now Verified!</Text>
            </View>
            
            )
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Readiness Test', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}

            />
            {showScore ? (



                // <View style = {{ flex : 1, alignItems : 'center' , justifyContent : 'center'}}>
                //     <View style={{
                //         width: '85%',
                //         height: 200,
                //         backgroundColor: '#E87430',
                //         borderRadius: 5,
                //         alignItems: 'center',
                //         justifyContent: 'space-around',
                //         elevation : 15,

                //     }}>
                //         <Text style={{
                //             fontSize: 24,
                //             color: 'white', fontWeight: 'bold',
                //         }}>
                //             You scored {score} out of {questions.length}
                //         </Text>



                //         <TouchableOpacity style={{
                //             backgroundColor: '#E87430',
                //             width: '80%',
                //             height: 40,
                //             borderWidth: 4,
                //             borderRadius: 12,
                //             borderColor: 'white',
                //             alignItems : 'center',
                //             justifyContent: 'center',
                //             paddingLeft: 10,
                //             marginBottom: 10,
                //         }}
                //             onPress={() => GiveTestAgain()}>
                //             <Text style={{ color: 'white', fontSize: 18 ,  }}>Give Readiness Test Again</Text>
                //         </TouchableOpacity>
                //     </View>
                // </View>


                <View style={styles.container}>
                    <View style={styles.circle}>

                        {_scoreMessage(score)}
                    </View>
                </View>
            ) : (
                <>
                    <View style={styles.MainContainer}>
                        <View style={{
                            width: '85%',
                            height: 350,
                            backgroundColor: '#E87430',
                            borderRadius: 5,
                            alignItems: 'center',
                            elevation: 15,
                        }}>

                            <View style={styles.questionContainer}>

                                <Text style={{ color: 'white', fontSize: 24, marginTop: 20, fontStyle: 'italic', marginBottom: 5, fontWeight: 'bold' }}>Question {currentQuestion + 1}/{questions.length}</Text>

                                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{questions[currentQuestion].questionText}</Text>
                            </View>
                            <View style={{ width: '100%', alignItems: 'center', marginTop: 25 }}>
                                {questions[currentQuestion].answerOptions.map((answerOption) => (
                                    <TouchableOpacity style={{
                                        backgroundColor: '#E87430',
                                        width: '80%',
                                        height: 40,
                                        borderWidth: 4,
                                        borderRadius: 12,
                                        borderColor: 'white',
                                        justifyContent: 'center',
                                        paddingLeft: 10,
                                        marginBottom: 10,
                                    }}
                                        onPress={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                                        <Text style={{ color: 'white', fontSize: 18 }}>{answerOption.answerText}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                    </View>
                </>
            )
            }
        </View >
    );
}
