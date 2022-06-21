import React, { useState } from 'react';
import { deleteEvent, fetchEvents } from '../../gateway/eventGateAway';
import './event.scss';
import '../../common.scss';
import PropTypes from 'prop-types';

const Event = ({ height, marginTop, title, time, hourEvents, setUpdateEvents }) => {
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

  const handleClick = () => {
    setIsShowDeleteEvent(!isShowDeleteEvent);
  };

  const handleDeleteEvent = () =>
    hourEvents.map(({ id }) => deleteEvent(id).then(() => fetchEvents(setUpdateEvents)));

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
