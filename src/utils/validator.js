export const eventValidtor = (endTime, startTime, dateFrom) => {
  if (String(endTime.slice(3, 5)) !== '00' && Number(endTime.slice(3, 5)) % 15 !== 0) {
    alert('Time must be a multiple of 15 minutes');
    return;
  } else if (Number(startTime.slice(3, 5)) % 15 !== 0 && String(startTime.slice(3, 5)) !== '00') {
    alert('Time must be a multiple of 15 minutes');
    return;
  } else if (startTime === endTime || Number(endTime.slice(0, 2)) < Number(startTime.slice(0, 2))) {
    alert('Please select another end time');
    return;
  } else if (moment(dateFrom).format('DD') !== moment(dateFrom).format('DD')) {
    alert('The event must take place within one day');
    return;
  } else if (Number(endTime.slice(0, 2)) - Number(startTime.slice(0, 2)) > 6) {
    alert('The event must last more than 6 hours');
    return;
  }
};
