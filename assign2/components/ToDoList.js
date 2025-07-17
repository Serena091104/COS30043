export default {
  name: 'ToDoList',
  template: `
    <div class="container">
      <h2 class="mt-3">To-Do List</h2>
      <div class="input-group mb-3">
        <input v-model="newTask" class="form-control" placeholder="Enter a new task" />
        <button class="btn btn-primary" @click="addTask">Add</button>
      </div>

      <ul class="list-group">
        <li
          v-for="(task, index) in tasks"
          :key="index"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {{ task.text }}
          <div>
            <button
              v-if="task.priority === 'High'"
              class="btn btn-warning btn-sm me-2"
              @click="togglePriority(index)"
            >
              Mark as Low Priority
            </button>
            <button
              v-else-if="task.priority === 'Low'"
              class="btn btn-outline-warning btn-sm me-2"
              @click="togglePriority(index)"
            >
              Mark as High Priority
            </button>
            <button
              v-else
              class="btn btn-outline-success btn-sm me-2"
              @click="togglePriority(index)"
            >
              Mark as High Priority
            </button>
            <button class="btn btn-danger btn-sm" @click="deleteTask(index)">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  `,
  data() {
    return {
      newTask: '',
      tasks: []
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.unshift({ text: this.newTask.trim(), priority: null });
        this.newTask = '';
      }
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    togglePriority(index) {
      const current = this.tasks[index];
      if (current.priority === 'High') {
        current.priority = 'Low';
        current.text = current.text.replace('(High Priority)', '').trim() + ' (Low Priority)';
      } else if (current.priority === 'Low') {
        current.priority = 'High';
        current.text = current.text.replace('(Low Priority)', '').trim() + ' (High Priority)';
      } else {
        current.priority = 'High';
        current.text = current.text + ' (High Priority)';
      }
    }
  }
};