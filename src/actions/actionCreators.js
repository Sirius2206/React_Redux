import { ADD_SERVICE, REMOVE_SERVICE, CHANGE_SERVICE_FIELD, SEARCH_SERVICE } from './actionTypes';

export function addService(name, price, editId = null) {
  return {type: ADD_SERVICE, payload: {name, price, editId}};
}

export function removeService(id) {
  return {type: REMOVE_SERVICE, payload: {id}};
}

export function changeServiceField(name, value) {
  return {type: CHANGE_SERVICE_FIELD, payload: {name, value}}
}

export function searchService(searchText) {
  return {type: SEARCH_SERVICE, payload: {searchText}}
}