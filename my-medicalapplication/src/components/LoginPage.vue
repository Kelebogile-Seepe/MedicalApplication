<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">MediConnect</h1>
      <p class="login-subtitle">Access your medical records and services.</p>

      <div class="mb-4 text-left">
        <label for="username" class="login-label">Username or Email</label>
        <input
          id="username"
          v-model.trim="username"
          type="text"
          placeholder="john.doe@example.com"
          class="login-input"
        />
      </div>

      <div class="mb-4 text-left">
        <label for="password" class="login-label">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="••••••••"
          class="login-input"
        />
      </div>

      <div class="mb-6 text-left">
        <label for="role" class="login-label">Role</label>
        <select id="role" v-model="role" class="login-select">
          <option disabled value="">Select role</option>
          <option>Pharmacist</option>
          <option>Receptionist</option>
          <option>Doctor</option>
        </select>
      </div>

      <button @click="handleLogin" class="login-button">
        Login
      </button>

      <p class="register-text">
        Don’t have an account?
        <a @click="goToRegister">Register here</a>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

type User = { username: string; password: string; role: string }

const router = useRouter()
const username = ref('')
const password = ref('')
const role = ref('')

const normalize = (u: string) => u.trim().toLowerCase()

const loadUsers = (): User[] => {
  const raw = localStorage.getItem('users')
  if (!raw) return []
  try { return JSON.parse(raw) } catch { return [] }
}

const handleLogin = () => {
  if (!username.value || !password.value || !role.value) {
    alert('Please fill in all fields')
    return
  }

  const users = loadUsers()
  const uname = normalize(username.value)
  const user = users.find(u => u.username === uname)

  if (!user) {
    alert('You are not registered. Please register first.')
    return
  }

  if (user.password !== password.value) {
    alert('Incorrect password')
    return
  }

  if (user.role !== role.value) {
    alert(`Role mismatch! You registered as ${user.role}.`)
    return
  }

  switch (user.role) {
    case 'Doctor': router.push('/doctor'); break
    case 'Pharmacist': router.push('/pharmacist'); break
    case 'Receptionist': router.push('/receptionist'); break
  }
}

const goToRegister = () => router.push('/register')
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
}
.login-card {
  width: 100%;
  max-width: 24rem;
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),
              0 4px 6px -4px rgba(0,0,0,0.1);
  padding: 2rem;
  text-align: center;
}
.login-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #a855f7;
  margin-bottom: 0.25rem;
}
.login-subtitle {
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}
.login-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}
.login-input,
.login-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.login-input:focus,
.login-select:focus {
  border-color: #a855f7;
  box-shadow: 0 0 0 1px #a855f7;
}
.login-button {
  width: 100%;
  background-color: #a855f7;
  color: #fff;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.login-button:hover {
  background-color: #9333ea;
}
.register-text {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #4b5563;
}
.register-text a {
  color: #a855f7;
  font-weight: 500;
  text-decoration: none;
}
.register-text a:hover {
  text-decoration: underline;
}
</style>
