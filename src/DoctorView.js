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
    this.state ={
      doctorDetail: undefined
    }
  }

  componentDidMount() {
    console.log('https://api.betterdoctor.com/2016-03-01/doctors/' + this.props.match.params.uid + '?user_key=1beb2ecd945d9c2a3079c77dc33129ce')
    const promise = axios.get('https://api.betterdoctor.com/2016-03-01/doctors/' + this.props.match.params.uid + '?user_key=1beb2ecd945d9c2a3079c77dc33129ce');
    promise.then(({ data: docData }) => {
      console.log("componentDidMount")
      console.log(docData.data)
      this.setState({doctorDetail: docData.data});

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
          Doctor Details
        </h1>
        {this.state.doctorDetail !== undefined &&
        <div className="card" style={{ width: '900px', display: 'inline-block', float: 'center' }}>
          <div>
            <div>
              <div className="small-6 medium-6 large-6 xlarge-6 columns">
                <img src={this.state.doctorDetail.profile.image_url} style={{ padding: '30px' }} />
                <h2>Languages Spoken</h2>
                <p>{this.state.doctorDetail.profile.languages.map((language) => language.name).join(', ')}</p>
                <h2></h2>
                <p className="docBio">Science Journal Weekly | Medical Roundup | DocAdvice 2017 | You Ate What? </p>
                <h2>Insurance Compatibility</h2>
                <p className="docBio scrollBox">{this.state.doctorDetail.insurances.map((insurance) => insurance.insurance_provider.name).join(', ')}</p>
                <h2>Find Me - update this</h2>
                <p className="docBio">Address: 3600 Broadway
                 Oakland, CA 94611</p>
                <p className="docBio">Phone: 510-752-5438</p>
              </div>
              <div className="small-6 medium-6 large-6 xlarge-6 columns">
                <h2>Meet Doctor {this.state.doctorDetail.profile.first_name + ' ' + 
                  this.state.doctorDetail.profile.last_name  + ' ' + this.state.doctorDetail.profile.title}
                </h2>
                <div></div>
                <h2>Biography</h2>
                <p className="docBio scrollBox">
                  {this.state.doctorDetail.profile.bio}</p>
                <h2>Education</h2>
                <p className="docBio">{this.state.doctorDetail.educations.map((education) => education.school).join(', ')}ed</p>
                <h2>Specialties</h2>
                <div className="docBio"></div>
                <div className="scrollBox">{this.state.doctorDetail.specialties.map((specialty) => specialty.name).join(', ')} </div>
              </div>
            </div>
          </div>
        </div>
        }
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