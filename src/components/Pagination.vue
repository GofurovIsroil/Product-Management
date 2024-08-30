<template>
  <div class="pagination">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="pagination-button"
      :class="{ disabled: currentPage === 1 }"
    >
      Previous
    </button>
    <span class="pagination-info"
      >Page {{ currentPage }} of {{ totalPages === 0 ? 1 : totalPages }}</span
    >
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages || currentPage > totalPages"
      class="pagination-button"
      :class="{
        disabled: currentPage === totalPages || currentPage > totalPages,
      }"
    >
      Next
    </button>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const currentPage = ref(1);

    const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        emit("page-changed", currentPage.value);
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        emit("page-changed", currentPage.value);
      }
    };

    return {
      currentPage,
      totalPages,
      prevPage,
      nextPage,
    };
  },
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);

  .pagination-button {
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

    &:disabled {
      background-color: #e0e0e0;
      cursor: not-allowed;
    }

    &.disabled {
      background-color: #e0e0e0;
      cursor: not-allowed;
    }
  }

  .pagination-info {
    font-size: 1rem;
    color: #333;
  }
}
</style>
