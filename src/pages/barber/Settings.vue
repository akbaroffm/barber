<template>
  <div class="pb-24">
    <TopBar title="Sozlamalar" />
    <div class="px-4 pt-4">
      <!-- Profile Header Card (Tappable for Edit) -->
      <div
        @click="openEdit"
        class="p-6 rounded-[32px] mb-6 relative overflow-hidden transition-active active:scale-[0.98] cursor-pointer"
        style="background: var(--bg-card); border: 1px solid #ffffff05"
      >
        <div
          class="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20"
          style="background: var(--accent)"
        />

        <div class="flex items-center gap-4 relative z-10">
          <div
            class="w-16 h-16 rounded-[24px] overflow-hidden border-2 border-[#c8952e33]"
          >
            <img
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="text-lg font-bold truncate">
              {{ barberStore.currentUser?.name || telegram.user.first_name }}
            </h2>
            <div class="flex items-center gap-2">
              <span
                class="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg bg-[#c8952e20]"
                style="color: var(--accent)"
                >Professional</span
              >
            </div>
          </div>
          <ChevronRight :size="18" class="opacity-30" />
        </div>
      </div>

      <!-- Settings Menu -->
      <h3
        class="text-[11px] font-bold uppercase tracking-[2px] mb-3 ml-4 opacity-40"
      >
        Menyu
      </h3>
      <div
        class="rounded-[28px] overflow-hidden mb-6"
        style="background: var(--bg-card); border: 1px solid #ffffff05"
      >
        <button
          @click="$router.push('/b/schedule')"
          class="flex items-center justify-between w-full px-5 py-4 text-left transition-active active:bg-white/5"
          style="border-bottom: 0.5px solid #ffffff05"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center bg-[#2a2117]"
            >
              <Clock :size="18" style="color: var(--accent)" />
            </div>
            <span class="text-[15px] font-medium">Ish jadvali</span>
          </div>
          <ChevronRight :size="18" style="color: var(--text-muted)" />
        </button>

        <button
          @click="$router.push('/b/portfolio')"
          class="flex items-center justify-between w-full px-5 py-4 text-left transition-active active:bg-white/5"
          style="border-bottom: 0.5px solid #ffffff05"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center bg-[#2a2117]"
            >
              <LayoutGrid :size="18" style="color: var(--accent)" />
            </div>
            <span class="text-[15px] font-medium">Portfolio va yutuqlar</span>
          </div>
          <ChevronRight :size="18" style="color: var(--text-muted)" />
        </button>

        <button
          @click="$router.push('/b/finance')"
          class="flex items-center justify-between w-full px-5 py-4 text-left transition-active active:bg-white/5"
          style="border-bottom: 0.5px solid #ffffff05"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center bg-[#2a2117]"
            >
              <Wallet :size="18" style="color: var(--accent)" />
            </div>
            <span class="text-[15px] font-medium">Moliya bo'limi</span>
          </div>
          <ChevronRight :size="18" style="color: var(--text-muted)" />
        </button>

        <button
          @click="changeRole"
          class="flex items-center justify-between w-full px-5 py-4 text-left transition-active active:bg-white/5"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center bg-[#2a2117]"
            >
              <UserCircle :size="18" style="color: var(--accent)" />
            </div>
            <div>
              <span class="text-[15px] font-medium">Rolni o'zgartirish</span>
              <span
                class="text-[11px] block text-green-500 font-bold uppercase"
                >{{ authStore.role }}</span
              >
            </div>
          </div>
          <ChevronRight :size="18" style="color: var(--text-muted)" />
        </button>
      </div>

      <!-- App Info -->
      <div class="px-6 flex justify-between items-center opacity-30">
        <span class="text-[12px] font-bold">Barber App v1.0.4</span>
        <span class="text-[10px]">Toshkent, 2026</span>
      </div>
    </div>

    <!-- Edit Profile BottomSheet -->
    <BottomSheet
      :isOpen="isEditOpen"
      title="Profilni tahrirlash"
      @close="isEditOpen = false"
    >
      <div class="flex flex-col gap-5 pb-8">
        <div class="flex flex-col gap-2">
          <label
            class="text-[11px] font-bold uppercase tracking-widest ml-1"
            style="color: var(--text-muted)"
            >F.I.SH (Ism)</label
          >
          <input
            v-model="editForm.name"
            placeholder="Aziz Sartarosh"
            style="
              background: var(--bg-input);
              border-radius: 16px;
              padding: 14px 18px;
            "
          />
        </div>
        <div class="flex flex-col gap-2">
          <label
            class="text-[11px] font-bold uppercase tracking-widest ml-1"
            style="color: var(--text-muted)"
            >Telefon raqami</label
          >
          <input
            v-model="editForm.phone"
            placeholder="+998 90 123 45 67"
            style="
              background: var(--bg-input);
              border-radius: 16px;
              padding: 14px 18px;
            "
          />
        </div>
        <div class="flex flex-col gap-2">
          <label
            class="text-[11px] font-bold uppercase tracking-widest ml-1"
            style="color: var(--text-muted)"
            >Manzil</label
          >
          <div class="flex flex-col gap-2">
            <div
              class="p-4 rounded-2xl flex items-center justify-between"
              style="background: var(--bg-input)"
            >
              <span class="text-[14px] truncate flex-1 pr-4">{{
                editForm.address || "Manzil tanlanmagan"
              }}</span>
              <button
                @click="openMapPicker"
                class="px-3 py-1.5 rounded-lg text-[12px] font-bold"
                style="background: var(--accent); color: #000"
              >
                Xaritadan
              </button>
            </div>
            <span v-if="editForm.location" class="text-[10px] ml-2 opacity-40"
              >Kordinatalar: {{ editForm.location.lat.toFixed(4) }},
              {{ editForm.location.lng.toFixed(4) }}</span
            >
          </div>
        </div>

        <button
          @click="saveProfile"
          class="w-full py-4.5 rounded-[22px] text-[16px] font-bold mt-4 shadow-lg transition-active active:scale-95"
          style="background: var(--accent); color: #000"
        >
          Saqlash
        </button>
      </div>
    </BottomSheet>

    <!-- Map Picker BottomSheet -->
    <BottomSheet
      :isOpen="isMapOpen"
      title="Manzilni tanlang"
      @close="isMapOpen = false"
    >
      <div class="flex flex-col gap-4 pb-8">
        <div
          class="aspect-square w-full rounded-2xl overflow-hidden relative"
          style="background: #2a2117"
        >
          <BaseMap
            mode="select"
            :initial-location="editForm.location ? [editForm.location.lat, editForm.location.lng] : null"
            @update:location="handleLocationUpdate"
          />
          
          <div
            class="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md z-[500]"
          >
            <span class="text-[12px] font-medium text-white"
              >Xaritani suring va markaziy nuqtani tanlang</span
            >
          </div>
        </div>
        <div class="p-4 rounded-xl" style="background: var(--bg-input)">
          <span class="text-[13px] font-medium block mb-1 opacity-50"
            >Tanlangan manzil:</span
          >
          <span class="text-[14px] font-bold"
            >{{ tempAddress || "Hali tanlanmagan" }}</span
          >
        </div>
        <div class="flex gap-3">
          <button
            @click="getCurrentLocation"
            class="flex-1 py-3 rounded-xl text-[13px] font-bold border border-[var(--separator)] flex items-center justify-center gap-2 active:bg-white/5"
            style="color: var(--text-primary)"
          >
            <MapPin :size="16" />
            Mening joylashuvim
          </button>
        </div>
        <button
          @click="confirmMapSelection"
          class="w-full py-4 rounded-2xl text-[15px] font-bold"
          :class="!tempLocation ? 'opacity-50' : ''"
          :disabled="!tempLocation"
          style="background: var(--accent); color: #000"
        >
          Shu yerni tanlash
        </button>
      </div>
    </BottomSheet>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useBarberStore } from "@/stores/barber";
import { useRouter } from "vue-router";
import TopBar from "@/components/shared/TopBar.vue";
import BottomSheet from "@/components/ui/BottomSheet.vue";
import BaseMap from "@/components/common/BaseMap.vue";
import { getAddressFromCoordinates } from "@/utils/location";
import {
  ChevronRight,
  Clock,
  LayoutGrid,
  Wallet,
  UserCircle,
  MapPin,
} from "lucide-vue-next";
import telegram from "@/services/telegram";
import storage from "@/utils/storage";

const authStore = useAuthStore();
const barberStore = useBarberStore();
const router = useRouter();

const isEditOpen = ref(false);
const isMapOpen = ref(false);
const tempLocation = ref(null);
const tempAddress = ref("");

const editForm = reactive({
  name: barberStore.currentUser?.name || "",
  phone: barberStore.currentUser?.phone || "",
  address: barberStore.currentUser?.address || "",
  location: barberStore.currentUser?.location || null,
});

const openEdit = () => {
  editForm.name = barberStore.currentUser?.name || "";
  editForm.phone = barberStore.currentUser?.phone || "";
  editForm.address = barberStore.currentUser?.address || "";
  editForm.location = barberStore.currentUser?.location || null;
  isEditOpen.value = true;
};

const openMapPicker = () => {
  telegram.HapticFeedback?.impactOccurred("light");
  tempLocation.value = editForm.location;
  tempAddress.value = editForm.address;
  isMapOpen.value = true;
};

const handleLocationUpdate = async ({ lat, lng }) => {
  tempLocation.value = { lat, lng };
  tempAddress.value = "Manzil aniqlanmoqda...";
  
  // Use reverse geocoding
  const address = await getAddressFromCoordinates(lat, lng);
  tempAddress.value = address;
};

const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    telegram.showAlert?.("Geolokatsiya qo'llab-quvvatlanmaydi");
    return;
  }
  
  tempAddress.value = "Joylashuv aniqlanmoqda...";
  telegram.HapticFeedback?.impactOccurred("medium");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const lat = latitude;
      const lng = longitude;
      
      tempLocation.value = { lat, lng };
      const address = await getAddressFromCoordinates(lat, lng);
      tempAddress.value = address;
      telegram.HapticFeedback?.notificationOccurred("success");
    },
    (err) => {
      console.error(err);
      telegram.showAlert?.("Joylashuvni aniqlab bo'lmadi. GPS yoqilganligini tekshiring.");
      tempAddress.value = editForm.address; // Revert
    },
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  );
};

