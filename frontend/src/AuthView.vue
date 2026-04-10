<script setup>
import { ref } from 'vue';
import api from './api';
import { useRouter } from 'vue-router';

const isLogin = ref(true);
const form = ref({ username: '', password: '' });
const loading = ref(false);
const router = useRouter();

async function handleSubmit() {
  loading.value = true;
  const endpoint = isLogin.value ? '/auth/login' : '/auth/register';
  
  try {
    const res = await api.post(endpoint, form.value);
    
    // Store whatever ID comes back (checking both res.data.id and res.data.user.id)
    const user = res.data || (res.data.user );
    
    if (user) {
      localStorage.setItem('userId', user.id);
      console.log("Login Success, User ID:", user.id);
      console.log(user.user)
      if (user.user.username === 'admin' || user.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/contacts');
      } 
    } else {
      alert("Server didn't return a User ID");
    }
  } catch (e) {
    alert(e.response?.data?.error || 'Auth failed');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="card">
      <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
      <input v-model="form.username" placeholder="Username" />
      <input v-model="form.password" type="password" placeholder="Password" />
      <button @click="handleSubmit" :disabled="loading">
        {{ isLogin ? 'Sign In' : 'Sign Up' }}
      </button>
      <p @click="isLogin = !isLogin" style="cursor:pointer; color: blue;">
        {{ isLogin ? 'Need an account? Register' : 'Have one? Login' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-page { display: flex; justify-content: center; padding-top: 50px; }
.card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 300px; }
input { width: 100%; margin-bottom: 10px; padding: 8px; box-sizing: border-box; }
button { width: 100%; padding: 10px; background: #4f46e5; color: white; border: none; cursor: pointer; }
</style>