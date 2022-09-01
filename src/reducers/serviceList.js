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

export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SERVICE:
      const { name, price } = action.payload;
      if (!name) return [...state];
      const hasElement = state.find((item) => item.name === name);
      if (hasElement) {
        state.map((item) => {
          if (item.id === hasElement.id) {
            item.name = name;
            item.price = Number(price);
          }
          return item;
        });
        return [...state];
      }
      initialState.push({ id: nanoid(), name, price: Number(price) });
      return [...state];
    case REMOVE_SERVICE:
      const { id } = action.payload;
      initialState = state.filter((service) => service.id !== id);
      return initialState;
    case SEARCH_SERVICE:
      const { searchText } = action.payload;
      console.log(state);
      if (!searchText) return initialState;
      return state.filter((service) => service.name.toLowerCase().includes(searchText.toLowerCase()));
    default:
      return state;
  }
}
