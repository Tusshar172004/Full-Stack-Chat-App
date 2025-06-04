import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
 // 👈 Import the CSS file

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="home-wrapper">
      <div className="home-content">
        <div className="home-box">
          <div className="home-chat-layout">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
