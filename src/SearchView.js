import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { loadDocData } from './state/actions';
import { connect } from 'react-redux';
import DoctorCard from './DoctorCard';

const distances = [10, 25, 50, 75, 100]

class SearchView extends Component {
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
      filter: {}
    }

    this.handleLocationNameChange = this.handleLocationNameChange.bind(this)
    this.handleMilesAwayChange = this.handleMilesAwayChange.bind(this)
    this.toggleCurrentLocation = this.toggleCurrentLocation.bind(this)
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this)
    this.handleNameFilterToggle = this.handleNameFilterToggle.bind(this)
    this.handleSpecialtyFilterToggle = this.handleSpecialtyFilterToggle.bind(this)
    this.handleLocationFilterToggle = this.handleLocationFilterToggle.bind(this)
  }

  handleNameFilterToggle() {
    if (this.state.nameFilter)
      this.setState({ nameFilter: false })
    else
      this.setState({ nameFilter: true })
  }

  handleSpecialtyFilterToggle() {
    if (this.state.specialtyFilter)
      this.setState({ specialtyFilter: false })
    else
      this.setState({ specialtyFilter: true })
  }

  handleLocationFilterToggle() {
    if (this.state.locationFilter)
      this.setState({ locationFilter: false, locationName: "", milesAway: 10, currentLocation: undefined, gettingCurrentLocation: undefined })
    else
      this.setState({ locationFilter: true })
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
    if (this.state.currentLocation === undefined) {
      const google = window.google
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': this.state.locationName }, (results, status) => {
        if (status === 'OK') {

          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();

          let tempFilter = this.state.filter
          tempFilter.location = { lat: latitude, lng: longitude }
          tempFilter.miles = this.state.milesAway
          this.setState({ filter: tempFilter })
          this.props.loadDocData(this.state.filter)
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    } else {
      let tempFilter = this.state.filter
      tempFilter.location = this.state.currentLocation
      tempFilter.miles = this.state.milesAway
      this.setState({ filter: tempFilter })
      this.props.loadDocData(this.state.filter)
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

          <button disabled={this.state.gettingCurrentLocation === 'retrieving' || (this.state.locationName.length === 0 && this.state.gettingCurrentLocation === undefined)} onClick={this.handleGoButtonClick}>Go!</button>
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