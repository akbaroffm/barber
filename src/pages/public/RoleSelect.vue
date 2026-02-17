<template>
  <div class="min-h-screen flex flex-col p-6">
    <h1 class="text-2xl font-bold mt-12 mb-2">Xush kelibsiz!</h1>
    <p class="text-hint mb-12">Ilovadan foydalanish uchun rolingizni tanlang:</p>
    
    <div class="space-y-4">
      <button 
        @click="selectRole('mijoz')"
        class="w-full p-6 bg-secondary-telegram rounded-2xl text-left flex items-center justify-between border-2 border-transparent hover:border-link transition-all"
      >
        <div>
          <span class="block text-xl font-bold">Men mijozman</span>
          <span class="text-sm text-hint">Sartarosh qidirish va yozilish</span>
        </div>
        <User :size="32" class="text-link" />
      </button>
      
      <button 
        @click="selectRole('sartarosh')"
        class="w-full p-6 bg-secondary-telegram rounded-2xl text-left flex items-center justify-between border-2 border-transparent hover:border-link transition-all"
      >
        <div>
          <span class="block text-xl font-bold">Men sartaroshman</span>
          <span class="text-sm text-hint">Mijozlarni boshqarish va xizmatlar</span>
        </div>
        <Scissors :size="32" class="text-link" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { User, Scissors } from 'lucide-vue-next';
import telegram from '@/services/telegram';

const router = useRouter();
const authStore = useAuthStore();

const selectRole = (role) => {
  authStore.setRole(role);
  telegram.HapticFeedback.impactOccurred('medium');
  
  if (role === 'mijoz') {
    router.push('/c/home');
  } else {
    router.push('/b/dashboard');
  }
};
</script>
