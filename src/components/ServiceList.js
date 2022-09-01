import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {removeService} from '../actions/actionCreators';
import {changeServiceField} from '../actions/actionCreators';

function ServiceList() {
  const items = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

  const handleEdit = id => {
    const arr = items.find(item => item.id == id);
    for (let key in arr) {
      if (key === "id") continue;
      dispatch(changeServiceField(key, arr[key]));
    }
  }
  const handleRemove = id => {
    dispatch(removeService(id));
  }

  return (
    <ul>
      {items.map(o => (
        <li key={o.id}>
          {o.name} {o.price}
          <button onClick={() => handleEdit(o.id)}>Edit</button>
          <button onClick={() => handleRemove(o.id)}>✕</button>
        </li>
      ))}
    </ul>
  )
}

export default ServiceList