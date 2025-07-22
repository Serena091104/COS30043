<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Footer from './components/Footer.vue'; // Import Footer component

const router = useRouter();
const searchQuery = ref('');
const loggedInUser = ref<{ username: string; user_id: number } | null>(null);

// Check session on mount
onMounted(async () => {
  try {
    const res = await fetch('/api_user.php', { method: 'GET' });
    const data = await res.json();
    if (data.logged_in) {
      loggedInUser.value = {
        username: data.username,
        user_id: data.user_id,
      };
    }
  } catch (error) {
    console.error('Session check failed:', error);
  }
});

// Search products
async function handleSearch() {
  if (!searchQuery.value.trim()) {
    alert('Please enter a search term.');
    return;
  }

  try {
    const res = await fetch(`/api_products.php?search=${encodeURIComponent(searchQuery.value)}`, { method: 'GET' });
    const data = await res.json();
    if (data.status === 'success') {
      console.log('Search results:', data.products);
      router.push({ path: '/search', query: { q: searchQuery.value } }); // Navigate to search results page
    } else {
      alert(`Error: ${data.message}`);
      console.error('Error searching products:', data.message);
    }
  } catch (error) {
    console.error('Error searching products:', error);
    alert('An error occurred while searching for products.');
  }
}

// Logout
async function logout() {
  await fetch('/logout.php', { method: 'POST' });
  loggedInUser.value = null;
  router.push('/');
}
</script>

<template>
  <div class="app-header bg-light shadow-sm">
    <!-- Top Header -->
    <div class="container d-flex justify-content-between align-items-center py-3">
      <!-- Logo -->
      <router-link to="/" class="text-decoration-none">
        <div class="logo fw-bold text-danger">
          <span class="small d-block text-uppercase" style="letter-spacing: 4px;">
            Beauty
          </span>
          <span class="fs-2">Serena</span>
        </div>
      </router-link>

      <!-- Search Bar -->
      <div class="search-box flex-grow-1 mx-4">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search entire product here…"
          @keyup.enter="handleSearch"
        />
      </div>

      <!-- User Links -->
      <div class="user-links d-flex align-items-center gap-3">
        <template v-if="loggedInUser">
          <span>
            <i class="bi bi-person"></i> Welcome, {{ loggedInUser.username }}
          </span>
          <button class="btn btn-outline-danger btn-sm" @click="logout">Logout</button>
        </template>
        <template v-else>
          <span>
            <i class="bi bi-person"></i>
            <router-link to="/login" class="nav-link">Login</router-link> /
            <router-link to="/signup" class="nav-link">Sign Up</router-link>
          </span>
        </template>
        <span>|</span>
        <img
          src="/public/image/shoppingcart.png"
          alt="Shopping Cart"
          class="shopping-cart-icon"
          style="width: 24px; height: 24px;"
        />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light custom-navbar">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/news">News</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <div class="container my-4">
      <router-view :loggedInUser="loggedInUser" />
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.custom-navbar {
  background-color: #ffe3ec;
  border-top: 2px solid #ff6b81;
  border-bottom: 2px solid #ff6b81;
}

.navbar-nav .nav-link {
  color: #333;
  font-weight: bold;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  border-radius: 0.5rem;
}

.navbar-nav .nav-link:hover {
  background-color: #ff6b81;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.active-link {
  color: #ff6b81;
  border-bottom: 2px solid #ff6b81;
}

.sale-link {
  color: #ff6b81;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.sale-link:hover {
  color: #fff;
  background-color: #ff6b81;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>