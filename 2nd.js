import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import ProductCard from "./ProductCard";

function ProductsPage() {
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [top, setTop] = useState(10);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const { data, loading, fetchProducts } = useFetch(
    company,
    category,
    top,
    minPrice,
    maxPrice
  );

  useEffect(() => {
    fetchProducts();
  }, [company, category, top, minPrice, maxPrice]);

  return (
    <div>
      <Filters
        onChange={{ setCompany, setCategory, setTop, setMinPrice, setMaxPrice }}
      />
      <Sort options={["price", "rating", "discount"]} />
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching products: {error}</p>}
      {data && data.length > 0 && (
        <ul>
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}
      {data && data.length === 0 && <p>No products found.</p>}
      <Pagination />
    </div>
  );
}

export default ProductsPage;
