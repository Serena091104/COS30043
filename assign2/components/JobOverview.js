import JobList from './JobList.js';
export default {
  name: 'JobOverview',
  components: {
    JobList
  },
  template: `
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Job Overview</h3>
        <p class="card-text">
          Welcome to the Insight Hire Job Explorer! This portal lists all available job openings.
          Select a job from the list to view its details, or explore all jobs to understand what each role offers.
        </p>
        <ul>
          <li>Browse different job categories like AI, Data Science, Web Development, and Cybersecurity.</li>
          <li>Check job responsibilities, required qualifications, and application procedures.</li>
          <li>Use the application form to apply directly for your desired position.</li>
        </ul>
        <p class="text-muted">Please click on each Job ID to view its details.</p>
      </div>
    </div>
  `
};


