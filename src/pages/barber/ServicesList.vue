<template>
  <div class="flex flex-col pb-20">
    <TopBar title="Xizmatlar" />
    
    <div class="px-4 mt-4 space-y-4">
      <div v-if="barberStore.myServices.length === 0" class="py-20 text-center">
        <p class="text-hint">Xizmatlar qo‘shilmagan</p>
      </div>
      
      <Card v-for="service in barberStore.myServices" :key="service.id" class="p-4 flex justify-between items-center">
        <div>
          <h4 class="font-bold">{{ service.name }}</h4>
          <p class="text-xs text-hint">{{ service.duration }} daqiqa • {{ service.price.toLocaleString() }} so‘m</p>
        </div>
        <div class="flex gap-2">
          <button @click="editService(service)" class="p-2 text-link bg-link/5 rounded-lg">
            <Edit2 :size="18" />
          </button>
          <button @click="deleteService(service.id)" class="p-2 text-red-500 bg-red-50 rounded-lg">
            <Trash2 :size="18" />
          </button>
        </div>
      </Card>
      
      <button 
        @click="openAddModal"
        class="w-full py-4 border-2 border-dashed border-link text-link font-bold rounded-2xl flex items-center justify-center gap-2 mt-4"
      >
        <Plus :size="20" />
        Xizmat qo‘shish
      </button>
    </div>
    
    <!-- Service Form Modal -->
    <BottomSheet 
      :isOpen="isModalOpen" 
      :title="editingService ? 'Xizmatni tahrirlash' : 'Yangi xizmat'" 
      @close="isModalOpen = false"
    >
      <div class="space-y-4 pb-8">
        <div>
          <label class="block text-sm font-medium mb-1 text-hint">Xizmat nomi</label>
          <input 
            v-model="form.name" 
            type="text" 
            placeholder="Masalan: Soch olish" 
            class="w-full bg-secondary-telegram p-4 rounded-xl focus:outline-none"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1 text-hint">Narxi (so‘m)</label>
            <input 
              v-model.number="form.price" 
              type="number" 
              placeholder="50000" 
              class="w-full bg-secondary-telegram p-4 rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1 text-hint">Davomiyligi (daq)</label>
            <input 
              v-model.number="form.duration" 
              type="number" 
              placeholder="30" 
              class="w-full bg-secondary-telegram p-4 rounded-xl focus:outline-none"
            />
          </div>
        </div>
        <button 
          @click="saveService"
          class="w-full bg-button text-button py-4 rounded-2xl font-bold text-lg mt-4 shadow-lg shadow-blue-500/20"
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
import Card from '@/components/ui/Card.vue';
import BottomSheet from '@/components/ui/BottomSheet.vue';
import { Plus, Edit2, Trash2 } from 'lucide-vue-next';
import telegram from '@/services/telegram';

const barberStore = useBarberStore();
const isModalOpen = ref(false);
const editingService = ref(null);

const form = reactive({
  name: '',
  price: null,
  duration: null
});

const openAddModal = () => {
  editingService.value = null;
  form.name = '';
  form.price = null;
  form.duration = null;
  isModalOpen.value = true;
};

const editService = (service) => {
  editingService.value = service;
  form.name = service.name;
  form.price = service.price;
  form.duration = service.duration;
  isModalOpen.value = true;
};

const saveService = () => {
  if (!form.name || !form.price || !form.duration) {
    telegram.showAlert('Iltimos, barcha maydonlarni to‘ldiring');
    return;
  }
  
  if (editingService.value) {
    barberStore.updateService(editingService.value.id, { ...form });
    telegram.HapticFeedback.notificationOccurred('success');
  } else {
    barberStore.addService({ ...form });
    telegram.HapticFeedback.notificationOccurred('success');
  }
  
  isModalOpen.value = false;
};

const deleteService = (id) => {
  telegram.showConfirm('Haqiqatan ham bu xizmatni o‘chirmoqchimisiz?', (confirmed) => {
    if (confirmed) {
      barberStore.deleteService(id);
      telegram.HapticFeedback.impactOccurred('medium');
    }
  });
};
</script>
