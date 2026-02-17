<template>
  <div class="pb-28">
    <TopBar title="Xizmatlar" showBack />
    <div class="px-4 pt-2">
      <!-- Category Tabs -->
      <div
        v-if="barberStore.myServices.length > 0"
        class="flex gap-2 mb-4 overflow-x-auto no-scrollbar"
      >
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all"
          :style="{
            background:
              activeCategory === cat ? 'var(--accent)' : 'var(--bg-card)',
            color: activeCategory === cat ? '#000' : 'var(--text-secondary)',
          }"
        >
          {{ cat }}
        </button>
      </div>

      <div
        v-if="filteredServices.length === 0"
        class="flex flex-col items-center pt-24 text-center px-10"
      >
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style="background: var(--bg-card)"
        >
          <Scissors :size="32" style="color: var(--text-muted)" />
        </div>
        <p class="text-[15px]" style="color: var(--text-secondary)">
          {{
            barberStore.myServices.length === 0
              ? "Hali xizmatlar qo'shilmagan"
              : "Bu kategoriyada xizmatlar yo'q"
          }}
        </p>
      </div>

      <div v-else class="flex flex-col gap-3 mb-6">
        <div
          v-for="s in filteredServices"
          :key="s.id"
          class="p-4 rounded-[24px] flex items-center justify-between"
          style="background: var(--bg-card); border: 1px solid #ffffff05"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-11 h-11 rounded-2xl flex items-center justify-center"
              style="background: var(--accent-dim)"
            >
              <Scissors :size="20" style="color: var(--accent)" />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-0.5">
                <span class="text-[15px] font-bold">{{ s.name }}</span>
                <span
                  class="text-[9px] font-bold px-2 py-0.5 rounded-md"
                  :style="{
                    background: 'var(--accent-dim)',
                    color: 'var(--accent)',
                  }"
                  >{{ s.category || "Erkaklar" }}</span
                >
              </div>
              <span class="text-[12px]" style="color: var(--text-secondary)"
                >{{ s.duration }} daq ·
                <span style="color: var(--accent)"
                  >{{ s.price.toLocaleString() }} so'm</span
                ></span
              >
            </div>
          </div>
          <div class="flex gap-2">
            <button
              @click="editService(s)"
              class="w-9 h-9 rounded-xl flex items-center justify-center"
              style="background: var(--bg-elevated)"
            >
              <Edit2 :size="16" style="color: var(--text-secondary)" />
            </button>
            <button
              @click="deleteService(s.id)"
              class="w-9 h-9 rounded-xl flex items-center justify-center"
              style="background: var(--bg-elevated)"
            >
              <Trash2 :size="16" style="color: var(--red)" />
            </button>
          </div>
        </div>
      </div>

      <div class="fixed bottom-16 left-4 right-4 z-40">
        <button
          @click="openAdd"
          class="w-full py-4 rounded-[20px] text-[15px] font-bold shadow-lg flex items-center justify-center gap-2"
          style="background: var(--accent); color: #000"
        >
          <Plus :size="18" /> Yangi xizmat qo'shish
        </button>
      </div>
    </div>

    <!-- Redesigned Service Form (Slide-up menu) -->
    <transition name="slide-up">
      <div
        v-if="showForm"
        class="fixed inset-0 z-[100] flex flex-col justify-end"
      >
        <div
          class="absolute inset-0 bg-black/80 backdrop-blur-md"
          @click="showForm = false"
        />
        <div
          class="relative rounded-t-[32px] overflow-hidden"
          style="
            background: var(--bg-primary);
            padding-bottom: env(safe-area-inset-bottom);
          "
        >
          <div
            class="w-10 h-1.5 rounded-full mx-auto mt-4 mb-6"
            style="background: var(--bg-elevated)"
          />

          <div class="px-6 pb-10">
            <h2 class="text-xl font-bold mb-6 flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center"
                style="background: var(--accent-dim)"
              >
                <Scissors :size="20" style="color: var(--accent)" />
              </div>
              {{ editing ? "Xizmatni tahrirlash" : "Yangi xizmat qo'shish" }}
            </h2>

            <div class="flex flex-col gap-5">
              <div class="flex flex-col gap-2">
                <label
                  class="text-[11px] font-bold uppercase tracking-widest ml-1"
                  style="color: var(--text-muted)"
                  >Xizmat nomi</label
                >
                <div class="relative">
                  <Type
                    :size="16"
                    class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    style="color: var(--text-secondary)"
                  />
                  <input
                    v-model="form.name"
                    placeholder="Masalan: Soch va soqol olish"
                    class="py-4 bg-card-elevated w-full"
                    style="
                      background: var(--bg-card);
                      border-radius: 18px;
                      padding-left: 48px;
                    "
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-2">
                  <label
                    class="text-[11px] font-bold uppercase tracking-widest ml-1"
                    style="color: var(--text-muted)"
                    >Narxi (UZS)</label
                  >
                  <div class="relative">
                    <Wallet
                      :size="16"
                      class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      style="color: var(--text-secondary)"
                    />
                    <input
                      v-model.number="form.price"
                      type="number"
                      placeholder="50 000"
                      class="py-4 w-full"
                      style="
                        background: var(--bg-card);
                        border-radius: 18px;
                        padding-left: 48px;
                      "
                    />
                  </div>
                </div>
                <div class="flex-1 flex flex-col gap-2">
                  <label
                    class="text-[11px] font-bold uppercase tracking-widest ml-1"
                    style="color: var(--text-muted)"
                    >Vaqti (daq)</label
                  >
                  <div class="relative">
                    <Clock
                      :size="16"
                      class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      style="color: var(--text-secondary)"
                    />
                    <input
                      v-model.number="form.duration"
                      type="number"
                      placeholder="45"
                      class="py-4 w-full"
                      style="
                        background: var(--bg-card);
                        border-radius: 18px;
                        padding-left: 48px;
                      "
                    />
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <label
                  class="text-[11px] font-bold uppercase tracking-widest ml-1"
                  style="color: var(--text-muted)"
                  >Xizmat turi</label
                >
                <div class="flex gap-2">
                  <button
                    v-for="cat in ['Erkaklar', 'Ayollar', 'Bolalar']"
                    :key="cat"
                    @click="form.category = cat"
                    class="flex-1 py-3 rounded-xl text-[12px] font-bold transition-all"
                    :style="{
                      background:
                        form.category === cat
                          ? 'var(--accent)'
                          : 'var(--bg-card)',
                      color:
                        form.category === cat
                          ? '#000'
                          : 'var(--text-secondary)',
                    }"
                  >
                    {{ cat }}
                  </button>
                </div>
              </div>
            </div>

            <button
              @click="save"
              class="w-full py-4.5 rounded-[22px] text-[16px] font-bold mt-10 shadow-[0_10px_30px_rgba(200,149,46,0.2)]"
              style="background: var(--accent); color: #000"
            >
              {{ editing ? "O'zgarishlarni saqlash" : "Xizmatni yaratish" }}
            </button>
            <button
              @click="showForm = false"
              class="w-full py-4 text-[14px] font-bold mt-2 opacity-50"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useBarberStore } from "@/stores/barber";
