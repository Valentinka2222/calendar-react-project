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

  isShowModal,
}) => {
  const handleClick = e => {
    console.log(dataDay);
    isShowModal();
    const time = Number(e.target.dataset.time);
    let createDateStartEvent =
      new Date().getFullYear() +
      '-' +
      formatMins(new Date().getMonth()) +
      '-' +
      formatMins(String(dataDay)) +
      'T' +
      formatMins(Number(time) + 1) +
      ':00';

    changeValue(createDateStartEvent);
    console.log(
      new Date().getFullYear() +
        '-' +
        formatMins(new Date().getMonth()) +
        '-' +
        formatMins(String(dataDay)) +
        'T' +
        formatMins(Number(time) + 1) +
        ':00',
    );

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
