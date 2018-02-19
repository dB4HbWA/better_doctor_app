import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { loadDocData, getCurrentPosition, NULL_CURRENT_POSITION } from './state/actions';
import { connect } from 'react-redux';
import DoctorCard from './DoctorCard'


const distances = [10, 25, 50, 75, 100]

class SearchView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationName: "",
      milesAway: 0,
      //currentLocation: undefined
    }

    this.handleLocationNameChange = this.handleLocationNameChange.bind(this)
    this.handleMilesAwayChange = this.handleMilesAwayChange.bind(this)
    this.toggleCurrentLocation = this.toggleCurrentLocation.bind(this)
  }

  handleLocationNameChange(event) {
    this.setState({ locationName: event.target.value })
  }

  handleMilesAwayChange(event) {
    this.setState({ milesAway: event.target.value })
  }

  toggleCurrentLocation() {
    if (this.props.currentLocation)
      this.props.nullCurrentPosition();
    else {
      if (navigator.geolocation) {
        this.props.getCurrentPosition();
      }
    }
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
        {(!this.props.currentLocation && this.props.gettingCurrentLocation !== "retrieving") && <input onChange={this.handleLocationNameChange} type='text' value={this.state.locationName} placeholder="City, State or Zip Code" />}
        <input name="checkbox-example" id="checkbox-example-1b" value={this.props.currentLocation} onChange={this.toggleCurrentLocation} type="checkbox" />
        <label htmlFor="checkbox-example-1b">Use Current Location</label>
        <div className="uitk-select md-text-field">
          <select onChange={this.handleMilesAwayChange} className="os-default">
            <option selected disabled value="Miles" >Miles</option>
            {distances.map((distance) => <option key={"distance" + distance} value={distance}>{distance} Miles</option>)}
          </select>
          <span className="select-arrow"></span>
        </div>
        <button>Go!</button>
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
    docData: state.docData,
    currentLocation: state.currentLocation,
    gettingCurrentLocation: state.gettingCurrentLocation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDocData: () => dispatch(loadDocData()),
    getCurrentPosition: () => dispatch(getCurrentPosition()),
    nullCurrentPosition: () => dispatch({type: NULL_CURRENT_POSITION})
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchView)