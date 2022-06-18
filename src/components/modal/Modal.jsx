import React, { Component } from 'react';

import { fetchCreateEvent } from '../../gateway/eventGateAway';
import './modal.scss';
import PropTypes from 'prop-types';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.obj = {};
    this.state = {
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
    };
  }
  createEvent = formData => {
    return fetchCreateEvent(formData);
  };

  handleChange = event => {
    const { name, value } = event.target;
    const startTimeEvent = this.state.date + ' ' + this.state.startTime;
    const endTimeEvent = this.state.date + ' ' + this.state.endTime;
    this.setState({
      [name]: value,
      dateTo: new Date(endTimeEvent),
      dateFrom: new Date(startTimeEvent),
    });
  };

  handleSubmit = (event, eventData) => {
    event.preventDefault();

    this.setState({
      dateFrom: this.state.startTime,
    });

    this.createEvent(eventData);

    event.target.reset();
  };

  handleClick = () => {
    this.setState({ isHiddenEvent: !this.state.isHiddenEvent });
  };

  render() {
    if (this.state.isHiddenEvent) {
      return null;
    }

    return (
      <div className="modal overlay">
        <div className="modal__content">
          <div className="create-event">
            <button className="create-event__close-btn" onClick={this.handleClick}>
              +
            </button>
            <form className="event-form" onSubmit={event => this.handleSubmit(event, this.state)}>
              <input
                type="text"
                onChange={this.handleChange}
                name="title"
                placeholder="Title"
                className="event-form__field"
              />
              <div className="event-form__time">
                <input
                  onChange={this.handleChange}
                  type="date"
                  name="date"
                  className="event-form__field"
                />
                <input
                  onChange={this.handleChange}
                  type="time"
                  name="startTime"
                  className="event-form__field"
                />
                <span>-</span>
                <input
                  onChange={this.handleChange}
                  type="time"
                  name="endTime"
                  className="event-form__field"
                />
              </div>
              <textarea
                onChange={this.handleChange}
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
  }
}

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
