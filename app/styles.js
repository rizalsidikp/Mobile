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
  item: {
    margin: 3,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    height:deviceHeight/5,
    backgroundColor: 'blue'
  },
})

module.exports = styles
module.exports.constants = constants;