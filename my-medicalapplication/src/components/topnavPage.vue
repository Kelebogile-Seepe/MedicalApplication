<template>
  <!-- Sidebar -->
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <RouterLink
        v-for="link in sidebarLinks"
        :key="link.name"
        :to="link.to"
        class="sidebar-link"
        active-class="sidebar-link-active"
      >
        <component :is="link.icon" class="sidebar-icon" />
        <span>{{ link.name }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script>
import {
  Stethoscope,
  UserSquare,
  Pill,
  ActivitySquare,
  BookOpen
} from "lucide-vue-next";
import { RouterLink } from "vue-router";

export default {
  name: "SidenavPage",
  components: { RouterLink },
  data() {
    return {
      sidebarLinks: [
        { name: "Receptionist Workflow", to: "/receptionist", icon: UserSquare },
        { name: "Doctor Workflow", to: "/doctor", icon: Stethoscope },
        { name: "Pharmacist Workflow", to: "/pharmacist", icon: Pill },
        { name: "Patient Flow Overview", to: "/patientoverview", icon: ActivitySquare },
        { name: "System Library", to: "/library", icon: BookOpen },
      ],
    };
  },
};
</script>

<style scoped>
/* Sidebar */
.sidebar {
  width: 18rem;
  background-color: #fff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  color: #1f2937;
  font-weight: 500;
  transition: all 0.2s;
}

.sidebar-link:hover {
  background-color: #f3f4f6;
  color: #8b5cf6;
}

.sidebar-link-active {
  background-color: #8b5cf6;
  color: #fff;
}

.sidebar-icon {
  margin-right: 0.8rem;
  width: 20px;
  height: 20px;
}
</style>
