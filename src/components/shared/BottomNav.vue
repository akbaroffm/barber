<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 flex w-[400px] mx-auto rounded-t-2xl"
    style="background: var(--bg-card); border-top: 0.5px solid var(--separator)"
  >
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="flex-1 flex flex-col items-center gap-0.5 py-2 pt-2.5"
      :style="{
        color: isActive(item.path) ? 'var(--accent)' : 'var(--text-muted)',
      }"
    >
      <component
        :is="item.icon"
        :size="22"
        :stroke-width="isActive(item.path) ? 2.2 : 1.8"
      />
      <span class="text-[10px] font-medium">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  Home,
  CalendarDays,
  Bell,
  Settings,
  LayoutDashboard,
  Scissors,
  Wallet,
} from "lucide-vue-next";

const route = useRoute();
const authStore = useAuthStore();

const isActive = (path) => route.path.startsWith(path);

const navItems = computed(() => {
  if (authStore.role === "mijoz") {
    return [
      { path: "/c/home", label: "Asosiy", icon: Home },
      { path: "/c/bookings", label: "Navbatlarim", icon: CalendarDays },
      { path: "/c/notifications", label: "Xabarnoma", icon: Bell },
      { path: "/c/settings", label: "Sozlamalar", icon: Settings },
    ];
  }
  return [
    { path: "/b/dashboard", label: "Panel", icon: LayoutDashboard },
    { path: "/b/bookings", label: "Navbatlar", icon: CalendarDays },
    { path: "/b/finance", label: "Moliya", icon: Wallet },
    { path: "/b/services", label: "Xizmatlar", icon: Scissors },
    { path: "/b/settings", label: "Sozlamalar", icon: Settings },
  ];
});
</script>
