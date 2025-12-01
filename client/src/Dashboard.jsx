import { useEffect, useState } from "react";
import { getUserById } from "./api/user";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // For now, hardcode id 1 or use localStorage
  const userId = localStorage.getItem("userId") || 1;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getUserById(Number(userId));

        setUser({
          name: data.name,
          role: data.role,
        });

        setJoinedClubs(data.clubs || []);
        setRegisteredEvents(data.events || []);
      } catch (err) {
        console.error(err);
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load user dashboard.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return (
      <div>
        <h2>Dashboard</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h2>Dashboard</h2>
        <p>No user data found.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Role: {user.role}</p>
      <p>Joined clubs: {joinedClubs.length}</p>
      <p>Events registered: {registeredEvents.length}</p>
    </div>
  );
}

export default Dashboard;
