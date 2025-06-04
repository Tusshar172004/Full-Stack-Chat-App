import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

 const { signup, isSigningUp, authUser } = useAuthStore();
const navigate = useNavigate();

     useEffect(() => {
  if (authUser) {
    navigate("/");
  }
}, [authUser, navigate]);

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

    const success = validateForm()

    if(success===true) signup(formData);
  };

  return (
    <div class="container">
  
  <div class="left-section">
    <div class="form-container">
      
      <div class="logo-box">
        <div class="logo-content">
          <div class="logo-icon">
            <MessageSquare class="icon" />
          </div>
          <h1 class="form-title">Create Account</h1>
          <p class="subtitle">Get started with your free account</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} class="form">
        <div class="form-control">
          <label class="form-label">Full Name</label>
          <div class="input-wrapper">
            <div class="icon-wrapper">
              <User class="icon-muted" />
            </div>
            <input
              type="text"
              class="form-input"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
        </div>

        <div class="form-control">
          <label class="form-label">Email</label>
          <div class="input-wrapper">
            <div class="icon-wrapper">
              <Mail class="icon-muted" />
            </div>
            <input
              type="email"
              class="form-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div class="form-control">
          <label class="form-label">Password</label>
          <div class="input-wrapper">
            <div class="icon-wrapper">
              <Lock class="icon-muted" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              class="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              class="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff class="icon-muted" />
              ) : (
                <Eye class="icon-muted" />
              )}
            </button>
          </div>
        </div>

        <button type="submit" class="submit-btn" disabled={isSigningUp}>
          {isSigningUp ? (
            <>
              <Loader2 class="loader" />
              Loading...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div class="signin-link">
        <p>
          Already have an account?
          <Link to="/login" class="link-primary">Sign in</Link>
        </p>
      </div>
    </div>
  </div>

 
  <AuthImagePattern
    title="Join our community"
    subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
  />
</div>
  );
};
export default SignUpPage;