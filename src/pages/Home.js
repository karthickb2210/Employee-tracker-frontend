import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export default function Home() {
  const [load,setLoad] = useState(true);
  const [users, setUsers] = useState([]);
  const url = "https://employee-check.onrender.com/";
  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(`${url}users`);
    setUsers(result.data);
    setLoad(false)
  };

  const deleteUser = async (id) => {
    let pass = prompt("Enter the password :");
    if (pass === "abc") {
      await axios.delete(`${url}user/${id}`);
      loadUsers();
    } else {
      alert("Wrong password");
    }
  };

  function findTime(s1, s2) {
    if (s2 === "") {
      return s2;
    } else {
      let s = s1.substr(0, 2);
      let sub = s2.substr(0, 2);
      let ans = sub - s;
      if (ans < 0) {
        return ans * -1 + " hrs";
      }
      return ans + " hrs";
    }
  }

  return (
    <div className="container">
      <div className="py-4">
      {
            load ?  <Loader/> :
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Log In Time</th>
              <th scope="col">Email</th>
              <th scope="col">Logout</th>
              <th scope="col">Work Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>  <>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.name}</td>
                <td>{user.date}</td>
                <td>{user.inTime}</td>
                <td>{user.email}</td>
                <td>{user.logOut}</td>
                <td>{findTime(user.inTime, user.logOut)}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View Work
                  </Link>
                  {/* <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link> */}
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/logoutuser/${user.id}`}>
                    <button className="btn btn-danger mx-2">Logout</button>
                  </Link>
                </td>
              </tr>
            ))}
            </>
            
            
          </tbody>
        </table>
}
      </div>
    </div>
  );
}
