import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './state/store';
import * as firebase from 'firebase';

const Root = () => {
  // bruce's stuff
  // var config = {
  //   apiKey: "AIzaSyA-8tlXP3pzBLu2VKtoNu1Q5lnfkg_7us4",
  //   authDomain: "mydocs-app.firebaseapp.com",
  //   databaseURL: "https://mydocs-app.firebaseio.com",
  //   projectId: "mydocs-app",
  //   storageBucket: "mydocs-app.appspot.com",
  //   messagingSenderId: "442248653655"
  // }


  // Vince's stuff
  var config = {
    apiKey: "AIzaSyA9BodFUPNMuxXaBV_LHDKEdMWI_XwMMYs",
    authDomain: "testproject-b8b0a.firebaseapp.com",
    databaseURL: "https://testproject-b8b0a.firebaseio.com",
    projectId: "testproject-b8b0a",
    storageBucket: "testproject-b8b0a.appspot.com",
    messagingSenderId: "391424137767"
  };

  firebase.initializeApp(config);

  //var app = firebase.initializeApp(config);

    return (<Provider store={store} >
      <App />
    </Provider>
  )
}
  
const renderReact = () => {
  ReactDOM.render(<Root />, document.getElementById('root'));
}

let script = document.createElement("script")
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDyMBcNMW8V9enzDyWVmvlh5BByHkWwq2E"
script.onload = renderReact;
document.body.appendChild(script)

registerServiceWorker();
