<template>
  <div class="pb-24">
    <TopBar title="Xabarnomalar">
      <template #right>
        <button v-if="ns.notifications.length" @click="ns.clearAll()" class="text-[13px] font-medium" style="color: var(--red);">Tozalash</button>
      </template>
    </TopBar>

    <div v-if="!ns.notifications.length" class="flex flex-col items-center pt-24 text-center">
      <Bell :size="40" style="color: var(--text-muted);" />
      <p class="text-[15px] mt-4" style="color: var(--text-secondary);">Bildirishnomalar yo'q</p>
    </div>

    <div v-else class="px-4 pt-2">
      <div class="rounded-2xl overflow-hidden" style="background: var(--bg-card);">
        <div v-for="(n, i) in ns.notifications" :key="n.id" class="px-4 py-3.5 flex gap-3" :style="i < ns.notifications.length - 1 ? 'border-bottom: 0.5px solid var(--separator)' : ''" @click="ns.markAsRead(n.id)">
          <div class="w-2 h-2 rounded-full shrink-0 mt-1.5" :style="{ background: n.read ? 'transparent' : (n.type === 'success' ? 'var(--accent)' : n.type === 'error' ? 'var(--red)' : 'var(--blue)') }" />
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-start mb-0.5">
              <span class="text-[14px] font-semibold">{{ n.title }}</span>
              <span class="text-[11px] shrink-0 ml-2" style="color: var(--text-muted);">{{ formatTime(n.time) }}</span>
            </div>
            <p class="text-[13px]" style="color: var(--text-secondary);">{{ n.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNotificationStore } from '@/stores/notification';
import TopBar from '@/components/shared/TopBar.vue';
import { Bell } from 'lucide-vue-next';
const ns = useNotificationStore();
const formatTime = (t) => new Date(t).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
</script>
