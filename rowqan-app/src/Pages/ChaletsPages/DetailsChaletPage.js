import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../Components/NavBar";
import "../../Styles/ChaletsDetailStyle.css";
import { useParams } from "react-router-dom";
import { API_URL } from "../../App";

function DetailsChaletPage() {
  const { id } = useParams();
  const [chaletImages, setChaletImages] = useState([]);
  const [chaletDetails, setChaletDetails] = useState([]);
  const [reservationDates, setReservationDates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const API_Images = 'https://res.cloudinary.com/durjqlivi'

  useEffect(() => {
    const fetchChaletImages = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/chaletsimages/chaletgetChaletImage/${id}`
        );
        setChaletImages(response.data.images);
      } catch (error) {
        console.error("Error fetching chalet images:", error);
        setError("Failed to fetch chalet images.");
      }
    };

    const fetchChaletDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/chaletsdetails/getChaletDetailsByChaletId/${id}/ar`
        );
        setChaletDetails(response.data.chaletDetails);
      } catch (error) {
        console.error("Error fetching chalet details:", error);
        setError("Failed to fetch chalet details.");
      }
    };

    const fetchReservationDates = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/ReservationDates/getreservationdatesbychalet/${id}/en`
        );
        setReservationDates(response.data.reservationDates);
      } catch (error) {
        console.error("Error fetching reservation dates:", error);
        setError("Failed to fetch reservation dates.");
      }
    };

    fetchChaletImages();
    fetchChaletDetails();
    fetchReservationDates();
  }, [id]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDetails = chaletDetails.filter((detail) =>
    detail.Detail_Type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReservationDates = reservationDates.filter((reservation) =>
    reservation.RightTimeModel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.date.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const isReservedDate = (date) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const reservationDate = new Date(date).toISOString().split('T')[0];
    return reservationDate === currentDate;
  };

  return (
    <>
      <NavBar />
      <div className="details-page">
        <h4>Details Chalet Page</h4>
        {error && <p className="error">{error}</p>}

        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Details"
            className="search-input"
          />
        </div>

        <div className="chalet-images">
          <h5 style={{ marginTop: "20px" }}>Chalet Images</h5>
          <div className="images-grid">
            {chaletImages.map((image, index) => (
              <img
                style={{
                  width: "220px",
                  marginLeft: "20px",
                  marginBottom: "50px",
                  marginTop: "20px",
                }}
                key={index}
                src={`${API_Images}/${image}`}
                alt={`Chalet ${index + 1}`}
                className="chalet-image"
              />
            ))}
          </div>
        </div>

        <div className="chalet-details">
          <h5>Chalet Details</h5>
          <ul>
            {filteredDetails.map((detail) => (
              <li key={detail.id} className="detail-item">
                {detail.Detail_Type}
              </li>
            ))}
          </ul>
        </div>

        <div className="reservation-dates">
          <h5>Reservation Dates</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Right Time</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservationDates.map((reservation) => (
                <tr
                  key={reservation.id}
                  className={isReservedDate(reservation.date) ? "table-danger" : ""}
                >
                  <td>{new Date(reservation.date).toLocaleString()}</td>
                  <td>{reservation.RightTimeModel ? reservation.RightTimeModel.name : 'N/A'}</td>
                  <td>{reservation.RightTimeModel ? reservation.RightTimeModel.time : 'N/A'}</td>
                  <td>
                    {isReservedDate(reservation.date) ? (
                      <span className="text-danger">محجوز</span>
                    ) : (
                      <span>متاح</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DetailsChaletPage;
