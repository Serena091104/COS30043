<template>
  <footer>
    <div class="container footer-container">
      <div class="copyright"> Beauty Serena</div>
      <div class="footer-links">
        <router-link to="/privacy-policy">Privacy Policy</router-link>
        <router-link to="/terms">Terms of Use</router-link>
        <router-link to="/contact">Contact Us</router-link>
        <router-link to="/contact">Feedback</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #ffe3ec; /* Soft pink background */
  padding: 1.5rem 0; /* Add padding for spacing */
  text-align: center;
  border-top: 2px solid #ff6b81; /* Match the border color with the theme */
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Ensure responsiveness */
}

.copyright {
  color: #333; /* Dark text for contrast */
  font-weight: bold;
  font-size: 1.2rem;
}

.footer-links a {
  color: #ff6b81; /* Theme color for links */
  margin: 0 0.5rem;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease, transform 0.3s ease;
}

.footer-links a:hover {
  color: #fff; /* White color on hover */
  background-color: #ff6b81; /* Theme hover background */
  padding: 0.3rem 0.5rem;
  border-radius: 0.5rem;
  transform: scale(1.1); /* Slight zoom effect */
}

.sale-link {
  color: #ff6b81; /* Theme color */
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.sale-link:hover {
  color: #fff; /* White text on hover */
  background-color: #ff6b81; /* Theme hover background */
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add hover shadow */
}
</style>
