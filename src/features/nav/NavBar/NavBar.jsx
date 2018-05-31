import React, { Component, Fragment } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SigendInMenu';

class NavBar extends Component {
  state = {
    authenticated: false
  };

  handleSignIn = () => {
    this.setState({
      authenticated: true
    });
  };

  handleSignOut = () => {
    this.setState({
      authenticated: false
    });
    this.props.history.push('/');
  };

  render() {
    const { authenticated } = this.state;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
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
              <SignedInMenu signOut={this.handleSignOut} />
            </Fragment>
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
