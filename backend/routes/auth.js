const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

// Valorant karakter avatarlarının URL'leri
const valorantAvatars = [
  "https://i.imgur.com/NvtkNPU.png",
  "https://i.imgur.com/ETMk87f.png",
  "https://i.imgur.com/YrXplp1.png",
  "https://i.imgur.com/MuSjhD6.png",
  "https://i.imgur.com/MdNk3RR.png",  
  "https://i.imgur.com/p6Dn3jY.png",
  "https://i.imgur.com/zZwMI9z.png",
  "https://i.imgur.com/En1W7Y1.png",
  "https://i.imgur.com/MrMQjun.png",
  "https://i.imgur.com/K59jXD9.png",
  "https://i.imgur.com/08cKK0A.png",
  "https://i.imgur.com/8bAEd4o.png",
  "https://i.imgur.com/zTnE1EO.png",
];

// Rastgele bir avatar seçen fonksiyon
const generateRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * valorantAvatars.length);
  return valorantAvatars[randomIndex];
};

// Kullanıcı kaydı (Register)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phone, country } = req.body;
    const defaultAvatar = generateRandomAvatar(); // Rastgele avatar seç

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email address is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: defaultAvatar, // Seçilen avatarı kaydet
      firstName,
      lastName,
      phone,
      country,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred during registration." });
  }
});

// Kullanıcı girişi (Login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: user.avatar, // Avatar bilgisi de döndürülüyor
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      country: user.country,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
