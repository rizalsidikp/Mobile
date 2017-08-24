const React = require('react-native')
const { StyleSheet } = React
const constants = {
  actionColor: '#24CE84'
};
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  itemPolice: {
    margin: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    height:deviceHeight/5,
    backgroundColor: '#1565C0',
    paddingTop: 40,
    paddingBottom: 25,
  },
  itemHospital: {
    margin: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    height:deviceHeight/5,
    backgroundColor: '#FFEBEE',
    paddingTop: 40,
    paddingBottom: 25,
  },
  text: {
    color: 'white',
    alignItems: 'center',
    fontSize: 20,

  }
})

module.exports = styles
module.exports.constants = constants;