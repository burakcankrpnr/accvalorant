import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "./Products.css";
import { message } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(""); // Varsayılan olarak tüm ürünler listelenecek
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // API'den ürünleri bölgeye göre getir
  const fetchProducts = async (region) => {
    try {
      const url = region ? `${apiUrl}/api/products?region=${region}` : `${apiUrl}/api/products`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } else {
        message.error("Failed to fetch products.");
      }
    } catch (error) {
      console.log("Fetch error:", error);
      message.error("An error occurred while fetching products.");
    }
  };

  // Bölge değiştiğinde ürünleri yükle
  useEffect(() => {
    fetchProducts(selectedRegion);
  }, [selectedRegion]);

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <img
            src="/valorant.png"
            alt="Products Logo"
            className="section-title-logo"
          />
          <h2>Products</h2>
        </div>

        {/* Bölge Seçimi */}
        <div className="region-buttons">
          {["ALL PRODUCTS", "EU", "NA", "LA", "AP"].map((region) => (
            <button
              key={region}
              className={`region-button ${
                selectedRegion === region || (region === "ALL PRODUCTS" && selectedRegion === "") ? "active" : ""
              }`}
              onClick={() => setSelectedRegion(region === "ALL PRODUCTS" ? "" : region)}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Ürün Listesi */}
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductItem productItem={product} key={product._id} />
            ))
          ) : (
            <p className="no-products">
              No products available for the {selectedRegion || "All"} region.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
