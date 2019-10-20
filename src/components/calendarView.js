import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions/modalActions';
import { Button } from 'react-bootstrap'
import moment from 'moment';
import Calendar from 'react-calendar';

class CalendarView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    // this.props.fetchCities();
  }

  render() {
    return (
      <Fragment>
        <Calendar
          calendarType="US"
          minDetail="month"
          tileDisabled={() => true}
          tileContent={({ date, view }) => {
            if(view === 'month') {
              const formattedDate = moment(date).format('MM/DD/YYYY');
              const dateReminders = this.props.reminders
                .filter(reminder => reminder.date === formattedDate)
                .map(reminder => 
                  <div 
                    key={reminder.comment} 
                    style={
                      {
                        background: reminder.reminderColor,
                        borderColor: reminder.reminderColor
                      }
                    }
                    className="btn btn-primary reminder-element">
                    {reminder.comment}
                  </div>);
              return (
                <div className="reminder-list">
                  {dateReminders}
                </div>
              );
            }
          }}
        ></Calendar>
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

export default connect(mapStateToProps, { openModal })(CalendarView);
