<template>
  <div class="pb-24">
    <div 
      class="flex items-center justify-between px-4 pt-3 pb-2 sticky top-0 z-50 backdrop-blur-md"
      style="background: var(--bg-primary-alpha, rgba(22, 18, 12, 0.8));"
    >
      <h1 class="text-xl font-bold">Navbatlar</h1>
      <div
        class="flex p-0.5 rounded-xl bg-[#1e1810]"
        style="border: 0.5px solid #ffffff08"
      >
        <button
          @click="viewMode = 'list'"
          class="px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
          :style="{
            background: viewMode === 'list' ? 'var(--accent)' : 'transparent',
            color: viewMode === 'list' ? '#000' : 'var(--text-secondary)',
          }"
        >
          <List :size="16" />
          <span class="text-[12px] font-bold">Ro'yxat</span>
        </button>
        <button
          @click="viewMode = 'calendar'"
          class="px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
          :style="{
            background:
              viewMode === 'calendar' ? 'var(--accent)' : 'transparent',
            color: viewMode === 'calendar' ? '#000' : 'var(--text-secondary)',
          }"
        >
          <CalendarDays :size="16" />
          <span class="text-[12px] font-bold">Kalendar</span>
        </button>
      </div>
    </div>

    <!-- Calendar View -->
    <div
      v-if="viewMode === 'calendar'"
      class="px-4 animate-in fade-in duration-300"
    >
      <div
        class="p-4 rounded-[28px] mb-5"
        style="background: var(--bg-card); border: 1px solid #ffffff05"
      >
        <div class="flex items-center justify-between mb-4 px-1">
          <span class="text-[15px] font-bold"
            >{{ monthNames[currentMonth] }} {{ currentYear }}</span
          >
          <div class="flex gap-1">
            <button
              @click="prevMonth"
              class="w-8 h-8 rounded-lg flex items-center justify-center bg-[#2a2117]"
            >
              <ChevronLeft :size="18" />
            </button>
            <button
              @click="nextMonth"
              class="w-8 h-8 rounded-lg flex items-center justify-center bg-[#2a2117]"
            >
              <ChevronRight :size="18" />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-7 gap-1 text-center mb-2">
          <span
            v-for="d in ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya']"
            :key="d"
            class="text-[10px] font-bold uppercase tracking-widest"
            style="color: var(--text-muted)"
            >{{ d }}</span
          >
        </div>

        <div class="grid grid-cols-7 gap-1">
          <div
            v-for="empty in blankDays"
            :key="'blank-' + empty"
            class="aspect-square"
          />
          <button
            v-for="day in daysInMonth"
            :key="day"
            @click="selectedDate = formatIso(currentYear, currentMonth, day)"
            class="aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all"
            :style="dayStyle(day)"
          >
            <span class="text-[14px] font-bold">{{ day }}</span>
            <div
              v-if="hasBookings(day)"
              class="w-1 h-1 rounded-full absolute bottom-1.5"
              :style="{
                background:
                  selectedDate === formatIso(currentYear, currentMonth, day)
                    ? '#000'
                    : 'var(--accent)',
              }"
            />
          </button>
        </div>
      </div>

      <h3 class="text-[14px] font-bold px-1 mb-3 flex items-center gap-2">
        {{
          isToday(selectedDate) ? "Bugungi" : formatDateReadable(selectedDate)
        }}
        navbatlar
      </h3>

      <div
        v-if="dateBookings.length === 0"
        class="py-12 text-center rounded-[28px] border-2 border-dashed border-[#ffffff08]"
        style="background: #1e181050"
      >
        <p class="text-[13px] font-medium" style="color: var(--text-muted)">
          Bu kunda navbatlar yo'q
        </p>
      </div>

      <div v-else class="flex flex-col gap-2.5">
        <div
          v-for="b in dateBookings"
          :key="b.id"
          class="p-4 rounded-[24px] flex items-center justify-between"
          style="background: var(--bg-card); border: 1px solid #ffffff05"
          @click="openClientDetail(b)"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-2xl flex items-center justify-center font-bold"
              :style="statusMiniStyle(b.status)"
            >
              {{ b.clientName[0] }}
            </div>
            <div>
              <span class="text-[14px] font-bold block">{{
                b.clientName
              }}</span>
              <span class="text-[12px] opacity-50">{{ b.serviceName }}</span>
            </div>
          </div>
          <div class="text-right">
            <span
              class="text-[14px] font-bold block"
              :style="{
                color: b.status === 'yangi' ? 'var(--orange)' : 'var(--accent)',
              }"
              >{{ b.time }}</span
            >
            <span
              class="text-[10px] font-bold uppercase tracking-wider opacity-40"
              >{{ statusLabels[b.status] }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else class="animate-in fade-in duration-300">
      <div class="flex px-4 gap-1 pt-1 pb-3">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="flex-1 py-2.5 rounded-xl text-[12px] font-bold text-center transition-all"
          :style="{
            background:
              activeTab === tab.id ? 'var(--accent)' : 'var(--bg-card)',
            color: activeTab === tab.id ? '#000' : 'var(--text-secondary)',
          }"
        >
          {{ tab.label }}
          <span
            v-if="tab.count > 0"
            class="ml-1 px-1.5 py-0.5 rounded-md bg-black/10 text-[10px]"
            >{{ tab.count }}</span
          >
        </button>
      </div>

      <div
        v-if="filtered.length === 0"
        class="flex flex-col items-center pt-24 text-center px-8"
      >
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style="background: var(--bg-card)"
        >
          <CalendarX :size="32" style="color: var(--text-muted)" />
        </div>
        <p class="text-[15px]" style="color: var(--text-secondary)">
          Hozircha navbatlar topilmadi
        </p>
      </div>

      <div v-else class="px-4 flex flex-col gap-3">
        <div
          v-for="b in filtered"
          :key="b.id"
          class="p-4 rounded-2xl relative transition-all active:scale-[0.98]"
          style="background: var(--bg-card); border: 1px solid #ffffff05"
          @click="openClientDetail(b)"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-11 h-11 rounded-2xl flex items-center justify-center text-[16px] font-bold"
                style="background: var(--bg-elevated); color: var(--accent)"
              >
                {{ b.clientName[0] }}
              </div>
              <div>
                <span class="text-[15px] font-bold block">{{
                  b.clientName
                }}</span>
                <span
                  class="text-[12px] flex items-center gap-1"
                  style="color: var(--text-secondary)"
                >
                  <Package :size="12" /> {{ b.serviceName }}
                </span>
              </div>
            </div>
            <div class="text-right">
              <span
                class="text-[15px] font-bold block"
                style="color: var(--accent)"
                >{{ b.time }}</span
              >
              <span class="text-[11px]" style="color: var(--text-muted)">{{
                formatDateBrief(b.date)
              }}</span>
            </div>
          </div>

          <!-- Quick actions -->
          <div v-if="b.status === 'yangi'" class="flex gap-2" @click.stop>
            <button
              @click="handleAction(b.id, 'bekor')"
              class="flex-1 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2"
              style="background: var(--red-dim); color: var(--red)"
            >
              <X :size="14" /> Rad etish
            </button>
            <button
              @click="handleAction(b.id, 'tasdiqlangan')"
              class="flex-1 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2"
              style="background: var(--accent); color: #000"
            >
              <Check :size="14" /> Tasdiqlash
            </button>
          </div>
          <div
            v-else-if="b.status === 'tasdiqlangan'"
            class="flex gap-2"
            @click.stop
          >
            <button
              @click="handleAction(b.id, 'bajarilgan')"
              class="w-full py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2"
              style="background: var(--accent); color: #000"
            >
              <Trophy :size="14" /> Tugatish
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Client Detail Bottom Sheet -->
    <transition name="sheet">
      <div
        v-if="selectedBooking"
        class="fixed inset-0 z-[100] flex flex-col justify-end"
      >
        <div
          class="absolute inset-0 bg-black/70 backdrop-blur-sm"
          @click="selectedBooking = null"
        />
        <div
          class="relative rounded-t-[32px] overflow-y-auto"
          style="background: var(--bg-primary); max-height: 85vh"
        >
          <div
            class="w-10 h-1.5 rounded-full mx-auto mt-4 mb-4"
            style="background: var(--bg-elevated)"
          />

          <div class="px-6 pb-8">
            <!-- Header -->
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-16 h-16 rounded-[24px] flex items-center justify-center text-2xl font-bold"
                style="
                  background: var(--bg-card);
                  border: 1px solid var(--accent);
                  color: var(--accent);
                "
              >
                {{ selectedBooking.clientName[0] }}
              </div>
              <div class="flex-1 min-w-0">
                <h2 class="text-xl font-bold mb-0.5">
                  {{ selectedBooking.clientName }}
                </h2>
                <div class="flex items-center gap-2">
                  <span
                    class="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                    :style="statusStyle(selectedBooking.status)"
                  >
                    {{ statusLabels[selectedBooking.status] }}
                  </span>
                  <span class="text-xs text-[#9a8c7a] flex items-center gap-1"
                    ><History :size="12" /> 4-marta tashrif</span
                  >
                </div>
              </div>
              <button
                class="w-10 h-10 rounded-2xl flex items-center justify-center"
                style="background: var(--bg-card)"
              >
                <Phone :size="18" style="color: var(--accent)" />
              </button>
            </div>

            <!-- Booking Info Cards -->
            <div class="grid grid-cols-2 gap-3 mb-6">
              <div class="p-4 rounded-3xl" style="background: var(--bg-card)">
                <span
                  class="text-[10px] font-bold uppercase tracking-wider block mb-2"
                  style="color: var(--text-muted)"
                  >Sana va vaqt</span
                >
                <span class="text-[14px] font-bold block">{{
                  formatDateFull(selectedBooking.date)
                }}</span>
                <span
                  class="text-[14px] font-bold tracking-tight"
                  style="color: var(--accent)"
                  >{{ selectedBooking.time }}</span
                >
              </div>
              <div class="p-4 rounded-3xl" style="background: var(--bg-card)">
                <span
                  class="text-[10px] font-bold uppercase tracking-wider block mb-2"
                  style="color: var(--text-muted)"
                  >Mehmonlar</span
                >
                <div class="flex items-center gap-2">
                  <Users :size="16" style="color: var(--accent)" />
                  <span class="text-[14px] font-bold"
                    >{{ selectedBooking.guestCount || 1 }} kishi</span
                  >
                </div>
                <span
                  class="text-[11px] block mt-1"
                  style="color: var(--text-secondary)"
                  >Jami: {{ fmt(selectedBooking.price) }} so'm</span
                >
              </div>
            </div>

            <!-- Services -->
            <div class="mb-6">
              <h3
                class="text-[14px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
                style="color: var(--text-secondary)"
              >
                Xizmatlar
              </h3>
              <div class="flex flex-col gap-2">
                <div
                  v-for="s in selectedBooking.services || [
                    {
                      name: selectedBooking.serviceName,
                      price: selectedBooking.price,
                    },
                  ]"
                  :key="s.name"
                  class="p-3.5 rounded-2xl flex items-center justify-between"
                  style="background: var(--bg-card)"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-lg flex items-center justify-center"
                      style="background: var(--accent-dim)"
                    >
                      <Scissors :size="14" style="color: var(--accent)" />
                    </div>
                    <span class="text-[14px] font-medium">{{ s.name }}</span>
                  </div>
                  <span class="text-[14px] font-bold"
                    >{{ fmt(s.price) }} so'm</span
                  >
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div
              v-if="selectedBooking.status === 'yangi'"
              class="grid grid-cols-2 gap-3"
            >
              <button
                @click="handleAction(selectedBooking.id, 'bekor')"
                class="py-4 rounded-2xl text-[15px] font-bold"
                style="
                  background: var(--bg-card);
                  border: 1px solid var(--red);
                  color: var(--red);
                "
              >
                Rad etish
              </button>
              <button
                @click="handleAction(selectedBooking.id, 'tasdiqlangan')"
                class="py-4 rounded-2xl text-[15px] font-bold"
                style="background: var(--accent); color: #000"
              >
                Tasdiqlash
              </button>
            </div>
            <button
              v-else-if="selectedBooking.status === 'tasdiqlangan'"
              @click="handleAction(selectedBooking.id, 'bajarilgan')"
              class="w-full py-4 rounded-2xl text-[15px] font-bold"
              style="background: var(--accent); color: #000"
            >
              Ishni tugatish (Daromad qo'shiladi)
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useBookingStore } from "@/stores/booking";
import TopBar from "@/components/shared/TopBar.vue";
import {
  List,
  CalendarDays,
  CalendarX,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Users,
  Package,
  Trophy,
  Phone,
  History,
  Scissors,
} from "lucide-vue-next";
import telegram from "@/services/telegram";

