import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './state/store';

const Root = () => (
    <Provider store={store} >
      <App />
    </Provider>
  )
  
const renderReact = () => {
  console.log(window.google)
  ReactDOM.render(<Root />, document.getElementById('root'));
}

let script = document.createElement("script")
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDyMBcNMW8V9enzDyWVmvlh5BByHkWwq2E"
script.onload = renderReact;
document.body.appendChild(script)

registerServiceWorker();
