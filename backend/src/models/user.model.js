import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
         password: {
            type: String,
            required: true,
             minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },

         onlineStatusVisibility: {
      type: Boolean,
      default: true,  // control who can see online status - true means visible
    },
    pushNotificationsEnabled: {
      type: Boolean,
      default: true,  // toggle push notifications
    },
    chatTheme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",  // theme choice
    },
        
    },
    {timestamps: true}
    
);

const User = mongoose.model("User", userSchema);

export default User;