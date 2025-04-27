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
      const response = await fetch(url, { method: "GET" });
      if (response.status !== 200) {
        throw new Error(`Error code ${response.status}`);
      }

      const decoded = await response.json();
      const rawData = decoded.data || [];

      // Flatten each record into { id, ...fields }
      const products = rawData.map((record) => {
        const { entry_id, data } = record;
        return {
          id: entry_id, // top‐level entry_id becomes your id
          ...data // spread in name, quantity, description, etc.
        };
      });

      console.log("ProductService getProducts ok");
      return products;
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
          data: product
        })
      });

      if (res.status === 200) {
        // Parse the returned JSON
        // const decoded = await res.json();
        // const record = decoded.data; // { entry_id, data: { … } }
        // const { entry_id, data: fields } = record;
        // // Flatten into { id, …fields }
        // const newProduct = { id: entry_id, ...fields };
        //console.log("addProduct →", newProduct);
      } else {
        const text = await res.text();
        console.error(`addProduct failed ${res.status}:`, text);
        return null;
      }
    } catch (err) {
      console.error("addProduct error:", err);
      return null;
    }
  },

  /**
   * Updates an existing product by id.
   * @param {Object} product – must include an `id` field
   * @returns {Promise<boolean>} true on 200
   */
  async updateProduct(product) {
    if (!product.id) throw new Error("product.id is required");
    console.log("updateProduct", product);
    const { id, ...fields } = product;
    console.log("updateProduct id ", id, "fields", fields);
    const url = `${BASE_URL}/${CONTRACT_KEY}/data/${TABLE}/update/${id}`;

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ data: fields })
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
   * @param {{ id: string } | string} productOrId
   * @returns {Promise<boolean>}
   */
  async deleteProduct(productOrId) {
    const id = typeof productOrId === "string" ? productOrId : productOrId.id;
    if (!id) throw new Error("product.id is required");
    const url = `${BASE_URL}/${CONTRACT_KEY}/data/${TABLE}/delete/${id}`;

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
   * @returns {Promise<boolean>}
   */
  async deleteProducts() {
    try {
      const all = await this.getProducts();
      for (const p of all) {
        // now accepts either p or p.id
        // eslint-disable-next-line no-await-in-loop
        await this.deleteProduct(p.id);
      }
      return true;
    } catch (err) {
      console.error("deleteProducts error:", err);
      return false;
    }
  }
};

export default ProductService;
