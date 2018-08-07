import firebase from 'firebase';
import {Actions}  from 'react-native-router-flux';

import{
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_SAVE_SUCCESS
} from './types';
// import { Actions } from '../../node_modules/react-native-router-flux';

export const employeeUpdate = ({prop, value}) => {
    return {
        type : EMPLOYEE_UPDATE,
        payload : {prop, value}
    };
} 

export const employeeCreate = ({name, phone, shift}) => {
    // const firebase = require("firebase");

    const {currentUser} = firebase.auth();

    //use of redux thunk to return the result of asynchronous request
    return(dispatch) => {
       firebase.database().ref(`/users/${currentUser.uid}/employees`)
       .push({name, phone, shift})
    //    .then( () => Actions.employeeList);
    //    .then( () => Actions.employeeList( {type : 'reset'} ));     //for not getting back button when we come back, clear the transition stack
       .then( () => {
           dispatch( {type : EMPLOYEE_CREATE} );
           Actions.pop() ;    //for new version no need to reset type to remove back button
        });   
    }
}

export const employeesFetch = () => {

    const { currentUser } =  firebase.auth();

    return(dispatch) => {
        //this method will be called every time when there is change in any data value 
        // and hence update the states of props automatically
        firebase.database.ref(`/users/${currentUser.uid}/employees`)
        .on('value' ,snapshot => {
            dispatch({
                type : EMPLOYEES_FETCH_SUCCESS,
                payload : snapshot.val()
            });
        });
    };
};


export const employeeSave = ({name, phone, shift, uid}) => {
    const {currentUser} = firebase.auth();

    return(dispatch) => {
        firebase.database.ref(`/users/${currentUser.uid}/employees/${uid}`)
        .set({name, phone, shift})
        .then( () => { 
            dispatch({ type : EMPLOYEE_SAVE_SUCCESS })
            Actions.pop() 
        });
    };
};


export const employeeDelete = ( {uid} ) => {
    const { currentUser } = firebase.auth();
    
    //no need of dispatch as the above method inside employeesFetch will be called automatically
    return() => {
        firebase.database.ref(`/users/${currentUser.uid}/employees/${uid}`)
        .remove()
        .then( () => {
            Actions.pop() ;
        });
    };
};