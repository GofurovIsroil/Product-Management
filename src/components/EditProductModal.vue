<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <h2>Edit Product</h2>
      <form @submit.prevent="submitEdit" class="modal-form">
        <input
          v-model="editedProduct.name"
          type="text"
          placeholder="Product Name"
          required
          class="form-input"
        />
        <input
          v-model="editedProduct.seller"
          type="text"
          placeholder="Seller"
          required
          class="form-input"
        />
        <select
          v-model="editedProduct.integration"
          required
          class="form-select"
        >
          <option value="reels">Reels</option>
          <option value="stories">Stories</option>
        </select>
        <div class="button-group">
          <button type="submit" class="submit-button">Save</button>
          <button type="button" @click="closeModal" class="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    isVisible: Boolean,
    product: Object,
  },
  emits: ["close", "save"],
  setup(props, { emit }) {
    const editedProduct = ref({ ...props.product });

    const closeModal = () => {
      document.documentElement.style.overflow = "scroll";
      emit("close");
    };

    const submitEdit = () => {
      emit("save", editedProduct.value);
      closeModal();
    };

    watch(
      () => props.product,
      (newVal) => {
        editedProduct.value = { ...newVal };
      }
    );

    return {
      editedProduct,
      closeModal,
      submitEdit,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-input,
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

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.submit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
}

.cancel-button {
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }
}
</style>
