import React, { Component, useState } from 'react';

import { fetchCreateEvent, getEventList } from '../../gateway/eventGateAway';
import './modal.scss';
import PropTypes from 'prop-types';

const Modal = () => {
  const [updatedEvent, setUpdatedEvent] = useState({
    date: '',
    startTime: '',
    endTime: '',
    dateFrom: '',
    dateTo: '',
  });

  const [isHidden, setIsHidden] = useState(false);
  const handleChange = event => {
    const { name, value } = event.target;
    const { date, startTime, endTime } = updatedEvent;
    const startTimeEvent = date + ' ' + startTime;
    const endTimeEvent = date + ' ' + endTime;

    setUpdatedEvent(prevState => ({
      ...prevState,
      [name]: value,
      dateFrom: new Date(startTimeEvent),
      dateTo: new Date(endTimeEvent),
    }));
  };

  const handleSubmit = (event, eventData) => {
    event.preventDefault();

    fetchCreateEvent(eventData);

    event.target.reset();
  };

  const handleClick = () => {
    setIsHidden(!isHidden);
  };
  console.log(updatedEvent);

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={handleClick}>
            +
          </button>
          <form className="event-form" onSubmit={event => handleSubmit(event, updatedEvent)}>
            <input
              type="text"
              onChange={handleChange}
              name="title"
              placeholder="Title"
              className="event-form__field"
            />
            <div className="event-form__time">
              <input
                onChange={handleChange}
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                name="date"
                className="event-form__field"
              />
              <input
                onChange={handleChange}
                type="time"
                defaultValue={new Date().toISOString().slice(11, 16)}
                name="startTime"
                className="event-form__field"
              />
              <span>-</span>
              <input
                onChange={handleChange}
                type="time"
                defaultValue={new Date().toISOString().slice(11, 16)}
                name="endTime"
                className="event-form__field"
              />
            </div>
            <textarea
              onChange={handleChange}
              name="description"
              placeholder="Description"
              className="event-form__field"
            />
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  dateTo: PropTypes.string,
  dateFrom: PropTypes.string,
  startTimeEvent: PropTypes.string,
  endTimeEvent: PropTypes.string,
  createEvent: PropTypes.func,
  fetchCreateEvent: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleClick: PropTypes.func,
};

export default Modal;
