import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions/modalActions';
import { deleteReminders, deleteReminder } from '../actions/reminderActions';
import { getReminder } from '../actions/currentReminderActions';
import { goToDay, goToCalendar } from '../actions/currentViewActions';
import { Button, Col, Row, Modal, Table, Nav } from 'react-bootstrap'
import moment from 'moment';

class DayView extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      showConfirmationModal: false,
      selectedDate: '',
      deleteAll: true,
      reminderToDelete: -1
    }
  }

  render() {
    const reminders = this.props.reminders
        .filter(reminder => moment(reminder.date, 'MM/DD/YYYY').diff(moment(this.props.currentView.payload, 'MM/DD/YYYY')) === 0 )
        .sort((a, b) => {
            return moment.utc(a.time, 'h:mm A').diff(moment.utc(b.time, 'h:mm A'));
        })
        .map(reminder => {
            const colorBackgroud = {
                background: reminder.reminderColor
            };
            let styledWeather = reminder.forecast.map(x => {
                return (
                    <Col xs={3} key={`weatherforecast_${x.dt}`} className="forecast-item">
                        <div className="forecast-time text-center">{moment(x.dt_txt).format('h:mm A')}</div>
                        <Row>
                            <Col xs={6}><img id="wicon" className="weather-icon" src={`http://openweathermap.org/img/w/${x.weather[0].icon}.png`} alt="Weather icon"/></Col>
                            <Col xs={6}>
                                <Row><div className="forecast-description">{x.weather[0].main}</div></Row>
                                <Row><div className="main-temp">{x.main.temp}<sup>&deg;</sup>C</div></Row>
                            </Col>
                        </Row>
                    </Col>
                );
            });
            return (
                <tr key={reminder.reminderId}>
                    <th>
                        <div className="reminder-dayview-element" style={colorBackgroud}>
                            <Row className="text-center">
                                <Col xs={4}>Time: {reminder.time}</Col>
                                <Col xs={4}>Title: {reminder.title}</Col>
                                <Col xs={4}>City: {reminder.city}</Col>
                            </Row>
                            <Row>
                                <Col xs={11} sm={12}>
                                    <Row>
                                        {styledWeather}
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{span: 2, offset: 6}} sm={{span: 1, offset: 8}}>
                                    <Button
                                        variant="primary bordered"
                                        onClick={() => { this.props.getReminder(reminder); this.props.openModal() }}>
                                        <span className="far fa-edit"></span>
                                    </Button>
                                </Col>
                                <Col xs={{span: 2, offset: 1}} sm={{span: 1, offset: 1}}>
                                    <Button
                                        variant="danger bordered"
                                        onClick={() => {
                                            this.setState(
                                                {
                                                    showConfirmationModal: true, 
                                                    deleteAll: false, 
                                                    reminderToDelete: reminder.reminderId
                                                }
                                            );
                                        }}>
                                        <span className="far fa-trash-alt"></span>
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </th>
                </tr>
            )
        });
    return (
      <div className="day-view-container">
        <Nav fill className="justify-content-center" activeKey="/home">
            <Nav.Item>
            <Button variant="light" onClick={() => this.props.goToDay(moment(this.props.currentView.payload).subtract(1, 'days').format('MM/DD/YYYY'))}>&lt;</Button>
            </Nav.Item>
            <Nav.Item>
                <h5 className="text-center">{moment(this.props.currentView.payload).format('dddd, MMMM Do, YYYY')}</h5>
            </Nav.Item>
            <Nav.Item>
            <Button variant="light" onClick={() => this.props.goToDay(moment(this.props.currentView.payload).add(1, 'days').format('MM/DD/YYYY'))}>&gt;</Button>
            </Nav.Item>
        </Nav>
        
        <Table responsive>
            <thead>
                <tr className="text-center">
                    <th>Reminders</th>
                </tr>
            </thead>
            <tbody>
                {reminders}
            </tbody>
        </Table>
        <Modal show={this.state.showConfirmationModal} onHide={() => this.setState({showConfirmationModal: false, deleteAll: true, reminderToDelete: -1, selectedDate: ''})}>
          <Modal.Header closeButton>
            <Modal.Title>{ this.state.deleteAll ? 'Clear Day?' : 'Delete Reminder?'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { 
              this.state.deleteAll ? 
              'Are you sure you want to clear the schedule for the day?' 
              : 'Are you sure you want to delete this reminder?'
            }</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({showConfirmationModal: false, deleteAll: true, reminderToDelete: -1, selectedDate: ''})}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => {
                if(this.state.deleteAll){
                    this.props.deleteReminders(this.state.selectedDate);
                } else {
                    this.props.deleteReminder(this.state.reminderToDelete);
                }
                this.setState({showConfirmationModal: false, deleteAll: true, reminderToDelete: -1, selectedDate: ''});
            }}>
              { this.state.deleteAll ? 'Clear Day?' : 'Delete Reminder?'}
            </Button>
          </Modal.Footer>
        </Modal>
        <Nav fill className="justify-content-center" activeKey="/home">
            <Nav.Item>
                <Button variant="secondary" className="add-reminder" onClick={this.props.goToCalendar}>
                    Go Back to Calendar
                </Button>
            </Nav.Item>
            <Nav.Item>
                <Button variant="primary" className="add-reminder" onClick={this.props.openModal}>
                    Add a Reminder
                </Button>
            </Nav.Item>
            {
                reminders.length > 0 &&
                <Nav.Item>
                    <Button variant="danger" className="add-reminder" onClick={() => {
                        this.setState({selectedDate: this.props.currentView.payload, showConfirmationModal: true, deleteAll: true, reminderToDelete: -1});
                        }}>
                        Clear All Reminders
                    </Button>
                </Nav.Item>
            }
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reminders: state.reminders,
  currentView: state.currentView
});

export default connect(mapStateToProps, { openModal, deleteReminders, deleteReminder, getReminder, goToDay, goToCalendar })(DayView);
