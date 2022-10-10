import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { formatMins } from '../../utils/dateUtils';

import Event from '../event/Event';

const Hour = ({
  dataHour,
  hourEvents,
  setEvents,
  changeValue,
  dataDay,
  setIsHiddenModal,
  isHiddenModal,
}) => {
  const handleClick = e => {
    setIsHiddenModal(true);

    const createDateStartEvent =
      moment().format('YYYY-MM-') +
      formatMins(Number(dataDay)) +
      ' ' +
      formatMins(Number(e.target.dataset.time) - 1) +
      ':00';

    changeValue(createDateStartEvent);
    return createDateStartEvent;
  };

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1} onClick={handleClick}>
      {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
        return (
          <Event
            setIsHiddenModal={setIsHiddenModal}
            isHiddenModal={isHiddenModal}
            setEvents={setEvents}
            key={id}
            hourEvents={hourEvents}
            height={Number(moment(dateFrom).format('mm')) - Number(moment(dateTo).format('mm'))}
            marginTop={moment(dateFrom).format('mm') + 'px'}
            time={`${moment(dateFrom).format('HH:mm')} - ${moment(dateTo).format('HH:mm')}`}
            title={title}
            description={description}
          />
        );
      })}
    </div>
  );
};
Hour.propTypes = {
  dataHour: PropTypes.number,
  setUpdateEvent: PropTypes.func,
  changeValue: PropTypes.func,
  dataDay: PropTypes.number,
  hourEvents: PropTypes.array,
  changeValue: PropTypes.func,
  setIsHiddenModal: PropTypes.func,
};

export default Hour;
