import React from 'react'
import {Text, View} from 'react-native'

const Header = (props) => {
    const { textstyle, viewstyle } = styles;

    return (
      <View style = {viewstyle} >
         <Text style = {textstyle} >{props.headerTitle}</Text>
      </View>
    );
}


const styles = {
    viewstyle : {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        shadowColor: '#000',
        shadowOffset: {width : 0, height : 2},
        shadowOpacity: 0.9,
        elevation: 2,
        position: 'relative'
    },
    textstyle : {
        fontSize : 20
    }
};

export {Header};