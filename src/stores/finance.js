import { defineStore } from 'pinia';
import storage from '@/utils/storage';

const expenseCategories = [
  'Lak',
  'Sprey',
  'Shampun',
  'Jel',
  'Mum',
  'Krem',
  'Pechatka',
  'Dezinfeksiya',
  'Ijara',
  'Elektr',
  'Boshqa'
];

export const useFinanceStore = defineStore('finance', {
  state: () => ({
    income: storage.get('finance_income', []),
    expenses: storage.get('finance_expenses', []),
    categories: expenseCategories
  }),
  actions: {
    addIncome(amount, category = '', bookingId = '', note = '') {
      this.income.push({
        id: Date.now().toString(),
        amount: Number(amount),
        category,
        bookingId,
        note,
        date: new Date().toISOString()
      });
      storage.set('finance_income', this.income);
    },
    addIncomeFromBooking(booking) {
      if (booking.services && booking.services.length) {
        const guests = booking.guestCount || 1;
        booking.services.forEach(s => {
          this.addIncome(s.price * guests, s.name, booking.id, `${booking.clientName} – ${s.name}`);
        });
      } else {
        this.addIncome(booking.price || 0, booking.serviceName || 'Xizmat', booking.id, booking.clientName || '');
      }
    },
    addExpense(category, amount, note = '') {
      this.expenses.push({
        id: Date.now().toString(),
        category,
        amount: Number(amount),
        note,
        date: new Date().toISOString()
      });
      storage.set('finance_expenses', this.expenses);
    },
    deleteExpense(id) {
      this.expenses = this.expenses.filter(e => e.id !== id);
      storage.set('finance_expenses', this.expenses);
    }
  },
  getters: {
    todayIncome: (state) => {
      const today = new Date().toISOString().split('T')[0];
      return state.income.filter(i => i.date.startsWith(today)).reduce((s, i) => s + i.amount, 0);
    },
    weekIncome: (state) => {
      const now = new Date();
      const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      return state.income.filter(i => new Date(i.date) >= weekAgo).reduce((s, i) => s + i.amount, 0);
    },
    monthIncome: (state) => {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return state.income.filter(i => new Date(i.date) >= monthStart).reduce((s, i) => s + i.amount, 0);
    },
    todayExpenses: (state) => {
      const today = new Date().toISOString().split('T')[0];
      return state.expenses.filter(e => e.date.startsWith(today)).reduce((s, e) => s + e.amount, 0);
    },
    monthExpenses: (state) => {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return state.expenses.filter(e => new Date(e.date) >= monthStart).reduce((s, e) => s + e.amount, 0);
    },
    incomeByCategory: (state) => {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthly = state.income.filter(i => new Date(i.date) >= monthStart);
      const map = {};
      monthly.forEach(i => {
        const cat = i.category || 'Boshqa';
        map[cat] = (map[cat] || 0) + i.amount;
      });
      return Object.entries(map)
        .map(([category, amount]) => ({ category, amount }))
        .sort((a, b) => b.amount - a.amount);
    },
    expensesByCategory: (state) => {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthly = state.expenses.filter(e => new Date(e.date) >= monthStart);
      const map = {};
      monthly.forEach(e => {
        map[e.category] = (map[e.category] || 0) + e.amount;
      });
      return Object.entries(map)
        .map(([category, amount]) => ({ category, amount }))
        .sort((a, b) => b.amount - a.amount);
    },
    monthProfit: (state) => {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const inc = state.income.filter(i => new Date(i.date) >= monthStart).reduce((s, i) => s + i.amount, 0);
      const exp = state.expenses.filter(e => new Date(e.date) >= monthStart).reduce((s, e) => s + e.amount, 0);
      return inc - exp;
    },
    recentIncome: (state) => [...state.income].reverse().slice(0, 10),
    recentExpenses: (state) => [...state.expenses].reverse().slice(0, 10)
  }
});
