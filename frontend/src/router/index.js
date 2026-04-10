import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../AuthView.vue';
import ContactsView from '../ContactsView.vue';
import AdminView from '../AdminView.vue';
const routes = [
  { path: '/', component: AuthView },
  { path: '/contacts', component: ContactsView },
  { path: '/admin', component: AdminView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;