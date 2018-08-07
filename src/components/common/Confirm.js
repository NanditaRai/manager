import React from 'react';
import { Text, View, Modal } from 'react-native';
import {CardSection } from './CardSection';   //since this is also a reusable component
import {Button} from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
    const { cardSectionStyle, containerStyle, textStyle } = styles;

    return(
        <Modal
           animationType = "slide"
           onRequestClose = { () => {}}
           transparent    //want to see through? true it is
           visible = {visible}   //true if want modal to be displayed
        >
            <View style = {containerStyle}>
                <CardSection style = {cardSectionStyle}>
                    <Text style = {textStyle} >{ children }</Text>
                </CardSection>

                <CardSection>
                    {/* we are calling this function onAccept without parentheses because we are passing the reference and dont */}
                    {/* want to invoke it immediately */}
                    <Button onPress = { onAccept }>Yes</Button>    
                    <Button onPress = { onDecline }>No</Button>
                </CardSection>
            </View>
        </Modal>
    );
};

const styles = {
    cardSectionStyle : {
        justifyContent: 'center',
    },
    textStyle : {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight : 40
    },
    containerStyle : {
        backGroundColor : 'rgba(0,0,0,0.75)',
        position : 'relative',
        flex : 1,
        justifyContent: 'center'
    }
}


export  { Confirm };