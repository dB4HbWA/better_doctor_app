import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import SearchView from './SearchView'
import FavoritesView from './FavoritesView'
import ProfileView from './ProfileView'
import NewProfileView from './NewProfileView'
import DoctorView from './DoctorView'
import {
  Switch,
  Link,
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux';

const NavItem = (props) => {

  return (
    <Route exact={props.exact} path={props.to} children={({ match }) => {
      return (
        <li className={`tab-title ${match ? 'active' : ''}`} >
          <Link to={props.to}>{props.navName}</Link>
        </li>
      )
    }
    } />
  )
}

class NavBar extends Component {

  render() {
    return (
      <div className="navigationContent">
        <ul className="tabs tabNames">
          <NavItem exact={true} to={'/'} navName="Home" />
          {this.props.signedInUser && <NavItem exact={true} to={'/myDoctors'} navName="My Doctors" />}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    signedInUser: state.signedInUser
  };
};

const NavBarWrapped = connect(mapStateToProps)(NavBar)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="appHeader">
            <NavBarWrapped />
          </div>
          <Switch>
            <Route exact path="/" component={SearchView} />
            <Route exact path="/mydoctors" component={FavoritesView} />
            <Route exact path="/profile" component={ProfileView} />
            <Route exact path="/newProfile" component={NewProfileView} />
            <Route exact path="/doctor/:uid" component={DoctorView} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
