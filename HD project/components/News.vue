<template>
  <div class="news">
    <!-- <h1>Latest News</h1>-->
    <p>Stay updated with the latest news and events.</p>

    <!-- Search filters -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Search News</h5>
        <div class="row g-3">
          <div class="col-md-3">
            <div class="form-floating">
              <input
                type="date"
                class="form-control"
                id="dateFilter"
                v-model="filters.date"
              >
              <label for="dateFilter">Date</label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="titleFilter"
                v-model="filters.title"
                placeholder="Search by title"
              >
              <label for="titleFilter">Title</label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="contentFilter"
                v-model="filters.content"
                placeholder="Search by content"
              >
              <label for="contentFilter">Content</label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-floating">
              <select class="form-select" id="categoryFilter" v-model="filters.category">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
              <label for="categoryFilter">Category</label>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary me-2" @click="applyFilters">Apply Filters</button>
            <button class="btn btn-secondary" @click="resetFilters">Reset</button>
          </div>
        </div>
      </div>
    </div>

    <!-- News list -->
    <div v-if="paginatedNews.length > 0">
      <NewsList :news="paginatedNews" />
      <Pagination 
        :totalItems="filteredNews.length" 
        :perPage="itemsPerPage" 
        :currentPage="currentPage" 
        @pageChanged="onPageChange"
      />
    </div>
    <div v-else class="alert alert-info">
      No news found matching your search criteria.
    </div>
  </div>
</template>

<script>
import NewsList from '../components/NewsList.vue'
import Pagination from '../components/Pagination.vue'
import newsData from '../data/unit.json'

export default {
  name: 'NewsPage',
  components: {
    NewsList,
    Pagination
  },
  data() {
    return {
      news: newsData,
      filters: {
        date: '',
        title: '',
        content: '',
        category: ''
      },
      currentPage: 1,
      itemsPerPage: 5
    }
  },
  computed: {
    categories() {
      // Extract unique categories from news items
      const categoriesSet = new Set()
      this.news.forEach(item => {
        categoriesSet.add(item.category)
      })
      return Array.from(categoriesSet)
    },
    filteredNews() {
      return this.news.filter(item => {
        // Filter by date
        if (this.filters.date && new Date(item.date).toISOString().split('T')[0] !== this.filters.date) {
          return false
        }
        
        // Filter by title
        if (this.filters.title && !item.title.toLowerCase().includes(this.filters.title.toLowerCase())) {
          return false
        }
        
        // Filter by content
        if (this.filters.content && !item.content.toLowerCase().includes(this.filters.content.toLowerCase())) {
          return false
        }
        
        // Filter by category
        if (this.filters.category && item.category !== this.filters.category) {
          return false
        }
        
        return true
      })
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredNews.slice(start, end)
    }
  },
  methods: {
    applyFilters() {
      this.currentPage = 1 // Reset to first page when applying filters
    },
    resetFilters() {
      this.filters = {
        date: '',
        title: '',
        content: '',
        category: ''
      }
      this.currentPage = 1
    },
    onPageChange(page) {
      this.currentPage = page
    }
  }
}
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 768px) {
  .form-floating {
    margin-bottom: 1rem;
  }
}
</style>