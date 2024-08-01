import { useState } from "react";
import axios from "axios";

function MarkAttendance() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);

          try {
            const response = await axios.post(
              "http://localhost:5000/mark-attendance",
              {
                name,
                rollNumber,
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              },
              {
                withCredentials: true,
              }
            );
            alert(response.data);
          } catch (error) {
            if (error.response && error.response.data) {
              alert(error.response.data);
            } else {
              alert("Failed to mark attendance");
            }
          }
        },
        (error) => {
          alert("Failed to get location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <h1>Mark Attendance</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />
        <label htmlFor="rollNumber">Roll Number:</label>
        <input
          type="text"
          id="rollNumber"
          name="rollNumber"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />
        <br />
        <br />
        <input type="hidden" id="lat" name="lat" value={lat} />
        <input type="hidden" id="lon" name="lon" value={lon} />
        <button type="submit">Mark Attendance</button>
      </form>
    </div>
  );
}

export default MarkAttendance;
