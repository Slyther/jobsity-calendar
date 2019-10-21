import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modalActions';
import { deleteReminders } from '../../actions/reminderActions';
import { goToDay } from '../../actions/currentViewActions';
import { Button, Col, Row } from 'react-bootstrap';
import ConfirmationModal from '../ConfirmationModal';
import moment from 'moment';
import Calendar from 'react-calendar';
import tinycolor from 'tinycolor2';
import './CalendarView.scss';

class CalendarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmationModal: false,
      selectedDate: '',
    };
  }

  renderCustomTileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = moment(date).format('MM/DD/YYYY');
      let dateReminders = this.props.reminders
        .filter((reminder) => reminder.date === formattedDate)
        .sort((a, b) => {
          return moment
            .utc(a.time, 'h:mm A')
            .diff(moment.utc(b.time, 'h:mm A'));
        })
        .map((reminder) => (
          <div
            key={reminder.title}
            style={{
              background: reminder.reminderColor,
              borderColor: reminder.reminderColor,
              color:
                tinycolor(reminder.reminderColor).getBrightness() < 128
                  ? 'white'
                  : 'black',
            }}
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
        ));
      if (dateReminders.length >= 4) {
        let remainingLength = dateReminders.length - 3;
        dateReminders = [
          ...dateReminders.slice(0, 3),
          <div key="remainder" className="btn btn-secondary reminder-element">
            And {remainingLength} more...
          </div>,
        ];
      }
      return (
        <Fragment>
          {moment(date).diff(moment().startOf('day')) === 0 && (
            <div className="today" />
          )}
          {dateReminders.length > 0 && (
            <div
              className="btn btn-secondary delete-date-reminders"
              onClick={(e) => {
                e.stopPropagation();
                this.setState({
                  selectedDate: formattedDate,
                  showConfirmationModal: true,
                });
              }}></div>
          )}
          <div className="reminder-list">{dateReminders}</div>
        </Fragment>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <Calendar
          calendarType="US"
          minDetail="month"
          onChange={(date) =>
            this.props.goToDay(moment(date).format('MM/DD/YYYY'))
          }
          tileContent={({ date, view }) =>
            this.renderCustomTileContent({ date, view })
          }
        />
        <ConfirmationModal
          deleteAll={true}
          showConfirmationModal={this.state.showConfirmationModal}
          onCancel={() =>
            this.setState({ showConfirmationModal: false, selectedDate: '' })
          }
          onDeleteAll={() =>
            this.props.deleteReminders(this.state.selectedDate)
          }
          onDeleteOne={(f) => f}
        />
        <Button
          variant="primary"
          className="add-reminder"
          onClick={this.props.openModal}>
          Add a Reminder
        </Button>
      </Fragment>
    );
  }
}

CalendarView.propTypes = {
  reminders: PropTypes.array,
  openModal: PropTypes.func.isRequired,
  deleteReminders: PropTypes.func.isRequired,
  goToDay: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  reminders: state.reminders.reminders,
});

export default connect(
  mapStateToProps,
  { openModal, deleteReminders, goToDay }
)(CalendarView);
