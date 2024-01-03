import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";

const Bookings = ({ user, token }) => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch rooms when the component mounts
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/book-room`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  
  // Handle user edit
  const handleDeleteBooking = async (roomId) => {
    // Implement delete logic here
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/book-room/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      fetchBookings();
    } catch (error) {
      console.error("Error deleting bookings:", error);
    }
  };

  // Filter bookings based on search criteria
  const filteredBookings = bookings.filter((booking) =>
    Object.values(booking).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <h2>My Bookings</h2>

      {/* Search box */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Render the list of Bookings */}
      <div
        className="booking-list"
        style={{
          display: "flex",
          flexDirection: "row", // Set the direction to row
          flexWrap: "wrap",
          justifyContent: "space-between", // Align items along the main axis (horizontal)
          alignItems: "stretch", // Align items along the cross axis (vertical)
        }}
      >
        {filteredBookings.map((booking) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 5,
                p: 2,
                width: "auto",
                height: "auto",
              },
            }}
          >
            <Paper elevation={3}>
              <Typography variant="h6" component="h3">
                Booking ID: {booking._id}
              </Typography>
              <Typography variant="body1">
                Room Name: {booking.roomName}
              </Typography>
              <Typography variant="body1">
                From Date: {moment(booking.fromDate).format("MM-DD-YYYY")}
              </Typography>
              <Typography variant="body1">
                To Date: {moment(booking.toDate).format("MM-DD-YYYY")}
              </Typography>

              <Typography variant="body1">
                Start Time: {booking.startTime}
              </Typography>

              <Typography variant="body1">
                End Time: {booking.endTime}
              </Typography>
              <Typography variant="body1">
                Booked By: {booking.userName}
              </Typography>
              <IconButton onClick={() => handleDeleteBooking(booking._id)}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Box>
        ))}
      </div>
    </div>
  );
};

// export default RoomManagement;
const mapStateToProps = (state) => ({
  user: state.user.user,
  token: state.token.token,
});

export default connect(mapStateToProps)(Bookings);
