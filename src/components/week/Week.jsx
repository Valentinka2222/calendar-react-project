import React from 'react';
import Day from '../day/Day';
import PropTypes from 'prop-types';

import './week.scss';

const Week = ({
  IsClickCreateBtn,
  setsClickCreateBtn,
  createDefaultDate,
  weekDates,
  events,
  setUpdateEvents,
  isShowModal,
}) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

        const dayEvents = events.sort(event => event.dateFrom > dayStart && event.dateTo < dayEnd);

        return (
          <Day
            isShowModal={isShowModal}
            createDefaultDate={createDefaultDate}
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
  dayEvents: PropTypes.array,
  dayEnd: PropTypes.number,
};

export default Week;
