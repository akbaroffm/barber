<template>
  <div class="pb-24">
    <TopBar title="Xizmatlar" />

    <div class="px-4 pt-2">
      <div v-if="barberStore.myServices.length === 0" class="flex flex-col items-center pt-20 text-center">
        <p class="text-[15px]" style="color: var(--tg-hint);">Xizmatlar qo'shilmagan</p>
      </div>

      <div v-else class="rounded-2xl overflow-hidden mb-4" style="background: var(--tg-secondary);">
        <div
          v-for="(s, i) in barberStore.myServices"
          :key="s.id"
          class="flex items-center justify-between px-4 py-3.5"
          :style="i < barberStore.myServices.length - 1 ? 'border-bottom: 0.5px solid var(--tg-separator)' : ''"
        >
          <div>
            <span class="text-[15px] font-medium block">{{ s.name }}</span>
            <span class="text-[13px]" style="color: var(--tg-hint);">{{ s.duration }} daq · {{ s.price.toLocaleString() }} so'm</span>
          </div>
          <div class="flex gap-3">
            <button @click="editService(s)" class="text-[13px] font-medium" style="color: var(--tg-link);">Tahrir</button>
            <button @click="deleteService(s.id)" class="text-[13px] font-medium" style="color: var(--tg-destructive);">O'chir</button>
          </div>
        </div>
      </div>

      <button
        @click="openAdd"
        class="w-full py-3.5 rounded-xl text-[15px] font-semibold"
        style="background: var(--tg-btn); color: var(--tg-btn-text);"
      >
        Xizmat qo'shish
      </button>
    </div>

    <BottomSheet :isOpen="showForm" :title="editing ? 'Tahrirlash' : 'Yangi xizmat'" @close="showForm = false">
      <div class="flex flex-col gap-3 pb-4">
        <input v-model="form.name" placeholder="Nomi (masalan: Soch olish)" />
        <div class="flex gap-3">
          <input v-model.number="form.price" type="number" placeholder="Narx (so'm)" />
          <input v-model.number="form.duration" type="number" placeholder="Daqiqa" />
        </div>
        <button
          @click="save"
          class="w-full py-3.5 rounded-xl text-[15px] font-semibold mt-1"
          style="background: var(--tg-btn); color: var(--tg-btn-text);"
        >
          Saqlash
        </button>
      </div>
    </BottomSheet>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useBarberStore } from '@/stores/barber';
import TopBar from '@/components/shared/TopBar.vue';
import BottomSheet from '@/components/ui/BottomSheet.vue';
import telegram from '@/services/telegram';

const barberStore = useBarberStore();
const showForm = ref(false);
const editing = ref(null);
const form = reactive({ name: '', price: null, duration: null });

const openAdd = () => { editing.value = null; form.name = ''; form.price = null; form.duration = null; showForm.value = true; };
const editService = (s) => { editing.value = s; form.name = s.name; form.price = s.price; form.duration = s.duration; showForm.value = true; };

const save = () => {
  if (!form.name || !form.price || !form.duration) { telegram.showAlert?.('Barcha maydonlarni to\'ldiring'); return; }
  if (editing.value) barberStore.updateService(editing.value.id, { ...form });
  else barberStore.addService({ ...form });
  telegram.HapticFeedback?.notificationOccurred('success');
  showForm.value = false;
};

const deleteService = (id) => {
  barberStore.deleteService(id);
  telegram.HapticFeedback?.impactOccurred('medium');
};
</script>
