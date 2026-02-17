<template>
  <div class="pb-24">
    <TopBar title="Sozlamalar" />
    <div class="px-4 pt-4">
      <div class="flex items-center gap-3.5 mb-6">
        <div class="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold" style="background: var(--accent); color: #000;">
          {{ telegram.user.first_name?.[0] || 'M' }}
        </div>
        <div>
          <span class="block text-[17px] font-semibold">{{ telegram.user.first_name }} {{ telegram.user.last_name }}</span>
          <span class="text-[13px]" style="color: var(--text-secondary);">@{{ telegram.user.username || 'foydalanuvchi' }}</span>
        </div>
      </div>
      <div class="rounded-2xl overflow-hidden" style="background: var(--bg-card);">
        <button @click="changeRole" class="flex items-center justify-between w-full px-4 py-3.5 text-left" style="border-bottom: 0.5px solid var(--separator);">
          <span class="text-[15px]">Rolni o'zgartirish</span>
          <span class="text-[13px] font-medium capitalize" style="color: var(--accent);">{{ authStore.role }}</span>
        </button>
        <div class="flex items-center justify-between px-4 py-3.5 text-left" style="border-bottom: 0.5px solid var(--separator);">
          <span class="text-[15px]">Til</span>
          <span class="text-[13px]" style="color: var(--text-secondary);">O'zbek</span>
        </div>
        <div class="flex items-center justify-between px-4 py-3.5 text-left">
          <span class="text-[15px]">Ilova versiyasi</span>
          <span class="text-[13px]" style="color: var(--text-secondary);">1.0.0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import TopBar from '@/components/shared/TopBar.vue';
import telegram from '@/services/telegram';
import storage from '@/utils/storage';

const authStore = useAuthStore();
const router = useRouter();

const changeRole = () => { 
  const perform = () => {
    telegram.HapticFeedback?.impactOccurred('medium');
    storage.remove('user_role');
    storage.remove('user_data');
    authStore.logout(); 
    window.location.href = '/role';
  };

  if (telegram.showConfirm) {
    telegram.showConfirm("Rolni o'zgartirmoqchimisiz? Joriy sessiya tugatiladi.", (ok) => {
      if (ok) perform();
    });
  } else {
    if (confirm("Rolni o'zgartirmoqchimisiz?")) perform();
  }
};
</script>
