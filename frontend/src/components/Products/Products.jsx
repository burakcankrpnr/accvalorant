import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "./Products.css";
import { message, Input } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(""); // Default to all products
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch products from the API based on region
  const fetchProducts = async (region) => {
    try {
      const url = region ? `${apiUrl}/api/products?region=${region}` : `${apiUrl}/api/products`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with all products
      } else {
        message.error("Failed to fetch products.");
      }
    } catch (error) {
      console.log("Fetch error:", error);
      message.error("An error occurred while fetching products.");
    }
  };

  // Filter products based on the search term
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredProducts(products); // Reset to all products when search is cleared
    } else {
      const lowercasedValue = value.toLowerCase();
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(lowercasedValue)
      );
      setFilteredProducts(filtered);
    }
  };

  // Fetch products when the selected region changes
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

        {/* Region Selection */}
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

        {/* Search Bar */}
        <div className="search-bar">
          <Input
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
            style={{ width: "100%", marginBottom: "20px" }}
          />
        </div>

        {/* Product List */}
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
