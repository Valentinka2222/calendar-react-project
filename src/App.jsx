import React, { useState } from 'react';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import PropTypes from 'prop-types';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isShowModal, setIsShowModal] = useState(true);
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
      {isShowModal && <Modal />}
      <Header
        handleNextWeek={handleNextWeek}
        handlePreviousWeek={handlePreviousWeek}
        handleCurrentWeek={handleCurrentWeek}
      />
      <Calendar weekDates={weekDates} />
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
