import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
  render() {
    const { event, handleDeleteEvent } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{event.hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date.toDate(), 'dddd Do MMMM')}{' '}
            at {format(event.date.toDate(), 'HH:mm')} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              Object.values(event.attendees).map((attendee, index) => (
                <EventListAttendee key={index} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button
            as="a"
            color="red"
            content="Delete"
            floated="right"
            onClick={handleDeleteEvent(event.id)}
          />
          <Button
            as={Link}
            color="teal"
            content="View"
            floated="right"
            to={`/event/${event.id}`}
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
