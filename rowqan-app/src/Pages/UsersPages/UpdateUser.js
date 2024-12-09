import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { API_URL1 } from '../../App';

function UpdateUser() {
  const { id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();
  const validLanguages = ['ar', 'en'];
  const lang = validLanguages.includes(location.pathname.split('/')[1])
    ? location.pathname.split('/')[1]
    : 'en'; 

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    password: '',
    user_role: '',
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {


    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL1}/users/getUserById/${id}/${lang}`);
        const fetchedUser = response.data.user;
        

        setUserData({
          name: fetchedUser.name,
          email: fetchedUser.email,
          phone: fetchedUser.phone_number,
          country: fetchedUser.country,
          password: fetchedUser.password,
          user_role: fetchedUser.user_type_id, 
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error fetching user data.');
      }
    };


    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_URL1}/userstypes/getAllUsersTypes/${lang}`);
        setRoles(response.data.userTypes);
      } catch (err) {
        console.error('Error fetching roles:', err);
        setError('Error fetching roles.');
      }
    };

    fetchUserData();
    fetchRoles();
  }, [id, lang]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { name, email, phone, country, password, user_role } = userData;
    if (!name || !email || !phone || !country || !password || !user_role) {
      setError('Please fill all the fields.');
      setLoading(false);
      return;
    }

    const updatedUserData = {
      name,
      email,
      phone_number: phone,
      country,
      password,
      lang,
      user_type_id: user_role,
    };

    try {
      await axios.put(`${API_URL1}/users/UpdateUser/${id}`, updatedUserData);
      setLoading(false);
      Swal.fire({
        title: 'User Updated Successfully!',
        icon: 'success',
        confirmButtonText: 'Okay',
      }).then(() => {
        navigate(`/users`);
      });
    } catch (err) {
      setError('Error updating user.');
      setLoading(false);
      console.error('Error updating user:', err);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error updating the user.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update User</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={userData.name}
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
            value={userData.email}
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
            value={userData.phone}
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
            value={userData.country}
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
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="user_role"
            value={userData.user_role}
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
          {loading ? 'Updating...' : 'Update User'}
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
