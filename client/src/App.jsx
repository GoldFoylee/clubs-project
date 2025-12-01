import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginSignup from "./components/LoginSignup.jsx";
import Dashboard from "./Dashboard.jsx";


function ProtectedRoute({ children }) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function App() {
  const isLoggedIn = !!localStorage.getItem("userId");

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginSignup />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

