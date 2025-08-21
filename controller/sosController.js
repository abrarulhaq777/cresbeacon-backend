import fetch from "node-fetch";
import Admin from "../models/adminSchema.js";
import sosSchema from "../models/sosSchema.js";

// --- Send push notification helper ---
async function sendPushNotification(targetToken, latitude, longitude, userId) {
  const message = {
    to: targetToken,
    sound: "default",
    title: "🚨 SOS Alert!",
    body: `User ${userId} triggered SOS at [${latitude}, ${longitude}]`,
    data: { latitude, longitude, userId },
  };

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  const data = await response.json();
  console.log("Expo response:", data);
}

// --- Controller functions ---

// Register admin push token
export const registerAdmin = async (req, res) => {
  try {
    const { email,password, expoPushToken,name, role } = req.body;
    let admin = await Admin.findOne({ email });

    if (admin) {
      admin.expoPushToken = expoPushToken;
      await admin.save();
    } else {
      admin = new Admin({ email,password, expoPushToken,role });
      await admin.save();
    }
    console.log(admin)
    res.json({ success: true, message: "Admin registered",userId: admin._id,role: admin.role});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const expoSaveToken = async (req,res) => {
  try {
    const { userId, token } = req.body;

    if (!userId || !token) {
      return res.status(400).json({ error: "Missing adminId or token" });
    }

    // update or insert admin with new token
    const admin = await Admin.findByIdAndUpdate(
      userId,
      { expoPushToken: token },
      { new: true, upsert: true }
    );

    res.json({ success: true, admin });
  } catch (err) {
    console.error("Error saving token:", err);
    res.status(500).json({ error: "Failed to save token" });
  }
}

export const getSOS = async (req, res) => {
  try {
    // Fetch all SOS entries, optionally sort by newest first
    const sosList = await sosSchema.find().sort({ createdAt: -1 });

    res.json({ success: true, data: sosList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const login = async (req,res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find user
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare plain password
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Success → return userId
    res.json({
      success: true,
      userId: user._id,
      role: user.role,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}



// User triggers SOS
export const sendSOS = async (req, res) => {
  try {
    const { latitude, longitude, userId } = req.body;

    // 1. Save the SOS in the database
    const newSOS = await sosSchema.create({
      user: userId,
      latitude,
      longitude,
      status: "active", // optional, you can track if SOS is handled
      createdAt: new Date(),
    });

    // 2. Fetch all admins
    const admins = await Admin.find({ role: "admin" });

    console.log(admins);

    // 3. Send push notification to each admin
    // for (let admin of admins) {
    //   await sendPushNotification(admin.expoPushToken, latitude, longitude, userId);
    // }

    res.json({ success: true, message: "SOS saved and sent to admins", sos: newSOS });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};