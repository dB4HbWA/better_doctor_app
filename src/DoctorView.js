import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { loadDocData,LOAD_DOC_DATA } from './state/actions';
import { connect } from 'react-redux';
import DoctorCard from './DoctorCard';
import axios from 'axios'


const distances = [10, 25, 50, 75, 100]

class DoctorView extends Component {
  constructor(props) {
    super(props)
    doctorViewed: undefined
  }

  componentDidMount() {
    console.log('https://api.betterdoctor.com/2016-03-01/doctors/' + this.props.match.params.uid + '?user_key=1beb2ecd945d9c2a3079c77dc33129ce')
    const promise = axios.get('https://api.betterdoctor.com/2016-03-01/doctors/' + this.props.match.params.uid + '?user_key=1beb2ecd945d9c2a3079c77dc33129ce');
    promise.then(({ data: docData }) => {
      console.log(docData)
    }, () => { })
    promise.catch((data) => {
      console.log(data)
    }
  )
  }

  render() {
    return (
      <div>
        <h1 className="pageHeader">
          DoctorView
        </h1>
        <div className="card" style={{ width: '900px', display: 'inline-block', float: 'center' }}>
          <div>
            <div className="row">
              <div className="small-6 medium-6 large-6 xlarge-6 columns">
                <img src="https://www.permanente.net/pmdb/photosync/2104581_photoweb.jpg" />
                <h2 style={{ topPadding: '20px' }}>Languages Spoken</h2>
                <p>English</p>
                <h2>Publications</h2>
                <p className="docBio">Science Journal Weekly | Medical Roundup | DocAdvice 2017 | You Ate What? </p>
                <h2>Insurance Compatibility</h2>
                <p className="docBio">Humana | BlueCross BlueShield | OuchMyFoot | ThatsGoingToNeedASecondOpinion</p>
                <h2>Find Me</h2>
                <p className="docBio">Address: 3600 Broadway
                 Oakland, CA 94611</p>
                <p className="docBio">Phone: 510-752-5438</p>
              </div>
              <div className="small-6 medium-6 large-6 xlarge-6 columns">
                <h1>Meet Doctor Gary</h1>
                <h2>Biography</h2>
                <p className="docBio scrollBox">Rodney Erickson is a content marketing professional at HubSpot, an inbound marketing and sales platform that helps companies attract visitors, convert leads, and close customers. Previously, Rodney worked as a marketing manager for a tech software startup. He graduated with honors from Columbia University with a dual degree in Business Administration and Creative Writing. Rodney Erickson is a content marketing professional at HubSpot, an inbound marketing and sales platform that helps companies attract visitors, convert leads, and close customers. Previously, Rodney worked as a marketing manager for a tech software startup. He graduated with honors from Columbia University with a dual degree in Business Administration and Creative Writing. Rodney Erickson is a content marketing professional at HubSpot, an inbound marketing and sales platform that helps companies attract visitors, convert leads, and close customers. Previously, Rodney worked as a marketing manager for a tech software startup. He graduated with honors from Columbia University with a dual degree in Business Administration and Creative Writing."</p>
                <h2>Education</h2>
                <p className="docBio">University of Cincinnati College of Medicine |
                  San Joaquin General Hospital |
                  Kaiser Permanente Medical Center Oakland CA |
                  San Joaquin General Hospital |
                Cleveland Clinic Foundation </p>
                <h2>Specialties</h2>
                <div className="docBio"></div>
                <div className="scrollBox">Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles
                  Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, AnklesAnkles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles, Hips, Knees, Ankles
                </div>
              </div>
            </div>
          </div>
        </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(DoctorView)