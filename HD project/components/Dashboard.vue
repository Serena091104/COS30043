<template>
  <div id="dashboard" class="container mt-5">
    <div class="card shadow">
      <div class="card-header text-center" style="background: linear-gradient(to right, #ffe3ec, #fceabb); color: #5a2d3a;">
        <h1 class="font-weight-bold">Dashboard</h1>
      </div>
      <div class="card-body">
        <!-- Tabs Navigation -->
        <ul class="nav nav-tabs mb-4" id="dashboardTabs">
          <li class="nav-item">
            <button class="nav-link" :class="{ active: tab === 1 }" @click="tab = 1">Insert Product</button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{ active: tab === 2 }" @click="tab = 2">Update Product</button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{ active: tab === 3 }" @click="tab = 3">Delete Product</button>
          </li>
        </ul>

        <!-- Tabs Content -->
        <div v-if="tab === 1">
          <h2>Insert Product</h2>
          <form @submit.prevent="insertProduct">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input type="text" id="title" v-model="newProduct.title" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Price</label>
              <input type="number" id="price" v-model="newProduct.price" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea id="description" v-model="newProduct.description" class="form-control" required></textarea>
            </div>
            <div class="mb-3">
              <label for="category" class="form-label">Category</label>
              <input type="text" id="category" v-model="newProduct.category" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Insert Product</button>
          </form>
        </div>

        <!-- Update Product Tab -->
        <div v-if="tab === 2">
          <h2>Update Product</h2>
          <form @submit.prevent="updateProduct">
            <div class="mb-3">
              <label for="productId" class="form-label">Product ID</label>
              <input type="number" id="productId" v-model="updateData.id" class="form-control" @blur="fetchProductDetails" required />
            </div>
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input type="text" id="title" v-model="updateData.title" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Price</label>
              <input type="number" id="price" v-model="updateData.price" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea id="description" v-model="updateData.description" class="form-control" required></textarea>
            </div>
            <div class="mb-3">
              <label for="category" class="form-label">Category</label>
              <input type="text" id="category" v-model="updateData.category" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-warning">Update Product</button>
          </form>
        </div>

        <!-- Delete Product Tab -->
        <div v-if="tab === 3">
          <h2>Delete Product</h2>
          <form @submit.prevent="deleteProduct">
            <div class="mb-3">
              <label for="productId" class="form-label">Product ID</label>
              <input type="number" id="productId" v-model="deleteId" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-danger">Delete Product</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tab = ref(1) // Start with Insert Product tab
const products = ref([])
const newProduct = ref({
  title: '',
  price: 0,
  description: '',
  category: ''
})
const updateData = ref({
  id: null,
  title: '',
  price: null,
  description: '',
  category: ''
})
const deleteId = ref(null)

// Fetch products from the backend
const fetchProducts = async () => {
  try {
    const response = await fetch('/cos30043/s104480538/project/resource/apis.php')
    if (!response.ok) throw new Error(`Failed to fetch products: ${response.statusText}`)
    const data = await response.json()
    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

// Insert a new product
const insertProduct = async () => {
  try {
    const response = await fetch('/cos30043/s104480538/project/resource/apis.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct.value)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error inserting product:', errorText);
      return;
    }

    const result = await response.text();
    console.log('Inserted Product ID:', result);
    fetchProducts();
    newProduct.value = {
      title: '',
      price: 0,
      description: '',
      category: ''
    };
  } catch (error) {
    console.error('Error inserting product:', error);
  }
};

// Fetch product details for updating
const fetchProductDetails = async () => {
  if (!updateData.id) return; // Do nothing if ID is not provided
  try {
    const response = await fetch(`/cos30043/s104480538/project/resource/apis.php?id=${updateData.id}`);
    if (!response.ok) throw new Error(`Failed to fetch product: ${response.statusText}`);
    const data = await response.json();
    if (data.length > 0) {
      const product = data[0]; // Assuming the API returns an array
      updateData.value = {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category
      };
    } else {
      console.error('Product not found');
      resetUpdateData();
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
}

// Update an existing product
const updateProduct = async () => {
  try {
    const response = await fetch(`/cos30043/s104480538/project/resource/apis.php`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData.value)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error updating product:', errorText);
      return;
    }

    const result = await response.text();
    console.log('Affected Rows:', result);
    fetchProducts();
    updateData.value = {
      id: null,
      title: '',
      price: null,
      description: '',
      category: ''
    };
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

// Delete a product
const deleteProduct = async () => {
  try {
    const response = await fetch(`/cos30043/s104480538/project/resource/apis.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: deleteId.value })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error deleting product:', errorText);
      return;
    }

    const result = await response.text();
    console.log('Deleted Rows:', result);
    fetchProducts();
    deleteId.value = null;
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

// Fetch products when the component is mounted
onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.container {
  max-width: 900px;
}
.card-header {
  font-size: 1.5rem;
}
.nav-tabs .nav-link {
  cursor: pointer;
  color: #5a2d3a; /* Deep pink for text */
}
.nav-tabs .nav-link.active {
  background-color: #ffe3ec; /* Light pink for active tab */
  color: #5a2d3a; /* Deep pink for active tab text */
}
.table-striped tbody tr:nth-of-type(odd) {
  background-color: #fff0f5; /* Light pink for table rows */
}
.table-striped tbody tr:hover {
  background-color: #ffe3ec; /* Slightly darker pink on hover */
}
.btn-primary {
  background-color: #ff6b81; /* Soft pink for buttons */
  border: none;
}
.btn-primary:hover {
  background-color: #ff4d6d; /* Darker pink on hover */
}
.btn-warning {
  background-color: #ffc107; /* Yellow for warning buttons */
  border: none;
}
.btn-danger {
  background-color: #dc3545; /* Red for danger buttons */
  border: none;
}
</style>