import React, { Component } from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';

class EventFrom extends Component {
  state = {
    event: Object.assign({}, this.props.event)
  };

  onFormSubmit = e => {
    e.preventDefault();
    console.log(this.state.event);
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      };
      this.props.createEvent(newEvent);
      this.props.history.push('/events');
    }
  };

  onInputChange = e => {
    const newEvent = this.state.event;
    newEvent[e.target.name] = e.target.value;
    this.setState({
      event: newEvent
    });
  };

  render() {
    const { event } = this.state;
    const { handleCancel } = this.props;
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment>
            <Form onSubmit={this.onFormSubmit}>
              <Form.Field>
                <label>Event Title</label>
                <input
                  name="title"
                  value={event.title}
                  placeholder="Event Title"
                  onChange={this.onInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Event Date</label>
                <input
                  name="date"
                  type="date"
                  value={event.date}
                  placeholder="Event Date"
                  onChange={this.onInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>City</label>
                <input
                  name="city"
                  value={event.city}
                  onChange={this.onInputChange}
                  placeholder="City event is taking place"
                />
              </Form.Field>
              <Form.Field>
                <label>Venue</label>
                <input
                  name="venue"
                  value={event.venue}
                  onChange={this.onInputChange}
                  placeholder="Enter the Venue of the event"
                />
              </Form.Field>
              <Form.Field>
                <label>Hosted By</label>
                <input
                  name="hostedBy"
                  value={event.hostedBy}
                  onChange={this.onInputChange}
                  placeholder="Enter the name of person hosting"
                />
              </Form.Field>
              <Button positive type="submit">
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

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  };
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return { event };
};

const actions = { createEvent, updateEvent };

export default connect(mapStateToProps, actions)(EventFrom);
