const save = async (url, data) => {
  return await fetch(url, {
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
const getAll = async (url) => {
  return await fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
const getById = async (url, id) => {
  return await fetch(url + `/${id}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
const update = async (url, data) => {
  return await fetch(url, {
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
const deleteById = async (url, id) => {
  return await fetch(url + `/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

export { save, getAll, getById, update, deleteById };
