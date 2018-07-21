import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';

class UserDetailedPage extends Component {
  render() {
    const {
      profile,
      photos,
      auth: { createdAt }
    } = this.props;
    // console.log(auth);
    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedDescription profile={{ ...profile, createdAt }} />
        <UserDetailedSidebar />
        {photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
        <UserDetailedEvents />
      </Grid>
    );
  }
}

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos'
    }
  ];
};

const mapStateToProps = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firestore.ordered.photos
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(auth => query(auth))
)(UserDetailedPage);
