import React, { useState } from "react";
import "./BookingForm.css"; // Import your custom CSS

const BookingForm = () => {
    const [selectedRoom, setSelectedRoom] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const roomOptions = [
        "Conference Room A",
        "Conference Room B",
        "Conference Room C",
        "Meeting Room X",
        "Meeting Room Y",
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your form submission logic here
    };

    return (
        <div className="booking-form-container">
            <h2 className="form-title">Conference Room Booking</h2>
            <form onSubmit={handleSubmit} className="booking-form">
            <label className="form-label">Select Room:</label>
                <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="form-input"
                >
                    <option value="">Select a room</option>
                    {roomOptions.map((room, index) => (
                        <option key={index} value={room}>
                            {room}
                        </option>
                    ))}
                </select>

                <label className="form-label">Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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
        </div>
    );
};

export default BookingForm;
