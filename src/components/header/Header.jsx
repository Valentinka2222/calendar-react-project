import React, { useState } from 'react';

import Modal from '../modal/Modal';
import moment from 'moment';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ handleCurrentWeek, handleNextWeek, handlePreviousWeek }) => {
  const [isShowEventList, setisShowEventList] = useState(true);

  return (
    <header className="header">
      <button
        className="button create-event-btn"
        onClick={() => setisShowEventList(!isShowEventList)}
      >
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>

      <div className="navigation">
        <button className="navigation__today-btn button" onClick={handleCurrentWeek}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={handlePreviousWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={handleNextWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{`${moment().format('MMM')} - ${moment()
          .add(1, 'month')
          .format('MMM')}`}</span>
        {!isShowEventList && <Modal />}
      </div>
    </header>
  );
};
Header.propTypes = {
  isShowEventList: PropTypes.bool,
};

export default Header;
