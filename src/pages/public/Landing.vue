<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-6 text-center" style="background: var(--bg-primary);">
    <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style="background: var(--accent-dim);">
      <Scissors :size="32" style="color: var(--accent);" />
    </div>
    <h1 class="text-2xl font-bold mb-2">Barber App</h1>
    <p class="text-[15px] mb-10" style="color: var(--text-secondary);">
      Eng yaxshi sartaroshlarni toping va<br/>onlayn navbatga yoziling
    </p>
    <router-link
      to="/role"
      class="w-full py-3.5 rounded-xl text-[17px] font-semibold text-center block"
      style="background: var(--accent); color: #000;"
    >
      Boshlash
    </router-link>
  </div>
</template>

<script setup>
import { Scissors } from 'lucide-vue-next';
</script>
