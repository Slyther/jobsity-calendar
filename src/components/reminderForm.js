import React, { Component } from 'react';
import Select from 'react-dropdown-select';
import { connect } from 'react-redux';
import { fetchCities } from '../actions/citiesActions';
import { List } from 'react-virtualized';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import DatePicker from "react-datepicker"

class ReminderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCity: [],
      selectedDate: new Date(),
      selectedTime: moment().hour(0).minute(0),
      comment: '',
    }
  }
  componentDidMount() {
    this.props.fetchCities();
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  customDropdownRenderer = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, "i");
    const options = props.options
    .filter(item => regexp.test(item[props.searchBy] || item.label));

    const rowRenderer = ({index, style}) => {
      return (
        <div key={options[index].id} className="dropdown-element" style={style} onClick={() => methods.addItem(options[index])}>
          {options[index].name}
        </div>
      )
    }

    return (
      <List
        width={299}
        height={280}
        rowCount={options.length}
        rowHeight={35}
        rowRenderer={rowRenderer}>
      </List>
    );
  };

  render() {
    return (
      <Modal show={true} onHide={this.props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Reminder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              this.this.props.onCreate();
            }
          }}>
          <Form.Group as={Row} controlId="comment">
            <Form.Label column sm={4}>Comment:</Form.Label>
            <Col sm={8}>
            <Form.Control
              onChange={this.handleChange}
              value={this.state.comment}
              as="textarea"
              placeholder="Write a reminder comment (max 30 characters)..."
              maxLength={30}
              rows={2}
              required>
            </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="selectedDate">
            <Form.Label column sm={4}>Date:</Form.Label>
            <Col sm={8}>
            <DatePicker
              selected={this.state.selectedDate}
              onChange={(date) => this.handleChange({target: { id: 'selectedDate', value: date}})}
            />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="selectedTime">
            <Form.Label column sm={4}>Time:</Form.Label>
            <Col sm={8}>
              <TimePicker
                showSecond={false}
                defaultValue={this.state.selectedTime}
                className="xxx"
                onChange={(time) => this.handleChange({target: { id: 'selectedTime', value: time}})}
                format={"h:mm A"}
                use12Hours
                inputReadOnly
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="selectedCity">
            <Form.Label column sm={4}>City:</Form.Label>
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
                dropdownRenderer={this.customDropdownRenderer}
                onChange={(values) => this.handleChange({target: { id: 'selectedCity', value: values}})} 
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.props.closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={this.props.onCreate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  cities: state.cities
});

export default connect(mapStateToProps, { fetchCities })(ReminderForm);
