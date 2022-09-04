import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {removeService} from '../store/actions/actionCreators';
import {changeServiceField} from '../store/actions/actionCreators';

function ServiceList() {
  const items = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

  const handleEdit = id => {
    const editItem = items.find(item => item.id == id);
    editItem.onEdit = true;
    for (let key in editItem) {
      if (key === "id") continue;
      dispatch(changeServiceField(key, editItem[key]));
    }
  }
  const handleRemove = id => {
    dispatch(removeService(id));
  }

  return (
    <ul style={{listStyleType: "none"}}>
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