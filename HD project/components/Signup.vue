<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="row w-100 shadow rounded overflow-hidden" style="max-width: 900px; min-height: 500px;">
      <!-- Left side image -->
      <div class="col-md-6 d-none d-md-block p-0">
        <img
          src="/public/image/shopping4.jpg"
          alt="Signup visual"
          class="img-fluid h-100 w-100 object-fit-cover"
          style="object-fit: cover;"
        />
      </div>

      <!-- Right side form -->
      <div class="col-md-6 bg-white d-flex flex-column justify-content-center align-items-center p-5">
        <h2 class="mb-4 text-center text-dark">Sign Up</h2>
        <form class="w-100" @submit.prevent="handleSignup" style="max-width: 400px;">
  <!-- First & Last Name -->
  <div class="row mb-3">
    <div class="col">
      <label for="first_name" class="form-label fw-bold">First Name <span class="text-danger">*</span></label>
      <input
        id="first_name"
        name="first_name"
        v-model="firstName"
        type="text"
        class="form-control"
        placeholder="First Name"
        required
      />
    </div>
    <div class="col">
      <label for="last_name" class="form-label fw-bold">Last Name <span class="text-danger">*</span></label>
      <input
        id="last_name"
        name="last_name"
        v-model="lastName"
        type="text"
        class="form-control"
        placeholder="Last Name"
        required
      />
    </div>
  </div>

  <!-- Email -->
  <div class="mb-3">
    <label for="email" class="form-label fw-bold">Email</label>
    <input
      id="email"
      name="email"
      v-model="email"
      type="email"
      class="form-control"
      required
    />
    <div v-if="errors.email" class="text-danger mt-1">{{ errors.email }}</div>
  </div>

  <!-- Password -->
  <div class="mb-3">
    <label for="password" class="form-label fw-bold">Password</label>
    <input
      id="password"
      name="password"
      v-model="password"
      type="password"
      class="form-control"
      required
    />
    <div v-if="errors.password" class="text-danger mt-1">{{ errors.password }}</div>
  </div>

  <!-- Confirm Password -->
  <div class="mb-3">
    <label for="confirm_password" class="form-label fw-bold">Confirm Password</label>
    <input
      id="confirm_password"
      name="confirm_password"
      v-model="confirmPassword"
      type="password"
      class="form-control"
      required
    />
    <div v-if="errors.confirmPassword" class="text-danger mt-1">{{ errors.confirmPassword }}</div>
  </div>

  <!-- Username -->
  <div class="mb-4">
    <label for="username" class="form-label fw-bold">Username</label>
    <input
      id="username"
      name="username"
      v-model="username"
      class="form-control"
      required
    />
    <div v-if="errors.username" class="text-danger mt-1">{{ errors.username }}</div>
  </div>

  <!-- Submit Button -->
  <button type="submit" class="btn btn-primary w-100" style="background-color: #e83e8c;">Register</button>
</form>

        <!-- Alert Messages -->
        <div v-if="error" class="alert alert-danger mt-3 w-100 text-center">{{ error }}</div>
        <div v-if="success" class="alert alert-success mt-3 w-100 text-center">{{ success }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const username = ref('')

const error = ref('')
const success = ref('')
const errors = ref({})

const router = useRouter()

// Validate password & confirm password
watch(password, (newVal) => {
  const pattern = /(?=.*[\$\%\^\&\*]).{6,}/
  if (!pattern.test(newVal)) {
    errors.value.password = 'Min 6 chars incl. special char ($, %, ^, &, *)'
  } else {
    delete errors.value.password
  }

  if (confirmPassword.value && newVal !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    delete errors.value.confirmPassword
  }
})

watch(confirmPassword, (newVal) => {
  if (newVal !== password.value) {
    errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    delete errors.value.confirmPassword
  }
})

// Validate username length
watch(username, (newVal) => {
  if (newVal.length < 3) {
    errors.value.username = 'Username must be at least 3 characters.'
  } else {
    delete errors.value.username
  }
})

// Validate email format
watch(email, (newVal) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!pattern.test(newVal)) {
    errors.value.email = 'Invalid email format.'
  } else {
    delete errors.value.email
  }
})

// Signup function
async function handleSignup() {
  error.value = ''
  success.value = ''

  if (Object.keys(errors.value).length > 0) {
    error.value = 'Please fix the errors above.'
    return
  }

  // Log the data being sent
  console.log({
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    password: password.value,
    username: username.value
  })

  try {
    const response = await fetch('/cos30043/s104480538/project/resource/signup.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    password: password.value,
    username: username.value
  })
    });

    if (!response.ok) throw new Error('Failed to connect to server.')

    const result = await response.json()

    if (result.error) {
      error.value = result.error
    } else if (result.success) {
      success.value = 'Sign up successfully...'
      // Clear fields
      firstName.value = ''
      lastName.value = ''
      email.value = ''
      password.value = ''
      confirmPassword.value = ''
      username.value = ''

      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  } catch (err) {
    error.value = 'Something went wrong. Try again later.'
  }
}
</script>
