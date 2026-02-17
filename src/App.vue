<template>
  <div class="min-h-screen" style="background: var(--tg-bg); color: var(--tg-text);">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <BottomNav v-if="showNav" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BottomNav from '@/components/shared/BottomNav.vue';

const route = useRoute();
const showNav = computed(() => route.meta.requiresAuth);
</script>
