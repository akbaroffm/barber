<template>
  <div class="min-h-screen flex flex-col p-6 items-center justify-center" style="background: var(--bg-primary);">
    <div class="w-full max-w-sm space-y-8">
      <div class="text-center">
        <!-- Role Badge -->
        <div 
          v-if="authStore.role"
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-[12px] font-bold uppercase tracking-wider"
          :style="{ 
            background: authStore.role === 'mijoz' ? 'var(--accent-dim)' : 'var(--blue-dim)',
            color: authStore.role === 'mijoz' ? 'var(--accent)' : 'var(--blue)'
          }"
        >
          {{ authStore.role === 'mijoz' ? 'Mijoz' : 'Sartarosh' }} sifatida kirish
        </div>

        <h1 class="text-3xl font-bold mb-2">Xush kelibsiz</h1>
        <p class="text-[15px] opacity-60" style="color: var(--text-secondary);">
          Davom etish uchun tizimga kiring
        </p>
      </div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-[12px] font-bold uppercase tracking-widest mb-2 opacity-60">Telefon raqam</label>
          <input 
            v-model="phone"
            type="text" 
            placeholder="+998 90 123 45 67" 
            class="w-full p-4 rounded-xl focus:outline-none transition-all focus:ring-2 focus:ring-[var(--accent)]"
            style="background: var(--bg-card); color: var(--text-primary);"
          />
        </div>

        <div>
           <label class="block text-[12px] font-bold uppercase tracking-widest mb-2 opacity-60">Parol</label>
           <input 
             v-model="password"
             type="password"
             placeholder="••••••••"
             class="w-full p-4 rounded-xl focus:outline-none transition-all focus:ring-2 focus:ring-[var(--accent)]"
             style="background: var(--bg-card); color: var(--text-primary);"
           />
        </div>

        <div v-if="error" class="p-3 rounded-xl bg-red-500/10 text-red-500 text-[13px] font-medium text-center">
          {{ error }}
        </div>
        
        <button 
          @click="handleLogin"
          :disabled="loading"
          class="w-full py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          :class="loading ? 'opacity-70 cursor-not-allowed' : ''"
          style="background: var(--accent); color: #000;"
        >
          <span v-if="loading" class="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
          {{ loading ? 'Tekshirilmoqda...' : 'Kirish' }}
        </button>
      </div>
      
      <div class="text-center">
         <button @click="$router.push('/role')" class="text-[13px] font-medium opacity-50 hover:opacity-100 transition-opacity">
           Rolni o'zgartirish
         </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import telegram from '@/services/telegram';

const router = useRouter();
const authStore = useAuthStore();

const phone = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

// Pre-fill for testing/demo convenience based on current role
onMounted(() => {
  if (!authStore.role) {
    router.replace('/role');
    return;
  }
  
  // Auto-fill mock credentials for better DX
  if (authStore.role === 'mijoz') {
    phone.value = '+998 90 123 45 67';
    password.value = '123';
  } else {
    phone.value = '+998 90 987 65 43';
    password.value = '123';
  }
});

const handleLogin = async () => {
  if (!phone.value || !password.value) {
    error.value = "Ma'lumotlarni to'liq kiriting";
    telegram.HapticFeedback?.notificationOccurred('error');
    return;
  }

  loading.value = true;
  error.value = '';
  telegram.HapticFeedback?.impactOccurred('light');

  try {
    const user = await authStore.login(phone.value, password.value);
    telegram.HapticFeedback?.notificationOccurred('success');
    
    // Redirect based on role
    if (user.role === 'mijoz') router.replace('/c/home');
    else router.replace('/b/dashboard');
    
  } catch (err) {
    error.value = err;
    telegram.HapticFeedback?.notificationOccurred('error');
  } finally {
    loading.value = false;
  }
};
</script>
