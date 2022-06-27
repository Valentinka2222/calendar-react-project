import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal';
import { formatMins } from './utils/dateUtils.js';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const currentDate = new Date();
  const [events, setEvents] = useState([]);
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isHiddenModal, setIsHiddenModal] = useState(false);
  const [updatedEvent, setEvent] = useState({
    date: currentDate.toISOString().slice(0, 10),
    startTime: currentDate.getHours() + ':' + formatMins(currentDate.getMinutes()),
    endTime: currentDate.getHours() + 1 + ':' + formatMins(currentDate.getMinutes()),
    dateFrom: '',
    dateTo: '',
  });
  const isShowModal = () => {
    setIsHiddenModal(!isHiddenModal);
  };
  const changeValue = newDate => {
    setEvent({
      date: new Date(newDate).toISOString().slice(0, 10),
      startTime:
        formatMins(new Date(newDate).getHours()) + ':' + formatMins(new Date(newDate).getMinutes()),
      endTime:
        formatMins(new Date(newDate).getHours() + 1) +
        ':' +
        formatMins(new Date(newDate).getMinutes()),
    });
  };

  const handleCurrentWeek = () => {
    setWeekStartDate(weekStartDate => (weekStartDate = new Date()));
  };
  const handleNextWeek = () => {
    setWeekStartDate(
      weekStartDate =>
        (weekStartDate = new Date(weekStartDate.setDate(weekStartDate.getDate() + 7))),
    );
  };
  const handlePreviousWeek = () => {
    setWeekStartDate(
      weekStartDate =>
        (weekStartDate = new Date(weekStartDate.setDate(weekStartDate.getDate() - 7))),
    );
  };
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  return (
    <>
      <Header
        isShowModal={isShowModal}
        handleNextWeek={handleNextWeek}
        handlePreviousWeek={handlePreviousWeek}
        handleCurrentWeek={handleCurrentWeek}
      />
      <Modal
        setEvent={setEvent}
        updatedEvent={updatedEvent}
        getOnclick={getOnclick}
        setUpdateEvents={setEvents}
        isShowModal={isShowModal}
        isHiddenModal={isHiddenModal}
      />
      <Calendar
        changeValue={changeValue}
        isShowModal={isShowModal}
        weekDates={weekDates}
        events={events}
        setUpdateEvents={setEvents}
      />
    </>
  );
};
App.propTypes = {
  handleCurrentWeek: PropTypes.func,
  handlePreviousWeek: PropTypes.func,
  handlePreviousWeek: PropTypes.func,
  weekDates: PropTypes.array,
};
App.defaultProps = {
  weekStartDate: new Date(),
};

export default App;