const bookingStore = useBookingStore();
const viewMode = ref("calendar");
const activeTab = ref("yangi");
const selectedBooking = ref(null);

const now = new Date();
const currentMonth = ref(now.getMonth());
const currentYear = ref(now.getFullYear());
const selectedDate = ref(now.toISOString().split("T")[0]);

const monthNames = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
];
const tabs = computed(() => [
  {
    id: "yangi",
    label: "Yangi",
    count: bookingStore.bookings.filter((b) => b.status === "yangi").length,
  },
  {
    id: "tasdiqlangan",
    label: "Faol",
    count: bookingStore.bookings.filter((b) => b.status === "tasdiqlangan")
      .length,
  },
  { id: "bajarilgan", label: "Tugagan", count: 0 },
  { id: "bekor", label: "Rad qilingan", count: 0 },
]);

const statusLabels = {
  yangi: "Yangi",
  tasdiqlangan: "Tasdiqlangan",
  bajarilgan: "Bajarildi",
  bekor: "Rad etilgan",
};

const filtered = computed(() =>
  bookingStore.bookings.filter((b) => b.status === activeTab.value).reverse(),
);
const dateBookings = computed(() =>
  bookingStore.bookings
    .filter((b) => b.date === selectedDate.value)
    .sort((a, b) => a.time.localeCompare(b.time)),
);

