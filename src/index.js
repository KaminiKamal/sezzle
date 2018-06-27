import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
//import App from './App';
import ChatApp from './ChatApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ChatApp />, document.getElementById('root'));
//registerServiceWorker();
