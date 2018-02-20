import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { loadDocData } from './state/actions';
import { connect } from 'react-redux';
//import newProfileBkgrnd.jpeg from './img'



class NewProfileView extends Component {


  submit(e) {
    console.log("submit clicked")
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
              <input type="text" id="email" required />
              <label htmlFor="email">Email</label>
            </div>
            <div className="small-6 columns md-text-field with-floating-label">
              <input type="password" id="password" required />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="small-6 columns md-text-field with-floating-label">
              <input type="text" id="firstName" />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="small-6 columns md-text-field with-floating-label">
              <input type="text" id="lastName" />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="small-6 columns md-text-field with-floating-label">
              <input type="text" id="userName" />
              <label htmlFor="firstName">User Name</label>
            </div>
            <div className="small-6 columns md-text-field with-floating-label">
              <input type="text" id="cityState" />
              <label htmlFor="cityState">City, St.</label>
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