import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { incrementAsync, decrementAsync } from './testActions';
import { openModal } from '../modals/modalActions';

class TestComponent extends Component {
  state = { address: '', scriptLoaded: false };

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  onChange = address => this.setState({ address });

  render() {
    const {
      data,
      loading,
      openModal,
      incrementAsync,
      decrementAsync
    } = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };
    return (
      <div>
        <Script
          onLoad={this.handleScriptLoad}
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAllMG3hm9LTR8qTXtPO-iqqOlDb-nxEWs&libraries=places"
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button
          color="green"
          loading={loading}
          disabled={loading}
          content="Increment"
          onClick={incrementAsync}
        />
        <Button
          color="red"
          loading={loading}
          disabled={loading}
          content="Decrement"
          onClick={decrementAsync}
        />
        <Button
          color="teal"
          content="Open Modal"
          onClick={() => openModal('TestModal', { data: 43 })}
        />
        <br />
        <br />
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && (
            <PlacesAutocomplete inputProps={inputProps} />
          )}
          <br />
          <center>
            <Button color="green" type="submit">
              Submit
            </Button>
          </center>
        </form>
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.test.data,
  loading: state.test.loading
});

const actions = {
  incrementAsync,
  decrementAsync,
  openModal
};

export default connect(
  mapStateToProps,
  actions
)(TestComponent);
