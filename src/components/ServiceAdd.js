import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeServiceField, addService, searchService } from "../store/actions/actionCreators";

function ServiceAdd() {
  const item = useSelector((state) => state.serviceAdd);
  const items = useSelector((state) => state.serviceList);
  const dispatch = useDispatch();

  const handleReset = () => {
    const editItem = items.find(item => item.onEdit === true);
    if (editItem) {
      delete editItem.onEdit;
    }
    for (let key in item) {
      dispatch(changeServiceField(key, ""));
    }
  };
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeServiceField(name, value));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(addService(item.name, item.price));
    for (let key in item) {
		if (key === "searchText") continue;
      dispatch(changeServiceField(key, ""));
    }
  };

  const handleSearch = (evt) => {
	const { name, value } = evt.target;
	dispatch(changeServiceField(name, value));
	dispatch(searchService(value));
  }

  return (
    <>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <input name="name" onChange={handleChange} value={item.name} placeholder="Название услуги"/>
        <input name="price" type="number" min="0" onChange={handleChange} value={item.price} placeholder="Цена"/>
        <button type="submit">Save</button>
        {items.find(item => item.onEdit === true) ? <button type="reset">Clear</button> : null}
      </form>
      <br />
      <label>Поиск</label>
      <br />
	  <input name="searchText" onChange={handleSearch}  value={item.searchText} placeholder="Поиск услуги"/>
    </>
  );
}

export default ServiceAdd;
