const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="message-skeleton-wrapper">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`message-skeleton-chat ${
            idx % 2 === 0 ? "message-skeleton-chat-start" : "message-skeleton-chat-end"
          }`}
        >
          <div className="message-skeleton-avatar-wrapper">
            <div className="message-skeleton-avatar">
              <div className="message-skeleton-avatar-skeleton" />
            </div>
          </div>

          <div className="message-skeleton-header">
            <div className="message-skeleton-line-short" />
          </div>

          <div className="message-skeleton-bubble">
            <div className="message-skeleton-line-long" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
