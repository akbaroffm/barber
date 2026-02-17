<template>
  <div class="pb-24">
    <TopBar title="Moliya" showBack />

    <div class="px-4 pt-2">
      <!-- Period Filter Tabs -->
      <div class="flex gap-2 mb-4 overflow-x-auto">
        <button
          v-for="period in periods"
          :key="period.value"
          @click="activePeriod = period.value"
          class="px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all"
          :style="{
            background:
              activePeriod === period.value
                ? 'var(--accent)'
                : 'var(--bg-card)',
            color:
              activePeriod === period.value ? '#000' : 'var(--text-secondary)',
          }"
        >
          {{ period.label }}
        </button>
      </div>

      <!-- Premium Profit Card -->
      <div
        class="p-5 rounded-[28px] mb-5 relative overflow-hidden"
        style="
          background: linear-gradient(135deg, var(--bg-card) 0%, #2a2117 100%);
          border: 1px solid #c8952e33;
        "
      >
        <div
          class="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30"
          style="background: var(--accent)"
        />

        <div class="flex justify-between items-start mb-6 relative z-10">
          <div>
            <span
              class="text-[11px] uppercase font-bold tracking-widest block mb-1.5 opacity-60"
              style="color: var(--text-secondary)"
              >{{ periodLabel }} sof foyda</span
            >
            <div class="flex items-baseline gap-2">
              <span
                class="text-4xl font-bold tracking-tight"
                :style="{
                  color: displayProfit >= 0 ? 'var(--accent)' : 'var(--red)',
                }"
              >
                {{ displayProfit >= 0 ? "+" : "" }}{{ fmt(displayProfit) }}
              </span>
              <span class="text-sm font-medium opacity-70">UZS</span>
            </div>
          </div>
          <div
            class="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
            style="background: var(--accent-dim)"
          >
            <Wallet :size="24" style="color: var(--accent)" />
          </div>
        </div>

        <div
          class="flex gap-4 pt-4 relative z-10"
          style="border-top: 1px solid #ffffff08"
        >
          <div class="flex-1">
            <div class="flex items-center gap-1.5 mb-1">
              <TrendingUp :size="12" class="text-green-500" />
              <span
                class="text-[10px] block text-green-500 font-bold uppercase tracking-wide"
                >Daromad</span
              >
            </div>
            <span class="text-[15px] font-bold">{{ fmt(displayIncome) }}</span>
          </div>
          <div class="w-[1px] h-10 self-center" style="background: #ffffff10" />
          <div class="flex-1">
            <div class="flex items-center gap-1.5 mb-1">
              <TrendingDown :size="12" class="text-red-400" />
              <span
                class="text-[10px] block text-red-400 font-bold uppercase tracking-wide"
                >Xarajat</span
              >
            </div>
            <span class="text-[15px] font-bold">{{
              fmt(displayExpenses)
            }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Stats Grid -->
      <div class="grid grid-cols-3 gap-2.5 mb-6">
        <div
          class="p-3.5 rounded-2xl relative overflow-hidden"
          style="background: var(--bg-card); border: 1px solid #ffffff05"
        >
          <div
            class="absolute -bottom-2 -right-2 w-12 h-12 rounded-full blur-xl opacity-20"
            style="background: var(--accent)"
          />
          <Calendar
            :size="16"
            class="mb-2 opacity-40"
            style="color: var(--accent)"
          />
          <span
            class="text-[10px] font-bold uppercase tracking-wider block mb-1"
            style="color: var(--text-muted)"
            >Bugun</span
          >
          <span class="text-[14px] font-bold">{{ fmt(fin.todayIncome) }}</span>
        </div>
        <div
          class="p-3.5 rounded-2xl relative overflow-hidden"
          style="background: var(--bg-card); border: 1px solid #ffffff05"
        >
          <div
            class="absolute -bottom-2 -right-2 w-12 h-12 rounded-full blur-xl opacity-20"
            style="background: #3b82f6"
          />
          <CalendarRange
            :size="16"
            class="mb-2 opacity-40"
            style="color: #3b82f6"
          />
          <span
            class="text-[10px] font-bold uppercase tracking-wider block mb-1"
            style="color: var(--text-muted)"
            >Hafta</span
          >
          <span class="text-[14px] font-bold">{{ fmt(fin.weekIncome) }}</span>
        </div>
        <div
          class="p-3.5 rounded-2xl relative overflow-hidden"
          style="background: var(--bg-card); border: 1px solid #ffffff05"
        >
          <div
            class="absolute -bottom-2 -right-2 w-12 h-12 rounded-full blur-xl opacity-20"
            style="background: #8b5cf6"
          />
          <CalendarDays
            :size="16"
            class="mb-2 opacity-40"
            style="color: #8b5cf6"
          />
          <span
            class="text-[10px] font-bold uppercase tracking-wider block mb-1"
            style="color: var(--text-muted)"
            >Oy</span
          >
          <span class="text-[14px] font-bold">{{ fmt(fin.monthIncome) }}</span>
        </div>
      </div>

      <!-- Income Distribution -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-[15px] font-bold flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-xl flex items-center justify-center"
              style="background: var(--accent-dim)"
            >
              <TrendingUp :size="14" style="color: var(--accent)" />
            </div>
            Daromad yo'nalishlari
          </h3>
        </div>
        <div
          v-if="fin.incomeByCategory.length === 0"
          class="py-12 text-center rounded-2xl"
          style="background: var(--bg-card); border: 1px dashed #ffffff10"
        >
          <div
            class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
            style="background: var(--bg-elevated)"
          >
            <TrendingUp :size="24" style="color: var(--text-muted)" />
          </div>
          <p class="text-[13px] font-medium" style="color: var(--text-muted)">
            Hali daromadlar yo'q
          </p>
        </div>
        <div
          v-else
          class="p-4 rounded-2xl space-y-4"
          style="background: var(--bg-card)"
        >
          <div
            v-for="(item, idx) in fin.incomeByCategory"
            :key="item.category"
            class="animate-slide-in"
            :style="{ animationDelay: idx * 0.05 + 's' }"
          >
            <div class="flex justify-between text-[13px] font-semibold mb-2">
              <span>{{ item.category }}</span>
              <span style="color: var(--accent)">{{ fmt(item.amount) }}</span>
            </div>
            <div
              class="h-2 rounded-full overflow-hidden"
              style="background: var(--bg-elevated)"
            >
              <div
                class="h-full rounded-full transition-all duration-700 ease-out"
                :style="{
                  width: (item.amount / maxIncome) * 100 + '%',
                  background:
                    'linear-gradient(90deg, var(--accent) 0%, var(--orange) 100%)',
                }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Expense Distribution -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-[15px] font-bold flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-xl flex items-center justify-center"
              style="background: var(--red-dim)"
            >
              <TrendingDown :size="14" style="color: var(--red)" />
            </div>
            Xarajatlar taqsimoti
          </h3>
        </div>
        <div
          v-if="fin.expensesByCategory.length === 0"
          class="py-12 text-center rounded-2xl"
          style="background: var(--bg-card); border: 1px dashed #ffffff10"
        >
          <div
            class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
            style="background: var(--bg-elevated)"
          >
            <TrendingDown :size="24" style="color: var(--text-muted)" />
          </div>
          <p class="text-[13px] font-medium" style="color: var(--text-muted)">
            Xarajatlar kiritilmagan
          </p>
        </div>
        <div
          v-else
          class="p-4 rounded-2xl space-y-4"
          style="background: var(--bg-card)"
        >
          <div
            v-for="(item, idx) in fin.expensesByCategory"
            :key="item.category"
            class="animate-slide-in"
            :style="{ animationDelay: idx * 0.05 + 's' }"
          >
            <div class="flex justify-between text-[13px] font-semibold mb-2">
              <span>{{ item.category }}</span>
              <span class="text-red-400">{{ fmt(item.amount) }}</span>
            </div>
            <div
              class="h-2 rounded-full overflow-hidden"
              style="background: var(--bg-elevated)"
            >
              <div
                class="h-full rounded-full transition-all duration-700 ease-out"
                :style="{
                  width: (item.amount / maxExpense) * 100 + '%',
                  background:
                    'linear-gradient(90deg, #f87171 0%, #ef4444 100%)',
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <div class="fixed bottom-16 left-0 right-0 px-4 z-10">
      <button
        @click="showExpenseForm = true"
        class="w-full py-4 rounded-2xl text-[15px] font-bold flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all"
        style="
          background: var(--accent);
          color: #000;
          box-shadow: 0 10px 40px rgba(200, 149, 46, 0.4);
        "
      >
        <Plus :size="18" /> Xarajat kiritish
      </button>
    </div>

    <!-- Expense Bottom Sheet -->
    <BottomSheet
      :isOpen="showExpenseForm"
      title="Xarajat qo'shish"
      @close="showExpenseForm = false"
    >
      <div class="flex flex-col gap-4 pb-6">
        <div>
          <label
            class="text-[11px] font-bold uppercase tracking-widest ml-1 block mb-2"
            style="color: var(--text-muted)"
            >Kategoriya</label
          >
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="cat in fin.categories"
              :key="cat"
              @click="expenseCategory = cat"
              class="py-3 px-2 rounded-xl text-[11px] font-bold text-center border transition-all"
              :style="{
                background:
                  expenseCategory === cat ? 'var(--accent)' : 'var(--bg-card)',
                borderColor:
                  expenseCategory === cat ? 'var(--accent)' : '#ffffff20',
                borderWidth: '1.5px',
                color:
                  expenseCategory === cat ? '#000' : 'var(--text-secondary)',
              }"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="text-[11px] font-bold uppercase tracking-widest ml-1 block mb-2"
            style="color: var(--text-muted)"
            >Summa</label
          >
          <div class="relative">
            <span
              class="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-white opacity-50 pointer-events-none"
              >UZS</span
            >
            <input
              v-model.number="expenseAmount"
              type="number"
              placeholder="50 000"
              style="padding-left: 60px"
            />
          </div>
        </div>

        <div>
          <label
            class="text-[11px] font-bold uppercase tracking-widest ml-1 block mb-2"
            style="color: var(--text-muted)"
            >Izoh (ixtiyoriy)</label
          >
          <input
            v-model="expenseNote"
            type="text"
            placeholder="Masalan: 2 ta lak"
          />
        </div>

        <button
          @click="addExpense"
          class="w-full py-4 rounded-xl text-[15px] font-bold mt-2 shadow-lg active:scale-95 transition-transform"
          style="background: var(--accent); color: #000"
        >
          Saqlash
        </button>
      </div>
    </BottomSheet>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFinanceStore } from "@/stores/finance";
