const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const crypto = require("crypto");

router.post("/", async (req, res) => {
  console.log("Shopier ödeme rotası tetiklendi");

  const { products, user, cargoFee } = req.body;

  let totalAmount = 0;
  products.forEach((product) => {
    const price = parseFloat(product.price);
    const quantity = parseInt(product.quantity, 10) || 1;
    if (!isNaN(price)) {
      totalAmount += price * quantity;
    }
  });

  if (cargoFee !== 0) {
    totalAmount += parseFloat(cargoFee) || 0;
  }

  totalAmount = totalAmount.toFixed(2).replace(".", ",");

  const orderId = "ORD" + Date.now();

  const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN || "https://varsayilan-url.com";
  const okUrl = `${CLIENT_DOMAIN}/success`;
  const failUrl = `${CLIENT_DOMAIN}/fail`;

  const apiPassword = process.env.SHOPIER_API_PASSWORD;
  const apiKey = process.env.SHOPIER_API_KEY;
  
  const hashString = apiPassword + orderId + totalAmount + okUrl + failUrl;
  const hash = crypto.createHash("md5").update(hashString).digest("hex");

  const shopierUrl = "https://www.shopier.com/ShowProduct/api_checkout";

  const formHtml = `
    <form id="shopierForm" method="POST" action="${shopierUrl}">
      <input type="hidden" name="api_key" value="${apiKey}" />
      <input type="hidden" name="order_id" value="${orderId}" />
      <input type="hidden" name="total" value="${totalAmount}" />
      <input type="hidden" name="ok_url" value="${okUrl}" />
      <input type="hidden" name="fail_url" value="${failUrl}" />
      <input type="hidden" name="hash" value="${hash}" />
      <input type="submit" value="Ödemeye Git" />
    </form>
    <script>document.getElementById("shopierForm").submit();</script>
  `;

  res.send(formHtml);
});

module.exports = router;
