import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [events, setEvents] = useState([]);
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isHiddenModal, setIsHiddenModal] = useState(false);
  const [defaultDate, setDefaultDate] = useState(new Date());
  const [defaultEndEventTime, setDefaultEndEventTime] = useState(new Date());
  const [getOnclick, setOnclick] = useState(true);
  const isShowModal = () => {
    setIsHiddenModal(!isHiddenModal);
  };

  const createDefaultDate = (date, time) => {
    setDefaultDate(new Date(date));
    setDefaultEndEventTime(new Date(time));
    console.log(date);
    console.log(new Date(date));
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
        getOnclick={getOnclick}
        setOnclick={setOnclick}
        isShowModal={isShowModal}
        handleNextWeek={handleNextWeek}
        handlePreviousWeek={handlePreviousWeek}
        handleCurrentWeek={handleCurrentWeek}
      />
      <Modal
        getOnclick={getOnclick}
        defaultEndEventTime={defaultEndEventTime}
        defaultDate={defaultDate}
        setUpdateEvents={setEvents}
        isShowModal={isShowModal}
        isHiddenModal={isHiddenModal}
      />
      <Calendar
        getOnclick={getOnclick}
        setOnclick={setOnclick}
        isShowModal={isShowModal}
        createDefaultDate={createDefaultDate}
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
