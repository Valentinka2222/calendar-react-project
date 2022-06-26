import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

const Calendar = ({
  setOnclick,
  isShowModal,
  createDefaultDate,
  weekDates,
  events,
  setUpdateEvents,
}) => {
  const handleClick = () => {
    setOnclick(false);
  };
  return (
    <section className="calendar" onClick={handleClick}>
      <Navigation navWeekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            isShowModal={isShowModal}
            createDefaultDate={createDefaultDate}
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
