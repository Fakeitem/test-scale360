import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSpinner,
    faPlusSquare,
    faCheckSquare,
    faTag,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import {
    faEdit,
    faTrashAlt,
    faSquare
} from '@fortawesome/free-regular-svg-icons';

library.add(faSpinner, faPlusSquare, faCheckSquare, faEdit, faTrashAlt, faSquare, faTag, faTrash)

ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
