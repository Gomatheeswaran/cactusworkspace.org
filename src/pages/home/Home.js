import React from "react";
import "./Home.css"; // Import your custom CSS

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="welcome-title">Welcome to Cactus Co Working Pvt Limited</h1>
            <p className="welcome-text">
                Book conference rooms and meeting spaces for your employees' productive work sessions.
            </p>
            <div className="content-blocks">
                <div className="content-block">
                    <h2>Modern Workspace</h2>
                    <p>
                        Our co-working spaces are designed to inspire creativity and collaboration.
                    </p>
                </div>
                <div className="content-block">
                    <h2>Flexible Booking</h2>
                    <p>
                        Choose from various room sizes and booking durations that suit your needs.
                    </p>
                </div>
                <div className="content-block">
                    <h2>High-Quality Amenities</h2>
                    <p>
                        Enjoy high-speed internet, ergonomic furniture, and more for a productive work environment.
                    </p>
                </div>
            </div>
            <img
                src="/path/to/cactus-image.jpg" // Provide the path to your cactus image
                alt="Cactus Co Working"
                className="cactus-image"
            />
        </div>
    );
}

export default Home;
