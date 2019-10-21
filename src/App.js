import React, { Component } from 'react';
import { connect } from 'react-redux';
import CalendarView from './components/calendarView';
import DayView from './components/dayView';
import ReminderForm from './components/reminderForm';
import { Container } from 'react-bootstrap';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Container>
        {
          this.props.currentView.view === 'calendar' &&
          <CalendarView/>
        }
        {
          this.props.currentView.view === 'day' &&
          <DayView/>
        }
        <ReminderForm/>
      </Container>
    );
  }
}


const mapStateToProps = (state) => ({
  currentView: state.currentView
});

export default connect(mapStateToProps, { })(App);
