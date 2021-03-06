const baseUrl = 'https://629dffc8c6ef9335c0ac47f9.mockapi.io/events';

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
export const fetchCreateEvent = formData => {
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
