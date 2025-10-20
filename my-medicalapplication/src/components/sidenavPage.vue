<template>
  <div class="app-container flex">
    <div class="main-content flex-1 flex flex-col">
      <!-- Top navigation -->
      <header class="top-nav">
        <div class="nav-left">
          <span class="logo">MedFlow</span>
          <nav class="nav-links">
            <RouterLink
              v-for="link in topLinks"
              :key="link.name"
              :to="link.to"
              class="nav-link"
            >
              {{ link.name }}
            </RouterLink>
          </nav>
        </div>
        <div class="nav-right">
          <button class="logout-btn">Logout</button>
        </div>
      </header>

    </div>
   


    
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const topLinks = [
  { name: 'Receptionist', to: '/receptionist' },
  { name: 'Doctor', to: '/doctor' },
  { name: 'Pharmacist', to: '/pharmacist' },
  { name: 'Patient Flow', to: '/patientoverview' }
]


</script>

<style scoped>
.app-container {
  height: 10vh;
  overflow: hidden;
  width:auto ;
}



/* Top navigation */
.top-nav {
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo {
  font-weight: bold;
  font-size: 1.25rem;
  color: #8b5cf6;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #1f2937;
  font-weight: 500;
  text-decoration: none;
}

.nav-link:hover {
  color: #8b5cf6;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  background-color: #8b5cf6;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  object-fit: cover;
}

/* Main content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
