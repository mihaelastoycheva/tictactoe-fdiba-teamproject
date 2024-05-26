import React, { useState } from "react";
import Axios from 'axios';
import { useEffect } from "react";

export function Dashboard() {
  const[data, setData] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:5001/ranking')
      .then(res => {
        console.log("Getting from ::: test ", res.data)
        setData(res.data.rankingArray)
      }).catch(err => console.log(err))
  }, [])


  const arr = data.map((data, index) => {
    return(
      <tr>
        <td>{data.username}</td>
        <td>{data.wins}</td>
      </tr>
    )
  })

  return (
    <div className="table-dashboard">
      <h2>Dashboard</h2>
      <table>
        <thead>
          <tr class="border-bottom">
            <th>Player</th>
            <th>Wins</th>
          </tr>
         
        </thead>
        {arr}
      </table>
    </div>
  );
}
