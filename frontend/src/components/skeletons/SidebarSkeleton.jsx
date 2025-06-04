import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="sidebar-skeleton-container">
      {/* Header */}
      <div className="sidebar-skeleton-header">
        <div className="sidebar-skeleton-header-content">
          <Users className="sidebar-skeleton-icon" />
          <span className="sidebar-skeleton-title">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="sidebar-skeleton-list">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="sidebar-skeleton-item">
            <div className="sidebar-skeleton-avatar-wrapper">
              <div className="sidebar-skeleton-avatar" />
            </div>

            <div className="sidebar-skeleton-info">
              <div className="sidebar-skeleton-line sidebar-skeleton-line-1" />
              <div className="sidebar-skeleton-line sidebar-skeleton-line-2" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
