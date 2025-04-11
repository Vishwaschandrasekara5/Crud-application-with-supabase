import React,{useState,useEffect} from 'react'
import { supabase } from './createClient'

const App = () => {

const[users,setUsers] = useState([])

const [user,setUser] = useState({
  name:'',
  age:0
})

// console.log(user);



useEffect(() => {
  fetchUsers()
},[])

async function fetchUsers(){
  const {data} = await supabase
  .from('users')
  .select('*')
  setUsers(data)
  // console.log(data);
}

function handlechange(e){
  const {name,value} = e.target
  setUser({
    ...user,
    [name]:value
  })
}

async function createUser(){
  await supabase
  .from('users')
  .insert(
    { name: user.name, age: user.age }
  )
}

  return (
    <div>

      <form action="">

        <input type="text" placeholder='Name' name='name' onChange={handlechange}/>
        <input type="number" placeholder='Age' name='age' onChange={handlechange}/>
        <button type='submit' onClick={createUser}>Submit</button>



      </form>



      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
       
      </table>
    </div>
  )
}

export default App
