// useChatStore.js
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    if (!userId) return;
    set({ isMessagesLoading: true, messages: [] });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
  const { selectedUser, messages } = get();
  if (!selectedUser) return;

  try {
    const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);

    set({ messages: [...messages, res.data] });

    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.emit("sendMessage", {
        recipientId: selectedUser._id,
        message: res.data,
      });
    }

  } catch (error) {
    console.error("Send Message Error:", error); // ✅ Helps debugging
    toast.error(error.response?.data?.message || "Failed to send message");
  }
},


  subscribeToMessages: () => {
    const { selectedUser } = get();
    const socket = useAuthStore.getState().socket;
    if (!socket || !selectedUser) return;

    socket.on("newMessage", (newMessage) => {
      set((state) => {
        // Check if message already exists
        if (state.messages.some(msg => msg._id === newMessage._id)) {
          return state;
        }
        return { messages: [...state.messages, newMessage] };
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
    if (user) {
      get().getMessages(user._id);
    }
  },
}));