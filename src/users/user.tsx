import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditForm from './edit-form';

const User = ({ props, updateDetails, closeForm, deleteUser, emails }: any) => {
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  const name = props?.name;
  const email = props?.email;
  const image = props?.picture;
  const location = props?.location;
  const uuid = props?.uuid;

  const toggleForm = () => setDisplayForm(true);

  const closeFormFromUser = () => {
    setDisplayForm(false)
  }

  return (
    <>
      <Table striped bordered hover responsive="sm">
        <tbody>
          <tr>
            <td><img src={image} alt="" /></td>
            <td>{name.title} {name.first} {name.last}</td>
            <td>{email}</td>
            <td>{location.country} {location.city} {location.street.name} {location.street.number}</td>
            <td>{uuid}</td>
            <td><Button onClick={() => toggleForm()}>Edit</Button></td>
          </tr>
        </tbody>
      </Table>
      <EditForm props={props} updateDetails={updateDetails} closeForm={closeFormFromUser} deleteUser={deleteUser} emails={emails} show={displayForm} hideFunc={setDisplayForm} />
    </>
  )
}

export default User