import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SigendInMenu';
import { openModal } from '../../modals/modalActions';

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  };

  render() {
    const { auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/test" name="Test" />
          {authenticated ? (
            <Fragment>
              <Menu.Item as={NavLink} to="/people" name="People" />
              <Menu.Item>
                <Button
                  positive
                  inverted
                  as={Link}
                  floated="right"
                  to="/createEvent"
                  content="Create Event"
                />
              </Menu.Item>
              <SignedInMenu auth={auth} signOut={this.handleSignOut} />
            </Fragment>
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

const mapDispatchToProps = {
  openModal
};

export default withRouter(
  withFirebase(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(NavBar)
  )
);
