import React, {Component} from 'react';
import { createStore , applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import LoginForm from './components/LoginForm';
import Router from './Router';

class App extends Component {

    componentWillMount(){
        // Initialize Firebase
       const firebase = require("firebase");
       const config = {
       apiKey: 'AIzaSyApCMGuaNkqs_aWF5EQo7fy3ZPJ7KbjDck',
       authDomain: 'manager-d9c47.firebaseapp.com',
       databaseURL: 'https://manager-d9c47.firebaseio.com',
       projectId: 'manager-d9c47',
       storageBucket: 'manager-d9c47.appspot.com',
       messagingSenderId: '189346405667'
       };
       firebase.initializeApp(config);
    }

    render(){
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return(
            <Provider store = {store}>
                <Router />
            </Provider>
        );
    }
}

export default App;