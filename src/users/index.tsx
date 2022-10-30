import React, { useState, useEffect } from "react";
import User from './user';
import { GridLayout } from './styles';
import EditForm from './edit-form';
import { url_config } from '../config';

const UserWrapper = () => {
  const [users, setUsers] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
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
        setUsers(res?.results)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])

  const updateDetails = (id: any, value: any, newFlag: boolean) => {
    if(newFlag) {
      users.push(value);
    }
    else {
      const updatedUsers = users?.map((user: any) => {
        if (id === user?.login?.uuid) {
          return { ...user, name: value.name, email: value.email, location: value.location };
        }
        return user;
      });
      setUsers(updatedUsers);
    }
  }

  const deleteUser = (id: string) => {
    const updatedUsers = users.filter((user: any) => user.login.uuid !== id);
    setUsers(updatedUsers);
  }

  const closeForm = () => {
    setDisplayForm(false);
  }

  // getting a list of email address for validation
  const email_list = users?.reduce((acc: any, value: any) => {
    acc.push(value.email);
    return acc
  }, []);

  const toggleNewForm = () => {
    setDisplayForm(true);
  }

  return (
    <div>
      <div>
        <label>
          Search:
          <input type="text" onChange={(event) => setSearchTerm(event.target.value)} />
        </label>
      </div>
      <div>
        <button onClick={e => toggleNewForm()}>Add</button>
      </div>
      {displayForm ? <EditForm props={[]} updateDetails={updateDetails} closeForm={closeForm} deleteUser={deleteUser} emails={email_list} /> : null}
      <div>
        <GridLayout>
          <span>picture</span>
          <span>name</span>
          <span>email</span>
          <span>address</span>
          <span>uuid</span>
        </GridLayout>
      </div>
      {
        users?.filter(
          (user: any) => {
            if(search_term === '') {
              return user
            }
            else if(user.email.toLowerCase().includes(search_term) || 
              user.name.first.toLowerCase().includes(search_term) || 
              user.name.last.toLowerCase().includes(search_term) || 
              user.login.uuid.toLowerCase().includes(search_term) || 
              user.location.country.toLowerCase().includes(search_term) || 
              user.location.city.toLowerCase().includes(search_term) || 
              user.location.street.name.toLowerCase().includes(search_term)) {
                return user;
            }
          }
        ).map((user: any, index: number) => (
          <div key={index}>
            <User props={user} updateDetails={updateDetails} closeForm={closeForm} deleteUser={deleteUser} emails={email_list} />
          </div>
        ))
      }
    </div>
  )
}

export default UserWrapper;