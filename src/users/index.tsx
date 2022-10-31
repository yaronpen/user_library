import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import User from './user';
import EditForm from './edit-form';
import { url_config } from '../config';
import { IUser } from './interfaces';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserWrapper = () => {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [search_term, setSearchTerm] = useState<string>('');

  const fetchData = async () => {
    const url = url_config;
    const resp = await fetch(url);

    if (!resp.ok) {
      throw new Error('Data coud not be fetched!')
    } else {
      return resp.json()
    }
  }

  useEffect(() => {
    fetchData()
      .then((res) => {
        const object = res?.results?.reduce((acc: Array<IUser>, value: any) => {
          const temp_object = {
            name: {
              title: value.name.title,
              first: value.name.first,
              last: value.name.last,
            },
            email: value.email,
            location: {
              country: value.location.country,
              city: value.location.city,
              street: {
                name: value.location.city,
                number: value.location.number
              }
            },
            picture: value.picture.medium,
            uuid: value.login.uuid
          }
          acc.push(temp_object)
          return acc;
        }, [])
        setUsers(object)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])

  const updateDetails = (id: string, value: any, newFlag: boolean) => {
    if(newFlag) {
      users.push(value);
    }
    else {
      const updatedUsers = users?.map((user: IUser) => {
        if (id === user?.uuid) {
          return { ...user, name: value.name, email: value.email, location: value.location };
        }
        return user;
      });
      setUsers(updatedUsers);
    }
  }

  const deleteUser = (id: string) => {
    const updatedUsers = users.filter((user: IUser) => user?.uuid !== id);
    setUsers(updatedUsers);
  }

  const closeForm = () => {
    setDisplayForm(false);
  }

  // getting a list of email address for validation
  const email_list = users?.reduce((acc: any, value: IUser) => {
    acc.push(value.email);
    return acc
  }, []);

  const toggleNewForm = () => setDisplayForm(true);

  return (
    <div>
      <div>
        <label>
          Search:
          <input type="text" onChange={(event) => setSearchTerm(event.target.value)} />
        </label>
      </div>
      <div>
        <Button onClick={e => toggleNewForm()}>Add</Button>
      </div>
      {displayForm ? <EditForm props={[]} updateDetails={updateDetails} closeForm={closeForm} deleteUser={deleteUser} emails={email_list} show={displayForm} hideFunc={setDisplayForm} /> : null}
      {
        users?.filter(
          (user: IUser) => {
            let result;
            if(search_term === '') {
              result = user
            }
            else if(user.email.toLowerCase().includes(search_term) || 
              user.name.first.toLowerCase().includes(search_term) || 
              user.name.last.toLowerCase().includes(search_term) || 
              user.uuid.toLowerCase().includes(search_term) || 
              user.location.country.toLowerCase().includes(search_term) || 
              user.location.city.toLowerCase().includes(search_term) || 
              user.location.street.name.toLowerCase().includes(search_term)) {
                result = user;
            }
            return result;
          }
        ).map((user: IUser, index: number) => (
          <div key={index}>
            <User props={user} updateDetails={updateDetails} closeForm={closeForm} deleteUser={deleteUser} emails={email_list} />
          </div>
        ))
      }
    </div>
  )
}

export default UserWrapper;