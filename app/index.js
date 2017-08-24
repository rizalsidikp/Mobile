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
    TouchableOpacity,
    Alert,
    Dimensions,
    AppRegistry
} = ReactNative;

const deviceWidth = Dimensions.get('window').width;

const firebaseConfig = {
    apiKey: "AIzaSyBz_1-N2nD5PoFI4YiUbnAFZzGJzTUAS2Q",
    authDomain: "idontknow-ebad8.firebaseapp.com",
    databaseURL: "https://idontknow-ebad8.firebaseio.com",
    storageBucket: "idontknow-ebad8.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


import { StackNavigator } from 'react-navigation'

import Report from './report'


class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
      };

  /**
   * Creates an instance of App.
   * Initialize Firebase
   * Row Data for list view
   * @param {any} props 
   * @memberof App
   */
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            avatarSource: null,
            name: null,
            data: null,
            type: null,
            path: null,
            latitude: null,
            longitude: null,
        };
        this.itemsRef = this.getRef().child('departments');
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


    /**
     * Get data from firebase server
     * ListView Render
     * @returns 
     * @memberof App
     */
    render() {
        

        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)} />

            </View>
        )
    }


    _renderItem(item) {
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity
              onPress={() => navigate('Report', { department: item.title })}
            >
              <View style={styles.itemPolice}>
                  <Text style={styles.text}>{item.title}</Text>
              </View>
            </TouchableOpacity>
        );
    }
}


const App = StackNavigator({
    Home: { screen: HomeScreen },
    Report: { screen: Report }
  });
  
AppRegistry.registerComponent('Mobile', () => App);