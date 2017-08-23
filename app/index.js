'use strict';

import React, { Component } from 'react';
import ReactNative from 'react-native';

const firebase = require('firebase');
const styles = require('./styles.js')


const {
    Text,
    ListView,
    StyleSheet,
    View,
    TouchableHighlight,
    Alert,
    Dimensions
} = ReactNative;

const deviceWidth = Dimensions.get('window').width;

const firebaseConfig = {
    apiKey: "AIzaSyBz_1-N2nD5PoFI4YiUbnAFZzGJzTUAS2Q",
    authDomain: "idontknow-ebad8.firebaseapp.com",
    databaseURL: "https://idontknow-ebad8.firebaseio.com",
    storageBucket: "idontknow-ebad8.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends React.Component {
    // Initialize Firebase
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.itemsRef = this.getRef().child('menu');
    }
    getRef() {
        return firebaseApp.database().ref();
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    _key: child.key
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }


    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)} />

            </View>
        )
    }

    _addItem() {
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        this.itemsRef.push({ title: "text" })
                    }
                },
            ],
            { cancelable: false }
        );
    }

    _renderItem(item) {
        const onPress = () => {
            Alert.alert(
                'Complete',
                null,
                [
                    { text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove() },
                    { text: 'Cancel', onPress: (text) => console.log('Cancelled') }
                ]
            );
        };

        return (
            <View style={styles.item}>
                <Text style={styles.text}>{item.title}</Text>
            </View>
        );
    }
}

export default App;