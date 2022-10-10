import React, { useState } from 'react';
import moment from 'moment';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [events, setEvents] = useState([]);
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isHiddenModal, setIsHiddenModal] = useState();
  const [updatedEvent, setUpdatedEvent] = useState({
    date: '',
    startTime: '',
    endTime: '',
    dateFrom: '',
    dateTo: '',
    title: '',
    description: '',
  });
  const isShowModal = () => {
    setIsHiddenModal(!isHiddenModal);
    if (updatedEvent) {
      setUpdatedEvent(prevState => ({
        ...prevState,
        title: '',
        description: '',
        date: moment().format('YYYY-MM-DD'),
        startTime: moment().format('HH:mm'),
        endTime: moment().add(1, 'hour').format('HH:mm'),
      }));
    }
  };
  const changeValue = newDate =>
    setUpdatedEvent(prevState => ({
      ...prevState,
      title: '',
      description: '',
      date: moment(newDate).format('YYYY-MM-DD'),
      startTime: moment(newDate).format('HH:mm'),
      endTime: moment(newDate).add(1, 'hour').format('HH:mm'),
      dateFrom: moment(newDate).format('YYYY-MM-DD') + ' ' + moment(newDate).format('HH:mm'),
      dateTo:
        moment(newDate).format('YYYY-MM-DD') + ' ' + moment(newDate).add(1, 'hour').format('HH:mm'),
    }));

  const handleCurrentWeek = () => setWeekStartDate(weekStartDate => (weekStartDate = new Date()));

  const handleNextWeek = () =>
    setWeekStartDate(
      weekStartDate =>
        (weekStartDate = new Date(weekStartDate.setDate(weekStartDate.getDate() + 7))),
    );

  const handlePreviousWeek = () =>
    setWeekStartDate(
      weekStartDate =>
        (weekStartDate = new Date(weekStartDate.setDate(weekStartDate.getDate() - 7))),
    );

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
        isShowModal={isShowModal}
        setIsHiddenModal={setIsHiddenModal}
        setUpdatedEvent={setUpdatedEvent}
        updatedEvent={updatedEvent}
        setEvents={setEvents}
        isHiddenModal={isHiddenModal}
      />
      <Calendar
        changeValue={changeValue}
        weekDates={weekDates}
        events={events}
        setEvents={setEvents}
        setIsHiddenModal={setIsHiddenModal}
      />
    </>
  );
};

export default App;
