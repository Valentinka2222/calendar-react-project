import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Hour from '../hour/Hour';

import './day.scss';

const Day = ({
  changeValue,
  setIsHiddenModal,
  isHiddenModal,
  dataDay,
  dayEvents,
  setUpdateEvents,
}) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  const startPosition =
    Number(moment().local().format('HH')) * 60 -
    Number(moment().local().format('HH')) +
    Number(moment().local().format('mm'));

  const [isClock, setIsClock] = useState(startPosition);

  useEffect(() => {
    const idTimmer = setInterval(() => {
      setIsClock(isClock => isClock + 1);
    }, 60000);
    return () => clearInterval(idTimmer);
  }, []);

  const elemRedLine = <div className="red-line" style={{ top: isClock + 'px' }} />;

  return (
    <div className="calendar__day" data-day={dataDay}>
      {Number(moment().local().format('DD')) === dataDay ? elemRedLine : null}
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(
          event =>
            Number(moment(event.dateFrom).format('HH')) === hour &&
            Number(moment(event.dateFrom).format('DD')) === dataDay,
        );

        return (
          <Hour
            setIsHiddenModal={setIsHiddenModal}
            isHiddenModal={isHiddenModal}
            changeValue={changeValue}
            dataDay={dataDay}
            setUpdateEvents={setUpdateEvents}
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            dayEvents={dayEvents}
          />
        );
      })}
    </div>
  );
};
Day.propTypes = {
  changeValue: PropTypes.func,
  setIsHiddenModal: PropTypes.func,
  isHiddenModal: PropTypes.bool,
  dataDay: PropTypes.number,
  dayEvents: PropTypes.array,
  setUpdateEvents: PropTypes.func,
};
Day.defaultProps = {
  hours: Array(24)
    .fill()
    .map((val, index) => index),
};

export default Day;
