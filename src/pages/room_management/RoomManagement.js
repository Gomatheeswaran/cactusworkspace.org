import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from 'react-redux';

const RoomManagement = ({ user, token }) => {
    const [rooms, setRooms] = useState([]);
    const [roomDetails, setRoomDetails] = useState({
        roomName: "",
        noOfSeats: 0,
        isVideoConf: false,
        isProjector: false,
        // fromTime: "",
        // toTime: "",
        createdBy: user._id
    });

    useEffect(() => {
        // Fetch rooms when the component mounts
        fetchRooms();
    }, []);
   
    const fetchRooms = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/rooms`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRooms(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, type, checked, value } = event.target;
        
        // Use the 'checked' property for checkboxes, and 'value' for other inputs
        const inputValue = type === 'checkbox' ? checked : value;
    
        setRoomDetails((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));
    };
    

    // Handle form submission to add a new user
    const handleAddRoom = async (event) => {
        event.preventDefault();
        try {
            await axios.post(
                `${process.env.REACT_APP_BASE_URL}/rooms`,
                roomDetails,  // The data you want to send
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            fetchRooms();
            // Clear the form fields after adding a user
            setRoomDetails({
                roomName: "",
                noOfSeats: 0,
                isVideoConf: false,
                isProjector: false,
                // fromTime: "",
                // toTime: "",
                createdBy: user._id
            });
        } catch (error) {
            console.error("Error adding room:", error);
        }
    };

    // Handle user edit
    const handleEditRoom = async (roomId) => {
        // Implement edit logic here
    };

    // Handle user delete
    const handleDeleteRoom = async (roomId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/rooms/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchRooms(); // Refresh the room list after deletion
        } catch (error) {
            console.error("Error deleting room:", error);
        }
    };

    return (
        <div>
            <h2>Room Management</h2>
            <form onSubmit={handleAddRoom}>
                Room name: 
                <input
                    type="text"
                    name="roomName"
                    placeholder="room name"
                    value={roomDetails.roomName}
                    onChange={handleInputChange}
                /> <br/>
                No. of Seats: <input
                    type="number"
                    name="noOfSeats"
                    placeholder="No. of Seats"
                    value={roomDetails.noOfSeats}
                    onChange={handleInputChange}
                /> <br/>
                Video conference:
                <input
                    type="checkbox"
                    name="isVideoConf"
                    checked={roomDetails.isVideoConf}
                    onChange={handleInputChange}
                /> <br />
                Projector:
                <input
                    type="checkbox"
                    name="isProjector"
                    checked={roomDetails.isProjector}
                    onChange={handleInputChange}
                /> <br />
                {/* From: <input
                    type="time"
                    name="fromTime"
                    placeholder="From"
                    value={roomDetails.fromTime}
                    onChange={handleInputChange}
                /> <br />

                To: <input
                    type="time"
                    name="toTime"
                    placeholder="To"
                    value={roomDetails.toTime}
                    onChange={handleInputChange}
                /> */}
                <button type="submit">Add Room</button>
            </form>
            {/* Render the list of users */}
            <ul>
                {rooms.map((room) => (
                    <li key={room._id}>
                        {room.roomName} - Created by: {user.username}
                        <button onClick={() => handleEditRoom(room._id)}>Edit</button>
                        <button onClick={() => handleDeleteRoom(room._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// export default RoomManagement;
const mapStateToProps = (state) => ({
    user: state.user.user,
    token: state.token.token
  });
  
  export default connect(mapStateToProps)(RoomManagement);