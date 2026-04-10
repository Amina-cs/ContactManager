<template>
  <div class="admin-container">
    <header>
      <h1>Admin Dashboard</h1>
      <button @click="$router.push('/contacts')">Go to Contacts</button>
    </header>

    <div class="user-list">
      <h3>Registered Users</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from './api';

const users = ref([]);

onMounted(async () => {
  try {
    const res = await api.get('/admin/users');
    users.value = res.data;
  } catch (e) {
    alert("Failed to load users");
  }
});
</script>

<style scoped>
.admin-container { padding: 20px; max-width: 800px; margin: 0 auto; }
table { width: 100%; border-collapse: collapse; margin-top: 20px; background: white; }
th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
th { background-color: #f4f4f4; }
header { display: flex; justify-content: space-between; align-items: center; }
</style>