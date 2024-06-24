import { useState, useEffect } from "react";
import { Button } from "./Button";
import axios from "axios";
import { BASE_URL } from "../api";
import { useNavigate } from "react-router-dom";

export function UsersComponent({ me }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios.get(`${BASE_URL}/user/bulk?filter=${filter}`).then((response) => {
      setUsers(response.data.user);
    });
  }, [filter]);
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users
          .filter((user) => `${user.firstName} ${user.lastName}` !== me)
          .map((user) => (
            <User key={user._id} user={user} />
          ))}
      </div>
    </>
  );
}

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          label={"Send Money"}
          onClick={(e) => {
            navigate(`/send?id=${user._id}&name=${user.firstName}`);
          }}
        />
      </div>
    </div>
  );
}
