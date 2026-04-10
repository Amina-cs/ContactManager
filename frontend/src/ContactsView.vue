<template>
  <div class="manager-container">
    <header class="top-bar">
      <h1>My Contacts</h1>
      <button @click="logout" class="logout-btn">Logout</button>
    </header>

    <div class="content">
      <section class="add-section">
        <h3>Add New Contact</h3>
        <form @submit.prevent="addContact" class="contact-form">
          <input v-model="newContact.name" placeholder="Name" required />
          <input v-model="newContact.num" placeholder="Phone Number" required />
          <button type="submit">Add</button>
        </form>
      </section>

      <section class="list-section">
        <div v-for="c in contacts" :key="c.id" class="contact-card">
          <div class="info">
            <h4>{{ c.name }}</h4>
            <p>{{ c.num }}</p>
          </div>
          <button @click="deleteContact(c.id)" class="del-btn">Delete</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from './api';

const contacts = ref([]);
const userId = localStorage.getItem('userId');
const newContact = ref({ name: '', num: '', email: '' });

const fetchContacts = async () => {
  const res = await api.get(`/contacts?userId=${userId}`);
  contacts.value = res.data;
};

const addContact = async () => {
  await api.post('/contacts', { ...newContact.value, userId });
  newContact.value = { name: '', num: '', email: '' };
  fetchContacts();
};

const deleteContact = async (id) => {
  if (confirm('Delete this contact?')) {
    await api.delete(`/contacts/${id}`);
    fetchContacts();
  }
};

const logout = () => {
  localStorage.removeItem('userId');
  window.location.href = '/';
};

onMounted(fetchContacts);
</script>

<style scoped>
.manager-container { max-width: 900px; margin: 0 auto; padding: 2rem; }
.top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.logout-btn { background: #fee2e2; color: #dc2626; padding: 0.5rem 1rem; border-radius: 6px; border: none; cursor: pointer; }

.add-section { background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; }
.contact-form { display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 1rem; }
.contact-form input { padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 4px; }
.contact-form button { background: #10b981; color: white; border: none; padding: 0 1.5rem; border-radius: 4px; cursor: pointer; }

.list-section { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
.contact-card { 
  background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 8px;
  display: flex; justify-content: space-between; align-items: center;
}
.info h4 { margin: 0; color: #1e293b; }
.info p { margin: 4px 0; color: #64748b; font-size: 0.9rem; }
.del-btn { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 0.8rem; }
.del-btn:hover { text-decoration: underline; }

@media (max-width: 600px) {
  .contact-form { grid-template-columns: 1fr; }
}
</style>