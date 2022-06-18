import React from 'react';
import moment from 'moment';

import Event from '../event/Event';

const Hour = ({ dataHour, hourEvents }) => {
  if (!hourEvents) {
    return null;
  }

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = moment(dateFrom).format('HH:mm');
        const eventEnd = moment(dateTo).format('HH:mm');

        return (
          <Event
            key={id}
            hourEvents={hourEvents}
            height={
              Number(moment(dateFrom).format('mm')) + Number(moment(dateTo).format('mm')) + '%'
            }
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
