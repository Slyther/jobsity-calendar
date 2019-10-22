import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-dropdown-select';
import { connect } from 'react-redux';
import { fetchCities } from '../../actions/citiesActions';
import { postReminder, fetchWeather } from '../../actions/reminderActions';
import { getReminder } from '../../actions/currentReminderActions';
import { closeModal } from '../../actions/modalActions';
import { List } from 'react-virtualized';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import DatePicker from 'react-datepicker';
import { SketchPicker } from 'react-color';
import 'rc-time-picker/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import './ReminderForm.scss';

class ReminderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: [],
      selectedDate: new Date(),
      selectedTime: moment()
        .hour(0)
        .minute(0),
      reminderId: -1,
      reminderColor: '#007bff',
      title: '',
      errors: {},
      showErrors: false,
      showInvalidReminder: false,
    };
  }
  componentDidMount() {
    this.props.fetchCities();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentReminder.reminderId === -1 && state.reminderId !== -1) {
      return {
        selectedCity: [],
        selectedDate: new Date(),
        selectedTime: moment()
          .hour(0)
          .minute(0),
        reminderId: -1,
        reminderColor: '#007bff',
        title: '',
      };
    }
    if (props.currentReminder.reminderId !== state.reminderId) {
      return {
        selectedCity: [
          {
            name: props.currentReminder.city,
            id: props.currentReminder.cityId,
          },
        ],
        selectedDate: new Date(props.currentReminder.date),
        selectedTime: moment(props.currentReminder.time, 'h:mm A'),
        reminderId: props.currentReminder.reminderId,
        reminderColor: props.currentReminder.reminderColor,
        title: props.currentReminder.title,
      };
    }
    return null;
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    if (this.state.showErrors) {
      this.checkForm();
    }
  };

  customDropdownRenderer = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, 'i');
    const options = props.options.filter((item) =>
      regexp.test(item[props.searchBy] || item.label)
    );

    const rowRenderer = ({ index, style }) => {
      return (
        <div
          key={options[index].id}
          className="dropdown-element"
          style={style}
          onClick={() => methods.addItem(options[index])}>
          {options[index].name}
        </div>
      );
    };

    return (
      <List
        width={299}
        height={280}
        rowCount={options.length}
        rowHeight={35}
        rowRenderer={rowRenderer}
      />
    );
  };

  checkForm = () => {
    let errors = {};
    let showErrors = false;
    if (typeof this.state.selectedCity[0] === 'undefined') {
      errors.selectedCity = 'Please select a city!';
      showErrors = true;
    } else {
      errors.selectedCity = '';
    }
    if (this.state.title.length === 0) {
      errors.title = 'Please give your reminder a title!';
      showErrors = true;
    } else {
      errors.title = '';
    }
    this.setState({ errors: errors, showErrors: showErrors });
    return showErrors;
  };

  validateReminder = (reminder) => {
    let isInvalid = this.props.reminders.some(
      (rem) => rem.date === reminder.date && rem.time === reminder.time
    );
    this.setState({ showInvalidReminder: isInvalid });
    return isInvalid;
  };

  onSubmit = (e) => {
    if (this.checkForm()) {
      return;
    }
    e.preventDefault();
    let reminder = {
      date: moment(this.state.selectedDate).format('MM/DD/YYYY'),
      time: this.state.selectedTime.format('h:mm A'),
      city: this.state.selectedCity[0].name,
      cityId: this.state.selectedCity[0].id,
      title: this.state.title,
      reminderId: this.state.reminderId,
      reminderColor: this.state.reminderColor,
      forecast: [],
    };
    if (reminder.reminderId === -1 && this.validateReminder(reminder)) {
      return;
    }
    this.setState(
      {
        selectedCity: [],
        selectedDate: new Date(),
        selectedTime: moment()
          .hour(0)
          .minute(0),
        reminderId: -1,
        reminderColor: '#007bff',
        title: '',
      },
      () => {
        this.props.postReminder(reminder);
        this.props.fetchWeather(reminder.cityId);
        this.props.closeModal();
        this.props.getReminder({ reminderId: -1 });
      }
    );
  };

  onCloseModal = () => {
    this.setState(
      {
        selectedCity: [],
        selectedDate: new Date(),
        selectedTime: moment()
          .hour(0)
          .minute(0),
        reminderId: -1,
        reminderColor: '#007bff',
        title: '',
      },
      () => {
        this.props.closeModal();
        this.props.getReminder({ reminderId: -1 });
      }
    );
  };

  render() {
    const colorBackgroud = {
      background: this.state.reminderColor,
    };
    return (
      <Modal show={this.props.showModal} onHide={this.onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.onSubmit(e);
              }
            }}>
            <Form.Group as={Row} controlId="color">
              <Form.Label column sm={4}>
                Color:
              </Form.Label>
              <Col sm={8}>
                <div
                  className="color-choice"
                  style={colorBackgroud}
                  onClick={() =>
                    this.setState({ displayColorPicker: true })
                  }></div>
                {this.state.displayColorPicker && (
                  <div className="picker-popover">
                    <div
                      className="picker-cover"
                      onClick={() =>
                        this.setState({ displayColorPicker: false })
                      }
                    />
                    <SketchPicker
                      color={this.state.reminderColor}
                      onChange={(color) =>
                        this.handleChange({
                          target: { id: 'reminderColor', value: color.hex },
                        })
                      }
                    />
                  </div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="title">
              <Form.Label column sm={4}>
                Title:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  onChange={this.handleChange}
                  value={this.state.title}
                  as="textarea"
                  placeholder="Write a reminder title (max 30 characters)..."
                  maxLength={30}
                  rows={2}
                  isInvalid={
                    'title' in this.state.errors &&
                    this.state.errors.title.length > 0
                  }
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.title}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="selectedDate">
              <Form.Label column sm={4}>
                Date:
              </Form.Label>
              <Col sm={8}>
                <DatePicker
                  selected={this.state.selectedDate}
                  onChange={(date) =>
                    this.handleChange({
                      target: { id: 'selectedDate', value: date },
                    })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="selectedTime">
              <Form.Label column sm={4}>
                Time:
              </Form.Label>
              <Col sm={8}>
                <TimePicker
                  showSecond={false}
                  defaultValue={this.state.selectedTime}
                  className="xxx"
                  onChange={(time) =>
                    this.handleChange({
                      target: { id: 'selectedTime', value: time },
                    })
                  }
                  format={'h:mm A'}
                  use12Hours
                  inputReadOnly
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="selectedCity">
              <Form.Label column sm={4}>
                City:
              </Form.Label>
              <Col sm={8}>
                <Select
                  options={this.props.cities}
                  values={this.state.selectedCity}
                  searchBy="name"
                  searchable="true"
                  sortBy="name"
                  placeholder="Select a city..."
                  labelField="name"
                  dropdownHandle={false}
                  isInvalid={true}
                  dropdownRenderer={this.customDropdownRenderer}
                  className={`form-control ${
                    'selectedCity' in this.state.errors &&
                    this.state.errors.selectedCity.length > 0
                      ? 'is-invalid'
                      : ''
                  }`}
                  onChange={(values) =>
                    this.handleChange({
                      target: { id: 'selectedCity', value: values },
                    })
                  }
                />
                <div className="invalid-feedback" style={{ display: 'block' }}>
                  {this.state.errors.selectedCity}
                </div>
              </Col>
            </Form.Group>
          </Form>
          {this.state.showInvalidReminder && (
            <Alert variant="danger">
              A reminder with this time and date already exists!
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.onCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ReminderForm.propTypes = {
  cities: PropTypes.array,
  showModal: PropTypes.bool.isRequired,
  currentReminder: PropTypes.object,
  fetchCities: PropTypes.func.isRequired,
  fetchWeather: PropTypes.func.isRequired,
  postReminder: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  getReminder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: state.cities,
  showModal: state.showModal,
  currentReminder: state.currentReminder,
  reminders: state.reminders.reminders,
});

export default connect(
  mapStateToProps,
  { fetchCities, fetchWeather, postReminder, closeModal, getReminder }
)(ReminderForm);
