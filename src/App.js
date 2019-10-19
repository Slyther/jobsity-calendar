import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ReminderForm from './components/reminderForm';
import { Container } from 'react-bootstrap'
import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
        <ReminderForm></ReminderForm>
        </Container>
      </Provider>
    );
  }
}

export default App;
