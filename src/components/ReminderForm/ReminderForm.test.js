import React from 'react';
import ReminderForm from './ReminderForm';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import store from '../../store';
import { shallow, mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });
describe('<MyComponent />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ReminderForm />
      </Provider>
    );
    expect(wrapper).toBeDefined();
  });

  // it('renders without crashing', () => {
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <ReminderForm />
  //     </Provider>
  //   );
  //   expect(wrapper).toBeDefined();
  // });
  // const onChangeMock = jest.fn();

  //   const wrapper = mount(
  //     <ReminderForm
  //       items={['dba', 'devops', 'frontend', 'backend']}
  //       placeholder="Category"
  //       onChange={onChangeMock}
  //     />,
  //   );

  //   expect(onChangeMock.mock.calls).toHaveLength(0);

  //   const input = wrapper.find('input');

  //   input.simulate('focus');
  //   input.simulate('change', { target: { value: 'd' } });

  //   expect(onChangeMock.mock.calls).toHaveLength(1);

  //   input.simulate('keydown', { keyCode: 40 });
  //   input.simulate('keydown', { key: 'Enter' });

  //   expect(onChangeMock.mock.calls).toHaveLength(2);
});
