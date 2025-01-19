const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

// Yeni bir ürün oluşturma (Create)
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body); // `stockStatus` will be included in req.body
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Tüm ürünleri getirme (Read - All)
// Bölgeye ve stok durumuna göre filtreleme ekledik
router.get("/", async (req, res) => {
  try {
    const { region, stockStatus } = req.query; // Region ve stok durumu query parametrelerini al
    const query = {};

    if (region) query.regions = region;
    if (stockStatus) query.stockStatus = stockStatus;

    const products = await Product.find(query);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Belirli bir ürünü getirme (Read - Single)
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Ürün güncelleme (Update)
// Ürün güncelleme (Update)
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Update the product with the new fields
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...updates,
        // Ensure regions and stockStatus are updated if provided
        ...(updates.regions && { regions: updates.regions }),
        ...(updates.stockStatus && { stockStatus: updates.stockStatus }),
      },
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});


// Ürün silme (Delete)
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Ürünleri isme göre ara
router.get("/search/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;
    const products = await Product.find({
      name: { $regex: productName, $options: "i" },
    });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Bölgeye göre ürünleri getir
router.get("/region/:region", async (req, res) => {
  try {
    const { region } = req.params;
    const products = await Product.find({ regions: region });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: `No products found in the ${region} region.` });
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
  