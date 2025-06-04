import React, { useState, useEffect } from "react";

const SettingsPage = () => {
  const [readReceipts, setReadReceipts] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);

  // New states
  const [onlineStatusVisibility, setOnlineStatusVisibility] = useState(true);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);
  const [chatTheme, setChatTheme] = useState("system");

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const rr = localStorage.getItem("read-receipts");
    const os = localStorage.getItem("online-status");
    const osv = localStorage.getItem("onlineStatusVisibility");
    const pne = localStorage.getItem("pushNotificationsEnabled");
    const ct = localStorage.getItem("chatTheme");

    if (rr !== null) setReadReceipts(rr === "true");
    if (os !== null) setOnlineStatus(os === "true");
    if (osv !== null) setOnlineStatusVisibility(osv === "true");
    if (pne !== null) setPushNotificationsEnabled(pne === "true");
    if (ct !== null) setChatTheme(ct);
  }, []);

  // Save changes to localStorage when values update
  useEffect(() => {
    localStorage.setItem("read-receipts", readReceipts);
  }, [readReceipts]);

  useEffect(() => {
    localStorage.setItem("online-status", onlineStatus);
  }, [onlineStatus]);

  useEffect(() => {
    localStorage.setItem("onlineStatusVisibility", onlineStatusVisibility);
  }, [onlineStatusVisibility]);

  useEffect(() => {
    localStorage.setItem("pushNotificationsEnabled", pushNotificationsEnabled);
  }, [pushNotificationsEnabled]);

  useEffect(() => {
    localStorage.setItem("chatTheme", chatTheme);
  }, [chatTheme]);

  // On selecting theme from dropdown (only stores choice, no theme logic)
  const handleThemeChange = (e) => {
    setChatTheme(e.target.value);
  };

  return (
    <div className="settings-page">
      <h2 className="settings-title">⚙️ Chat Settings</h2>

      <div className="setting-item">
        <span>Show Read Receipts</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={readReceipts}
            onChange={() => setReadReceipts((prev) => !prev)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="setting-item">
        <span>Show Online Status</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={onlineStatus}
            onChange={() => setOnlineStatus((prev) => !prev)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      {/* New Settings */}

      <div className="setting-item">
        <span>Who can see your online status</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={onlineStatusVisibility}
            onChange={() => setOnlineStatusVisibility((prev) => !prev)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="setting-item">
        <span>Push Notifications</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={pushNotificationsEnabled}
            onChange={() => setPushNotificationsEnabled((prev) => !prev)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="setting-item">
        <span>Choose Theme</span>
        <select value={chatTheme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPage;