const daysInMonth = computed(() =>
  new Date(currentYear.value, currentMonth.value + 1, 0).getDate(),
);
const blankDays = computed(() => {
  let day = new Date(currentYear.value, currentMonth.value, 1).getDay();
  return day === 0 ? 6 : day - 1; // Adjust for Monday start
});

const formatIso = (y, m, d) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const hasBookings = (d) =>
  bookingStore.bookings.some(
    (b) => b.date === formatIso(currentYear.value, currentMonth.value, d),
  );
const isToday = (iso) => iso === new Date().toISOString().split("T")[0];

const dayStyle = (d) => {
  const iso = formatIso(currentYear.value, currentMonth.value, d);
  const isSelected = selectedDate.value === iso;
  const isTodayDate = isToday(iso);

  if (isSelected) return { background: "var(--accent)", color: "#000" };
  if (isTodayDate)
    return { background: "var(--accent-dim)", color: "var(--accent)" };
  return { color: "var(--text-primary)" };
};

const handleAction = async (id, status) => {
  await bookingStore.updateBookingStatus(id, status);
  telegram.HapticFeedback?.notificationOccurred(
    status === "tasdiqlangan" ? "success" : "warning",
  );
  if (selectedBooking.value && selectedBooking.value.id === id)
    selectedBooking.value = null;
};

