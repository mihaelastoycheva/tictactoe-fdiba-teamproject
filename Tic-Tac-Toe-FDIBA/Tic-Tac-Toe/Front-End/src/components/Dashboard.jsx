import React, { useState } from "react";
import Axios from 'axios';
import { useEffect } from "react";

export function Dashboard() {
  const[data, setData] = useState([])

  useEffect(() => {
    Axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        console.log("Getting from ::: test ", res.data)
        setData(res.data)
      }).catch(err => console.log(err))
  }, [])

  const arr = data.map((data, index) => {
    return(
      <tr>
        <td>{data.id}</td>
        <td>{data.title}</td>
        <td>{data.body}</td>

      </tr>
    )
  })

  return (
    <div className="table-dashboard">
      <h2>Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>User/ID</th>
            <th>Wins/Title</th>
            <th>Body</th>
          </tr>
         
        </thead>
        {arr}
          {/*{userData.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.wins}</td>
            </tr>
          ))} */}
        
      </table>
    </div>
  );
}
