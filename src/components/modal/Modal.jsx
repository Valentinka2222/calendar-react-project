import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fetchCreateEvent, fetchEvents } from '../../gateway/eventGateAway';
import { getEventList } from '../../gateway/eventGateAway.js';
import './modal.scss';

const Modal = ({ setIsHiddenModal, updatedEvent, setUpdatedEvent, setEvents, isHiddenModal }) => {
  const handleChange = event => {
    const { name, value } = event.target;
    const { date, startTime, endTime } = updatedEvent;
    let startTimeEvent;
    let endTimeEvent;
    if (event && name === 'startTime') {
      startTimeEvent = date + ' ' + event.target.value;
      endTimeEvent = date + ' ' + endTime;
    }
    if (event && name === 'endTime') {
      startTimeEvent = date + ' ' + startTime;
      endTimeEvent = date + ' ' + event.target.value;
    }
    setUpdatedEvent(prevState => ({
      ...prevState,
      [name]: value,
      dateFrom: startTimeEvent,
      dateTo: endTimeEvent,
    }));
  };
  useEffect(() => {
    getEventList().then(eventsList => {
      setEvents(eventsList);
    });
  }, []);
  const handleSubmit = (event, eventData) => {
    console.log(moment(eventData.dateFrom).format('DD'));
    if (
      eventData.startTime === eventData.endTime ||
      Number(eventData.endTime.slice(0, 2)) < Number(eventData.startTime.slice(0, 2))
    ) {
      alert('Please select another end time');
      return;
    } else if (
      moment(eventData.dateFrom).format('DD') !== moment(eventData.dateFrom).format('DD')
    ) {
      alert('The event must take place within one day');
      return;
    } else if (
      Number(eventData.endTime.slice(0, 2)) - Number(eventData.startTime.slice(0, 2)) >
      6
    ) {
      alert('The event must last more than 6 hours');
      return;
    }
    getEventList().then(eventsList => {
      const sameEvent = eventsList.some(
        el => String(moment(el.dateFrom)) === String(moment(eventData.dateFrom)),
      );
      console.log(sameEvent);
      if (sameEvent === true) {
        alert('You have event in this time!');
        return;
      } else {
        fetchCreateEvent(eventData).then(() => fetchEvents(setEvents));
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
