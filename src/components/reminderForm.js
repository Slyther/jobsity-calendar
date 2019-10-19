import React, { Component } from 'react';
import Select from 'react-dropdown-select';
import { connect } from 'react-redux';
import { fetchCities } from '../actions/citiesActions';
import { List } from 'react-virtualized';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

class ReminderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCity: [],
      selectedDate: '',
      selectedTime: '',
      comment: '',
    }
  }
  componentDidMount() {
    this.props.fetchCities();
  }

  setValues = (values) => {
    this.setState({
      selectedCity: values
    });
  }

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
              onChange={(values) => this.setValues(values)} 
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
