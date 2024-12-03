import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Components/NavBar";
import "../Styles/ReservationsDetails.css";
import { API_URL } from "../App";
import { useNavigate, useLocation } from "react-router-dom";

function ReservationsDetails() {
  const navigate = useNavigate()
  const [reservationData, setReservationData] = useState([]);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const location = useLocation();
  const lang =
    location.pathname.split("/")[1] === "ar" ||
    location.pathname.split("/")[1] === "en"
      ? location.pathname.split("/")[1]
      : "en";

  useEffect(() => {
    if (selectedType === "chalets") {
      fetchChaletsReservations();
    } else if (selectedType === "events") {
      fetchEventsReservations();
    } else if (selectedType === "lands") {
      fetchLandsReservations();
    }
  }, [selectedType]);

  const fetchChaletsReservations = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/ReservationDates/getAllReservationDates/${lang}`
      );
      setReservationData(response.data.reservationDates);
    } catch (error) {
      console.error("Error fetching chalet reservations:", error);
      setError("Error fetching chalet reservations.");
    }
  };

  const fetchEventsReservations = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/reservationsEvents/getAllreservationevents/${lang}`
      );
      setReservationData(response.data.reservations);
    } catch (error) {
      console.error("Error fetching event reservations:", error);
      setError("Error fetching event reservations.");
    }
  };

  const fetchLandsReservations = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/reservationLands/getreservationslands/${lang}`
      );
      setReservationData(response.data.reservations);
    } catch (error) {
      console.error("Error fetching land reservations:", error);
      setError("Error fetching land reservations.");
    }
  };

  const handleBookNow = (chaletId) => {
    console.log(`Chalet ID ${chaletId} booked!`);
    navigate(`/detailsChaletPage/${chaletId}`);  
  };

  const handleButtonClick = (type) => {
    setSelectedType(type);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="all-btn">
            <button
              className="create-btn"
              onClick={() => handleButtonClick("chalets")}
            >
              Chalets Reservations
            </button>
            <button
              className="create-btn"
              onClick={() => handleButtonClick("events")}
            >
              Events Reservations
            </button>
            <button
              className="create-btn"
              onClick={() => handleButtonClick("lands")}
            >
              Lands Reservations
            </button>
          </div>
        </div>

        <div className="reservation-dates-table">
          <h3>
            {selectedType
              ? `${
                  selectedType.charAt(0).toUpperCase() + selectedType.slice(1)
                } Reservations`
              : "All Reservations"}
          </h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                {selectedType === "chalets" ? (
                  <>
                    <th>Chalet Title</th>
                    <th>Right Time</th>
                    <th>Right Time Name</th>
                    <th>See Details for the spcefic chalet </th>
                  </>
                ) : selectedType === "events" ? (
                  <>
                    <th>Event Title</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                  </>
                ) : selectedType === "lands" ? (
                  <>
                    <th>Land Title</th>
                    <th>Time</th>
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {reservationData.length > 0 ? (
                reservationData.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.id}</td>
                    <td>{new Date(reservation.date).toLocaleString()}</td>
                    {selectedType === "chalets" ? (
                      <>
                        <td>
                          {reservation.Chalet
                            ? reservation.Chalet.title
                            : "N/A"}
                        </td>
                        <td>
                          {reservation.RightTimeModel
                            ? `${reservation.RightTimeModel.time}`
                            : "N/A"}
                        </td>
                        <td>
                          {reservation.RightTimeModel
                            ? `${reservation.RightTimeModel.name}`
                            : "N/A"}
                        </td>
                        <td>
                          <button
                            className="book-now-btn"
                            onClick={() => handleBookNow(reservation.Chalet.id)}
                          >
                           See Details
                          </button>
                        </td>
                      </>
                    ) : selectedType === "events" ? (
                      <>
                        <td>
                          {reservation.Available_Event
                            ? reservation.Available_Event.title
                            : "N/A"}
                        </td>
                        <td>
                          {reservation.start_time
                            ? reservation.start_time
                            : "N/A"}
                        </td>
                        <td>
                          {reservation.end_time ? reservation.end_time : "N/A"}
                        </td>
                      </>
                    ) : selectedType === "lands" ? (
                      <>
                        <td>
                          {reservation.CategoriesLand
                            ? reservation.CategoriesLand.title
                            : "N/A"}
                        </td>
                        <td>{reservation.time ? reservation.time : "N/A"}</td>
                      </>
                    ) : null}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={
                      selectedType === "chalets"
                        ? 6
                        : selectedType === "events"
                        ? 4
                        : 4
                    }
                  >
                    {error || "No reservation data found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ReservationsDetails;
