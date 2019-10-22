import React from 'react';
import ReminderForm from './ReminderForm';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import store from '../../store';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ReminderForm />
    </Provider>
  );
  expect(wrapper).toBeDefined();
});
