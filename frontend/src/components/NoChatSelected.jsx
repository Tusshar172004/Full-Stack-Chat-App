import { MessageSquare } from "lucide-react";


const NoChatSelected = () => {
  return (
    <div className="nochat-wrapper">
      <div className="nochat-content">
        <div className="nochat-icon-container">
          <div className="nochat-icon-bounce">
            <MessageSquare className="nochat-icon" />
          </div>
        </div>

        <h2 className="nochat-title">Welcome to Chatty!</h2>
        <p className="nochat-subtitle">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
