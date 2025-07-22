<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a 
          class="page-link" 
          href="#" 
          aria-label="Previous" 
          @click.prevent="changePage(currentPage - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      
      <li 
        v-for="page in displayedPages" 
        :key="page" 
        class="page-item" 
        :class="{ active: page === currentPage }"
      >
        <a 
          class="page-link" 
          href="#" 
          @click.prevent="changePage(page)"
        >
          {{ page }}
        </a>
      </li>
      
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a 
          class="page-link" 
          href="#" 
          aria-label="Next" 
          @click.prevent="changePage(currentPage + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage)
    },
    displayedPages() {
      // Logic to display a reasonable number of page links
      const totalDisplayed = 5 // Total number of pages to display
      const pages = []
      
      if (this.totalPages <= totalDisplayed) {
        // If we have few pages, show all of them
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Otherwise, show a window of pages around the current page
        let start = Math.max(1, this.currentPage - Math.floor(totalDisplayed / 2))
        let end = Math.min(this.totalPages, start + totalDisplayed - 1)
        
        // Adjust the start if we're near the end
        if (end === this.totalPages) {
          start = Math.max(1, end - totalDisplayed + 1)
        }
        
        for (let i = start; i <= end; i++) {
          pages.push(i)
        }
      }
      
      return pages
    }
  },
  methods: {
    changePage(page) {
      if (page < 1 || page > this.totalPages) {
        return
      }
      this.$emit('pageChanged', page)
    }
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 1rem;
}

/* Make pagination buttons more touch-friendly on mobile */
@media (max-width: 576px) {
  .page-link {
    padding: 0.5rem 0.75rem;
  }
}
</style>