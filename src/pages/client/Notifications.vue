<template>
  <div class="flex flex-col pb-20">
    <TopBar title="Bildirishnomalar">
      <template #right>
        <button 
          v-if="notificationStore.notifications.length > 0"
          @click="notificationStore.clearAll()"
          class="text-xs text-red-500 font-medium"
        >
          Tozalash
        </button>
      </template>
    </TopBar>
    
    <div class="px-4 mt-4">
      <div v-if="notificationStore.notifications.length === 0" class="py-20 text-center">
        <Bell :size="48" class="text-hint mx-auto mb-4 opacity-20" />
        <p class="text-hint">Hozircha bildirishnomalar yo‘q</p>
      </div>
      
      <div v-else class="space-y-3">
        <div 
          v-for="notif in notificationStore.notifications" 
          :key="notif.id"
          class="p-4 rounded-2xl bg-secondary-telegram border-l-4"
          :class="[notif.read ? 'border-transparent' : typeColors[notif.type] || 'border-gray-300']"
          @click="notificationStore.markAsRead(notif.id)"
        >
          <div class="flex justify-between items-start mb-1">
            <h4 class="font-bold text-sm">{{ notif.title }}</h4>
            <span class="text-[10px] text-hint">{{ formatTime(notif.time) }}</span>
          </div>
          <p class="text-sm text-gray-600">{{ notif.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNotificationStore } from '@/stores/notification';
import TopBar from '@/components/shared/TopBar.vue';
import { Bell } from 'lucide-vue-next';

const notificationStore = useNotificationStore();

const typeColors = {
  success: 'border-green-500',
  info: 'border-blue-500',
  error: 'border-red-500'
};

const formatTime = (timeStr) => {
  const d = new Date(timeStr);
  return d.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
};
</script>
