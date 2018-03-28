import fetch        from 'isomorphic-fetch';
import moment from "moment";

const URL_API = 'http://localhost:8000'

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

function buildHeaders() {
  const authToken = localStorage.getItem('access_token');

  return { ...defaultHeaders, Authorization: authToken };
}

export function parseJSON(response) {
  return response.json();
}

export function httpGet(url) {

  return fetch(URL_API + url, {
    headers: buildHeaders()
  })
  .then(parseJSON);
}

export function httpPost(url, data) {
  const body = JSON.stringify(data);

  return fetch(URL_API + url, {
    method: 'post',
    headers: buildHeaders(),
    body: body,
  })
  .then(parseJSON);
}

export function httpDelete(url, id) {

  return fetch(`${URL_API}${url}/${id}` , {
    method: 'delete',
    headers: buildHeaders(),
  })
  .then(parseJSON);
}

export const isObjectEmpty = (obj) => {
    return obj && !obj[Object.keys(obj)[0]];
}

export const getUrlParam = (obj) => {

  let queryParam = new URLSearchParams();

  if(isObjectEmpty(obj)) return "";

  for(let i in obj) {
      queryParam.append(i, obj[i]);
  }

  return `query?${queryParam.toString()}`
}

export function httpPut(url, id, data) {
  const body = JSON.stringify(data);
  return fetch(`${URL_API}/${url}/${id}`, {
    method: 'put',
    headers: buildHeaders(),
    body
  })
  .then(parseJSON)
}

export function setDocumentTitle(title) {
  document.title = `${title} | Time Managment`;
}



export const formatDate = (date) => moment(date).format("DD.MM.YYYY");
