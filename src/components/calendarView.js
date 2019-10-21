import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions/modalActions';
import { deleteReminders } from '../actions/reminderActions';
import { goToDay } from '../actions/currentViewActions';
import { Button, Col, Row, Modal } from 'react-bootstrap'
import moment from 'moment';
import Calendar from 'react-calendar';

class CalendarView extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      showConfirmationModal: false,
      selectedDate: '' 
    }
  }

  render() {
    return (
      <Fragment>
        <Calendar
          calendarType="US"
          minDetail="month"
          onChange={(date) => this.props.goToDay(moment(date).format('MM/DD/YYYY'))}
          tileContent={({ date, view }) => {
            if(view === 'month') {
              const formattedDate = moment(date).format('MM/DD/YYYY');
              let dateReminders = this.props.reminders
                .filter(reminder => reminder.date === formattedDate)
                .sort((a, b) => {
                  return moment.utc(a.time, 'h:mm A').diff(moment.utc(b.time, 'h:mm A'));
                })
                .map(reminder => 
                  <div 
                    key={reminder.title} 
                    style={
                      {
                        background: reminder.reminderColor,
                        borderColor: reminder.reminderColor
                      }
                    }
                    className="btn btn-primary reminder-element">
                      <Row>
                        <Col sm={12} md={5}>
                          <div className="reminder-title">{reminder.title}</div>
                        </Col>
                        <Col md={7}>
                        <div className="hide-mobile">{reminder.time}</div>
                        </Col>
                      </Row>
                  </div>
                );
              if(dateReminders.length >= 4) {
                let remainingLength = dateReminders.length - 3;
                dateReminders = [
                  ...dateReminders.slice(0, 3), 
                  (<div 
                    key="remainder" 
                    className="btn btn-secondary reminder-element">
                      And {remainingLength} more...
                  </div>)
                ];
              }
              return (
                <Fragment>
                  {
                    moment(date).diff(moment().startOf('day')) === 0 &&
                    <div className="today"/>
                  }
                  {
                    dateReminders.length > 0 &&
                    <div className="btn btn-secondary delete-date-reminders" onClick={(e) => {
                      e.stopPropagation();
                      this.setState({selectedDate: formattedDate, showConfirmationModal: true})
                    }}></div>
                  }
                  <div className="reminder-list">
                    {dateReminders}
                  </div>
                </Fragment>
              );
            }
          }}
        />
        <Modal show={this.state.showConfirmationModal} onHide={() => this.setState({showConfirmationModal: false})}>
          <Modal.Header closeButton>
            <Modal.Title>Clear Day?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to clear the schedule for the day?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({showConfirmationModal: false})}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => {
              this.props.deleteReminders(this.state.selectedDate);
              this.setState({showConfirmationModal: false, selectedDate: ''});
            }}>
              Clear Day
            </Button>
          </Modal.Footer>
        </Modal>
        <Button variant="primary" className="add-reminder" onClick={this.props.openModal}>
          Add a Reminder
        </Button>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  reminders: state.reminders
});

export default connect(mapStateToProps, { openModal, deleteReminders, goToDay })(CalendarView);
