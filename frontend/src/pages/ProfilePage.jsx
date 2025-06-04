import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="profile-container">
  <div className="profile-wrapper">
    <div className="profile-box">
      <div className="profile-header">
        <h1>Profile</h1>
        <p>Your profile information</p>
      </div>

      {/* Avatar upload */}
      <div className="avatar-upload">
        <div className="avatar-wrapper">
          <img
            src={selectedImg || authUser.profilePic || "/avatar.png"}
            alt="Profile"
            className="avatar-img"
          />
          <label
            htmlFor="avatar-upload"
            className={`avatar-edit ${isUpdatingProfile ? "disabled" : ""}`}
          >
            <Camera className="camera-icon" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden-input"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <p className="avatar-msg">
          {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
        </p>
      </div>

      {/* Full Name */}
      <div className="profile-info">
        <div className="info-label">
          <User className="info-icon" />
          Full Name
        </div>
        <p className="info-box">{authUser?.fullName}</p>
      </div>

      {/* Email */}
      <div className="profile-info">
        <div className="info-label">
          <Mail className="info-icon" />
          Email Address
        </div>
        <p className="info-box">{authUser?.email}</p>
      </div>

      {/* Account Info */}
      <div className="account-section">
        <h2>Account Information</h2>
        <div className="account-info">
          <div className="account-row">
            <span>Member Since</span>
    <span>
  {authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString("en-GB", {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : "N/A"}
</span>
          </div>
          <div className="account-row">
            <span>Account Status</span>
            <span className="active-status">Active</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};
export default ProfilePage;