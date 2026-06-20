import { useEffect, useState } from "react";
import api from "../services/api";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");

      const formattedUsers = response.data.map((user) => {
        const names = user.name.split(" ");

        return {
          id: user.id,
          firstName: names[0],
          lastName: names.slice(1).join(" "),
          email: user.email,
          department: user.company.name,
        };
      });

      setUsers(formattedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      await api.post("/users", newUser);

      const user = {
        ...newUser,
        id: Date.now(),
      };

      setUsers((prev) => [...prev, user]);

      closeForm();
    } catch {
      alert("Failed to add user");
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await api.put(`/users/${updatedUser.id}`, updatedUser);

      setUsers((prev) =>
        prev.map((user) =>
          user.id === updatedUser.id
            ? {
                ...user,
                ...updatedUser,
              }
            : user,
        ),
      );

      closeForm();
    } catch {
      alert("Failed to update user");
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/users/${id}`);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const openAddForm = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const openEditForm = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();

    return (
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.department.toLowerCase().includes(search)
    );
  });
  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">User Management Dashboard</h1>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Search by name, email or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          onClick={openAddForm}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      <UserTable
        users={filteredUsers}
        onEdit={openEditForm}
        onDelete={handleDeleteUser}
      />

      <UserForm
        show={showForm}
        close={closeForm}
        addUser={handleAddUser}
        updateUser={handleUpdateUser}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default Dashboard;
