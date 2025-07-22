<template>
  <div class="news-list">
    <div class="card mb-3" v-for="(item, index) in news" :key="index">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <h5 class="card-title">{{ item.title }}</h5>
          <span class="badge bg-primary">{{ item.category }}</span>
        </div>
        <h6 class="card-subtitle mb-2 text-muted">{{ formatDate(item.date) }}</h6>
        <p class="card-text">{{ item.content }}</p>
        <a href="#" class="btn btn-sm btn-outline-primary">Read more</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsList',
  props: {
    news: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
  }
}
</script>

<style scoped>
.news-list {
  margin-bottom: 2rem;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .card-title {
    font-size: 1.25rem;
  }
}
</style>