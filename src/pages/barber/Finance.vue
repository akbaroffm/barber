<template>
  <div class="pb-24">
    <TopBar title="Moliya" showBack />

    <div class="px-4 pt-2">
      <!-- Premium Profit Card -->
      <div class="p-5 rounded-[24px] mb-5 relative overflow-hidden" style="background: linear-gradient(135deg, var(--bg-card) 0%, #2a2117 100%); border: 1px solid #c8952e33;">
        <div class="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl" style="background: var(--accent-dim);" />
        
        <div class="flex justify-between items-start mb-6">
          <div>
            <span class="text-[12px] uppercase font-bold tracking-widest block mb-1" style="color: var(--text-secondary);">Oylik sof foyda</span>
            <span class="text-3xl font-bold tracking-tight" :style="{ color: fin.monthProfit >= 0 ? 'var(--accent)' : 'var(--red)' }">
              {{ fin.monthProfit >= 0 ? '+' : '' }}{{ fmt(fin.monthProfit) }} <span class="text-sm font-medium">UZS</span>
            </span>
          </div>
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center" style="background: var(--accent-dim);">
            <Wallet :size="22" style="color: var(--accent);" />
          </div>
        </div>

        <div class="flex gap-4 pt-4" style="border-top: 1px solid #ffffff08;">
          <div class="flex-1">
            <span class="text-[11px] block text-green-500 font-medium opacity-80 mb-0.5">Daromad</span>
            <span class="text-sm font-bold">{{ fmt(fin.monthIncome) }}</span>
          </div>
          <div class="w-[1px] h-8 self-center" style="background: #ffffff10;" />
          <div class="flex-1">
            <span class="text-[11px] block text-red-400 font-medium opacity-80 mb-0.5">Xarajat</span>
            <span class="text-sm font-bold">{{ fmt(fin.monthExpenses) }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 gap-3 mb-6">
        <div class="p-4 rounded-2xl" style="background: var(--bg-card); border: 1px solid #ffffff05;">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-2 h-2 rounded-full" style="background: var(--accent);" />
            <span class="text-[11px] font-bold uppercase tracking-wider" style="color: var(--text-secondary);">Bugun</span>
          </div>
          <span class="text-lg font-bold">{{ fmt(fin.todayIncome) }}</span>
        </div>
        <div class="p-4 rounded-2xl" style="background: var(--bg-card); border: 1px solid #ffffff05;">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-2 h-2 rounded-full" style="background: #3b82f6;" />
            <span class="text-[11px] font-bold uppercase tracking-wider" style="color: var(--text-secondary);">Hafta</span>
          </div>
          <span class="text-lg font-bold">{{ fmt(fin.weekIncome) }}</span>
        </div>
      </div>

      <!-- Expense Entry (Manual Only) -->
      <button @click="showExpenseForm = true" class="w-full py-4 rounded-2xl text-[15px] font-bold mb-6 flex items-center justify-center gap-2" style="background: var(--bg-card); border: 1px solid var(--accent); color: var(--accent);">
        <Plus :size="18" /> Xarajat kiritish
      </button>

      <!-- Income Distribution (Auto-Added) -->
      <div class="mb-6">
        <h3 class="text-[15px] font-bold mb-3 flex items-center gap-2">
          <TrendingUp :size="16" style="color: var(--accent);" /> Daromad yo'nalishlari
        </h3>
        <div v-if="fin.incomeByCategory.length === 0" class="py-8 text-center rounded-2xl bg-[#1e181050]" style="border: 1px dashed #ffffff10;">
          <p class="text-[13px]" style="color: var(--text-muted);">Hali daromadlar yo'q</p>
        </div>
        <div v-else class="p-4 rounded-2xl" style="background: var(--bg-card);">
          <div class="flex flex-col gap-4">
            <div v-for="item in fin.incomeByCategory" :key="item.category">
              <div class="flex justify-between text-[12px] font-medium mb-1.5">
                <span>{{ item.category }}</span>
                <span style="color: var(--accent);">{{ fmt(item.amount) }}</span>
              </div>
              <div class="h-1.5 rounded-full overflow-hidden" style="background: var(--bg-input);">
                <div
                  class="h-full rounded-full transition-all duration-700"
                  :style="{
                    width: (item.amount / maxIncome * 100) + '%',
                    background: 'linear-gradient(to right, var(--accent), var(--orange))'
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expense Distribution -->
      <div class="mb-6">
        <h3 class="text-[15px] font-bold mb-3 flex items-center gap-2">
          <ArrowDownRight :size="16" style="color: var(--red);" /> Xarajatlar taqsimoti
        </h3>
        <div v-if="fin.expensesByCategory.length === 0" class="py-8 text-center rounded-2xl bg-[#1e181050]" style="border: 1px dashed #ffffff10;">
          <p class="text-[13px]" style="color: var(--text-muted);">Xarajatlar kiritilmagan</p>
        </div>
        <div v-else class="p-4 rounded-2xl" style="background: var(--bg-card);">
          <div class="flex flex-col gap-4">
            <div v-for="item in fin.expensesByCategory" :key="item.category">
              <div class="flex justify-between text-[12px] font-medium mb-1.5">
                <span>{{ item.category }}</span>
                <span class="text-red-400">{{ fmt(item.amount) }}</span>
              </div>
              <div class="h-1.5 rounded-full overflow-hidden" style="background: var(--bg-input);">
                <div
                  class="h-full rounded-full transition-all duration-700"
                  :style="{
                    width: (item.amount / maxExpense * 100) + '%',
                    background: 'linear-gradient(to right, #f87171, #ef4444)'
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions Combined -->
      <div>
        <h3 class="text-[15px] font-bold mb-3">So'nggi harakatlar</h3>
        <div class="flex flex-col gap-2">
          <div
            v-for="t in recentTransactions"
            :key="t.id"
            class="p-3.5 rounded-2xl flex items-center justify-between"
            style="background: var(--bg-card);"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center" :style="{ background: t.type === 'income' ? 'var(--accent-dim)' : 'var(--red-dim)' }">
                <ChevronUp v-if="t.type === 'income'" :size="18" style="color: var(--accent);" />
                <ChevronDown v-else :size="18" style="color: var(--red);" />
              </div>
              <div>
                <span class="text-[14px] font-bold block">{{ t.category }}</span>
                <span class="text-[11px]" style="color: var(--text-muted);">{{ formatDate(t.date) }}</span>
              </div>
            </div>
            <div class="text-right">
              <span class="text-[14px] font-bold" :style="{ color: t.type === 'income' ? 'var(--accent)' : 'var(--red)' }">
                {{ t.type === 'income' ? '+' : '-' }}{{ fmt(t.amount) }}
              </span>
              <span v-if="t.note" class="text-[10px] block opacity-50">{{ t.note }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Expense Bottom Sheet -->
    <BottomSheet :isOpen="showExpenseForm" title="Xarajat qo'shish" @close="showExpenseForm = false">
      <div class="flex flex-col gap-3 pb-6">
        <div class="grid grid-cols-3 gap-2 mb-2">
          <button
            v-for="cat in fin.categories" :key="cat"
            @click="expenseCategory = cat"
            class="py-2 px-1 rounded-xl text-[11px] font-bold text-center border transition-all"
            :style="{
              background: expenseCategory === cat ? 'var(--accent-dim)' : 'var(--bg-card)',
              borderColor: expenseCategory === cat ? 'var(--accent)' : 'transparent',
              color: expenseCategory === cat ? 'var(--accent)' : 'var(--text-secondary)'
            }"
          >
            {{ cat }}
          </button>
        </div>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-white opacity-50">UZS</span>
          <input v-model.number="expenseAmount" type="number" placeholder="Summa" class="pl-14" />
        </div>
        <input v-model="expenseNote" type="text" placeholder="Izoh (masalan: 2 ta lak)" />
        <button @click="addExpense" class="w-full py-4 rounded-xl text-[15px] font-bold mt-2" style="background: var(--accent); color: #000;">
          Saqlash
        </button>
      </div>
    </BottomSheet>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useFinanceStore } from '@/stores/finance';