import TopBar from "@/components/shared/TopBar.vue";
import BottomSheet from "@/components/ui/BottomSheet.vue";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  ChevronUp,
  ChevronDown,
  Clock,
  Calendar,
  CalendarRange,
  CalendarDays,
} from "lucide-vue-next";
import telegram from "@/services/telegram";

const fin = useFinanceStore();
const showExpenseForm = ref(false);
const expenseCategory = ref("");
const expenseAmount = ref(null);
const expenseNote = ref("");
const activePeriod = ref("month");

const periods = [
  { value: "today", label: "Bugun" },
  { value: "week", label: "Hafta" },
  { value: "month", label: "Oy" },
];

const periodLabel = computed(() => {
  const map = { today: "Bugungi", week: "Haftalik", month: "Oylik" };
  return map[activePeriod.value];
});

const displayIncome = computed(() => {
  if (activePeriod.value === "today") return fin.todayIncome;
  if (activePeriod.value === "week") return fin.weekIncome;
  return fin.monthIncome;
});

const displayExpenses = computed(() => {
  if (activePeriod.value === "today") return 0; // Mock - add to store if needed
  if (activePeriod.value === "week") return fin.monthExpenses * 0.25; // Estimate
  return fin.monthExpenses;
});

const displayProfit = computed(
  () => displayIncome.value - displayExpenses.value,
);

