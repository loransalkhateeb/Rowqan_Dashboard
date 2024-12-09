import React, { useState, useEffect } from "react";
import { API_URL1 } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Styles/UsersPage.css";
import axios from "axios";
import Swal from "sweetalert2";


function LandsOwnersPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const validLanguages = ["ar", "en"];
  const lang = validLanguages.includes(location.pathname.split("/")[1])
    ? location.pathname.split("/")[1]
    : "en";

  const [searchTerm, setSearchTerm] = useState("");
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOwners();
  }, [lang]);

  const fetchOwners = async () => {
    try {
      const response = await axios.get(
        `${API_URL1}/userstypes/getAllLandsOwners/${lang}`
      );
      setOwners(response.data.users);
    } catch (error) {
      console.error("Error fetching event owners:", error);
      setError("Error fetching event owners.");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`${API_URL1}/userstypes/DeleteLandOwner/${id}/${lang}`);
        Swal.fire({
          title: "Deleted!",
          text: "The Land owner has been deleted.",
          icon: "success",
        });
        setOwners((prevOwners) => prevOwners.filter((owner) => owner.id !== id));
      } catch (error) {
        console.error("Error deleting Land owner:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the Land owner.",
          icon: "error",
        });
      }
    }
  };

  const getRoleBackgroundColor = (role) => {
    switch (role) {
      case "lands_owners":
        return "#F2C79D";
      default:
        return "#ffffff";
    }
  };

  return (
    <div className="container">
      <h1>Lands Owners</h1>
      <p>Manage Land owners in your system</p>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Land Owners..."
          className="search-input"
        />
      </div>
      <div className="list-owners">
        <h3>List of Lands Owners</h3>

        <table className="owners-table" style={{ tableLayout: "fixed", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "150px" }}>Name</th>
              <th style={{ width: "200px" }}>Email</th>
              <th style={{ width: "150px" }}>Phone</th>
              <th style={{ width: "150px" }}>Country</th>
              <th style={{ width: "120px" }}>Role</th>
              <th style={{ width: "120px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {owners.length > 0 ? (
              owners
                .filter((owner) =>
                  owner.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((owner) => (
                  <tr key={owner.id}>
                    <td>{owner.name}</td>
                    <td>{owner.email}</td>
                    <td>{owner.phone_number}</td>
                    <td>{owner.country}</td>
                    <td
                      style={{
                        backgroundColor:
                          owner.Users_Type && owner.Users_Type.type
                            ? getRoleBackgroundColor(owner.Users_Type.type)
                            : "#ffffff",
                        color: "#fff",
                      }}
                    >
                      {owner.Users_Type ? owner.Users_Type.type : "No Role"}
                    </td>
                    <td>
                      <button
                        className="action-btn edit-btn"
                        onClick={() =>
                          navigate(`/updatelandsowner/${owner.id}`)
                        }
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(owner.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="6">{error || "No event owners found"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LandsOwnersPage;
