export default {
    name: "JobList",
    data() {
      return {
        jobs: [
          { job_id: "MLA101", job_title: "Machine Learning Intern" },
          { job_id: "DSC202", job_title: "Data Science Assistant" },
          { job_id: "AIP303", job_title: "Data Science Assistant" },
          { job_id: "DEV404", job_title: "Full Stack Developer" },
          { job_id: "CLD505", job_title: "Cloud DevOps Engineer" },
          { job_id: "DSA606", job_title: "Data Analyst Intern" },
          { job_id: "NLP707", job_title: "NLP Project Assistant" },
          { job_id: "CVV808", job_title: "Computer Vision Intern" },
          { job_id: "SEC909", job_title: "Cybersecurity Analyst" },
          { job_id: "RLS010", job_title: "Reinforcement Learning Engineer" }
        ]
      }; 
    },
    template: `
      <div class="list-group">
        <router-link to="/" class="list-group-item">Overview</router-link>
        <router-link 
          v-for="job in jobs" 
          :key="job.job_id" 
          :to="'/job/' + job.job_id"
          class="list-group-item"
        >
         {{ job.job_id }}
        </router-link>
      </div>
    `
};

