import React, { useState } from 'react';
import EditForm from './edit-form';
import { GridLayout } from './styles';


const User = ({ props, updateDetails, closeForm, deleteUser, emails }: any) => {
  const [displayForm, setDisplayForm] = useState(false);

  const name = props?.name;
  const email = props?.email;
  const image = props?.picture?.medium;
  const location = props?.location;
  const uuid = props?.login?.uuid;
  
  const toggleForm = () => {
    displayForm ? setDisplayForm(false) : setDisplayForm(true);
  }

  const closeFormFromUser = () => {
    setDisplayForm(false)
  }
  
  return (
      <GridLayout>
        <span><img src={image} alt="" /></span>
        <span>{name.title} {name.first} {name.last}</span>
        <span>{email}</span>
        <span>{location.country} {location.city} {location.street.name} {location.street.number}</span>
        <span>{uuid}</span>
        <button onClick={() => toggleForm()}>Edit</button>
        { displayForm ? <EditForm props={props} updateDetails={updateDetails} closeForm={closeFormFromUser} deleteUser={deleteUser} emails={emails} /> : null}
      </GridLayout>
  )
}

export default User