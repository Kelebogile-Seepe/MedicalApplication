<template>
  <div class="register-page">
    <div class="register-card">
      <h1 class="register-title">Create Account</h1>
      <p class="register-subtitle">Sign up to access your medical records.</p>
      <div class="mb-4">
        <label for="username" class="register-label">Username or Email</label>
        <input
          id="username"
          v-model.trim="username"
          type="text"
          placeholder="john.doe@example.com"
          class="register-input"
        />
      </div>

      <div class="mb-4">
        <label for="password" class="register-label">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="••••••••"
          class="register-input"
        />
      </div>

      <div class="mb-4">
        <label for="confirm" class="register-label">Confirm Password</label>
        <input
          id="confirm"
          v-model="confirm"
          type="password"
          placeholder="••••••••"
          class="register-input"
        />
      </div>

      <div class="mb-6">
        <label for="role" class="register-label">Role</label>
        <select
          id="role"
          v-model="role"
          class="register-select"
        >
          <option disabled value="">Select role</option>
          <option>Pharmacist</option>
          <option>Receptionist</option>
          <option>Doctor</option>
        </select>
      </div>

      <button
        @click="handleRegister"
        class="register-button"
      >
        Register
      </button>

      <p class="login-link">
        Already have an account?
        <a @click="goToLogin">Login here</a>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import sidenavPage from './sidenavPage.vue'



const router = useRouter()
const username = ref('')
const password = ref('')
const confirm  = ref('')
const role     = ref('')

const handleRegister = () => {
  if (!username.value || !password.value || !confirm.value || !role.value) {
    alert('Please fill in all fields')
    return
  }
  if (password.value !== confirm.value) {
    alert('Passwords do not match')
    return
  }

  const raw = localStorage.getItem('users')
  const users = raw ? JSON.parse(raw) : []
  if (users.find((u: any) => u.username === username.value.trim().toLowerCase())) {
    alert('User already exists')
    return
  }

  users.push({
    username: username.value.trim().toLowerCase(),
    password: password.value,
    role: role.value
  })
  localStorage.setItem('users', JSON.stringify(users))

  alert('Registration successful ✅')
  router.push('/login')
}

const goToLogin = () => router.push('/login')
</script>

<style scoped>
/* Page background */
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6; /* Tailwind gray-100 */
}

/* Card */
.register-card {
  width: 100%;
  max-width: 24rem;
  background: #ffffff;
  border-radius: 0.75rem;    /* rounded-xl */
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),
              0 4px 6px -4px rgba(0,0,0,0.1);
  padding: 2rem;
  text-align: center;
}

/* Heading and subtitle */
.register-title {
  font-size: 1.875rem;       /* text-3xl */
  font-weight: 800;          /* font-extrabold */
  color: #a855f7;            /* purple-500 */
  margin-bottom: 0.25rem;
}
.register-subtitle {
  color: #4b5563;            /* text-gray-600 */
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

/* Form elements */
.register-label {
  display: block;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;            /* text-gray-700 */
  margin-bottom: 0.25rem;
}

.register-input,
.register-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.register-input:focus,
.register-select:focus {
  border-color: #a855f7;
  box-shadow: 0 0 0 1px #a855f7;
}

/* Button */
.register-button {
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
.register-button:hover {
  background-color: #9333ea;
}

/* Login link */
.login-link {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #4b5563;
}
.login-link a {
  color: #a855f7;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}
.login-link a:hover {
  text-decoration: underline;
}
</style>
