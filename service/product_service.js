// RemoteProductService.js
import { LogBox } from "react-native"; // or your own logging solution

const BASE_URL = "https://unidb.openlab.uninorte.edu.co";
const CONTRACT_KEY = "e83b7ac8-bdad-4bb8-a532-6aaa5fddefa4";
const TABLE = "products";

//https://unidb.openlab.uninorte.edu.co/e83b7ac8-bdad-4bb8-a532-6aaa5fddefa4/data/products/all?format=json

const ProductService = {
  /**
   * Fetches all products.
   * @returns {Promise<Array<Object>>} resolves to an array of product objects
   */
  async getProducts() {
    const url = `${BASE_URL}/${CONTRACT_KEY}/data/${TABLE}/all?format=json`;
    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        throw new Error(`Error code ${res.status}`);
      }
      const json = await res.json();
      const data = json.data || [];
      console.log("getProducts data:", data);
      // If you have a JS Product class with fromJson:
      // return data.map(item => Product.fromJson(item));
      return data;
    } catch (err) {
      console.error("getProducts error:", err);
      throw err;
    }
  },

  /**
   * Adds a new product.
   * @param {Object} product – must match your backend schema
   * @returns {Promise<boolean>} true on 201, false otherwise
   */
  async addProduct(product) {
    const url = `${BASE_URL}/${CONTRACT_KEY}/data/store`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          table_name: TABLE,
          data: product // or product.toJson()
        })
      });
      if (res.status === 201) {
        return true;
      } else {
        const text = await res.text();
        console.error(`addProduct failed ${res.status}:`, text);
        return false;
      }
    } catch (err) {
      console.error("addProduct error:", err);
      return false;
    }
  },

  /**
   * Updates an existing product by id.
   * @param {Object} product – must include an `id` field
   * @returns {Promise<boolean>} true on 200
   */
  async updateProduct(product) {
    if (!product.id) throw new Error("product.id is required");
    const url = `${BASE_URL}/${CONTRACT_KEY}/data/${TABLE}/update/${product.id}`;
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ data: product /* or product.toJsonNoId() */ })
      });
      console.log(`updateProduct status ${res.status}`);
      if (res.status === 200) {
        return true;
      } else {
        const text = await res.text();
        console.error(`updateProduct failed ${res.status}:`, text);
        return false;
      }
    } catch (err) {
      console.error("updateProduct error:", err);
      return false;
    }
  },

  /**
   * Deletes a product by id.
   * @param {Object} product – must include an `id` field
   * @returns {Promise<boolean>} true on 200
   */
  async deleteProduct(product) {
    if (!product.id) throw new Error("product.id is required");
    const url = `${BASE_URL}/${CONTRACT_KEY}/data/${TABLE}/delete/${product.id}`;
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json; charset=UTF-8" }
      });
      console.log(`deleteProduct status ${res.status}`);
      if (res.status === 200) {
        return true;
      } else {
        const text = await res.text();
        console.error(`deleteProduct failed ${res.status}:`, text);
        return false;
      }
    } catch (err) {
      console.error("deleteProduct error:", err);
      return false;
    }
  },

  /**
   * Deletes *all* products by fetching them and deleting one by one.
   * @returns {Promise<boolean>} always resolves to true
   */
  async deleteProducts() {
    try {
      const all = await this.getProducts();
      for (const p of all) {
        /* eslint-disable no-await-in-loop */
        await this.deleteProduct(p);
      }
      return true;
    } catch (err) {
      console.error("deleteProducts error:", err);
      return false;
    }
  }
};

export default ProductService;
