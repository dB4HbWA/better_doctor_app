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
import * as firebase from 'firebase';
import { SET_SIGNED_IN_USER, loadFavorites } from './state/actions'
import logo from './img/logo.png'

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
        <ul className="tabs tabNames" style={{ marginTop: '15px' }}>
          <NavItem exact={true} to={'/'} navName="Home" />
          {this.props.signedInUser && <NavItem exact={true} to={'/myDoctors'} navName="My Doctors" />}
        </ul>
      </div>
    );
  }
}

const mapStateToNavProps = state => {

  return {
    signedInUser: state.signedInUser
  };
};

const NavBarWrapped = connect(mapStateToNavProps)(NavBar)

const SignInInput = props => {
  if (props.signedInUser === undefined)
    return (
      <div style={{display: 'flex'}} >
        <input style={{marginRight: '2%'}} onChange={props.updateUserName} type='text' value={props.signInUserName} placeholder='Username' />
        <input style={{marginRight: '2%'}} onChange={props.updatePassword} type='password' value={props.signInPassword} placeholder='Password' />
        <button style={{marginRight: '2%'}} className='btn-cta tiny' onClick={() => props.handleSignOnClick(props.history)}>Go</button>
      </div>
    )
  else
    return (
      <div style={{display: 'flex'}} >
        <div style={{paddingRight: '1%'}} >Signed in as {props.signedInUser.email}</div>
        <div onClick={props.signOutUser} className='clickableSignon'>Sign Out</div>
      </div>)
}

const mapStateToSignInProps = state => {
  return {
    signedInUser: state.signedInUser
  };
};

const SignInInputWrapped = connect(mapStateToSignInProps)(SignInInput)


const SignInBar = props => {
  return (
    <div className='row'>
      <div className="small-3 large-2 columns">
        <img src={logo} width={150} height={123} alt='logo' />
      </div>
      <div className="small-9 large-10 columns">
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
          {(props.enteringSignInInfo || props.signedInUser) && <SignInInputWrapped history={props.history} signOutUser={props.signOutUser} handleSignOnClick={props.handleSignOnClick} updatePassword={props.updatePassword} updateUserName={props.updateUserName} signInUserName={props.signInUserName} signInPassword={props.signInPassword} />}
          <div onClick={props.handleSignInStatusChange} className={'clickableSignon'}>{(!props.enteringSignInInfo && !props.signedInUser) && 'Sign In'}</div>
          {!props.signedInUser && <div style={{display: 'flex'}}>
            <div >/</div>
            <Link to={'/newProfile'} >Create Profile</Link>
          </div>}
          <span className='error'>{props.signInError}</span>
        </div>
      </div>
    </div>
  )
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enteringSignInInfo: false,
      signInUserName: "",
      signInPassword: "",
      signInError: ""
    }
    this.handleSignInStatusChange = this.handleSignInStatusChange.bind(this)
    this.updateUserName = this.updateUserName.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.handleSignOnClick = this.handleSignOnClick.bind(this)
    this.signOutUser = this.signOutUser.bind(this)
  }

  handleSignInStatusChange() {
    if (this.state.enteringSignInInfo)
      this.setState({ enteringSignInInfo: false })
    else
      this.setState({ enteringSignInInfo: true })
  }

  updateUserName(event) {
    this.setState({ signInUserName: event.target.value, signInError: "" })
  }

  updatePassword(event) {
    this.setState({ signInPassword: event.target.value, signInError: "" })
  }

  handleSignOnClick(history) {

    const promise = firebase.auth().signInWithEmailAndPassword(this.state.signInUserName, this.state.signInPassword)

    promise.then((user) => {
      this.props.setSignedInUser(user)
      this.props.loadUserFavorites(user.uid)
      this.setState({ enteringSignInInfo: false, signInUserName: "", signInPassword: "" })
      history.push('/')
    })

    promise.catch((error) => {
      this.setState({signInError: error.message})
      // ...
    });
  }

  signOutUser() {
    const promise = firebase.auth().signOut()

    promise.then((user) => {
      this.props.setSignedInUser(undefined)
      this.props.loadUserFavorites(undefined)
    })

    promise.catch((error) => {
      console.log(error)
      // // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // ...
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="appHeader">
            <Route path='/' render={( {history} ) => <SignInBar signInError={this.state.signInError} signedInUser={this.props.signedInUser} signOutUser={this.signOutUser} signInUserName={this.state.signInUserName} signInPassword={this.state.signInPassword} handleSignOnClick={this.handleSignOnClick} updatePassword={this.updatePassword} updateUserName={this.updateUserName} handleSignInStatusChange={this.handleSignInStatusChange} enteringSignInInfo={this.state.enteringSignInInfo}  history={history} />} />
            <Route path='/' render={({ match }) => <NavBarWrapped match={match} />} />
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

const mapStateToProps = state => {

  return {
    signedInUser: state.signedInUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSignedInUser: (user) => dispatch({ type: SET_SIGNED_IN_USER, payload: user }),
    loadUserFavorites: (uid) => dispatch(loadFavorites(uid))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(App)