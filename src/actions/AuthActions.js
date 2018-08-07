
import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCCESS,
    LOGIN_USER_FAIL, 
    LOGIN_USER
} from "./types";
import {Actions} from 'react-native-router-flux';

export const emailChanged = (text) => {
   return{
       type : EMAIL_CHANGED,
       payload : text
   };
};

export const passwordChanged = (text) => {
    return{
        type : PASSWORD_CHANGED,
        payload : text
    };
};

export const loginUser = ({email,password}) => {
    return(dispatch) => {
        dispatch({
            type : LOGIN_USER
        });

        const firebase = require("firebase");
        firebase.auth().signInWithEmailAndPassword(email, password)
         .then(user => loginUserSuccess(dispatch, user))
         .catch(() => {
             firebase.auth().createUserWithEmailAndPassword(email, password)
             .then(user => loginUserSuccess(dispatch, user) )
             .catch(() => loginUserFail(dispatch));
         });
    };
};

const loginUserFail = (dispatch) => {
    dispatch({
        type : LOGIN_USER_FAIL
    })
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({
         type: LOGIN_USER_SUCCCESS,
         payload : user
    })

    Actions.main();
}