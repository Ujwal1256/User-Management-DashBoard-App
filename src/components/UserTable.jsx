const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full  min-w-[900px] bg-white shadow rounded-lg overflow-hidden text-sm md:text-base p-5">
        {" "}
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">ID</th>

            <th className="p-3 text-left">First Name</th>

            <th className="p-3 text-left">Last Name</th>

            <th className="p-3 text-left">Email</th>

            <th className="p-3 text-left">Department</th>

            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{user.id}</td>

              <td className="p-3">{user.firstName}</td>

              <td className="p-3">{user.lastName}</td>

              <td className="p-3">{user.email}</td>

              <td className="p-3">{user.department}</td>

              <td className="p-3">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
