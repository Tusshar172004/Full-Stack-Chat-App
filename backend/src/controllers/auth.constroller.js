import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req,res) =>{
    const {fullName,email,password} = req.body

   try {

  if(!fullName || !email || !password) {
        return res.status(400).json({ message: "All Fields are required" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 Characters" });
    }

const user = await User.findOne({email})

 if (user) {
        return res.status(400).json({ message: "Email already exists" });
    }
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)

      const newUser = new User ({
        fullName,
        email,
        password:hashedPassword
      })

      if(newUser) {
        generateToken(newUser._id,res)
        await newUser.save();

       res.status(201).json({
  _id: newUser._id,
  fullName: newUser.fullName,
  email: newUser.email,
  profilePic: newUser.profilePic,
  createdAt: newUser.createdAt,
});



      } else {
         return res.status(400).json({ message: "Invalid user data" });
      }


   } catch (error) {
      console.log("Error in signup controller", error.message);
      res.send(500).json({ message: "Internal Server Error"});
   }
};

export const login = async (req,res) =>{
    const {email, password } = req.body
    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
        if(!isPasswordCorrect){
             return res.status(400).json({message: "Invalid Credentials"});
        }

        generateToken(user._id,res)

        res.status(200).json({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  profilePic: user.profilePic,
  createdAt: user.createdAt,
});


    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});

    }
};

export const logout= (req,res) =>{
   try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message: "Logged Out Successfully"});

   } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error "});
   }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { profilePic, onlineStatusVisibility, pushNotificationsEnabled, chatTheme } = req.body;

    const updateData = {};

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updateData.profilePic = uploadResponse.secure_url;
    }

    if (typeof onlineStatusVisibility === "boolean") {
      updateData.onlineStatusVisibility = onlineStatusVisibility;
    }

    if (typeof pushNotificationsEnabled === "boolean") {
      updateData.pushNotificationsEnabled = pushNotificationsEnabled;
    }

    if (chatTheme && ["light", "dark", "system"].includes(chatTheme)) {
      updateData.chatTheme = chatTheme;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      onlineStatusVisibility: updatedUser.onlineStatusVisibility,
      pushNotificationsEnabled: updatedUser.pushNotificationsEnabled,
      chatTheme: updatedUser.chatTheme,
    });
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const checkAuth = (req,res) => {
    try {
       res.status(200).json({
  _id: req.user._id,
  fullName: req.user.fullName,
  email: req.user.email,
  profilePic: req.user.profilePic,
  createdAt: req.user.createdAt,
});


    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}