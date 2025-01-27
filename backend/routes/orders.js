const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Sipariş listeleme hatası:", error);
    return res.status(500).json({
      success: false,
      message: "Siparişler getirilirken bir hata oluştu.",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, products } = req.body;

    const newOrder = new Order({
      user: userId,
      products,
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Sipariş başarıyla oluşturuldu.",
      order: newOrder,
    });
  } catch (error) {
    console.error("Sipariş oluşturma hatası:", error);
    return res.status(500).json({
      success: false,
      message: "Sipariş oluşturulurken hata oluştu.",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("user")
      .populate("products.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Sipariş bulunamadı.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Sipariş detayı hatası:", error);
    return res.status(500).json({
      success: false,
      message: "Sipariş detayı getirilirken bir hata oluştu.",
    });
  }
});

module.exports = router;
