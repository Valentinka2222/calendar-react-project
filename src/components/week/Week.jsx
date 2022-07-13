import React from 'react';
import PropTypes from 'prop-types';

import Day from '../day/Day';

import './week.scss';

const Week = ({
  changeValue,
  setIsHiddenModal,
  isHiddenModal,
  weekDates,
  events,
  setUpdateEvents,
}) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

        const dayEvents = events.sort(event => event.dateFrom > dayStart && event.dateTo < dayEnd);

        return (
          <Day
            setIsHiddenModal={setIsHiddenModal}
            isHiddenModal={isHiddenModal}
            changeValue={changeValue}
            setUpdateEvents={setUpdateEvents}
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            weekDates={weekDates}
          />
        );
      })}
    </div>
  );
};
Week.propTypes = {
  changeValue: PropTypes.func,
  setIsHiddenModal: PropTypes.func,
  isHiddenModal: PropTypes.bool,
  weekDates: PropTypes.array,
  events: PropTypes.array,
  setUpdateEvents: PropTypes.func,
};

export default Week;
