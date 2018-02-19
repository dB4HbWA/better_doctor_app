import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';

class DoctorCard extends Component {
  render() {
    return (
      <div className="card articleCard">
        <div className="articleImage">
          <img src={this.props.urlToImage} alt="newsPic" />
        </div>
        <div className="articleDetails">
          <div className="articleTitleAndAuthor">
            <div className="articleAuthor" >{this.props.docName}</div>
          </div>
          <div>
            <div>{this.props.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorCard;
