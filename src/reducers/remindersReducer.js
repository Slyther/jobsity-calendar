import { FETCH_WEATHER, NEW_REMINDER, EDIT_REMINDER, DELETE_REMINDERS, DELETE_REMINDER } from '../actions/types';
import moment from 'moment';

const initialState = [
    {
      date: '10/21/2019',
      time: '12:00 AM',
      city: 'Hurzuf, UA',
      cityId: 707860,
      title: 'asd',
      reminderId: 0,
      reminderColor: '#007bff',
      forecast: [
        {
          dt: 1571626800,
          main: {
            temp: 11.83,
            temp_min: 11.83,
            temp_max: 11.83,
            pressure: 1022.97,
            sea_level: 1022.97,
            grnd_level: 952.2,
            humidity: 87,
            temp_kf: 0
          },
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
              icon: '01n'
            }
          ],
          clouds: {
            all: 0
          },
          wind: {
            speed: 1.36,
            deg: 16.189
          },
          sys: {
            pod: 'n'
          },
          dt_txt: '2019-10-21 03:00:00'
        },
        {
          dt: 1571637600,
          main: {
            temp: 15.64,
            temp_min: 15.64,
            temp_max: 15.64,
            pressure: 1023.26,
            sea_level: 1023.26,
            grnd_level: 952.52,
            humidity: 67,
            temp_kf: 0
          },
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
              icon: '01d'
            }
          ],
          clouds: {
            all: 0
          },
          wind: {
            speed: 1.02,
            deg: 47.265
          },
          sys: {
            pod: 'd'
          },
          dt_txt: '2019-10-21 06:00:00'
        },
        {
          dt: 1571648400,
          main: {
            temp: 19.9,
            temp_min: 19.9,
            temp_max: 19.9,
            pressure: 1023.15,
            sea_level: 1023.15,
            grnd_level: 952.48,
            humidity: 50,
            temp_kf: 0
          },
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
              icon: '01d'
            }
          ],
          clouds: {
            all: 0
          },
          wind: {
            speed: 0.98,
            deg: 120.202
          },
          sys: {
            pod: 'd'
          },
          dt_txt: '2019-10-21 09:00:00'
        },
        {
          dt: 1571659200,
          main: {
            temp: 20.35,
            temp_min: 20.35,
            temp_max: 20.35,
            pressure: 1022.51,
            sea_level: 1022.51,
            grnd_level: 951.86,
            humidity: 47,
            temp_kf: 0
          },
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
              icon: '01d'
            }
          ],
          clouds: {
            all: 0
          },
          wind: {
            speed: 0.54,
            deg: 250.161
          },
          sys: {
            pod: 'd'
          },
          dt_txt: '2019-10-21 12:00:00'
        },
        {
          dt: 1571670000,
          main: {
            temp: 15.25,
            temp_min: 15.25,
            temp_max: 15.25,
            pressure: 1022.07,
            sea_level: 1022.07,
            grnd_level: 951.39,
            humidity: 69,
            temp_kf: 0
          },
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
              icon: '01n'
            }
          ],
          clouds: {
            all: 0
          },
          wind: {
            speed: 0.75,
            deg: 139.63
          },
          sys: {
            pod: 'n'
          },
          dt_txt: '2019-10-21 15:00:00'
        },
        {
          dt: 1571680800,
          main: {
            temp: 13.95,
            temp_min: 13.95,
            temp_max: 13.95,
            pressure: 1022,
            sea_level: 1022,
            grnd_level: 951.25,
            humidity: 57,
            temp_kf: 0
          },
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
              icon: '01n'
            }
          ],
          clouds: {
            all: 0
          },
          wind: {
            speed: 1.91,
            deg: 77.8
          },
          sys: {
            pod: 'n'
          },
          dt_txt: '2019-10-21 18:00:00'
        },
        {
          dt: 1571691600,
          main: {
            temp: 12.96,
            temp_min: 12.96,
            temp_max: 12.96,
            pressure: 1022.16,
            sea_level: 1022.16,
            grnd_level: 951.54,
            humidity: 46,
            temp_kf: 0
          },
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
              icon: '01n'
            }
          ],
          clouds: {
            all: 0
          },
          wind: {
            speed: 2.31,
            deg: 45
          },
          sys: {
            pod: 'n'
          },
          dt_txt: '2019-10-21 21:00:00'
        }
      ]
    }
  ];

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_WEATHER:
            let remindersWithWeatherData = state.map(reminder => {
                if(reminder.cityId === action.payload.city.id){
                    reminder.forecast = action.payload.list.filter((prediction) => {
                        return moment(reminder.date, 'MM/DD/YYYY').diff(moment(prediction.dt_txt).startOf('day')) === 0
                    });
                }
                return reminder;
            });
            return [...remindersWithWeatherData];
        case NEW_REMINDER:
            return [...state, {...action.payload, reminderId: state.length}];
        case DELETE_REMINDERS:
            return state.filter(reminder => reminder.date !== action.payload);
        case DELETE_REMINDER:
            return state.filter(reminder => reminder.reminderId !== action.payload);
        case EDIT_REMINDER:
            let filteredReminders = state.filter(reminder => reminder.reminderId !== action.payload.reminderId);
            return [...filteredReminders, action.payload]
        default:
            return state;
    }
}