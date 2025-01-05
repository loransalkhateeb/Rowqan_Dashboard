import React, { useState, useEffect, useMemo, useCallback } from "react";
import { API_URL1 } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Styles/UsersPage.css";
import axios from "axios";
import Swal from "sweetalert2";

function UsersPage() {
  const location = useLocation();
  const lang =
    location.pathname.split("/")[1] === "ar" ||
    location.pathname.split("/")[1] === "en"
      ? location.pathname.split("/")[1]
      : "en";

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL1}/users/getAllUsers/${lang}`);
        if (response.data) {
          setUsers(response.data);
        } else {
          console.error("No users found in response.");
        }
      } catch (error) {
        console.error(`Error fetching the data: ${error}`);
      }
    };

    fetchUsers();
  }, [lang]);


  const handleDelete = useCallback(
    (userId) => {
      Swal.fire({
        title: "Are you sure you want to delete this user?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${API_URL1}/users/DeleteUser/${userId}/${lang}`)
            .then(() => {
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });
              setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            })
            .catch((error) => {
              Swal.fire({
                title: "Error!",
                text: "There was an error deleting the user.",
                icon: "error",
              });
              console.error(error);
            });
        }
      });
    },
    [lang]
  );

 
  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  const getRoleBackgroundColor = useCallback((role) => {
    switch (role) {
      case "admin":
        return "#6DA6BA";
      case "user":
        return "#6DA6DB";
      case "Owner_User":
        return "#F2C79D";
      case "Admin_User":
        return "#979797";
      case "chalets_owners":
        return "#979797";
      case "events_owners":
        return "#D3766A";
      case "lands_owners":
        return "#6E00FF";
      default:
        return "#ffffff";
    }
  }, []);

  return (
    <div className="container">
      <h1>Users Management</h1>
      <p>Manage all users from here</p>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a user..."
          className="search-input"
        />
        <button className="create-btn" onClick={() => navigate("/users/createuser")}>
          Create User
        </button>
      </div>
      <div className="list-owners">
        <h3>List of Users</h3>
        <table className="owners-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td
                    style={{
                      width: "25px",
                      backgroundColor:
                        user.Users_Type?.type
                          ? getRoleBackgroundColor(user.Users_Type.type)
                          : "#ffffff",
                      color: "#fff",
                    }}
                  >
                    {user.Users_Type?.type || "No Role"}
                  </td>
                  <td>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => navigate(`/updateuser/${user.id}`)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default React.memo(UsersPage);
