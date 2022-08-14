import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { сreateEvent } from '../../gateway/eventGateAway';
import { getEventList } from '../../gateway/eventGateAway.js';

import './modal.scss';

const Modal = ({ setIsHiddenModal, updatedEvent, setUpdatedEvent, setEvents, isHiddenModal }) => {
  const handleChange = event => {
    const { name, value } = event.target;
    const { date, startTime, endTime } = updatedEvent;
    let startTimeEvent;
    let endTimeEvent;

    if (event && name === 'startTime') {
      startTimeEvent = date + ' ' + value;
      endTimeEvent = date + ' ' + endTime;
    }
    if (event && name === 'endTime') {
      startTimeEvent = date + ' ' + startTime;
      console.log(startTime);
      endTimeEvent = date + ' ' + value;
    }
    setUpdatedEvent(prevState => ({
      ...prevState,
      [name]: value,
      dateFrom: startTimeEvent,
      dateTo: endTimeEvent,
    }));
  };
  useEffect(() => {
    getEventList().then(eventsList => setEvents(eventsList));
  }, []);
  const handleSubmit = (event, eventData) => {
    const { endTime, startTime, dateFrom } = eventData;

    if (String(endTime.slice(3, 5)) !== '00' && Number(endTime.slice(3, 5)) % 15 !== 0) {
      alert('Time must be a multiple of 15 minutes');
      return;
    } else if (Number(startTime.slice(3, 5)) % 15 !== 0 && String(startTime.slice(3, 5)) !== '00') {
      alert('Time must be a multiple of 15 minutes');
      return;
    } else if (
      startTime === endTime ||
      Number(endTime.slice(0, 2)) < Number(startTime.slice(0, 2))
    ) {
      alert('Please select another end time');
      return;
    } else if (moment(dateFrom).format('DD') !== moment(dateFrom).format('DD')) {
      alert('The event must take place within one day');
      return;
    } else if (Number(endTime.slice(0, 2)) - Number(startTime.slice(0, 2)) > 6) {
      alert('The event must last more than 6 hours');
      return;
    }
    getEventList().then(eventsList => {
      const sameEvent = eventsList.some(el => el.dateFrom === dateFrom);
      if (sameEvent === true) {
        alert('You have event in this time!');
        return;
      } else {
        сreateEvent(eventData).then(() => getEventList().then(eventsList => setEvents(eventsList)));
      }
    });
    event.preventDefault();
    event.target.reset();
  };

  const handleShowModal = () => {
    setIsHiddenModal(false);
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
                step="1"
                onChange={handleChange}
                value={updatedEvent.date}
                type="date"
                name="date"
                className="event-form__field"
              />
              <input
                type="time"
                onChange={handleChange}
                value={updatedEvent.startTime}
                name="startTime"
                className="event-form__field"
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                onChange={handleChange}
                value={updatedEvent.endTime}
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
  setIsHiddenModal: PropTypes.func,
  updatedEvent: PropTypes.object,
  setUpdatedEvent: PropTypes.func,
  setEvents: PropTypes.func,
  isHiddenModal: PropTypes.bool,
};

export default Modal;
