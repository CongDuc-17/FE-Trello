import { useEffect, useState } from "react";
import Register from "@/components/ui/Register";
import Login from "@/components/ui/Login";
import Dashboard from "@/components/ui/Dashboard";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [loading, setLoading] = useState(false);

  function goToRegister() {
    setShowLogin(false);
    setShowRegister(true);
    setShowDashboard(false);
  }

  function goToLogin() {
    setShowLogin(true);
    setShowRegister(false);
    setShowDashboard(false);
  }

  function goToDashboard() {
    setShowLogin(false);
    setShowRegister(false);
    setShowDashboard(true);
  }

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      goToDashboard();
    } else {
      goToLogin();
    }
    setLoading(false);
  }, []);

  if (loading) return null; //thay vi return null, co the return hieu ung loading de call cac API quan trong

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {showLogin && (
        <Login goToDashboard={goToDashboard} goToRegister={goToRegister} />
      )}
      {showRegister && <Register goToLogin={goToLogin} />}
      {showDashboard && <Dashboard />}
    </div>
  );
}

export default App;
