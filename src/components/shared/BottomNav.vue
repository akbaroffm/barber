<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-secondary-telegram border-t border-gray-200 px-4 py-2 flex justify-between items-center z-50">
    <router-link 
      v-for="item in navItems" 
      :key="item.path" 
      :to="item.path"
      class="flex flex-col items-center gap-1 text-[10px] min-w-[64px]"
      :class="[route.path.includes(item.path) ? 'text-link' : 'text-hint']"
    >
      <component :is="item.icon" :size="20" :stroke-width="2" />
      <span>{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { 
  Home, 
  Calendar, 
  Bell, 
  Settings, 
  LayoutDashboard, 
  Scissors 
} from 'lucide-vue-next';

const route = useRoute();
const authStore = useAuthStore();

const navItems = computed(() => {
  if (authStore.role === 'mijoz') {
    return [
      { path: '/c/home', label: 'Asosiy', icon: Home },
      { path: '/c/bookings', label: 'Navbatlarim', icon: Calendar },
      { path: '/c/notifications', label: 'Bildirish', icon: Bell },
      { path: '/c/settings', label: 'Sozlamalar', icon: Settings }
    ];
  } else {
    return [
      { path: '/b/dashboard', label: 'Panel', icon: LayoutDashboard },
      { path: '/b/bookings', label: 'Navbatlar', icon: Calendar },
      { path: '/b/services', label: 'Xizmatlar', icon: Scissors },
      { path: '/b/settings', label: 'Sozlamalar', icon: Settings }
    ];
  }
});
</script>
