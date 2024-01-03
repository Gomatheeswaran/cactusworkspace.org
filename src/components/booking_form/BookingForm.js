import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookingForm.css"; // Import your custom CSS
import { connect } from "react-redux";
import { Snackbar } from "@mui/material";
import { FormControl } from '@mui/material';

const BookingForm = ({ user, token }) => {
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const bookedBy = user._id;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [timeAvailability, setTimeAvailability] = useState([]);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/rooms`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
    getDateAvailability();
  }, []);

  const getDateAvailability = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/book-room/get-date-time`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeAvailability(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const postBooking = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/book-room`,
        {
          roomId,
          fromDate,
          toDate,
          startTime,
          endTime,
          bookedBy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setSnackbarMessage("Booking posted successfully");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error posting data:", error);
      setSnackbarMessage("Failed to post booking");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = (e) => {
    postBooking();
    e.preventDefault();
    // Implement your form submission logic here
  };

  return (
    <div className="booking-form-container">
      <h2 className="form-title">Conference Room Booking</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label className="form-label">Select Room:</label>
        <select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="form-input"
        >
          <option value="">Select a room</option>
          {rooms?.map((room, index) => (
            <option key={index} value={room._id}>
              {room.roomName}
            </option>
          ))}
        </select>

        <label className="form-label">From Date:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="form-input"
        />

        <label className="form-label">To Date:</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="form-input"
        />

        <label className="form-label">Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="form-input"
        />

        <label className="form-label">End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="form-input"
        />

        <button type="submit" className="submit-button">
          Book Room
        </button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  token: state.token.token,
});

export default connect(mapStateToProps)(BookingForm);