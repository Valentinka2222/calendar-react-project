import React from 'react';
import moment from 'moment';
import { formatMins } from '../../utils/dateUtils';
import Event from '../event/Event';

const Hour = ({
  dataHour,
  hourEvents,
  setUpdateEvents,

  dataDay,
  createDefaultDate,
  isShowModal,
}) => {
  const handleClick = e => {
    isShowModal();
    console.log(e.target.dataset.time);
    const time = Number(e.target.dataset.time) + 1;
    let createDateStartEvent =
      new Date().toISOString().slice(0, 8) +
      String(dataDay) +
      'T' +
      formatMins(Number(time) + 1) +
      ':00';
    let createDateEndEvent =
      new Date().toISOString().slice(0, 8) +
      String(dataDay) +
      'T' +
      formatMins(Number(time) + 2) +
      ':00';
    createDefaultDate(createDateStartEvent, createDateEndEvent);

    console.log(dataDay);
    console.log(time);
    console.log(createDateEndEvent);
    return createDateStartEvent;
  };

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1} onClick={handleClick}>
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = moment(dateFrom).format('HH:mm');
        const eventEnd = moment(dateTo).format('HH:mm');

        return (
          <Event
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
