import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'react-bootstrap';
import moment from 'moment';
import tinycolor from 'tinycolor2';

const Reminder = (props) => {
  const cardStyles = {
    background: props.reminder.reminderColor,
    color:
      tinycolor(props.reminder.reminderColor).getBrightness() < 128
        ? 'white'
        : 'black',
  };
  let styledWeather = props.reminder.forecast.map((x) => {
    return (
      <Col xs={3} key={`weatherforecast_${x.dt}`} className="forecast-item">
        <div className="forecast-time text-center">
          {moment(x.dt_txt).format('h:mm A')}
        </div>
        <Row>
          <Col xs={6}>
            <img
              id="wicon"
              className="weather-icon"
              src={`http://openweathermap.org/img/w/${x.weather[0].icon}.png`}
              alt="Weather icon"
            />
          </Col>
          <Col xs={6}>
            <Row>
              <div className="forecast-description">{x.weather[0].main}</div>
            </Row>
            <Row>
              <div className="main-temp">
                {x.main.temp}
                <sup>&deg;</sup>C
              </div>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  });
  return (
    <tr>
      <td>
        <div className="reminder-dayview-element" style={cardStyles}>
          <Row className="text-center">
            <Col xs={4}>Time: {props.reminder.time}</Col>
            <Col xs={4}>Title: {props.reminder.title}</Col>
            <Col xs={4}>City: {props.reminder.city}</Col>
          </Row>
          <Row>
            <Col xs={11} sm={12}>
              <Row>{styledWeather}</Row>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 2, offset: 6 }} sm={{ span: 1, offset: 8 }}>
              <Button variant="primary bordered" onClick={props.onEdit}>
                <span className="far fa-edit"></span>
              </Button>
            </Col>
            <Col xs={{ span: 2, offset: 1 }} sm={{ span: 1, offset: 1 }}>
              <Button variant="danger bordered" onClick={props.onDelete}>
                <span className="far fa-trash-alt"></span>
              </Button>
            </Col>
          </Row>
        </div>
      </td>
    </tr>
  );
};

Reminder.propTypes = {
  reminder: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Reminder;
