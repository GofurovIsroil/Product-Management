<template>
  <div class="add-product">
    <h2>Add Product</h2>
    <form @submit.prevent="addProduct" class="product-form">
      <input
        v-model="newProduct.name"
        type="text"
        placeholder="Product Name"
        required
        class="form-input"
      />
      <input
        v-model="newProduct.seller"
        type="text"
        placeholder="Seller"
        required
        class="form-input"
      />
      <select v-model="newProduct.integration" required class="form-select">
        <option value="reels">Reels</option>
        <option value="stories">Stories</option>
      </select>
      <button type="submit" class="submit-button">Add Product</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props, { emit }) {
    const newProduct = ref({
      name: "",
      seller: "",
      integration: "reels",
    });

    const addProduct = () => {
      emit("add-product", { ...newProduct.value });
      newProduct.value.name = "";
      newProduct.value.seller = "";
      newProduct.value.integration = "reels";
    };

    return {
      newProduct,
      addProduct,
    };
  },
};
</script>

<style lang="scss" scoped>
.add-product {
  max-width: 500px;
  margin: 20px auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #333;
  }

  .product-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .form-input {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 0.25rem;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #007bff;
      }
    }

    .form-select {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 0.25rem;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #007bff;
      }
    }

    .submit-button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 0.75rem;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}
</style>
