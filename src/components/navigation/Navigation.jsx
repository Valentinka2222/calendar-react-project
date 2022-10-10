import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { days } from '../../utils/dateUtils.js';

const Navigation = ({ navWeekDates }) => {
  const isCurrentDay = currentDay =>
    moment(currentDay).format('DD MM YYYY') === moment().format('DD MM YYYY');

  return (
    <header className="calendar__header">
      {navWeekDates.map(dayDate => (
        <div key={dayDate} className="calendar__day-label day-label">
          {!isCurrentDay(dayDate) ? (
            <>
              <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
              <span className="day-label__day-number">{dayDate.getDate()}</span>
            </>
          ) : (
            <>
              <span className="day-label__day-name" style={{ color: 'cornflowerblue' }}>
                {days[dayDate.getDay()]}
              </span>
              <span
                style={{
                  color: 'white',
                  backgroundColor: 'cornflowerblue',
                }}
                className="day-label__day-number"
              >
                {dayDate.getDate()}
              </span>
            </>
          )}
        </div>
      ))}
    </header>
  );
};
Navigation.propTypes = {
  navWeekDates: PropTypes.array,
};

export default Navigation;
