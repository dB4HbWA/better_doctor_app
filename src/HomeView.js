import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { loadDocData } from './state/actions';
import { connect } from 'react-redux';
import DoctorCard from './DoctorCard'


const distances = [10, 25, 50, 75, 100]

class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationName: "",
      milesAway: 0
    }

    this.handleLocationNameChange = this.handleLocationNameChange.bind(this)
    this.handleMilesAwayChange = this.handleMilesAwayChange.bind(this)
  }

  handleLocationNameChange(event) {
    this.setState({locationName: event.target.value})
  }

  handleMilesAwayChange(event) {
    this.setState({milesAway: event.target.value})
  }

  componentDidMount() {
    this.props.loadDocData()
  }



  render() {
    return (
      <div>
        <h1 className="pageHeader">
          Search
        </h1>
        <input onChange={this.handleLocationNameChange} type='text' placeholder="City, State or Zip Code" />
        <div className="uitk-select md-text-field">
            <select onChange={this.handleMilesAwayChange} className="os-default">
              <option disabled selected value="">Miles</option>
              {distances.map((distance) => <option value={distance}>{distance} Miles</option>)}
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
    docData: state.docData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDocData: () => dispatch(loadDocData())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeView)