import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeServiceField, addService, searchService } from "../actions/actionCreators";

function ServiceAdd() {
  const item = useSelector((state) => state.serviceAdd);
  const dispatch = useDispatch();

  const handleReset = () => {
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
    if (isNaN(item.price)) item.price = 0;
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

  console.log(item);
  return (
    <>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <input name="name" onChange={handleChange} value={item.name} />
        <input name="price" onChange={handleChange} value={item.price} />
        <button type="submit">Save</button>
        {item.name || item.price ? <button type="reset">Clear</button> : null}
      </form>
	  <input name="searchText" onChange={handleSearch}  value={item.searchText}/>
    </>
  );
}

export default ServiceAdd;
