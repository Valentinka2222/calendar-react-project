import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

const Calendar = ({
  setIsHiddenModal,
  isHiddenModal,
  changeValue,
  weekDates,
  events,
  setUpdateEvents,
}) => {
  return (
    <section className="calendar">
      <Navigation navWeekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            setIsHiddenModal={setIsHiddenModal}
            isHiddenModal={isHiddenModal}
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
  isHiddenModal: PropTypes.bool,
  changeValue: PropTypes.func,
  weekDates: PropTypes.array,
  events: PropTypes.array,
  setUpdateEvents: PropTypes.func,
};

export default Calendar;
