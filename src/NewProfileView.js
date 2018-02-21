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
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this)
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  submit(e) {

    const promise = firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    promise.then( (success) => {
      console.log(success)
      this.props.history.push('/')
      
    })
    promise.catch(function(error) {
      console.log(error)
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
        </div>
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