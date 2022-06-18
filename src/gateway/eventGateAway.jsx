const baseUrl = 'https://629dffc8c6ef9335c0ac47f9.mockapi.io/events';

export const getEventList = () => {
  return fetch(`${baseUrl}`).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
};
export const deleteEvent = eventId => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
  });
};
export const fetchCreateEvent = formData => {
  return fetch(`${baseUrl}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(formData),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
  });
};
