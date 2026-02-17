<template>
  <div class="flex flex-col pb-20">
    <TopBar title="Sozlamalar" />
    
    <div class="px-4 mt-6 space-y-6">
      <!-- Profile Info -->
      <div class="flex items-center gap-4 p-4 bg-secondary-telegram rounded-2xl">
        <div class="w-16 h-16 bg-link text-white rounded-full flex items-center justify-center text-2xl font-bold">
          {{ telegram.user.first_name?.[0] || 'M' }}
        </div>
        <div>
          <h3 class="font-bold text-lg">{{ telegram.user.first_name }} {{ telegram.user.last_name }}</h3>
          <p class="text-sm text-hint">ID: {{ telegram.user.id }}</p>
        </div>
      </div>
      
      <!-- Menu Items -->
      <div class="space-y-2">
        <button 
          @click="changeRole"
          class="w-full flex items-center justify-between p-4 bg-secondary-telegram rounded-xl"
        >
          <div class="flex items-center gap-3">
            <UserCircle :size="20" class="text-link" />
            <span class="font-medium">Rolni o‘zgartirish</span>
          </div>
          <p class="text-xs font-bold bg-link/10 text-link px-2 py-1 rounded capitalize">{{ authStore.role }}</p>
        </button>
        
        <button class="w-full flex items-center justify-between p-4 bg-secondary-telegram rounded-xl">
          <div class="flex items-center gap-3">
            <Globe :size="20" class="text-link" />
            <span class="font-medium">Til: O‘zbek</span>
          </div>
        </button>
        
        <button class="w-full flex items-center justify-between p-4 bg-secondary-telegram rounded-xl">
          <div class="flex items-center gap-3">
            <Moon :size="20" class="text-link" />
            <span class="font-medium">Tungi rejim</span>
          </div>
          <div class="w-10 h-5 bg-gray-300 rounded-full relative">
            <div class="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
          </div>
        </button>
      </div>
      
      <div class="pt-8 text-center">
        <p class="text-xs text-hint">Barber App v1.0.0</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import TopBar from '@/components/shared/TopBar.vue';
import { UserCircle, Globe, Moon } from 'lucide-vue-next';
import telegram from '@/services/telegram';

const authStore = useAuthStore();
const router = useRouter();

const changeRole = () => {
  telegram.showConfirm('Haqiqatan ham rolni o‘zgartirmoqchimisiz?', (confirmed) => {
    if (confirmed) {
      authStore.logout();
      router.push('/role');
    }
  });
};
</script>
