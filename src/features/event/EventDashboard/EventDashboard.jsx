import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            handleDeleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}> </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  deleteEvent
};

export default connect(
  mapStateToProps,
  actions
)(EventDashboard);
