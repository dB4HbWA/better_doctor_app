import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { loadDocData } from './state/actions';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
//import newProfileBkgrnd.jpeg from './img'



class NewProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      createdProfile: undefined
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this)
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  submit(e) {

    const promise = firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    promise.then((success) => {
      console.log(success)
      this.setState({createdProfile: true})
      // setTimeout(this.props.history.push('/'), 5000) 
    })
    promise.catch((error) => {
      console.log(error)
      this.setState({createdProfile: false})
    });

    e.preventDefault();
  }

  render() {
    let imgUrl = './src/img/newProfileBkgrnd.jpeg'
    var bkgrStyle = {
      backgroundImage: 'url(' + imgUrl + ')',
    };
    return (
      <form>
      {(this.state.createdProfile === undefined ||this.state.createdProfile === false ) &&
        <div className='card' style={bkgrStyle}>
          <h1 className="pageHeader">
            Profile
          </h1>
          <div className="row">
            
            <div className="small-6 columns md-text-field with-floating-label">
              <input onChange={this.handleInputChange} type="text" name="email" required />
              <label htmlFor="email">Email</label>
            </div>
            <div className="small-6 columns md-text-field with-floating-label">
              <input onChange={this.handleInputChange} type="password" name="password" required />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button onClick={this.submit} >Submit</button>
        </div> }

        {this.state.createdProfile &&
          <div class="notification-banner standalone success">
            <span class="icon"></span>
            <h3>Profile Created</h3>
            <p>We have successfully created your profile. Please sign in.</p>
          </div>
        }

        {this.state.createdProfile === false &&
          <div class="notification-banner standalone alert">
            <span class="icon"></span>
            <h3>Unable to Create Profile</h3>
            <p>Profile already exists.</p>
          </div>
        }
      </form>
    );
  }
}

const mapStateToProps = state => {

  return {
    docData: state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDocData: () => dispatch(loadDocData())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(NewProfileView)