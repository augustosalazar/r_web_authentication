import React, { useEffect, useState, createContext } from "react";
import ProductService from "../service/product_service";

// Create the context
export const ProductContext = createContext({
  products: [],
  loading: false,
  error: null,
  refreshProducts: () => {},
  createProduct: async (data) => {},
  updateProduct: async (id, data) => {},
  deleteProduct: async (id) => {}
});

// Provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial fetch
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await ProductService.getProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Create a new product
  const createProduct = async (productData) => {
    setLoading(true);
    try {
      await ProductService.addProduct(productData);
      fetchProducts();
    } catch (err) {
      setError("Failed to create product.");
      console.error("Create product failed:", err);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Update an existing product
  const updateProduct = async (product) => {
    setLoading(true);
    try {
      //const payload = { id, ...productData };
      await ProductService.updateProduct(product);
      await fetchProducts();
      //   if (success) {
      //     setProducts((prev) =>
      //       prev.map((p) => (p.id === id ? { id, ...productData } : p))
      //     );
      //     return true;
    } catch (err) {
      setError("Failed to update product.");
      console.error("Update product failed:", err);
    } finally {
      setLoading(false);
    }
    return false;
  };

  // Delete a product by id
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const success = await ProductService.deleteProduct(id);
      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        return true;
      }
    } catch (err) {
      console.error("Delete product failed:", err);
    } finally {
      setLoading(false);
    }
    return false;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts: fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
