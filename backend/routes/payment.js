const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const { products, user, cargoFee } = req.body;

  // Ürünlerin fiyatlarını ve miktarlarını doğrulayarak line_items oluşturma
  const lineItems = products.map((product) => {
    const price = parseFloat(product.price);
    const quantity = parseInt(product.quantity, 10) || 1;

    // Geçersiz fiyat kontrolü
    if (isNaN(price)) {
      console.error(`Geçersiz fiyat tespit edildi: ${product.name} - ${product.price}`);
      // Gerekirse burada bir hata döndürebilir veya varsayılan bir değer atayabilirsiniz.
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(price * 100), // cent cinsine dönüştürme
      },
      quantity: quantity,
    };
  });

  // Kargo ücreti kontrolü ve eklenmesi
  if (cargoFee !== 0) {
    const fee = parseFloat(cargoFee);

    if (isNaN(fee)) {
      console.error(`Geçersiz kargo ücreti tespit edildi: ${cargoFee}`);
      // Gerekirse burada bir hata döndürebilir veya varsayılan bir değer atayabilirsiniz.
    } else {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Hızlı Kargo",
          },
          unit_amount: Math.round(fee * 100), // cent cinsinde dönüştürme
        },
        quantity: 1,
      });
    }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN}/success`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Ödeme oturumu oluşturulurken hata:", error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
