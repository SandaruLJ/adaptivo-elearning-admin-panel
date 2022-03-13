const save = (url, data) => {
  fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
const getAll = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
const getById = (url, id) => {
  fetch(url + `/${id}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
const update = (url, data) => {
  fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
const deleteById = (url, id) => {
  fetch(url + `/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

export { save, getAll, getById, update, deleteById };
