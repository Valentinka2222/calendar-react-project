const baseUrl = 'https://62641c97a6adc673188dbf69.mockapi.io/tasklist/api/v1/events';

export const getEventList = () => {
  return fetch(`${baseUrl}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Internal Server Error. Can't display events");
      }
    })
    .catch(error => console.log(error));
};
export const deleteEvent = id => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
  });
};
export const сreateEvent = formData => {
  return fetch(`${baseUrl}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(formData),
  }).then(response => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
  });
};
