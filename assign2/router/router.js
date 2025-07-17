
const { createRouter, createWebHashHistory } = VueRouter;
import JobList from '../components/JobList.js';
import JobDetail from '../components/JobDetail.js';
import JobOverview from '../components/JobOverview.js';
import ApplicationForm from '../components/ApplicationForm.js';
import ToDoList from '../components/ToDoList.js';

const routes = [
  { path: '/', component: JobOverview },
  { 
    path: '/job/:jobId',
    component: JobDetail,
    props: true
  },
    { path: '/job-application', component: ApplicationForm },
    //{ path: '/todolist', component: ToDoList }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
