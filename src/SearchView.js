import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { loadDocData } from './state/actions';
import { connect } from 'react-redux';
import DoctorCard from './DoctorCard';
//import geocoder from 'geocoder'



const distances = [10, 25, 50, 75, 100]

class SearchView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationName: "",
      milesAway: 0,
      currentLocation: undefined,
      gettingCurrentLocation: undefined
    }

    this.handleLocationNameChange = this.handleLocationNameChange.bind(this)
    this.handleMilesAwayChange = this.handleMilesAwayChange.bind(this)
    this.toggleCurrentLocation = this.toggleCurrentLocation.bind(this)
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this)
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
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.setState({ currentLocation: pos, gettingCurrentLocation: "retrieved" })
        })
      }
    }
  }

  handleGoButtonClick() {
    console.log("in button click")

    const google = window.google

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': this.state.locationName },
      function (results, status) {
        if (status == 'OK') {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          console.log(latitude + ',' + longitude);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
  }

  componentDidMount() {
    //this.props.loadDocData()
  }

  render() {
    console.log(this.props.gettingCurrentLocation)
    return (
      <div>
        <h1 className="pageHeader">
          Search
        </h1>
        {(!this.state.currentLocation && this.state.gettingCurrentLocation !== "retrieving") && <input onChange={this.handleLocationNameChange} type='text' value={this.state.locationName} placeholder="City, State or Zip Code" />}
        <input name="checkbox-example" id="checkbox-example-1b" value={this.props.currentLocation} onChange={this.toggleCurrentLocation} type="checkbox" />
        <label htmlFor="checkbox-example-1b">Use Current Location</label>
        <div className="uitk-select md-text-field">
          <select onChange={this.handleMilesAwayChange} className="os-default">
            <option selected disabled value="Miles" >Miles</option>
            {distances.map((distance) => <option key={"distance" + distance} value={distance}>{distance} Miles</option>)}
          </select>
          <span className="select-arrow"></span>
        </div>
        <button onClick={this.handleGoButtonClick} >Go!</button>
        {<div className="topHeadlinesContainer">
          <div className="card topHeadlinesInnerContainer">
            {this.props.docData.map((doc) => <DoctorCard key={doc.uid} urlToImage={doc.profile.image_url} docName={doc.profile.first_name + " " + doc.profile.last_name} />)}
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
    loadDocData: () => dispatch(loadDocData()),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchView)