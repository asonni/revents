import React from 'react';
import { Segment, List, Item, Label } from 'semantic-ui-react';

const EventDetailedSidebar = ({ attendees }) => {
  const isHost = false;
  return (
    <div>
      <Segment
        inverted
        secondary
        color="teal"
        attached="top"
        textAlign="center"
        style={{ border: 'none' }}
      >
        {attendees && attendees.length}{' '}
        {attendees && attendees.length === 1 ? 'Person' : 'People'} Going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees &&
            attendees.map(attendee => (
              <Item key={attendee.id} style={{ position: 'relative' }}>
                {isHost && (
                  <Label
                    color="orange"
                    ribbon="right"
                    style={{ position: 'absolute' }}
                  >
                    Host
                  </Label>
                )}
                <Item.Image size="tiny" src={attendee.photoURL} />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <a>{attendee.name}</a>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </List>
      </Segment>
    </div>
  );
};

export default EventDetailedSidebar;
