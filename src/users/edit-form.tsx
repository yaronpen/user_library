import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { v4 as uuidv4 } from 'uuid';

const EditForm = ({ props, updateDetails, closeForm, deleteUser, emails, show, hideFunc }: any) => {
  const [title, setTitle] = useState<string>('');
  const [first, setFirstName] = useState<string>('');
  const [last, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street_name, setStreetName] = useState<string>('');
  const [street_number, setStreetNumber] = useState<string>('');
  const [error_message, setErrorMessage] = useState<string>('');

  const isNew: boolean = Object.keys(props).length > 0 ? false : true;

  useEffect(() => {
    setTitle(props?.name?.title);
    setFirstName(props?.name?.first);
    setLastName(props?.name?.last);
    setEmail(props?.email);
    setCountry(props?.location?.country);
    setCity(props?.location?.city);
    setStreetName(props?.location?.street.name);
    setStreetNumber(props?.location?.street.number);
  }, [props])

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const name_validation = first.length < 3 || last.length < 3 ? 'Name is too short' : '';
    const regex = /\S+@\S+\.\S+/;
    const email_validation = regex.test(email) ? '' : 'Email address is not valid';
    const unique_email_filter = emails.filter((email_adress: string) => email_adress === email).length;
    const unique_email = unique_email_filter > 0 ? 'Not a unique email adress' : '';

    if (name_validation !== '' || email_validation !== '' || unique_email !== '') {
      setErrorMessage(`${name_validation} ${email_validation} ${unique_email}`);
    }
    else {
      const id = isNew ? uuidv4() : props?.uuid;
      const values = {
        name: {
          title,
          first,
          last
        },
        email,
        location: {
          country,
          city,
          street: {
            name: street_name,
            number: street_number
          }
        },
        uuid: id
      }
      updateDetails(id, values, isNew);
      closeForm();
    }
  }

  const cancelEdit = (event: any) => {
    event.preventDefault();
    closeForm();
  }

  const deleteObject = (event: any) => {
    event.preventDefault();
    confirmAlert({
      title: 'Confirm delete',
      message: 'You sure you want to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => performDelete(true)
        },
        {
          label: 'No',
          onClick: () => performDelete(false)
        }
      ]
    })
  }

  const performDelete = (flag: boolean) => {
    if (flag) {
      const id = props?.uuid;
      deleteUser(id);
    }
    closeForm();
  }
  const handleClose = () => hideFunc(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor="title">
            title
            <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
          </label>
          <label htmlFor="first">
            First Name
            <input type="text" name="first" value={first} onChange={e => setFirstName(e.target.value)} />
          </label>
          <label htmlFor="last">
            Last name
            <input type="text" name="last" value={last} onChange={e => setLastName(e.target.value)} />
          </label>
          <label htmlFor="email">
            Email
            <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label htmlFor="country">
            Country
            <input type="text" name="country" value={country} onChange={e => setCountry(e.target.value)} />
          </label>
          <label htmlFor="city">
            City
            <input type="text" name="city" value={city} onChange={e => setCity(e.target.value)} />
          </label>
          <label htmlFor="street_name">
            Street
            <input type="text" name="street_name" value={street_name} onChange={e => setStreetName(e.target.value)} />
          </label>
          <label htmlFor="street_number">
            House number
            <input type="text" name="street_number" value={street_number} onChange={e => setStreetNumber(e.target.value)} />
          </label>
          <div>
            <Button type="submit">Save</Button>
            <Button onClick={(e) => cancelEdit(e)}>Cancel</Button>
            {isNew ? null : <Button onClick={(e) => deleteObject(e)}>Delete</Button>}
            {error_message}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default EditForm