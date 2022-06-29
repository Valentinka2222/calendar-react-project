import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { deleteEvent, fetchEvents } from '../../gateway/eventGateAway';

import './event.scss';
import '../../common.scss';

const Event = ({
  setIsHiddenModal,
  height,
  marginTop,
  title,
  time,
  hourEvents,
  setUpdateEvents,
}) => {
  let newHeight;

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: '48%',
    marginTop: '20%',
    paddingLeft: '25%',
  };
  if (height < Number('15%')) {
    newHeight = '15%';
    height = newHeight;
    return newHeight;
  }
  const eventStyle = {
    height: newHeight,
    marginTop,
  };
  const [isShowDeleteEvent, setIsShowDeleteEvent] = useState(false);

  const handleClick = e => {
    e.stopPropagation();
    setIsHiddenModal(false);

    setIsShowDeleteEvent(!isShowDeleteEvent);
  };

  const handleDeleteEvent = e => {
    e.stopPropagation();

    setIsHiddenModal(false);

    return hourEvents.map(({ id, date, dateFrom }) => {
      let start = moment().format('YYYY/MM/DD HH:mm');
      let diff = moment
        .duration(moment(dateFrom, 'YYYY/MM/DD HH:mm').diff(moment(start, 'YYYY/MM/DD HH:mm')))
        .asHours();

      if (diff <= 0.25 && diff > 0 && moment().format('YYYY-MM-DD') === date) {
        alert('You can not delete event earlier than 15 minutes');
        return;
      } else {
        deleteEvent(id).then(() => fetchEvents(setUpdateEvents));
      }
    });
  };

  return (
    <div style={eventStyle} className="event" onClick={handleClick}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {isShowDeleteEvent ? (
        <button onClick={handleDeleteEvent} className=" delete-event-btn" style={style}>
          <i className="fas fa-trash-alt"></i>
          <span style={{ margin: 'auto' }}>Delete event</span>
        </button>
      ) : null}
    </div>
  );
};
Event.propTypes = {
  newHeight: PropTypes.string,
  eventStyle: PropTypes.object,
  handleClick: PropTypes.func,
  handleDeleteEvent: PropTypes.func,
};
Event.defaultProps = {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: '48%',
    marginTop: '20%',
    paddingLeft: '25%',
  },
};

export default Event;
