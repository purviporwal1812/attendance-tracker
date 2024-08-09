import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {

    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms", error);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomSelection = async (roomId) => {
    try {
      await axios.post("http://localhost:5000/admin/select-room", { roomId });
      setSelectedRoom(roomId);
      console.log(roomId)
      alert("Room selected successfully");
    } catch (error) {
      console.error("Error selecting room", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Select Room</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name} - Lat: {room.minlat} to {room.maxlat}, Lon: {room.minlon} to {room.maxlon}
            <button onClick={() => handleRoomSelection(room.id)}>
              {room.selected ? "Currently Selected" : "Select"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
