export const url = "https://localhost:3000";

export const register = (password, email) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
};

export const login = (password, email) => {
  return fetch(`${url}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
};

export const checkToken = (token) => {
  return fetch(`${url}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
