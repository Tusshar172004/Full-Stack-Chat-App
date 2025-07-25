import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="sidebar-wrapper">
      <div className="sidebar-header">
        <div className="sidebar-header-top">
          <Users className="sidebar-icon" />
          <span className="sidebar-title">Contacts</span>
        </div>

        <div className="sidebar-filter">
          <label className="sidebar-filter-label">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="sidebar-checkbox"
            />
            <span className="sidebar-filter-text">Show online only</span>
          </label>
          <span className="sidebar-online-count">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="sidebar-user-list">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`sidebar-user-button ${
              selectedUser?._id === user._id ? "sidebar-user-selected" : ""
            }`}
          >
            <div className="sidebar-user-avatar-container">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="sidebar-user-avatar"
              />
              {onlineUsers.includes(user._id) && (
                <span className="sidebar-user-online-indicator" />
              )}
            </div>

            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.fullName}</div>
              <div className="sidebar-user-status">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="sidebar-no-user">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
