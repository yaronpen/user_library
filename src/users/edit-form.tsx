import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { v4 as uuidv4 } from 'uuid';
import { OverLay } from './styles';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const EditForm = ({ props, updateDetails, closeForm, deleteUser, emails }: any) => {

  const [title, setTitle] = useState<any>('');
  const [first, setFirstName] = useState<any>('');
  const [last, setLastName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [country, setCountry] = useState<any>('');
  const [city, setCity] = useState<any>('');
  const [street_name, setStreetName] = useState<any>('');
  const [street_number, setStreetNumber] = useState<any>('');
  const [error_message, setErrorMessage] = useState<any>('');

  const isNew: boolean = props.length > 0 ? false: true;
  
  useEffect(() => {
    setTitle(props?.name?.title);
    setFirstName(props?.name?.first);
    setLastName(props?.name?.last);
    setEmail(props?.email);
    setCountry(props?.location?.country);
    setCity(props?.location?.city);
    setStreetName(props?.location?.street.name);
    setStreetNumber(props?.location?.street.number);
  }, [])

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const name_validation = first.length < 3 || last.length < 3 ? 'Name is too short' : '';
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const email_validation = regex.test(email) ? '' : 'Email address is not valid';
    const unique_email = emails.filter((email_adress: string) => email_adress === email).length > isNew ? 0 : 1 ? 'Not a unique email adress' : '';
    
    if(name_validation !== '' || email_validation !== '' || unique_email !== '') {
      setErrorMessage(`${name_validation} ${email_validation} ${unique_email}`);
    }
    else {
      const id = isNew ? uuidv4() : props?.login?.uuid;
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
        login: {
          uuid: id
        }
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
    if(flag) {
      const id = props?.login?.uuid;
      deleteUser(id);
    }
    closeForm();
  }

  return (
    <OverLay>
      <div>
        <form action="" onSubmit={e => handleSubmit(e)}>
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
          <button type="submit">Save</button>
          <button onClick={(e) => cancelEdit(e)}>Cancel</button>
          
          {isNew ? <button onClick={(e) => deleteObject(e)}>Delete</button> : null}
          
          {error_message}
        </form>

      </div>
    </OverLay>
  )
}

export default EditForm