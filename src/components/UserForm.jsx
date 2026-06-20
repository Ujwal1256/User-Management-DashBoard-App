import { useState, useEffect } from "react";

const UserForm = ({ show, close, addUser, updateUser, selectedUser }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
    }
  }, [selectedUser]);

  if (!show) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid Email";
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (selectedUser) {
      await updateUser({
        ...formData,
        id: selectedUser.id,
      });
    } else {
      await addUser(formData);
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });

    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          {selectedUser ? "Edit User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <p className="text-red-500 text-sm mb-2">{errors.firstName}</p>

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <p className="text-red-500 text-sm mb-2">{errors.lastName}</p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <p className="text-red-500 text-sm mb-2">{errors.email}</p>

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <p className="text-red-500 text-sm mb-4">{errors.department}</p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={close}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {selectedUser ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
