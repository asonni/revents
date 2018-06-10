import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';

const eventImageStyle = {
  filter: 'brightness(30%)'
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const EventDetailedHeader = ({ event }) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          fluid
          style={eventImageStyle}
          src={`/assets/categoryImages/${event.category}.jpg`}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>{format(event.date, 'dddd Do MMMM')}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button>Cancel My Place</Button>
        <Button color="teal">JOIN THIS EVENT</Button>

        <Button
          as={Link}
          color="orange"
          floated="right"
          to={`/manage/${event.id}`}
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
