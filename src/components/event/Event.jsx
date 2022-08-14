import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { deleteEvent, getEventList } from '../../gateway/eventGateAway';

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
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: '48%',
    marginTop: '20%',
    paddingLeft: '25%',
  };
  const [isShowDeleteEvent, setIsShowDeleteEvent] = useState(false);
  const eventStyle = {
    height: height,
    marginTop,
  };
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
        deleteEvent(id).then(() => getEventList().then(eventsList => setUpdateEvents(eventsList)));
      }
    });
  };

  return (
    <div className={`event ${eventStyle}`} onClick={handleClick}>
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
  setIsHiddenModal: PropTypes.func,
  height: PropTypes.number,
  marginTop: PropTypes.string,
  title: PropTypes.string,
  time: PropTypes.string,
  hourEvents: PropTypes.array,
  setUpdateEvents: PropTypes.func,
};

export default Event;
