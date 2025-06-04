import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="container">
      {/* Left Section */}
      <div className="left-section">
        <div className="form-container">
          {/* Logo Box */}
          <div className="logo-box">
            <div className="logo-content">
              <div className="logo-icon">
                <MessageSquare className="icon" />
              </div>
              <h1 className="form-title">Welcome Back</h1>
              <p className="subtitle">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="form">
            <div className="form-control">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <div className="icon-wrapper">
                  <Mail className="icon-muted" />
                </div>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <div className="icon-wrapper">
                  <Lock className="icon-muted" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="icon-muted" />
                  ) : (
                    <Eye className="icon-muted" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="loader" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="signin-link">
            <p>
              Don’t have an account?{" "}
              <Link to="/signup" className="link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Image Pattern */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};

export default LoginPage;