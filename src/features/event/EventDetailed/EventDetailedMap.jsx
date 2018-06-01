import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = () => <Icon name="marker" size="big" color="red" />;

const EventDeatailedMap = ({ lat, lng }) => {
  const zoom = 14;
  const center = [lat, lng];
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          defaultZoom={zoom}
          defaultCenter={center}
          bootstrapURLKeys={{
            key: 'AIzaSyAllMG3hm9LTR8qTXtPO-iqqOlDb-nxEWs'
          }}
        >
          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDeatailedMap;
