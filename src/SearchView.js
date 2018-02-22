import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { loadDocData, loadAllSpecialties, loadAllInsurancePlans } from './state/actions';
import { connect } from 'react-redux';
import DoctorCard from './DoctorCard';
import axios from "axios"

const distances = [10, 25, 50, 75, 100]

class SearchView extends Component {

  componentDidMount() {
    const insurancePromise = axios.get('https://api.betterdoctor.com/2016-03-01/insurances?user_key=1beb2ecd945d9c2a3079c77dc33129ce')
    insurancePromise.then(({ data: insurances }) => {

      this.setState({ allInsurances: insurances.data.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)} ) })
    }, () => { })
    insurancePromise.catch((data) => {
      console.log(data)
    }
    )

    setTimeout(() => {
      const specialtiesPromise = axios.get('https://api.betterdoctor.com/2016-03-01/specialties?user_key=1beb2ecd945d9c2a3079c77dc33129ce')
      specialtiesPromise.then(({ data: specialties }) => {
        this.setState({ allSpecialties: specialties.data.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)} ) })
      }, () => { })
      specialtiesPromise.catch((data) => {
        console.log(data)
      }
      )
    }, 1000);
  }

  constructor(props) {
    super(props)
    this.state = {
      locationName: "",
      milesAway: 10,
      currentLocation: undefined,
      gettingCurrentLocation: undefined,
      locationFilter: false,
      nameFilter: false,
      specialtyFilter: false,
      insuranceFilter: false,
      name: "",
      insurance: undefined,
      specialty: undefined,
      allInsurances: [],
      allSpecialties: [],
      filter: {}
    }

    this.handleLocationNameChange = this.handleLocationNameChange.bind(this)
    this.handleMilesAwayChange = this.handleMilesAwayChange.bind(this)
    this.toggleCurrentLocation = this.toggleCurrentLocation.bind(this)
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this)
    this.handleNameFilterToggle = this.handleNameFilterToggle.bind(this)
    this.handleSpecialtyFilterToggle = this.handleSpecialtyFilterToggle.bind(this)
    this.handleLocationFilterToggle = this.handleLocationFilterToggle.bind(this)
    this.handleInsuranceFilterToggle = this.handleInsuranceFilterToggle.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleInsuranceChange = this.handleInsuranceChange.bind(this)
    this.handleSpecialtyChange = this.handleSpecialtyChange.bind(this)
  }

  handleInsuranceChange(event) {
    this.setState({insurance: event.target.value})
  }

  handleSpecialtyChange(event) {
    this.setState({specialty: event.target.value})
  }

  handleInsuranceFilterToggle() {
    if (this.state.insuranceFilter)
      this.setState({ insuranceFilter: false, insurance: undefined })
    else
      this.setState({ insuranceFilter: true })
  }

  handleNameFilterToggle() {
    if (this.state.nameFilter)
      this.setState({ nameFilter: false, name: "" })
    else
      this.setState({ nameFilter: true })
  }

  handleSpecialtyFilterToggle() {
    if (this.state.specialtyFilter)
      this.setState({ specialtyFilter: false, specialty: undefined })
    else
      this.setState({ specialtyFilter: true })
  }

  handleLocationFilterToggle() {
    if (this.state.locationFilter)
      this.setState({ locationFilter: false, locationName: "", milesAway: 10, currentLocation: undefined, gettingCurrentLocation: undefined })
    else
      this.setState({ locationFilter: true })
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  handleLocationNameChange(event) {
    this.setState({ locationName: event.target.value })
  }

  handleMilesAwayChange(event) {
    this.setState({ milesAway: event.target.value })
  }

  toggleCurrentLocation() {
    if (this.state.currentLocation)
      this.setState({ currentLocation: undefined, gettingCurrentLocation: undefined })
    else {
      if (navigator.geolocation) {
        this.setState({ gettingCurrentLocation: "retrieving" })
        navigator.geolocation.getCurrentPosition((position) => {
          if (this.state.locationFilter) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.setState({ currentLocation: pos, gettingCurrentLocation: "retrieved" })
          } else {
            this.setState({ currentLocation: undefined, gettingCurrentLocation: undefined })
          }
        })
      }
    }
  }

  handleGoButtonClick() {
    let tempFilter = {}

    if (this.state.insurance) {
      console.log(this.state.insurance)
      console.log(this.state.allInsurances)

      tempFilter.insurance = this.state.allInsurances.find((providor) => providor.uid === this.state.insurance).plans.map((plan) => plan.uid).join()

    }

    if (this.state.name !== "") {
      tempFilter.doctorName = this.state.name
    }

    if (this.state.currentLocation === undefined && this.state.locationName !== "") {
      const google = window.google
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': this.state.locationName }, (results, status) => {
        if (status === 'OK') {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          tempFilter.location = { lat: latitude, lng: longitude }
          tempFilter.miles = this.state.milesAway
          console.log(tempFilter)
          this.setState({ filter: tempFilter })
          this.props.loadDocData(tempFilter)
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    } else if (this.state.currentLocation) {
      tempFilter.location = this.state.currentLocation
      tempFilter.miles = this.state.milesAway
      this.setState({ filter: tempFilter })
      this.props.loadDocData(tempFilter)
    }
    else {
      this.setState({ filter: tempFilter })
      this.props.loadDocData(tempFilter)
    }
  }

  render() {

    return (
      <div>
        <div className='card'>
          <h1 className="pageHeader inline">
            Search
        </h1>
          <div style={{ paddingLeft: '10%' }} className='inline'>
            <label style={{ display: 'inline-block', verticalAlign: 'top' }} >Location</label>
            <input className="inline" type='checkbox' onChange={this.handleLocationFilterToggle} checked={this.state.locationFilter} />
          </div>
          <div style={{ paddingLeft: '10%' }} className='inline'>
            <label style={{ display: 'inline-block', verticalAlign: 'top' }} >Specialty</label>
            <input className="inline" type='checkbox' onChange={this.handleSpecialtyFilterToggle} checked={this.state.specialtyFilter} />
          </div>
          <div style={{ paddingLeft: '10%' }} className='inline'>
            <label style={{ display: 'inline-block', verticalAlign: 'top' }} >Name</label>
            <input className="inline" type='checkbox' onChange={this.handleNameFilterToggle} checked={this.state.nameFilter} />
          </div>
          <div style={{ paddingLeft: '10%' }} className='inline'>
            <label style={{ display: 'inline-block', verticalAlign: 'top' }} >Insurance</label>
            <input className="inline" type='checkbox' onChange={this.handleInsuranceFilterToggle} checked={this.state.insuranceFilter} />
          </div>

          {this.state.locationFilter && <div>
            {(!this.state.currentLocation && this.state.gettingCurrentLocation !== "retrieving") && <input onChange={this.handleLocationNameChange} type='text' value={this.state.locationName} placeholder="City, State or Zip Code" />}
            <input name="checkbox-example" id="checkbox-example-1b" value={this.props.currentLocation} onChange={this.toggleCurrentLocation} type="checkbox" />
            <label htmlFor="checkbox-example-1b">Use Current Location</label>
            <div className="uitk-select md-text-field">
              <select onChange={this.handleMilesAwayChange} className="os-default">
                {distances.map((distance) => <option key={"distance" + distance} value={distance}>{distance} Miles</option>)}
              </select>
              <span className="select-arrow"></span>
            </div>
          </div>}

          {this.state.nameFilter &&
            <div>
              <input onChange={this.handleNameChange} type='text' value={this.state.name} placeholder="First or Last Name. Partial credit counts." />
            </div>}

          {this.state.insuranceFilter &&
            <div className="uitk-select md-text-field">
              <select defaultValue='Select a Provider' onChange={this.handleInsuranceChange} className="os-default">
              <option disabled value="Select a Provider" >Select a Provider</option>
                {this.state.allInsurances.map((insurancePlan) => <option key={insurancePlan.uid} value={insurancePlan.uid}>{insurancePlan.name}</option>)}
              </select>
              <span className="select-arrow"></span>
            </div>
          }

          {this.state.specialtyFilter &&
            <div className="uitk-select md-text-field">
              <select defaultValue='Select a Specialty' onChange={this.handleSpecialtyChange} className="os-default">
              <option disabled value="Select a Specialty" >Select a Specialty</option>
                {this.state.allSpecialties.map((specialty) => <option key={specialty.uid} value={specialty.uid}>{specialty.name}</option>)}
              </select>
              <span className="select-arrow"></span>
            </div>
          }

          {(this.state.locationFilter || this.state.nameFilter || this.state.specialtyFilter || this.state.insuranceFilter) && 
          <button disabled={this.state.gettingCurrentLocation === 'retrieving' || (this.state.locationName.length === 0 && this.state.gettingCurrentLocation === undefined) && this.state.name === "" && this.state.specialty === undefined && this.state.insurance === undefined} onClick={this.handleGoButtonClick}>Go!</button>}
        </div>
        {this.props.docData.length > 0 && <div className="topHeadlinesContainer">
          <div className="card topHeadlinesInnerContainer">
            {this.props.docData.map((doc) => <DoctorCard key={doc.uid} doctor={doc} />)}
          </div>
        </div>}
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
    loadDocData: (filter) => dispatch(loadDocData(filter)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchView)