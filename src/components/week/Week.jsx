import React from 'react';
import PropTypes from 'prop-types';
import Day from '../day/Day';
import './week.scss';

const Week = ({ changeValue, setIsHiddenModal, weekDates, events, setEvents }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

        const dayEvents = events.sort(event => event.dateFrom > dayStart && event.dateTo < dayEnd);

        return (
          <Day
            setIsHiddenModal={setIsHiddenModal}
            changeValue={changeValue}
            setEvents={setEvents}
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
  weekDates: PropTypes.array,
  events: PropTypes.array,
  setEvents: PropTypes.func,
};

export default Week;
