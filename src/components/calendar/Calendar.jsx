import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

const Calendar = ({ setIsHiddenModal, changeValue, weekDates, events, setUpdateEvents }) => {
  return (
    <section className="calendar">
      <Navigation navWeekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            setIsHiddenModal={setIsHiddenModal}
            changeValue={changeValue}
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
  setIsHiddenModal: PropTypes.func,
  changeValue: PropTypes.func,
  weekDates: PropTypes.array,
  events: PropTypes.array,
  setUpdateEvents: PropTypes.func,
};

export default Calendar;
