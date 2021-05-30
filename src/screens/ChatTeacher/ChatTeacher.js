// import React from 'react';
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
import { styles } from './styles';
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'


export default function ChatTeacher({ route }) {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         messages: [
    //             {
    //                 _id: 0,
    //                 text: 'thread created',
    //                 createdAt: new Date().getTime(),
    //                 system: true
    //             },
    //             {
    //                 _id: 1,
    //                 text: 'hello!',
    //                 createdAt: new Date().getTime(),
    //                 user: {
    //                     _id: 2,
    //                     name: 'Demo'
    //                 }
    //             }
    //         ]
    //     }
    // }


    const { thread } = route.params
    const user = auth().currentUser.toJSON()
    const [currentUserUID, setCurrentUserUID] = useState("")
    const [messages, setMessages] = useState([])
    // {
    //     _id: 0,
    //     text: 'thread created',
    //     createdAt: new Date().getTime(),
    //     system: true
    // },
    // {
    //     _id: 1,
    //     text: 'hello!',
    //     createdAt: new Date().getTime(),
    //     user: {
    //         _id: 2,
    //         name: 'Demo'
    //     }
    // },
    // {
    //     _id: 3,
    //     text: 'Thanks for connecting',
    //     createdAt: new Date().getTime(),
    //     user: {
    //         _id: 2,
    //         name: 'Msg'
    //     }
    // }


    useEffect(() => {

        const UID = auth().currentUser.uid;

        /* Getting UID of current User and Saving it in the
         state to use it in return code.*/
        setCurrentUserUID(UID);


        const otherUserID = thread.UID;
        console.log(otherUserID);

        const unsubsciberListener = firestore()
            .collection('users')
            .doc(otherUserID)
            .collection("connections")
            .doc(thread.key)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(documentSnapshot => {
                    const firebaseData = documentSnapshot.data()
                    const data = {
                        _id: documentSnapshot.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    }
                    return data
                })

                setMessages(messages)
            })

        return () => unsubsciberListener()


    }, [])



    // function handleSend(newMessage = []) {
    //     // this.setState(previousState => {
    //     //     GiftedChat.append(previousState.messages, newMessage)
    //     // })
    //     // setMessages(GiftedChat.append(messages, newMessage))
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))



    // }

    async function handleSend(messages) {
        const text = messages[0].text

        const UID = auth().currentUser.uid;
        const otherUserID = thread.UID;


        firestore()
            .collection('users')
            .doc(otherUserID)
            .collection("connections")
            .doc(thread.key)
            .collection('messages')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: currentUserUID,
                    //displayName: user.displayName
                    displayName: 'John'

                }
            })


        // await firestore().collection('teachers').doc()
        // const otherUserID = thread.UID;
        // console.log(otherUserID);

        // await firestore()
        //     .collection('teachers')
        //     .doc(otherUserID)
        //     .collection("connections")
        //     .doc(thread.key)
        //     .collection('messages')
        //     .add({
        //         text,
        //         createdAt: new Date().getTime(),
        //         user: {
        //             _id: UID,
        //             //displayName: user.displayName
        //             displayName: thread.Name

        //         }
        //     })


        await firestore()
            .collection('users')
            .doc(otherUserID)
            .collection("connections")
            .doc(thread.key)
            .set(
                {
                    LatestMessage: {
                        Text: text,
                        CreatedAt: new Date().getTime()
                    }
                },
                { merge: true }
            )


        await firestore()
            .collection('teachers')
            .doc(currentUserUID)
            .collection("connections")
            .doc(thread.key)
            .set(
                {
                    LatestMessage: {
                        Text: text,
                        CreatedAt: new Date().getTime()
                    }
                },
                { merge: true }
            )

    }
    // render() {
    return (
        <GiftedChat
            messages={messages}
            onSend={newMessage => handleSend(newMessage)}
            user={{
                _id: currentUserUID,
                name: 'John'
            }}
        />
    );
    // }
}

// export default ChatStudent;