import TopBar from "@/components/shared/TopBar.vue";
import {
  Scissors,
  Edit2,
  Trash2,
  Plus,
  Clock,
  Wallet,
  Type,
} from "lucide-vue-next";
import telegram from "@/services/telegram";

const barberStore = useBarberStore();
const showForm = ref(false);
const editing = ref(null);
const form = reactive({
  name: "",
  price: null,
  duration: null,
  category: "Erkaklar",
});
const activeCategory = ref("Hammasi");
const categories = ref(["Hammasi", "Erkaklar", "Ayollar", "Bolalar"]);

const filteredServices = computed(() => {
  if (activeCategory.value === "Hammasi") return barberStore.myServices;
  return barberStore.myServices.filter(
    (s) => (s.category || "Erkaklar") === activeCategory.value,
  );
});

const openAdd = () => {
  editing.value = null;
  form.name = "";
  form.price = null;
  form.duration = null;
  form.category = "Erkaklar";
  showForm.value = true;
};
const editService = (s) => {
  editing.value = s;
  form.name = s.name;
  form.price = s.price;
  form.duration = s.duration;
  form.category = s.category || "Erkaklar";
  showForm.value = true;
};

const save = () => {
  if (!form.name || !form.price || !form.duration) {
    telegram.showAlert?.("Barcha maydonlarni to'ldiring");
    return;
  }
  if (editing.value) barberStore.updateService(editing.value.id, { ...form });
  else barberStore.addService({ ...form });
  telegram.HapticFeedback?.notificationOccurred("success");
  showForm.value = false;
};

const deleteService = (id) => {
  telegram.showConfirm?.("O'chirmoqchimisiz?", (ok) => {
    if (ok) {
      barberStore.deleteService(id);
      telegram.HapticFeedback?.impactOccurred("light");
    }
  });
};
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

input::placeholder {
  color: var(--text-muted);
  opacity: 0.5;
}
</style>
