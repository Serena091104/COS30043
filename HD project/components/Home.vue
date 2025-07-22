<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="jumbotron p-4 bg-light rounded mt-3">
      Welcome, {{ loggedInUser?.username || 'Guest' }}! We hope to have a lovely experience with us.
      <p class="lead">
        Welcome to our website. Here you can find beauty products and add them to your shopping cart. Enjoy your shopping!
      </p>
      <button v-if="loggedInUser" class="btn btn-danger" @click="logout">Logout</button>
    </div>

    <!-- Search and Filter -->
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search for products..." v-model="searchQuery">
      <select class="form-select" v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <!-- Products Section -->
    <div class="row mt-5">
      <div class="col-12">
        <h2>Our Products</h2>

        <!-- Product Cards -->
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="product in paginatedProducts" :key="product.id">
            <div class="card h-100 product-card">
              <img :src="product.image" class="card-img-top" :alt="product.title || 'Product image'" />
              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text text-truncate">
                  {{ product.description.length > 100 ? product.description.slice(0, 100) + '...' : product.description }}
                </p>
                <p class="card-text"><strong>${{ product.price.toFixed(2) }}</strong></p>

                <p class="text-muted mb-1">Likes: {{ likes[product.id] || 0 }}</p>

                <div v-if="loggedInUser">
                  <button class="btn btn-outline-primary me-2" @click="likeProduct(product.id)">Like</button>
                  <!-- <button class="btn btn-outline-secondary me-2" @click="toggleCommentBox(product.id)">Comments</button> -->
                  <button class="btn btn-outline-info mt-2" @click="buyNow(product)">Buy Now</button>
                </div>

                <!-- Comments Section -->
                <!--
                <div v-if="visibleComments[product.id]" class="mt-3">
                  <h6>Comments:</h6>
                  <div
                    v-for="(comment, index) in comments[product.id] || []"
                    :key="index"
                    class="mb-2"
                  >
                    <strong>{{ comment.username }}</strong>: {{ comment.comment }}
                    <small class="text-muted">({{ comment.created_at }})</small>
                    <button
                      v-if="loggedInUser && comment.user_id === loggedInUser.user_id"
                      class="btn btn-sm btn-danger ms-2"
                      @click.stop="deleteComment(comment.id, product.id)"
                    >
                      Delete
                    </button>
                  </div>
                  <div v-if="loggedInUser" class="mt-2">
                    <input
                      type="text"
                      class="form-control"
                      v-model="newCommentText[product.id]"
                      placeholder="Add a comment..."
                      @keyup.enter="addComment(product.id)"
                    />
                  </div>
                  <div v-else>
                    <p class="text-muted">Log in to add comments.</p>
                  </div>
                </div>
                -->
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <Pagination
          :total-items="filteredProducts.length"
          :per-page="perPage"
          :current-page="currentPage"
          @pageChanged="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue';

