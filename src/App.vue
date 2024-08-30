<template>
  <div>
    <h1>Product Management App</h1>
    <AddProduct @add-product="addProduct" />
    <ProductList
      :products="products"
      @edit-product="openEditModal"
      @delete-product="deleteProduct"
    />
    <EditProductModal
      v-if="isEditModalVisible"
      :isVisible="isEditModalVisible"
      :product="currentProduct"
      @close="isEditModalVisible = false"
      @save="saveEditedProduct"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import AddProduct from "./components/AddProduct.vue";
import ProductList from "./components/ProductList.vue";
import EditProductModal from "./components/EditProductModal.vue";

export default {
  components: {
    AddProduct,
    ProductList,
    EditProductModal,
  },
  setup() {
    const products = ref(JSON.parse(localStorage.getItem("products") || "[]"));
    const isEditModalVisible = ref(false);
    const currentProduct = ref(null);

    const saveProducts = () => {
      localStorage.setItem("products", JSON.stringify(products.value));
    };

    const addProduct = (product) => {
      products.value.push(product);
      saveProducts();
    };

    const openEditModal = (index) => {
      currentProduct.value = { ...products.value[index], index };
      isEditModalVisible.value = true;
    };

    const saveEditedProduct = (editedProduct) => {
      products.value[currentProduct.value.index] = { ...editedProduct };
      saveProducts();
    };

    const deleteProduct = (index) => {
      if (confirm("Are you sure you want to delete this product?")) {
        products.value.splice(index, 1);
        saveProducts();
      }
    };

    return {
      products,
      isEditModalVisible,
      currentProduct,
      addProduct,
      openEditModal,
      saveEditedProduct,
      deleteProduct,
    };
  },
};
</script>

<style>
/* Общие стили */
</style>