const openClientDetail = (b) => {
  selectedBooking.value = b;
  telegram.HapticFeedback?.impactOccurred("light");
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else currentMonth.value++;
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else currentMonth.value--;
};

const formatDateBrief = (d) =>
  new Date(d).toLocaleDateString("uz-UZ", { day: "numeric", month: "short" });
const formatDateReadable = (d) => {
  const date = new Date(d);
  return `${date.getDate()}-${monthNames[date.getMonth()]}`;
};
const formatDateFull = (d) =>
  new Date(d).toLocaleDateString("uz-UZ", {
    day: "numeric",
    month: "long",
    weekday: "short",
  });
const fmt = (n) => (n || 0).toLocaleString();

const statusStyle = (s) => {
  if (s === "yangi")
    return { background: "var(--accent-dim)", color: "var(--accent)" };
  if (s === "tasdiqlangan")
    return { background: "#3b82f620", color: "#3b82f6" };
  if (s === "bajarilgan")
    return { background: "var(--green-dim)", color: "var(--green)" };
  return { background: "var(--red-dim)", color: "var(--red)" };
};

const statusMiniStyle = (s) => {
  if (s === "yangi")
    return { background: "var(--accent-dim)", color: "var(--accent)" };
  if (s === "tasdiqlangan")
    return { background: "#3b82f620", color: "#3b82f6" };
  if (s === "bajarilgan")
    return { background: "var(--green-dim)", color: "var(--green)" };
  return { background: "var(--bg-elevated)", color: "var(--text-muted)" };
};
</script>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.sheet-enter-from,
.sheet-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.animate-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
