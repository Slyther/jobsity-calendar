import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions/modalActions';
import { deleteReminders, deleteReminder } from '../actions/reminderActions';
import { getReminder } from '../actions/currentReminderActions';
import { goToDay, goToCalendar } from '../actions/currentViewActions';
import { Button, Table, Nav } from 'react-bootstrap';
import ConfirmationModal from './confirmationModal';
import Reminder from './reminder';
import moment from 'moment';

class DayView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmationModal: false,
      selectedDate: '',
      deleteAll: true,
      reminderToDelete: -1,
    };
  }

  renderReminders = (sortedReminders) => {
    const reminders = sortedReminders.map((reminder) => {
      return (
        <Reminder
          key={reminder.reminderId}
          reminder={reminder}
          onEdit={() => {
            this.props.getReminder(reminder);
            this.props.openModal();
          }}
          onDelete={() => {
            this.setState({
              showConfirmationModal: true,
              deleteAll: false,
              reminderToDelete: reminder.reminderId,
            });
          }}
        />
      );
    });
    return reminders;
  };

  render() {
    const reminders = this.props.reminders
      .filter(
        (reminder) =>
          moment(reminder.date, 'MM/DD/YYYY').diff(
            moment(this.props.currentView.payload, 'MM/DD/YYYY')
          ) === 0
      )
      .sort((a, b) => {
        return moment.utc(a.time, 'h:mm A').diff(moment.utc(b.time, 'h:mm A'));
      });

    return (
      <div className="day-view-container">
        <Nav fill className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Button
              variant="light"
              onClick={() =>
                this.props.goToDay(
                  moment(this.props.currentView.payload, 'MM/DD/YYYY')
                    .subtract(1, 'days')
                    .format('MM/DD/YYYY')
                )
              }>
              &lt;
            </Button>
          </Nav.Item>
          <Nav.Item>
            <h5 className="text-center">
              {moment(this.props.currentView.payload, 'MM/DD/YYYY').format(
                'dddd, MMMM Do, YYYY'
              )}
            </h5>
          </Nav.Item>
          <Nav.Item>
            <Button
              variant="light"
              onClick={() =>
                this.props.goToDay(
                  moment(this.props.currentView.payload, 'MM/DD/YYYY')
                    .add(1, 'days')
                    .format('MM/DD/YYYY')
                )
              }>
              &gt;
            </Button>
          </Nav.Item>
        </Nav>

        <Table responsive>
          <thead>
            <tr className="text-center">
              <th>Reminders</th>
            </tr>
          </thead>
          <tbody className="scrollable-tbody">
            {this.renderReminders(reminders)}
          </tbody>
        </Table>
        <ConfirmationModal
          deleteAll={this.state.deleteAll}
          showConfirmationModal={this.state.showConfirmationModal}
          onCancel={() =>
            this.setState({
              showConfirmationModal: false,
              deleteAll: true,
              reminderToDelete: -1,
              selectedDate: '',
            })
          }
          onDeleteAll={() =>
            this.props.deleteReminders(this.state.selectedDate)
          }
          onDeleteOne={() =>
            this.props.deleteReminder(this.state.reminderToDelete)
          }
        />
        <Nav fill className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Button
              variant="secondary"
              className="add-reminder"
              onClick={this.props.goToCalendar}>
              Go Back to Calendar
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button
              variant="primary"
              className="add-reminder"
              onClick={this.props.openModal}>
              Add a Reminder
            </Button>
          </Nav.Item>
          {reminders.length > 0 && (
            <Nav.Item>
              <Button
                variant="danger"
                className="add-reminder"
                onClick={() => {
                  this.setState({
                    selectedDate: this.props.currentView.payload,
                    showConfirmationModal: true,
                    deleteAll: true,
                    reminderToDelete: -1,
                  });
                }}>
                Clear All Reminders
              </Button>
            </Nav.Item>
          )}
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reminders: state.reminders,
  currentView: state.currentView,
});

export default connect(
  mapStateToProps,
  {
    openModal,
    deleteReminders,
    deleteReminder,
    getReminder,
    goToDay,
    goToCalendar,
  }
)(DayView);
