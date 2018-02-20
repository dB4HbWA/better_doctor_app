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

const SignInInput = props => {
  return (
    <div style={{display: 'inline-block', width:'50%'}}>
      <input onChange={props.updateUserName} style={{display: 'inline-block', width:'40%', marginRight: '2%'}} type='text' value={props.signInUserName} placeholder='Username' />
      <input onChange={props.updatePassword} style={{display: 'inline-block', width:'40%', marginRight: '2%'}} type='text' value={props.signInPassword} placeholder='Password' />
      <button onClick={props.handleSignOnClick} style={{display: 'inline-block', marginRight: '2%'}}>Go</button>
    </div>
  )
}

const SignInBar = props => {
  return (
    <div style={{ textAlign: 'right' }}>
      {props.enteringSignInInfo && <SignInInput handleSignOnClick={props.handleSignOnClick} updatePassword={props.updatePassword} updateUserName={props.updateUserName} signInUserName={props.signInUserName} signInPassword={props.signInPassword} />}
      <div onClick={props.handleSignInStatusChange} className={'inline clickableSignon'}>{!props.enteringSignInInfo && 'Sign In'}</div>
      <div style={{ display: 'inline-block' }}>/</div>
      <Link style={{ display: 'inline-block' }} to={'/newProfile'} >Create Profile</Link>
    </div>
  )
}

const NavBarWrapped = connect(mapStateToProps)(NavBar)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enteringSignInInfo: false,
      signInUserName: "",
      signInPassword: ""
    }
    this.handleSignInStatusChange = this.handleSignInStatusChange.bind(this)
    this.updateUserName = this.updateUserName.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.handleSignOnClick = this.handleSignOnClick.bind(this)
  }

  handleSignInStatusChange() {
    if (this.state.enteringSignInInfo)
      this.setState({ enteringSignInInfo: false })
    else
      this.setState({ enteringSignInInfo: true })
  }

  updateUserName(event) {
    this.setState({ signInUserName: event.target.value })
  }

  updatePassword(event) {
    this.setState({ signInPassword: event.target.value })
  }

  handleSignOnClick() {
    
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="appHeader">
            <SignInBar signInUserName={this.state.signInUserName} signInPassword={this.state.signInPassword} handleSignOnClick={this.handleSignOnClick} updatePassword={this.updatePassword} updateUserName={this.updateUserName} handleSignInStatusChange={this.handleSignInStatusChange} enteringSignInInfo={this.state.enteringSignInInfo} />
            <NavBarWrapped />
          </div>
          <Switch>
            <Route exact path="/" component={SearchView} />
            <Route exact path="/mydoctors" component={FavoritesView} />
            <Route exact path="/profile" component={ProfileView} />
            <Route exact path="/newProfile" component={NewProfileView} />
            <Route exact path="/doctor/:uid" render={({ match }) => <DoctorView match={match} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
