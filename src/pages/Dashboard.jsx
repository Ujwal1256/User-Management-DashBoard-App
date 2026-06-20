import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");

      const formatted = response.data.map((user) => {
        const names = user.name.split(" ");

        return {
          id: user.id,
          firstName: names[0],
          lastName: names.slice(1).join(" "),
          email: user.email,
          department: user.company.name,
        };
      });

      setUsers(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">
        User Management Dashboard
      </h1>

      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white p-4 rounded shadow mb-3"
        >
          <h2>
            {user.firstName} {user.lastName}
          </h2>

          <p>{user.email}</p>

          <p>{user.department}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;