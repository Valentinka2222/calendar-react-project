import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import { getEventList } from '../../gateway/eventGateAway';

import './calendar.scss';

const Calendar = ({ weekDates }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventList().then(eventsList => {
      setEvents(eventsList);
    });
  }, []);

  return (
    <section className="calendar">
      <Navigation navWeekDates={weekDates} />

      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week weekDates={weekDates} events={events} />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  getEventList: PropTypes.func,
  events: PropTypes.array,
};

export default Calendar;
