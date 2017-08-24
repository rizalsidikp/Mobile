import React, { Component } from 'react';
import ReactNative from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
const styles = require('./styles.js')
import firebase from 'firebase';


// const storage = firebase.storage()

const {
    Text,
    ListView,
    TextInput,
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
    Dimensions,
    AppRegistry
} = ReactNative;

const deviceWidth = Dimensions.get('window').width;

import { StackNavigator } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


class Report extends React.Component {
  static navigationOptions = {
    title: 'Report',
  }
  constructor(props) {
    super(props);
    this.state = {
        avatarSource: null,
        name: null,
        uploadURL: null,
        data: null,
        type: null,
        path: null,
        latitude: null,
        longitude: null,
        title: '',
        description: '',
        phone: '',
        imageUrl:'hahaha',
    }
  }

  uploadImage = (uri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
      const uploadUri = uri
        const sessionId = new Date().getTime()
        let uploadBlob = null
        const imageRef = firebase.storage().ref('images').child(`${sessionId}`)
        fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          this.setState({
            imageUrl: url
          })
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  sendData() {

    this.addItem()
    
  }
  getRef() {
    return firebase.database().ref();
}


  addItem = () => {
    Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
            { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            {
                text: 'OK', onPress: () => {
                  
                  this.itemsRef = this.getRef().child('reports');
                    this.itemsRef.push({
                        "address" : "Bandung Jl. HHAhahah no.23783",
                        "department" : 'Hospital',
                        "description" : this.state.description,
                        "image_url" : this.state.imageUrl,
                        "lat" : this.state.latitude,
                        "lon" : this.state.longitude,
                        "status" : "pending",
                        "title" : this.state.title,
                        "user" : {
                          "phone" : this.state.phone,
                          "role" : "user",
                          "uid" : "voVjfa71vFR8K9DqNmSPZ3WixRc2",
                          "username" : "rizal"
                        }
                      })
                }
            },
        ],
        { cancelable: false }
    );
}
  onPhotoPress() {
    const options = {
     quality: 1.0,
     maxWidth: 50,
     maxHeight: 50,
     mediaType: 'mixed',
     videoQuality	: 'high',
     storageOptions: {
       skipBackup: true,
     },
   }
   ImagePicker.launchCamera({}, (response) => {
     console.log(response)
     if (response.didCancel) {
      console.log('User cancelled photo picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      const source = { uri: `data:image/jpeg;base64,${response.data}` };
      
      this.uploadImage(response.uri)
      .then(url => {
        console.log('url', url)
        this.setState({ 
          uploadURL: url
        })
      })
      this.setState({
        avatarSource: source,
        name: response.fileName,
        data: response.data,
        type: response.type,
        path: response.uri,
        latitude: response.latitude,
        longitude: response.longitude,
      });
    }
   });
  }
   

  render() {
    console.log('ini url : ', this.state.imageUrl)
    console.log(this.state.title)
    return (
      <View>
        <TextInput
          placeholder='Title'
          underlineColorAndroid='transparent'	
          onChangeText={(text) => this.setState({ title: text })}
        />
        <TextInput 
          placeholder='Description'
          underlineColorAndroid='transparent'
          onChangeText={(text) => this.setState({ description: text })}
          
        />
        <TextInput 
          placeholder='Phone'
          underlineColorAndroid='transparent'	
          onChangeText={(text) => this.setState({ phone: text })}
        />
        <TouchableOpacity
          onPress={() => this.onPhotoPress()}
        >
          <Text>Take Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>this.sendData()}
        >
          <Text>Sends</Text>
        </TouchableOpacity>
        <View>
        <Image source={this.state.avatarSource} style={{ height: 100 }} />
        </View>
      </View>
    );
  }
}

export default Report;