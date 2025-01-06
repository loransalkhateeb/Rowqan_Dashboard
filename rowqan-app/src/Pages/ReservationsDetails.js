import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Components/NavBar";
import "../Styles/ReservationsDetails.css";
import { API_URL1 } from "../App";
import { useNavigate } from "react-router-dom";

function ReservationsDetails() {
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState([]);
  const [error, setError] = useState("");

  const lang = "en";

  useEffect(() => {
    fetchChaletsReservations();
  }, []);

  const fetchChaletsReservations = async () => {
    try {
      const response = await axios.get(
        `${API_URL1}/ReservationsChalets/getAllReservationChalet/${lang}`
      );
      console.log("Chalet reservations response:", response.data);
      if (response.data && response.data) {
        setReservationData(response.data);
        setError("");
      } else {
        setReservationData([]);
        setError("No reservation data found");
      }
    } catch (error) {
      console.error("Error fetching chalet reservations:", error);
      setError("Error fetching chalet reservations.");
      setReservationData([]);
    }
  };

  const handleSeeDetails = (reservation) => {
    navigate(`/detailsChaletPage/${reservation.id}`);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="all-btn">
            <button
              className="create-btn"
              onClick={fetchChaletsReservations}
            >
              Chalets Reservations
            </button>
          </div>
        </div>

        <div className="reservation-dates-table">
          <h3>Chalets Reservations</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Initial Amount</th>
                <th>Reserve Price</th>
                <th>Total Amount</th>
                <th>Cashback</th>
                <th>Chalet Title</th>
                <th>Status</th>
                <th>See Details</th>
              </tr>
            </thead>
            <tbody>
              {
                reservationData.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.id || "N/A"}</td>
                    <td>
                      {reservation.date
                        ? new Date(reservation.date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{reservation.initial_amount || "N/A"}</td>
                    <td>{reservation.reserve_price || "N/A"}</td>
                    <td>{reservation.total_amount || "N/A"}</td>
                    <td>{reservation.cashback || "N/A"}</td>
                    <td>{reservation.chalet?.title || "N/A"}</td>
                    <td>{reservation.status || "N/A"}</td>
                    <td>
                      <button
                        className="create-btn"
                        onClick={() => handleSeeDetails(reservation)}
                      >
                        See Details
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ReservationsDetails;