export default {
  name: 'HomePage',
  components: { Pagination },
  data() {
    return {
      loggedInUser: null,
      products: [],
      searchQuery: '',
      selectedCategory: '',
      currentPage: 1,
      perPage: 6,
      likes: {}, // Initialize likes as an empty object
      // comments: {}, // Store comments for each product
      // newCommentText: {}, // Store new comment text for each product
      // visibleComments: {} // Track which product's comments are visible
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                              product.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory === '' || product.category === this.selectedCategory;
        return matchesSearch && matchesCategory;
      });
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredProducts.slice(start, end);
    },
    uniqueCategories() {
      return [...new Set(this.products.map(p => p.category))].filter(Boolean);
    }
  },
  methods: {
    async fetchSession() {
      try {
        const response = await fetch('/cos30043/s104480538/project/resource/api_user.php');
        const data = await response.json();
        if (data.logged_in) {
          this.loggedInUser = { user_id: data.user_id, username: data.username };
        } else {
          this.loggedInUser = null;
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    },
    async likeProduct(productId) {
      if (!this.loggedInUser) {
        alert('Please log in to like products.');
        return;
      }
      try {
        const response = await fetch(`/cos30043/s104480538/project/resource/api_like.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ product_id: productId }),
        });
        const data = await response.json();
        if (data.status === 'success') {
          this.likes[productId] = data.likes_count; // Update likes count
          alert(`Mercury said '${data.message}'`);
        } else {
          console.error('Error liking product:', data.message);
        }
      } catch (error) {
        console.error('Error liking product:', error);
      }
    },
    // toggleCommentBox(productId) {
    //   console.log('Toggling comment box for product:', productId);
    //   if (!this.visibleComments[productId]) {
    //     this.visibleComments[productId] = true;
    //   } else {
    //     this.visibleComments[productId] = false;
    //   }
    // },
    // async fetchComments(productId) {
    //   try {
    //     const response = await fetch(`/cos30043/s104480538/project/resource/api_like.php?product_id=${productId}`);
    //     const data = await response.json();
    //     if (data.status === 'success') {
    //       this.comments[productId] = data.comments; // Directly assign the comments
    //     } else {
    //       console.error('Error fetching comments:', data.message);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching comments:', error);
    //   }
    // },
    // async addComment(productId) {
    //   if (!this.loggedInUser) {
    //     alert('Please log in to add comments.');
    //     return;
    //   }
    //   const commentText = this.newCommentText[productId];
    //   if (!commentText || !commentText.trim()) return;

    //   try {
    //     const response = await fetch('/cos30043/s104480538/project/resource/api_like.php', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //       body: new URLSearchParams({
    //         product_id: productId,
    //         comment: commentText.trim()
    //       })
    //     });
    //     const data = await response.json();
    //     if (data.status === 'success') {
    //       this.newCommentText[productId] = '';
    //       this.fetchComments(productId); // Refresh comments after adding
    //     } else {
    //       alert(data.message);
    //     }
    //   } catch (error) {
    //     console.error("Error adding comment:", error);
    //   }
    // },
    // async deleteComment(commentId, productId) {
    //   if (!this.loggedInUser) {
    //     alert('Please log in to delete comments.');
    //     return;
    //   }
    //   if (!confirm('Are you sure you want to delete this comment?')) return;

    //   try {
    //     const response = await fetch(`/cos30043/s104480538/project/resource/api_like.php?comment_id=${commentId}`, {
    //       method: 'DELETE'
    //     });
    //     const data = await response.json();
    //     if (data.status === 'success') {
    //       this.fetchComments(productId);
    //     } else {
    //       alert(data.message);
    //     }
    //   } catch (error) {
    //     console.error("Error deleting comment:", error);
    //   }
    // },
    buyNow(product) {
      // Display success message
      alert(`Successfully purchased ${product.title}!\nThank you for your purchase!`);
    },
    async logout() {
      try {
        const response = await fetch('/cos30043/s104480538/project/resource/api_user.php', {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          this.loggedInUser = null;
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
    async fetchProducts() {
      try {
        const response = await fetch("/cos30043/s104480538/project/resource/api2.php");
        const data = await response.json();
        this.products = data.map(product => ({
          ...product,
          price: typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0
        }));

        // Fetch initial likes count for each product
        for (const product of this.products) {
          const likesResponse = await fetch(`/cos30043/s104480538/project/resource/api_like.php?product_id=${product.id}`);
          const likesData = await likesResponse.json();
          if (likesData && likesData.status === 'success') {
            this.likes[product.id] = likesData.likes_count || 0;          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
    },
    // toggleCommentBox(productId) {
    //   this.$set(this.visibleComments, productId, !this.visibleComments[productId]);
    // }
  },
  async mounted() {
    await this.fetchSession();
    await this.fetchProducts();
  }
};
</script>

<style scoped>
.jumbotron {
  background: linear-gradient(to right, #ffe3ec, #fceabb);
  padding: 2.5rem;
  border-radius: 1rem;
  text-align: center;
  color: #333;
  box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.1);
}

.card-img-top {
  height: 220px;
  object-fit: cover;
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
}

.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>