const { createApp } = Vue;
import router from '../router/router.js';

import JobList from './JobList.js';
import JobDetail from './JobDetail.js';
import JobOverview from './JobOverview.js';
import ApplicationForm from './ApplicationForm.js';
import ToDoList from './ToDoList.js';

const App = {
  components: {
    JobList,
    JobDetail,
    JobOverview,
    ApplicationForm,
    ToDoList
  },
  template: `
    <div class="container">
        <h2 class="mb-3">Job Explorer</h2>
   
      <section id="job-explorer" class="my-5">
        <div class="row">
          <div class="col-md-3">
            <JobList />
          </div>
          <div class="col-md-9">
            <router-view></router-view>
          </div>
        </div>
      </section>

      <ApplicationForm></ApplicationForm>
      <!-- To Do List Section -->
      <section id="todolist" class="my-5">
        <h2 class="mb-3"></h2>
        <ToDoList />
      </section>
    </div>
  `
};

const app = createApp(App);
app.use(router).mount('#app');