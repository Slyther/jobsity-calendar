import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import CalendarView from './components/calendarView';
import ReminderForm from './components/reminderForm';
import { Container } from 'react-bootstrap';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <CalendarView/>
          <ReminderForm/>
        </Container>
      </Provider>
    );
  }
}

export default App;
