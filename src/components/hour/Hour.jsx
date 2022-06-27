import React from 'react';
import moment from 'moment';
import { formatMins } from '../../utils/dateUtils';
import Event from '../event/Event';

const Hour = ({
  dataHour,
  hourEvents,
  setUpdateEvents,
  changeValue,
  dataDay,
  setIsHiddenModal,
  isHiddenModal,
}) => {
  const handleClick = e => {
    console.log(dataDay);
    setIsHiddenModal(true);

    const time = Number(e.target.dataset.time);
    let createDateStartEvent =
      new Date().toISOString().slice(0, 8) +
      formatMins(Number(dataDay)) +
      'T' +
      formatMins(Number(time) - 1) +
      ':00';
    console.log(time);
    changeValue(createDateStartEvent);
    console.log(createDateStartEvent);

    return createDateStartEvent;
  };

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1} onClick={handleClick}>
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = moment(dateFrom).format('HH:mm');
        const eventEnd = moment(dateTo).format('HH:mm');

        return (
          <Event
            setIsHiddenModal={setIsHiddenModal}
            isHiddenModal={isHiddenModal}
            setUpdateEvents={setUpdateEvents}
            key={id}
            hourEvents={hourEvents}
            height={Number(moment(dateFrom).format('mm')) - Number(moment(dateTo).format('mm'))}
            marginTop={moment(dateFrom).format('mm') + 'px'}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
          />
        );
      })}
    </div>
  );
};

export default Hour;
