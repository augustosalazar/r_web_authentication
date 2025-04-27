import React, { useEffect, useState, createContext } from "react";
import ProductService from "../service/product_service";

// Create the context
export const ProductContext = createContext({
  products: [],
  loading: false,
  refreshProducts: () => {},
  createProduct: async (data) => {},
  updateProduct: async (id, data) => {},
  deleteProduct: async (id) => {}
});

// Provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial fetch
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await ProductService.getProducts();
      setProducts(data);
    } catch (err) {
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
      const newProduct = await ProductService.addProduct(productData);
      if (newProduct) {
        setProducts((prev) => [...prev, newProduct]);
        return newProduct;
      }
    } catch (err) {
      console.error("Create product failed:", err);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Update an existing product
  const updateProduct = async (id, productData) => {
    setLoading(true);
    try {
      const payload = { id, ...productData };
      const success = await ProductService.updateProduct(payload);
      if (success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { id, ...productData } : p))
        );
        return true;
      }
    } catch (err) {
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
