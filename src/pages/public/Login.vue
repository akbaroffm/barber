<template>
  <div class="min-h-screen flex flex-col p-6 items-center justify-center">
    <div class="w-full max-w-sm space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold">Kirish</h1>
        <p class="text-hint mt-2">Ilovaga kirish uchun ma’lumotlaringizni kiriting</p>
      </div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-hint">Telefon raqam</label>
          <input 
            type="text" 
            placeholder="+998 90 123 45 67" 
            class="w-full bg-secondary-telegram p-4 rounded-xl focus:outline-none"
          />
        </div>
        
        <button 
          @click="login"
          class="w-full bg-button text-button py-4 rounded-2xl font-bold text-lg"
        >
          Kirish
        </button>
      </div>
      
      <p class="text-center text-sm text-hint">
        Hisobingiz yo‘qmi? <span class="text-link font-bold">Ro‘yxatdan o‘ting</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import telegram from '@/services/telegram';

const router = useRouter();

const login = () => {
  telegram.HapticFeedback.impactOccurred('medium');
  router.push('/role');
};
</script>
