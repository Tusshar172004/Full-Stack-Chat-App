import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <div className="navbar-logo-icon">
                <MessageSquare className="navbar-icon" />
              </div>
              <h1 className="navbar-title">Chat-Trix</h1>
            </Link>
          </div>

          <div className="navbar-right">
            <Link to="/settings" className="navbar-button">
              <Settings className="navbar-button-icon" />
              <span className="navbar-button-text">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="navbar-button">
                  <User className="navbar-button-icon" />
                  <span className="navbar-button-text">Profile</span>
                </Link>

                <button className="navbar-logout" onClick={logout}>
                  <LogOut className="navbar-button-icon" />
                  <span className="navbar-button-text">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;