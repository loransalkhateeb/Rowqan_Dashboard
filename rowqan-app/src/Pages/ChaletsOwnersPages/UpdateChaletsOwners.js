import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../App";

function UpdateChaletsOwners() {
  const { id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();

  const validLanguages = ["ar", "en"];
  const lang = validLanguages.includes(location.pathname.split("/")[1])
    ? location.pathname.split("/")[1]
    : "en";

  const [ownerData, setOwnerData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    user_role: "",
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/userstypes/getChaletOwnerById/${id}/${lang}`
        );
        const { name, email, phone_number, country, user_type_id } =
          response.data.user;
        setOwnerData({
          name,
          email,
          phone: phone_number,
          country,
          password: "", 
          user_role: user_type_id,
        });
      } catch (err) {
        console.error("Error fetching chalet owner data:", err);
        setError("Error fetching chalet owner data.");
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/userstypes/getAllUsersTypes/${lang}`
        );
        setRoles(response.data.userTypes);
      } catch (err) {
        console.error("Error fetching roles:", err);
        setError("Error fetching roles.");
      }
    };

    fetchOwnerData();
    fetchRoles();
  }, [id, lang]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOwnerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { name, email, phone, country, password, user_role } = ownerData;
    if (!name || !email || !phone || !country || !user_role) {
      setError("Please fill all the required fields.");
      setLoading(false);
      return;
    }

    const updatedOwnerData = {
      name,
      email,
      phone_number: phone,
      country,
      password: password || undefined, 
      lang,
      user_type_id: user_role,
    };

    try {
      await axios.put(
        `${API_URL}/userstypes/UpdateChaletsOwner/${id}`,
        updatedOwnerData
      );
      setLoading(false);
      Swal.fire({
        title: "Chalet Owner Updated Successfully!",
        icon: "success",
        confirmButtonText: "Okay",
      }).then(() => {
        navigate(`/chaletsowners`);
      });
    } catch (err) {
      setError("Error updating chalet owner.");
      setLoading(false);
      console.error("Error updating chalet owner:", err);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the chalet owner.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Chalet Owner</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={ownerData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={ownerData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={ownerData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={ownerData.country}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={ownerData.password}
            onChange={handleInputChange}
          />
          <small className="form-text text-muted">
            Leave blank if you don't want to update the password.
          </small>
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="user_role"
            value={ownerData.user_role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Role</option>
            {roles.length > 0 ? (
              roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.type}
                </option>
              ))
            ) : (
              <option disabled>Loading roles...</option>
            )}
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Chalet Owner"}
        </button>
      </form>
    </div>
  );
}

export default UpdateChaletsOwners;
