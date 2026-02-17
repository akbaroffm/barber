<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6 text-center">
    <div class="mb-8 p-4 bg-primary/10 rounded-full">
      <Scissors :size="64" class="text-primary" />
    </div>
    <h1 class="text-3xl font-bold mb-4">Barber App</h1>
    <p class="text-hint mb-12">
      Sizga yaqin bo‘lgan eng yaxshi sartaroshlarni toping va onlayn navbatga yoziling.
    </p>
    
    <div class="w-full space-y-4">
      <router-link 
        to="/role" 
        class="block w-full bg-button text-button py-4 rounded-xl font-semibold text-lg"
      >
        Boshlash
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { Scissors } from 'lucide-vue-next';
</script>
