import React, { useState, useEffect } from 'react'
import { supabase } from './createClient'

const App = () => {
  const [users, setUsers] = useState([])

  const [user, setUser] = useState({
    name: '',
    age: 0
  })

  const [user2, setUser2] = useState({
    id: null,
    name: '',
    age: 0
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const { data } = await supabase
      .from('users')
      .select('*')
    setUsers(data)
  }

  function handlechange(e) {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  function handlechange2(e) {
    const { name, value } = e.target
    setUser2({
      ...user2,
      [name]: value
    })
  }

  async function createUser() {
    
    await supabase
      .from('users')
      .insert({ name: user.name, age: user.age })
    fetchUsers()
    
  }

  async function deleteUser(id) {
    await supabase
      .from('users')
      .delete()
      .eq('id', id)

    fetchUsers()
  }

  async function updateUser() {
    
    await supabase
      .from('users')
      .update({ name: user2.name, age: user2.age })
      .eq('id', user2.id)

    fetchUsers()
   
  }

  function displayUser(id) {
    const selectedUser = users.find((user) => user.id === id)
    if (selectedUser) {
      setUser2({
        id: selectedUser.id,
        name: selectedUser.name,
        age: selectedUser.age
      })
    }
  }

  return (
    <div>
      <form onSubmit={createUser}>
        <input
          type="text"
          placeholder='Name'
          name='name'
          value={user.name}
          onChange={handlechange}
        />
        <input
          type="number"
          placeholder='Age'
          name='age'
          value={user.age}
          onChange={handlechange}
        />
        <button type='submit'>Submit</button>
      </form>

      <form onSubmit={updateUser}>
        <input
          type="text"
          name='name'
          onChange={handlechange2}
          value={user2.name}
        />
        <input
          type="number"
          name='age'
          onChange={handlechange2}
          value={user2.age}
        />
        <button type='submit'>Save Changes</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button onClick={() => displayUser(user.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
