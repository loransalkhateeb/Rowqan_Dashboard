import React, { useState, useEffect } from "react";
import { API_URL } from "../../App";
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/users/getAllUsers/${lang}`)
      .then((response) => {
        setUsers(response.data.users);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(`Error Fetching the data: ${error}`);
      });
  }, [lang]);

  const handleUserCreate = () => {
    navigate("/users/createuser");
  };

  const handleDelete = (userId) => {
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
          .delete(`${API_URL}/users/DeleteUser/${userId}/${lang}`)
          .then((response) => {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
            setUsers(users.filter((user) => user.id !== userId));
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
  };

  const getRoleBackgroundColor = (role) => {
    switch (role) {
      case "Super_Admin_User":
        return "#6DA6BA";
      case "End_User":
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
  };

  return (
    <div className="container">
      <h1>Hello User</h1>
      <p>Have a Nice Day</p>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search The User..."
          className="search-input"
        />
        <button className="create-btn" onClick={handleUserCreate}>
          Create User
        </button>
      </div>
      <div className="list-owners">
        <h3>List Of Owners</h3>

        <table className="owners-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users
                .filter((user) =>
                  user.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td
                      style={{
                        width: "25px",
                        backgroundColor:
                          user.Users_Type && user.Users_Type.type
                            ? getRoleBackgroundColor(user.Users_Type.type)
                            : "#ffffff",
                        color: "#fff",
                      }}
                    >
                      {user.Users_Type ? user.Users_Type.type : "No Role"}
                    </td>
                    <td>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => {
                          navigate(`/updateuser/${user.id}`);
                        }}
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
                <td colSpan="3">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersPage;
