// backend/routes/payment.js
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const crypto = require("crypto");

router.post("/", async (req, res) => {
  console.log("Shopier ödeme rotası tetiklendi"); // Bu mesajın sunucu logunda göründüğünden emin olun

  const { products, user, cargoFee } = req.body;

  // Ürünlerin fiyatlarını ve miktarlarını hesaplayarak toplam tutar oluşturma
  let totalAmount = 0;
  products.forEach((product) => {
    const price = parseFloat(product.price);
    const quantity = parseInt(product.quantity, 10) || 1;
    if (!isNaN(price)) {
      totalAmount += price * quantity;
    } else {
      console.error(`Geçersiz fiyat tespit edildi: ${product.name} - ${product.price}`);
    }
  });

  // Kargo ücreti eklenmesi
  if (cargoFee !== 0) {
    const fee = parseFloat(cargoFee);
    if (!isNaN(fee)) {
      totalAmount += fee;
    } else {
      console.error(`Geçersiz kargo ücreti tespit edildi: ${cargoFee}`);
    }
  }

  totalAmount = totalAmount.toFixed(2); // İki ondalıklı

  // Sipariş ID'si oluşturma (örnek: timestamp tabanlı)
  const orderId = "order_" + Date.now();

  // Başarılı ve başarısız dönüş URL'leri
  const okUrl = `${process.env.CLIENT_DOMAIN}/success`;
  const failUrl = `${process.env.CLIENT_DOMAIN}/fail`;

  // Shopier için hash hesaplama (md5: API ŞİFRE + orderId + totalAmount + okUrl + failUrl)
  const apiPassword = "dd98a561a4b2754f4af675d133b45191"; // Shopier API ŞİFRE
  const hashString = apiPassword + orderId + totalAmount + okUrl + failUrl;
  const hash = crypto.createHash("md5").update(hashString).digest("hex");

  // Shopier ödeme formu için gerekli veriler
  const shopierData = {
    api: "6c52b3292d9b8f4fc0fbfabd6678efec", // Shopier API KULLANICI
    order_id: orderId,
    total: totalAmount,
    ok_url: okUrl,
    fail_url: failUrl,
    hash: hash,
  };

  // Shopier ödeme endpoint URL'si
  const shopierUrl = "https://www.shopier.com/ShowProduct/api_checkout";

  try {
    res.status(200).json({ shopierUrl, shopierData });
  } catch (error) {
    console.error("Shopier ödeme formu oluşturulurken hata:", error);
    res.status(500).json({ error: "Ödeme işlemi sırasında bir hata oluştu." });
  }
});

module.exports = router;
