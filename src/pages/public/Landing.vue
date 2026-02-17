<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-6 text-center">
    <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style="background: var(--tg-secondary);">
      <Scissors :size="32" style="color: var(--tg-link);" />
    </div>
    <h1 class="text-2xl font-bold mb-2">Barber App</h1>
    <p class="text-[15px] mb-10" style="color: var(--tg-hint);">
      Eng yaxshi sartaroshlarni toping va<br/>onlayn navbatga yoziling
    </p>
    <router-link
      to="/role"
      class="w-full py-3.5 rounded-xl text-[17px] font-semibold text-center block"
      style="background: var(--tg-btn); color: var(--tg-btn-text);"
    >
      Boshlash
    </router-link>
  </div>
</template>

<script setup>
import { Scissors } from 'lucide-vue-next';
</script>
