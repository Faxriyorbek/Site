import { createRouter, createWebHistory } from "vue-router";

import Register from "../Components/Register.vue";
import Teacher from "../Components/Teacher/Teacher.vue";
import Student from "../Components/Student/Student.vue";

const routes = [
  {
    path: "/",
    component: Register,
  },
  {
    path: "/teacher",
    component: Teacher,
  },
  {
    path: "/student",
    component: Student,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
