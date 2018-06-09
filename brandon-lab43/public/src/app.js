'use strict';

import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('client connected!');
})

class App extends Component {
    render() {
        return <Fragment>
            <h1>My Socket App</h1>
            </Fragment>
    }   
}

const root = document.getElementById('root');
ReactDOM.render(<App/>, root);