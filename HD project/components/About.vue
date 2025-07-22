<template>
  
  <div class="about container mt-4">
  <!--<h1 class="text-center mb-4">About Our Application</h1> -->

    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h4 class="card-title">
              Welcome {{ user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : '' }}! <!--Can add Guest or any word between '' of lastName: '' '-->
            </h4>
            <p class="text-muted">What is your name?</p>

            <!-- Name Inputs -->
            <div class="mb-2">
              <label class="form-label">First Name</label>
              <input
                type="text"
                class="form-control"
                v-model="user.firstName"
                placeholder="Enter first name"
              >
            </div>
            <div class="mb-2">
              <label class="form-label">Last Name</label>
              <input
                type="text"
                class="form-control"
                v-model="user.lastName"
                placeholder="Enter last name"
              >
            </div>

            <!-- View Choice -->
            <div class="form-check form-check-inline mt-2">
              <input
                class="form-check-input"
                type="radio"
                name="viewOption"
                value="ocean"
                v-model="user.selectedView"
              >
              <label class="form-check-label">Ocean</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="viewOption"
                value="mountain"
                v-model="user.selectedView"
              >
              <label class="form-check-label">Mountain</label>
            </div>

            <!-- Display Selected Image -->
            <div v-if="user.selectedView" class="mt-3">
              <img :src="getImageUrl(user.selectedView)" class="img-fluid rounded shadow-sm" :alt="user.selectedView">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- App Info Section -->
    <div class="row mt-5">
      <div class="col-12">
        <div class="card bg-light">
          <div class="card-body">
            <h5 class="card-title">Our Mission</h5>
            <p class="card-text">
              This web is about the shopping website of a beauty product called "Serena Beauty". It is a simple web application
              that allows users to explore various beauty products, read news articles, and learn more about the brand.
            </p>
            <p>
              Built for beauty purposes, this application highlights how to gather user input, respond to user choices,
              and display dynamic content in a clean, mobile-friendly layout.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="card bg-light">
          <div class="card-body">
            <h5 class="card-title">Contact Us</h5>
            <p class="card-text">
              Have questions or suggestions? Reach out to us at
              <a href="mailto:serenabeauty@example.com">serenabeauty@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        selectedView: ''
      }
    }
  },
  methods: {
    getImageUrl(name) {
  return `/cos30043/s104480538/project/image/${name}.jpg`; // Use absolute path for images in the public folder
}
}
}
</script>

<style scoped>
.card img {
  max-height: 250px;
  object-fit: cover;
}
@media (max-width: 768px) {
  .card {
    margin-bottom: 1rem;
  }
}
</style>
