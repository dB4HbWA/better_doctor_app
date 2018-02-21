import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { loadDocData } from './state/actions';
import { connect } from 'react-redux';
import {
  Link
} from 'react-router-dom'

class FavoritesView extends Component {
  render() {

    return (
      <div>
        <h1 className="pageHeader">Your Favorite Doctors</h1>
        {(this.props.docData && this.props.docData.length > 0) && (
          <div>
            {this.props.docData.map((doctor) =>

              <div className="card" style={{ width: '700px', display: 'inline-block', float: 'center' }}>
                <img src={doctor.image_url} style={{ padding: '30px' }} alt="" />
                <div style={{ display: 'inline-block' }}>
                  <Link to={'/doctor/' + doctor.uid} >{doctor.first_name + ' ' + doctor.last_name} </Link>
                  <div>Specialty: {doctor.specialties}</div>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    docData: state.favoriteDoctors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDocData: () => dispatch(loadDocData())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(FavoritesView)