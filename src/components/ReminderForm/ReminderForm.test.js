import React from 'react';
import { ReminderForm } from './ReminderForm';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import * as cities from '../../json/city.list.min.json';

Enzyme.configure({ adapter: new Adapter() });
describe('<ReminderForm />', () => {
  const fetchCitiesMock = jest.fn();
  const fetchWeatherMock = jest.fn();
  const postReminderMock = jest.fn();
  const closeModalMock = jest.fn();
  const getReminderMock = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ReminderForm
        cities={cities.default}
        showModal={true}
        currentReminder={{ reminderId: -1 }}
        reminders={[]}
        fetchCities={fetchCitiesMock}
        fetchWeather={fetchWeatherMock}
        postReminder={postReminderMock}
        closeModal={closeModalMock}
        getReminder={getReminderMock}
      />
    );
  });
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('calls the fetchCities on mount', () => {
    expect(fetchCitiesMock.mock.calls.length).toBeGreaterThan(0);
  });

  it('adds validation errors on form submit without required fields', () => {
    const submitButton = wrapper.find('#submitButton').at(0);
    submitButton.simulate('click');
    expect(wrapper.state('showErrors')).toEqual(true);
  });

  it('adds validation error for title on form submit without title', () => {
    const submitButton = wrapper.find('#submitButton').at(0);
    submitButton.simulate('click');
    expect(wrapper.state('errors')).toHaveProperty('title');
  });

  it('adds validation error for selectedCity on form submit without selectedCity', () => {
    const submitButton = wrapper.find('#submitButton').at(0);
    submitButton.simulate('click');
    expect(wrapper.state('errors')).toHaveProperty('selectedCity');
  });
});
