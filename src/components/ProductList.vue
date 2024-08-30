<template>
  <div class="product-list">
    <h2>Product List</h2>
    <div class="filter-section">
      <select v-model="filterIntegration" class="filter-select">
        <option value="">All</option>
        <option value="reels">Reels</option>
        <option value="stories">Stories</option>
      </select>
      <button @click="sortProducts" class="sort-button">
        Sort Alphabetically
      </button>
    </div>
    <ul class="product-items">
      <li
        v-for="(product, index) in paginatedProducts"
        :key="index"
        class="product-item"
      >
        <p>
          {{ product.name }} - {{ product.seller }} ({{ product.integration }})
        </p>
        <button @click="editProduct(index)" class="edit-button">Edit</button>
        <button @click="deleteProduct(index)" class="delete-button">
          Delete
        </button>
      </li>
    </ul>
    <Pagination
      :total="filteredProducts.length"
      :page-size="itemsPerPage"
      @page-changed="changePage"
      class="pagination"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import Pagination from "./Pagination.vue";

export default {
  components: {
    Pagination,
  },
  props: {
    products: Array,
  },
  setup(props, { emit }) {
    const filterIntegration = ref("");
    const sortOrder = ref("asc");
    const currentPage = ref(1);
    const itemsPerPage = 20;

    const filteredProducts = computed(() => {
      let filtered = props.products.filter((product) =>
        filterIntegration.value
          ? product.integration === filterIntegration.value
          : true
      );

      filtered.sort((a, b) =>
        sortOrder.value === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );

      return filtered;
    });

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return filteredProducts.value.slice(start, start + itemsPerPage);
    });

    const sortProducts = () => {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    };

    const editProduct = (index) => {
      // Индекс в paginatedProducts отличается от индекса в оригинальном списке
      const productIndex = (currentPage.value - 1) * itemsPerPage + index;
      document.documentElement.style.overflow = "hidden";
      emit("edit-product", productIndex);
    };

    const deleteProduct = (index) => {
      const productIndex = (currentPage.value - 1) * itemsPerPage + index;
      emit("delete-product", productIndex);
    };

    const changePage = (page) => {
      currentPage.value = page;
    };

    return {
      filterIntegration,
      sortOrder,
      currentPage,
      itemsPerPage,
      filteredProducts,
      paginatedProducts,
      sortProducts,
      editProduct,
      deleteProduct,
      changePage,
    };
  },
};
</script>

<style lang="scss" scoped>
.product-list {
  .filter-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .filter-select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 0.25rem;
      font-size: 1rem;
    }

    .sort-button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .product-items {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .product-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #ddd;

    p {
      width: 200px;
    }

    .edit-button,
    .delete-button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }

    .delete-button {
      background-color: #dc3545;

      &:hover {
        background-color: #c82333;
      }
    }
  }

  .pagination {
    margin-top: 1rem;
    display: flex;
  }
}
</style>
