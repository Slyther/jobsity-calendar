## Jobsity Calendar Challenge

A cross-browser, mobile-friendly calendar where you can add reminders.

### Stack

* The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* State management was done with [Redux](https://github.com/reduxjs/redux) and [React Redux](https://github.com/reduxjs/react-redux).
* General component styling and structuring was done with the help of [React-Boostrap](https://github.com/react-bootstrap/react-bootstrap).
* Calendar logic was done by implementing and altering the rendering of [React-Calendar](https://github.com/wojtekmaj/react-calendar#readme).
* Minor color swapping logic for text visibility was implemented using [TinyColor](https://github.com/bgrins/TinyColor).
* Unit Testing is being done with [Jest](https://github.com/facebook/jest) and [Enzyme](https://github.com/airbnb/enzyme).

Form Components:
* [React Color](https://github.com/casesandberg/react-color) for the color picker.
* [React Date Picker](https://github.com/Hacker0x01/react-datepicker) for the datepicker.
* [TimePicker](https://github.com/react-component/time-picker) for the  time picker.
* [react-dropdown-select](https://github.com/sanusart/react-dropdown-select#readme) for the city autosuggest, along with [React Virtualized](https://github.com/bvaughn/react-virtualized) for the virtualization of the over 160 thousand cities.

## All mandatory features, as well as the bonus tasks, were completed.

In the project directory, you can run:

### `yarn start`

Runs the app.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### Layout

The following shows the Calendar View of the app. Reminders can be added, reminders for a given date can be cleared, and dates can be clicked on to go to their respective day view. <br />
If there are more reminders than can be shown in any given date, a custom tile will be shown instead, signaling that more reminders not currently visible exist.

<img src="https://i.ibb.co/kHwSTkf/Screenshot-2019-10-21-React-App.png" alt="Screenshot-2019-10-21-React-App">

The following shows the ReminderForm component, in its reminder creation mode. A color can be picked for the reminder tag, as well as a title, date, and time. <br />
The city can be searched through text and selected from the given options, but it has to be a city selected from the list. <br />
Only the city and title fields are validated to be required, since the time and date fields have default values.

<img src="https://i.ibb.co/k6s27LT/Screenshot-2019-10-21-React-App-3.png" alt="Screenshot-2019-10-21-React-App-3">

The following shows the Day View of the app. Reminders are shown in full detail within a scrollable list, showing the weather of the date and city selected for the reminder. <br />
Past reminders don't have weather info, and current day reminders only have one weather item. <br />
Reminders can be added, edited, and deleted one by one or by clearing the schedule for the entire day.

<img src="https://i.ibb.co/VJhCkQn/Screenshot-2019-10-21-React-App-1.png" alt="Screenshot-2019-10-21-React-App-1">

<br />

<img src="https://i.ibb.co/ckyXv5W/Screenshot-2019-10-21-React-App-2.png" alt="Screenshot-2019-10-21-React-App-2">

The following shows the ReminderForm component, in its edit reminder mode. All information can be modified. The same validations from the creation mode apply.

<img src="https://i.ibb.co/6ZkK98S/Screenshot-2019-10-21-React-App-4.png" alt="Screenshot-2019-10-21-React-App-4">