const confirmMapSelection = () => {
  if (!tempLocation.value) return;
  
  editForm.location = tempLocation.value;
  editForm.address = tempAddress.value;

  telegram.HapticFeedback?.notificationOccurred("success");
  isMapOpen.value = false;
};

const saveProfile = () => {
  if (!editForm.name || !editForm.phone || !editForm.address) {
    telegram.showAlert?.("Iltimos, barcha maydonlarni to'ldiring");
    return;
  }

  if (barberStore.currentUser) {
    barberStore.currentUser.name = editForm.name;
    barberStore.currentUser.phone = editForm.phone;
    barberStore.currentUser.address = editForm.address;
    if (editForm.location) barberStore.currentUser.location = editForm.location;

    // Persist to storage
    storage.set("barber_data", barberStore.currentUser);
  }

  telegram.HapticFeedback?.notificationOccurred("success");
  telegram.showAlert?.("Profil ma'lumotlari muvaffaqiyatli saqlandi");
  isEditOpen.value = false;
};

const changeRole = () => {
  const perform = () => {
    telegram.HapticFeedback?.impactOccurred("medium");
    storage.remove("user_role");
    storage.remove("user_data");
    authStore.logout();
    // Use router.replace to avoid server 404s
    router.replace('/role');
  };

  if (telegram.showConfirm) {
    telegram.showConfirm(
      "Rolni o'zgartirmoqchimisiz? Joriy sessiya tugatiladi.",
      (ok) => {
        if (ok) perform();
      },
    );
  } else {
    if (confirm("Rolni o'zgartirmoqchimisiz?")) perform();
  }
};
</script>