const maxIncome = computed(() =>
  Math.max(...fin.incomeByCategory.map((i) => i.amount), 1),
);
const maxExpense = computed(() =>
  Math.max(...fin.expensesByCategory.map((e) => e.amount), 1),
);

const recentTransactions = computed(() => {
  const inc = fin.recentIncome.map((i) => ({ ...i, type: "income" }));
  const exp = fin.recentExpenses.map((e) => ({ ...e, type: "expense" }));
  return [...inc, ...exp]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 15);
});

const fmt = (n) => {
  if (n === 0) return "0";
  if (Math.abs(n) >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (Math.abs(n) >= 1000) return (n / 1000).toFixed(0) + "K";
  return n.toLocaleString();
};

const formatDate = (d) =>
  new Date(d).toLocaleTimeString("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
  }) +
  ", " +
  new Date(d).toLocaleDateString("uz-UZ", { day: "numeric", month: "short" });

const addExpense = () => {
  if (!expenseCategory.value || !expenseAmount.value) {
    telegram.showAlert?.("Barcha maydonlarni to'ldiring");
    return;
  }
  fin.addExpense(expenseCategory.value, expenseAmount.value, expenseNote.value);
  telegram.HapticFeedback?.notificationOccurred("success");
  expenseCategory.value = "";
  expenseAmount.value = null;
  expenseNote.value = "";
  showExpenseForm.value = false;
};
</script>

<style scoped>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out forwards;
  opacity: 0;
}
</style>
