/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';
import moment from 'moment';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import cuid from 'cuid';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

class EventFrom extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  };

  handleScriptLoad = () => this.setState({ scriptLoaded: true });

  handelCitySelect = async selectedCity => {
    const results = await geocodeByAddress(selectedCity);
    const cityLatLng = await getLatLng(results[0]);
    this.setState({ cityLatLng });
    this.props.change('city', selectedCity);
  };

  handelVenueSelect = async selectedVenue => {
    const results = await geocodeByAddress(selectedVenue);
    const venueLatLng = await getLatLng(results[0]);
    this.setState({ venueLatLng });
    this.props.change('venue', selectedVenue);
  };

  onFormSubmit = values => {
    values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob'
      };
      this.props.createEvent(newEvent);
      this.props.history.push('/events');
    }
  };

  render() {
    const { handleSubmit, invalid, submitting, pristine } = this.props;
    return (
      <Grid centered>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAllMG3hm9LTR8qTXtPO-iqqOlDb-nxEWs&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={handleSubmit(this.onFormSubmit)}>
              <Field
                type="text"
                name="title"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                type="text"
                name="category"
                options={category}
                component={SelectInput}
                placeholder="What is your event about"
              />
              <Field
                rows={3}
                type="text"
                name="description"
                component={TextArea}
                placeholder="Tell us about your event"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                placeholder="Event City"
                onSelect={this.handelCitySelect}
                options={{ types: ['(cities)'] }}
              />
              {this.state.scriptLoaded && (
                <Field
                  type="text"
                  name="venue"
                  component={PlaceInput}
                  placeholder="Event Venue"
                  onSelect={this.handelVenueSelect}
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ['establishment']
                  }}
                />
              )}
              <Field
                name="date"
                showTimeSelect
                timeFormat="HH:mm"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                placeholder="Date and Time of event"
              />
              <Button
                positive
                type="submit"
                disabled={invalid || submitting || pristine}
              >
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('Event city'),
  venue: isRequired('Event venue'),
  date: isRequired('Event date')
});

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return { initialValues: event };
};

const actions = { createEvent, updateEvent };

export default connect(mapStateToProps, actions)(
  reduxForm({
    validate,
    form: 'eventForm',
    enableReinitialize: true
  })(EventFrom)
);
