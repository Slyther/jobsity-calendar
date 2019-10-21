import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CalendarView from '../CalendarView/';
import DayView from '../DayView/';
import ReminderForm from '../ReminderForm';
import { Container } from 'react-bootstrap';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Container>
        {this.props.currentView.view === 'calendar' && <CalendarView />}
        {this.props.currentView.view === 'day' && <DayView />}
        <ReminderForm />
      </Container>
    );
  }
}

App.propTypes = {
  currentView: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  currentView: state.currentView,
});

export default connect(
  mapStateToProps,
  {}
)(App);
