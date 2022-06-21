import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal';
import { getEventList } from './gateway/eventGateAway';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [events, setEvents] = useState([]);
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isHiddenModal, setIsHiddenModal] = useState(false);

  const isShowModal = () => {
    setIsHiddenModal(!isHiddenModal);
  };
  useEffect(() => {
    getEventList().then(eventsList => {
      setEvents(eventsList);
    });
  }, []);

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
      <Modal setUpdateEvents={setEvents} isShowModal={isShowModal} isHiddenModal={isHiddenModal} />
      <Calendar weekDates={weekDates} events={events} setUpdateEvents={setEvents} />
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
