import { nanoid } from "nanoid";
import {
  ADD_SERVICE,
  REMOVE_SERVICE,
  SEARCH_SERVICE,
} from "../actions/actionTypes";

let initialState = [
  { id: nanoid(), name: "Замена стекла", price: 21000 },
  { id: nanoid(), name: "Замена дисплея", price: 25000 },
  { id: nanoid(), name: "Замена батареи", price: 15000 },
  { id: nanoid(), name: "Установка софта", price: 5000 },
  { id: nanoid(), name: "Зашить чехол", price: 2000 },
];

let searchState = initialState.slice();

let searchText = "";
export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SERVICE:
      const { name, price } = action.payload;
      if (!name) return [...state];
      const editItem = initialState.find (item => item.onEdit === true);
      if (editItem) {
        editItem.name = name;
        editItem.price = price;
        delete editItem.onEdit;
        return [...state];
      }
      initialState = [
        ...initialState,
        { id: nanoid(), name, price: Number(price) },
      ];
      if (searchText) return searchState;
      return initialState;

    case REMOVE_SERVICE:
      const { id } = action.payload;
      searchState = searchState.filter((service) => service.id !== id);
      initialState = initialState.filter((service) => service.id !== id);
      if (searchText) return searchState;
      return searchState;

    case SEARCH_SERVICE:
      state = searchState = initialState;
      if (action.payload.searchText !== undefined) {
        ({ searchText } = action.payload);
      }
      if (!searchText) return state;
      searchState = searchState.filter((service) =>
        service.name.toLowerCase().includes(searchText.toLowerCase())
      );

      return searchState;
    default:
      return state;
  }
}
