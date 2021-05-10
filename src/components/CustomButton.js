import React, { Component } from 'react';

import {
    View,
    Platform,
    TextInput,
    TouchableOpacity
  } from 'react-native';


  export default class CustomButton extends Component {

    static propTypes = {
      // containerStyle: PropTypes.style,
      // style: PropTypes.style,
      title: PropTypes.title,
    }

    render(){
        return(
            <TouchableOpacity>
              <Text>
                {propTypes.title}
              </Text>
            </TouchableOpacity>
        )
    }
  }