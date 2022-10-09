import moment from 'moment';

export const validatorHaveEvent = (eventsList, dateFrom) => {
  const sameEvent = eventsList.some(
    el => moment(dateFrom) >= moment(el.dateFrom) && moment(dateFrom) <= moment(el.dateTo),
  );
  return sameEvent;
};
export const validatorMultMin = endTime => {
  return String(endTime.slice(3, 5)) !== '00' && Number(endTime.slice(3, 5)) % 15 !== 0;
};
export const validatorMultHour = startTime => {
  return Number(startTime.slice(3, 5)) % 15 !== 0 && String(startTime.slice(3, 5)) !== '00';
};
export const validatorEndTime = (startTime, endTime) => {
  return startTime === endTime || Number(endTime.slice(0, 2)) < Number(startTime.slice(0, 2));
};
export const validatorEventDuration = (endTime, startTime) => {
  return Number(endTime.slice(0, 2)) - Number(startTime.slice(0, 2)) > 6;
};
export const validatorEventOneDay = dateFrom => {
  return moment(dateFrom).format('DD') !== moment(dateFrom).format('DD');
};
