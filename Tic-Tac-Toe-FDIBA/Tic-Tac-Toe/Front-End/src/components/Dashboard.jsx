import React from "react";

export function Dashboard ( ) {
  return (
    <div className="table-dashboard">
      <h2>Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          {/*{userData.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.wins}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
