<template>
  <div class="min-h-screen flex flex-col px-6 pt-16" style="background: var(--bg-primary);">
    <h1 class="text-2xl font-bold mb-1">Xush kelibsiz!</h1>
    <p class="text-[15px] mb-10" style="color: var(--text-secondary);">Rolingizni tanlang</p>

    <div class="flex flex-col gap-3">
      <button
        @click="selectRole('mijoz')"
        class="flex items-center gap-4 p-4 rounded-2xl text-left"
        style="background: var(--bg-card);"
      >
        <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background: var(--accent-dim);">
          <User :size="22" style="color: var(--accent);" />
        </div>
        <div class="flex-1">
          <span class="block text-[17px] font-semibold">Men mijozman</span>
          <span class="text-[13px]" style="color: var(--text-secondary);">Sartarosh qidirish va yozilish</span>
        </div>
        <ChevronRight :size="20" style="color: var(--text-muted);" />
      </button>

      <button
        @click="selectRole('sartarosh')"
        class="flex items-center gap-4 p-4 rounded-2xl text-left"
        style="background: var(--bg-card);"
      >
        <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background: var(--blue-dim);">
          <Scissors :size="22" style="color: var(--blue);" />
        </div>
        <div class="flex-1">
          <span class="block text-[17px] font-semibold">Men sartaroshman</span>
          <span class="text-[13px]" style="color: var(--text-secondary);">Mijozlar va xizmatlarni boshqarish</span>
        </div>
        <ChevronRight :size="20" style="color: var(--text-muted);" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { User, Scissors, ChevronRight } from 'lucide-vue-next';
import telegram from '@/services/telegram';

const router = useRouter();
const authStore = useAuthStore();

const selectRole = (role) => {
  authStore.setRole(role);
  telegram.HapticFeedback?.impactOccurred('medium');
  router.push(role === 'mijoz' ? '/c/home' : '/b/dashboard');
};
</script>
