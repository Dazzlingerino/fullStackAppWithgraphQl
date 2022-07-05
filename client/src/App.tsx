import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import './App.css';
import { GET_ONE_USER, GET_ALL_USERS } from './query/user';
import CREATE_USER from './mutations/user';

function App() {
  const {
    data, loading, error, refetch,
  } = useQuery(GET_ALL_USERS, { pollInterval: 500 });
  const {
    data: oneUser, loading: loadingOneUser,
  } = useQuery(GET_ONE_USER, { variables: { id: 1 } });
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState<any[]>([]);
  const [username, setUsername] = useState<string>('');
  const [age, setAge] = useState<any>(0);
  console.log(oneUser);
  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [oneUser]);

  const addUser = async (e:any) => {
    e.preventDefault();
    const data2 = await newUser({
      variables: {
        input: {
          username, age,
        },
      },
    });
    console.log(data2);
    setUsername('');
    setAge(0);
  };
  const getAll = (e:any) => {
    e.preventDefault();
    refetch();
  };
  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <form>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
        <input value={age} onChange={(e) => setAge(e.target.value)} type="number" />
        <div className="btns">
          <button onClick={(e) => addUser(e)} type="button">Create</button>
          <button onClick={(e) => getAll(e)} type="button">Get</button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <div className="user" key={user?.id}>
            {' '}
            {user?.id}
            {user?.username}
            {' '}
            {user?.age}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
