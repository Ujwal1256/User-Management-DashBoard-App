import { useEffect, useState } from "react";
import api from "../services/api";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, sortField, sortOrder]);

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

    const matchesSearch =
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.department.toLowerCase().includes(search);

    const matchesFilters =
      user.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
      user.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.department.toLowerCase().includes(filters.department.toLowerCase());

    return matchesSearch && matchesFilters;
  });

  const sortedUsers = [...filteredUsers];

  if (sortField) {
    sortedUsers.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortOrder === "asc" ? -1 : 1;
      }

      if (a[sortField] > b[sortField]) {
        return sortOrder === "asc" ? 1 : -1;
      }

      return 0;
    });
  }

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto px-4 py-5">
      <div className="flex flex-col gap-4 mb-5">
        <h1 className="text-3xl md:text-3xl font-bold">User Management Dashboard</h1>

        <div className="flex flex-wrap gap-3 items-center mb-5">
          <div className="mb-10">
            <input
              type="text"
              placeholder="Search by name, email or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-72 border p-2 rounded"
            />
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="bg-gray-700 text-white p-5 m-3 rounded"
          >
            Filters
          </button>
          <div className="flex gap-3 mb-5">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Sort By</option>
              <option value="id">ID</option>
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="department">Department</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="asc">Ascending</option>

              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="mr-2">Users per page:</label>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border p-2 rounded"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <button
            onClick={openAddForm}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        </div>
      </div>
      {paginatedUsers.length > 0 ? (
        <UserTable
          users={paginatedUsers}
          onEdit={openEditForm}
          onDelete={handleDeleteUser}
        />
      ) : (
        <div className="text-center py-10">No users found</div>
      )}
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        {" "}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Filter Users</h2>

            <input
              type="text"
              placeholder="First Name"
              value={filters.firstName}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  firstName: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={filters.lastName}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  lastName: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="text"
              placeholder="Email"
              value={filters.email}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  email: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="text"
              placeholder="Department"
              value={filters.department}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  department: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setFilters({
                    firstName: "",
                    lastName: "",
                    email: "",
                    department: "",
                  })
                }
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Clear
              </button>

              <button
                onClick={() => setShowFilters(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
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
