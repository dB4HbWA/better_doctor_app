import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { loadDocData } from './state/actions';
import { connect } from 'react-redux';
import DoctorCard from './DoctorCard'

class FavoritesView extends Component {
  render() {
    return (
      <div>
        <h1 className="pageHeader">Your Favorite Doctors</h1>
        {this.props.docData.length > 0 && (
          <div className="topHeadlinesContainer">
            <div className="card topHeadlinesInnerContainer">
              {this.props.docData.map(doc => (
                <DoctorCard key={doc.uid} doctor={doc} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    docData: state.docData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDocData: () => dispatch(loadDocData())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(FavoritesView)