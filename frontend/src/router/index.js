import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../AuthView.vue';
import ContactsView from '../ContactsView.vue';

const routes = [
  { path: '/', component: AuthView },
  { path: '/contacts', component: ContactsView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;