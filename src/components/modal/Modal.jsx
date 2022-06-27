import React from 'react';
import PropTypes from 'prop-types';

import { fetchCreateEvent, fetchEvents } from '../../gateway/eventGateAway';

import './modal.scss';

const Modal = ({ updatedEvent, setEvent, setUpdateEvents, isHiddenModal, isShowModal }) => {
  const handleChange = event => {
    const { name, value } = event.target;
    const { date, startTime, endTime } = updatedEvent;
    const startTimeEvent = date + ' ' + startTime;
    const endTimeEvent = date + ' ' + endTime;

    setEvent(prevState => ({
      ...prevState,
      [name]: value,
      dateFrom: new Date(startTimeEvent),
      dateTo: new Date(endTimeEvent),
    }));
  };

  const handleSubmit = (event, eventData) => {
    event.preventDefault();

    fetchCreateEvent(eventData).then(() => fetchEvents(setUpdateEvents));

    event.target.reset();
  };

  const handleShowModal = e => {
    isShowModal(!isHiddenModal);
  };

  return (
    <div className={!isHiddenModal ? 'modal overlay hidden' : 'modal overlay'}>
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={handleShowModal}>
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
                value={updatedEvent.date}
                type="date"
                name="date"
                className="event-form__field"
              />
              <input
                onChange={handleChange}
                value={updatedEvent.startTime}
                type="time"
                step="900"
                name="startTime"
                className="event-form__field"
              />
              <span>-</span>
              <input
                onChange={handleChange}
                value={updatedEvent.endTime}
                type="time"
                step="900"
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
