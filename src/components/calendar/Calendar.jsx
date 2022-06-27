import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

const Calendar = ({ changeValue, isShowModal, weekDates, events, setUpdateEvents }) => {
  return (
    <section className="calendar">
      <Navigation navWeekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            changeValue={changeValue}
            isShowModal={isShowModal}
            weekDates={weekDates}
            events={events}
            setUpdateEvents={setUpdateEvents}
          />
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
