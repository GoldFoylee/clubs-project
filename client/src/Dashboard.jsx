import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const res = await axios.get(`${API_BASE_URL}/api/users/${id}/dashboard`);

export default function Dashboard() {
  const { id } = useParams(); // expects route like /dashboard/:id
  const userId = id; // you can later get this from auth context instead

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `${API_BASE_URL}/api/users/${userId}`,
          {
            withCredentials: true, // if you use cookies; remove if JWT in headers
          }
        );

        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError(
          err.response?.data?.message || "Failed to load user dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-700 text-lg">
          No user selected. Please provide a user ID in the route.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600 text-lg animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl shadow-sm">
          <p className="font-semibold mb-1">Something went wrong</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Safeguards
  const joinedClubs = user?.joinedClubs || [];
  const registeredEvents = user?.registeredEvents || [];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {user.name} 👋
          </h1>
          <p className="text-slate-600">
            Here’s a quick overview of your clubs and events.
          </p>
        </header>

        {/* Top Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100">
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
              Role
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {user.role}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100">
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
              Joined Clubs
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {joinedClubs.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100">
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
              Events Registered
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {registeredEvents.length}
            </p>
          </div>
        </section>

        {/* Main Content: Clubs + Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Joined Clubs */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Your Clubs
            </h2>

            {joinedClubs.length === 0 ? (
              <p className="text-sm text-slate-500">
                You haven&apos;t joined any clubs yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {joinedClubs.map((club) => (
                  <li
                    key={club.id}
                    className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {club.name}
                      </p>
                      {club.category && (
                        <p className="text-xs text-slate-500">
                          {club.category}
                        </p>
                      )}
                    </div>
                    {/* Placeholder for future "View" button */}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Registered Events */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Your Events
            </h2>

            {registeredEvents.length === 0 ? (
              <p className="text-sm text-slate-500">
                You haven&apos;t registered for any events yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {registeredEvents.map((event) => (
                  <li
                    key={event.id}
                    className="bg-slate-50 rounded-xl px-3 py-2"
                  >
                    <p className="text-sm font-medium text-slate-900">
                      {event.title}
                    </p>
                    {event.startDate && (
                      <p className="text-xs text-slate-500">
                        {new Date(event.startDate).toLocaleString()}
                      </p>
                    )}
                    {event.venue && (
                      <p className="text-xs text-slate-500">
                        Venue: {event.venue}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
