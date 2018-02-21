import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { connect } from 'react-redux';
import axios from 'axios'

class DoctorView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorDetail: undefined
    }
  }

  componentDidMount() {
    console.log('https://api.betterdoctor.com/2016-03-01/doctors/' + this.props.match.params.uid + '?user_key=1beb2ecd945d9c2a3079c77dc33129ce')
    const promise = axios.get('https://api.betterdoctor.com/2016-03-01/doctors/' + this.props.match.params.uid + '?user_key=1beb2ecd945d9c2a3079c77dc33129ce');
    promise.then(({ data: docData }) => {
      this.setState({ doctorDetail: docData.data });
    }, () => { })
    promise.catch((data) => {
      console.log('error')
      console.log(data)
    }
    )
  }

  render() {
    return (
      <div >
        <h1 className="pageHeader" >
          Doctor Details
        </h1>
        {this.state.doctorDetail !== undefined &&
          <div className="card" style={{display: 'inline-block', float: 'center', alignContent: 'center' }}>
            <div>
              <div>
                <div className="small-6 medium-6 large-6 xlarge-6 columns">
                  <img src={this.state.doctorDetail.profile.image_url} style={{ padding: '30px'}} alt="" />
                  <h2>Languages Spoken</h2>
                  <p>{this.state.doctorDetail.profile.languages.map((language) => language.name).join(', ')}</p>
                  <h2>Insurance Compatibility</h2>
                  <div className="docBio scrollBox">{this.state.doctorDetail.insurances.map((insurance) => insurance.insurance_provider.name).join(', ')}</div>
                  <h2>Find Me</h2>
                  <div style={{ paddingBottom: '5px' }} className="docBio scrollBox">
                    {this.state.doctorDetail.practices.map((practice) =>

                      <div style={{ paddingBottom: '5px' }}>
                        {practice.visit_address.street + " "} {practice.visit_address.city + " "} 
                        {practice.visit_address.state + ", "} {practice.visit_address.zip}
                        {practice.phones.map((phone) =>
                          <div key={phone.number}>
                            {phone.type === 'landline' &&
                              <div>{phone.number}</div>
                            }
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="small-6 medium-6 large-6 xlarge-6 columns">
                  <h2>Meet Doctor {this.state.doctorDetail.profile.first_name + ' ' +
                    this.state.doctorDetail.profile.last_name + ' ' + this.state.doctorDetail.profile.title}
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

// const mapDispatchToProps = dispatch => {
//   return {
//     loadDocData: () => dispatch(loadDocData())
//   }
// };


export default connect(mapStateToProps)(DoctorView)