import TopBar from '@/components/shared/TopBar.vue';
import BottomSheet from '@/components/ui/BottomSheet.vue';
import { Wallet, TrendingUp, ArrowDownRight, Plus, ChevronUp, ChevronDown } from 'lucide-vue-next';
import telegram from '@/services/telegram';

const fin = useFinanceStore();
const showExpenseForm = ref(false);
const expenseCategory = ref('');
const expenseAmount = ref(null);
const expenseNote = ref('');

const maxIncome = computed(() => Math.max(...fin.incomeByCategory.map(i => i.amount), 1));
const maxExpense = computed(() => Math.max(...fin.expensesByCategory.map(e => e.amount), 1));

const recentTransactions = computed(() => {
  const inc = fin.recentIncome.map(i => ({ ...i, type: 'income' }));
  const exp = fin.recentExpenses.map(e => ({ ...e, type: 'expense' }));
  return [...inc, ...exp].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 15);
});

const fmt = (n) => {
  if (n === 0) return '0';
  if (Math.abs(n) >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (Math.abs(n) >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toLocaleString();
};

const formatDate = (d) => new Date(d).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date(d).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' });

const addExpense = () => {
  if (!expenseCategory.value || !expenseAmount.value) { telegram.showAlert?.("Barcha maydonlarni to'ldiring"); return; }
  fin.addExpense(expenseCategory.value, expenseAmount.value, expenseNote.value);
  telegram.HapticFeedback?.notificationOccurred('success');
  expenseCategory.value = ''; expenseAmount.value = null; expenseNote.value = '';
  showExpenseForm.value = false;
};
</script>
