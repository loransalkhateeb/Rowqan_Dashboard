import React, { useState, useEffect } from "react";
import { API_URL1 } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Styles/UsersPage.css";
import axios from "axios";
import Swal from "sweetalert2";

function ChaletsOwnersPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const validLanguages = ["ar", "en"];
  const lang = validLanguages.includes(location.pathname.split("/")[1])
    ? location.pathname.split("/")[1]
    : "en";

  const [searchTerm, setSearchTerm] = useState("");
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false); 
  useEffect(() => {
    fetchOwners();
  }, [lang]);

  const fetchOwners = async () => {
    try {
      const response = await axios.get(
        `${API_URL1}/userstypes/getAllChaletsOwners/${lang}`
      );
     
      console.log("Fetched Data:", response.data); 
      
     
      if (response.data && Array.isArray(response.data)) {
        setOwners(response.data);
      } else if (response.data && response.data.users) {
        
        setOwners(response.data.users);
      } else {
        setError("No chalet owners found in the response.");
        setOwners([]);
      }
    } catch (error) {
      console.error("Error fetching chalet owners:", error);
      setError("Error fetching chalet owners.");
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
        setIsDeleting(true); 
        await axios.delete(`${API_URL1}/userstypes/DeleteChaletOwner/${id}/${lang}`);
        Swal.fire({
          title: "Deleted!",
          text: "The chalet owner has been deleted.",
          icon: "success",
        });
        fetchOwners(); 
      } catch (error) {
        console.error("Error deleting chalet owner:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the chalet owner.",
          icon: "error",
        });
      } finally {
        setIsDeleting(false); 
      }
    }
  };

  const getRoleBackgroundColor = (role) => {
    switch (role) {
      case "chalets_owners":
        return "#F2C79D";
      default:
        return "#ffffff";
    }
  };

  return (
    <div className="container">
      <h1>Chalets Owners</h1>
      <p>Manage chalet owners in your system</p>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Chalet Owners..."
          className="search-input"
        />
      </div>
      <div className="list-owners">
        <h3>List of Chalet Owners</h3>

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
            {Array.isArray(owners) && owners.length > 0 ? (
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
                        backgroundColor: owner.Users_Type
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
                        onClick={() => navigate(`/updatechaletsowners/${owner.id}`)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(owner.id)}
                        disabled={isDeleting} 
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="6">{error || "No chalet owners found"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChaletsOwnersPage;
