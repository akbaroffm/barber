<template>
  <div class="pb-24">
    <TopBar title="Sozlamalar" />

    <div class="px-4 pt-4">
      <div class="flex items-center gap-3.5 mb-6">
        <div class="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold" style="background: #7c3aed; color: #fff;">
          {{ telegram.user.first_name?.[0] || 'S' }}
        </div>
        <div>
          <span class="block text-[17px] font-semibold">{{ telegram.user.first_name }} (Sartarosh)</span>
          <span class="text-[13px]" style="color: var(--tg-hint);">@{{ telegram.user.username || 'foydalanuvchi' }}</span>
        </div>
      </div>

      <div class="rounded-2xl overflow-hidden" style="background: var(--tg-secondary);">
        <button @click="$router.push('/b/schedule')" class="flex items-center justify-between w-full px-4 py-3.5 text-left" style="border-bottom: 0.5px solid var(--tg-separator);">
          <span class="text-[15px]">Ish jadvali</span>
          <ChevronRight :size="18" style="color: var(--tg-hint);" />
        </button>
        <button @click="$router.push('/b/portfolio')" class="flex items-center justify-between w-full px-4 py-3.5 text-left" style="border-bottom: 0.5px solid var(--tg-separator);">
          <span class="text-[15px]">Portfolio va yutuqlar</span>
          <ChevronRight :size="18" style="color: var(--tg-hint);" />
        </button>
        <button @click="changeRole" class="flex items-center justify-between w-full px-4 py-3.5 text-left" style="border-bottom: 0.5px solid var(--tg-separator);">
          <span class="text-[15px]">Rolni o'zgartirish</span>
          <span class="text-[13px] font-medium capitalize" style="color: var(--tg-link);">{{ authStore.role }}</span>
        </button>
        <div class="flex items-center justify-between px-4 py-3.5">
          <span class="text-[15px]">Ilova versiyasi</span>
          <span class="text-[13px]" style="color: var(--tg-hint);">1.0.0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import TopBar from '@/components/shared/TopBar.vue';
import { ChevronRight } from 'lucide-vue-next';
import telegram from '@/services/telegram';

const authStore = useAuthStore();
const router = useRouter();
const changeRole = () => { authStore.logout(); router.push('/role'); };
</script>
