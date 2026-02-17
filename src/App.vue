<template>
  <div class="min-h-screen bg-telegram text-telegram pb-20">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    
    <BottomNav v-if="showBottomNav" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BottomNav from '@/components/shared/BottomNav.vue';

const route = useRoute();

const showBottomNav = computed(() => {
  return route.meta.requiresAuth;
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
