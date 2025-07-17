export default {
  template: `
    <form id="jobApplicationForm" method="post" action="http://mercury.swin.edu.au/it000000/formtest.php"
      @submit.prevent="handleSubmit"
      novalidate
      class="mb-4">

      <h2 class="mb-3">Job Application</h2>

      <fieldset class="mb-3">
        <legend>Personal Information</legend>
        <div class="row">
          <div class="col-md-6 mb-2">
            <label class="form-label" for="firstName">First Name:</label>
            <input id="firstName" name="firstName" v-model="form.firstName" class="form-control" />
            <div v-if="errors.firstName" class="text-danger mt-1">{{ errors.firstName }}</div>
          </div>
          <div class="col-md-6 mb-2">
            <label class="form-label" for="lastName">Last Name:</label>
            <input id="lastName" name="lastName" v-model="form.lastName" class="form-control" />
            <div v-if="errors.lastName" class="text-danger mt-1">{{ errors.lastName }}</div>
          </div>
          <div class="col-md-6 mb-2">
            <label class="form-label" for="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" v-model="form.dob" class="form-control" />
            <div v-if="errors.dob" class="text-danger mt-1">{{ errors.dob }}</div>
          </div>
        </div>
      </fieldset>

      <fieldset class="mb-3">
        <legend>Account Details</legend>
        <div class="row">
          <div class="col-md-6 mb-2">
            <label class="form-label" for="username">Username:</label>
            <input id="username" name="username" v-model="form.username" class="form-control" />
            <div v-if="errors.username" class="text-danger mt-1">{{ errors.username }}</div>
          </div>
          <div class="col-md-6 mb-2">
            <label class="form-label" for="password">Password:</label>
            <input id="password" name="password" type="password" v-model="form.password" class="form-control" />
            <div v-if="errors.password" class="text-danger mt-1">{{ errors.password }}</div>
          </div>
          <div class="col-md-6 mb-2">
            <label class="form-label" for="confirmPassword">Confirm Password:</label>
            <input id="confirmPassword" name="confirmPassword" type="password" v-model="form.confirmPassword" class="form-control" />
            <div v-if="errors.confirmPassword" class="text-danger mt-1">{{ errors.confirmPassword }}</div>
          </div>
          <div class="col-md-6 mb-2">
            <label class="form-label" for="email">Email:</label>
            <input id="email" name="email" type="email" v-model="form.email" class="form-control" />
            <div v-if="errors.email" class="text-danger mt-1">{{ errors.email }}</div>
          </div>
        </div>
      </fieldset>

      <fieldset class="mb-3">
        <legend>Address</legend>
        <div class="row">
          <div class="col-md-6 mb-2">
            <label class="form-label" for="street">Street Address:</label>
            <input id="street" name="street" v-model="form.street" class="form-control" />
          </div>
          <div class="col-md-6 mb-2">
            <label class="form-label" for="suburb">Suburb:</label>
            <input id="suburb" name="suburb" v-model="form.suburb" class="form-control" />
          </div>
          <div class="col-md-6 mb-2">
            <label class="form-label" for="postcode">Postcode:</label>
            <input id="postcode" name="postcode" v-model="form.postcode" class="form-control" />
            <div v-if="errors.postcode" class="text-danger mt-1">{{ errors.postcode }}</div>
          </div>
          <div class="col-md-6 mb-2">
            <label class="form-label" for="mobile">Mobile Number:</label>
            <input id="mobile" name="mobile" v-model="form.mobile" class="form-control" />
            <div v-if="errors.mobile" class="text-danger mt-1">{{ errors.mobile }}</div>
          </div>
        </div>
      </fieldset>

      <div class="mb-3">
        <label class="form-label" for="category">Preferred Job Category:</label>
        <select id="category" name="category" v-model="form.category" class="form-select">
          <option value="">-- Please select --</option>
          <option>AI</option>
          <option>Data Science</option>
          <option>Web Development</option>
          <option>Cybersecurity</option>
        </select>
        <div v-if="errors.category" class="text-danger mt-1">{{ errors.category }}</div>
      </div>

      <div class="mb-3">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="agreeToTerms" name="agreeToTerms" v-model="form.agreeToTerms">
          <label class="form-check-label" for="agreeToTerms">
            I agree to the Terms and Conditions
          </label>
        </div>
        <div v-if="errors.agreeToTerms" class="text-danger mt-1">{{ errors.agreeToTerms }}</div>
      </div>

      <button type="button" class="btn btn-secondary btn-sm me-2" @click="showTnC = !showTnC">
        View Terms and Conditions
      </button>
      <button type="submit" class="btn btn-primary">Submit</button>

      <div v-if="showTnC" class="mt-3 p-3 border rounded">
        <h5>Terms and Conditions</h5>
        <p>By submitting this application, you agree to share this information for job application purposes only. Your data will be processed in accordance with our privacy policy and will not be shared with third parties without your consent.</p>
      </div>
    </form>
  `,
  data() {
    return {
      showTnC: false,
      form: {
        firstName: '',
        lastName: '',
        dob: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        street: '',
        suburb: '',
        postcode: '',
        mobile: '',
        category: '',
        agreeToTerms: false
      },
      errors: {}
    }
  },
  methods: {
    validate() {
      // Reset errors
      this.errors = {};
      
      const f = this.form;
      
      // Validate required fields
      if (!/^[A-Za-z]+$/.test(f.firstName))
        this.errors.firstName = 'First name required (letters only)';
      
      if (!/^[A-Za-z]+$/.test(f.lastName))
        this.errors.lastName = 'Last name required (letters only)';
      
      if (f.username.length < 3)
        this.errors.username = 'Minimum 3 characters';
      
      if (f.password.length < 8 || !/[\$\%\^\&\*]/.test(f.password))
        this.errors.password = 'Min 8 chars incl. special char ($, %, ^, &, *)';
      
      if (f.password !== f.confirmPassword)
        this.errors.confirmPassword = 'Passwords do not match';
      
      if (!/^\S+@\S+\.\S+$/.test(f.email))
        this.errors.email = 'Invalid email format';
      
      if (!/^\d{4}$/.test(f.postcode))
        this.errors.postcode = 'Exactly 4 digits';
      
      if (!/^04\d{8}$/.test(f.mobile))
        this.errors.mobile = 'Must start with 04 and be 10 digits';
      
      if (!this.isValidAge(f.dob))
        this.errors.dob = 'Must be at least 16 years old';
      
      if (!f.category)
        this.errors.category = 'Please select a job category';
      
      if (!f.agreeToTerms)
        this.errors.agreeToTerms = 'You must agree to the terms and conditions';

      return Object.keys(this.errors).length === 0;
    },
    isValidAge(dateStr) {
      if (!dateStr) return false;
      
      const dob = new Date(dateStr);
      if (isNaN(dob.getTime())) return false;
      
      const now = new Date();
      const age = now.getFullYear() - dob.getFullYear();
      const monthDiff = now.getMonth() - dob.getMonth();
      
      return age > 16 || (age === 16 && (monthDiff > 0 || (monthDiff === 0 && now.getDate() >= dob.getDate())));
    },
    handleSubmit() {
      if (this.validate()) {
        // Using the Composition API's lifecycle hook equivalent in Options API
        this.$nextTick(() => {
          // Get the native form element and submit it
          const formElement = this.$el;
          formElement.submit();
        });
      }
    }
  }
};




// Example of how to mount this in Vue 3
// const app = Vue.createApp({
//   components: {
//     ApplicationForm
//   },
//   template: '<ApplicationForm />'
// });
// app.mount('#app');