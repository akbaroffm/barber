import { defineStore } from 'pinia';
import storage from '@/utils/storage';

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favorites: storage.get('favorites', []) // Array of barber IDs
    }),
    
    getters: {
        isFavorite: (state) => (barberId) => {
            return state.favorites.includes(barberId);
        },
        
        favoritesCount: (state) => state.favorites.length
    },
    
    actions: {
        addFavorite(barberId) {
            if (!this.favorites.includes(barberId)) {
                this.favorites.push(barberId);
                storage.set('favorites', this.favorites);
            }
        },
        
        removeFavorite(barberId) {
            const index = this.favorites.indexOf(barberId);
            if (index > -1) {
                this.favorites.splice(index, 1);
                storage.set('favorites', this.favorites);
            }
        },
        
        toggleFavorite(barberId) {
            if (this.isFavorite(barberId)) {
                this.removeFavorite(barberId);
            } else {
                this.addFavorite(barberId);
            }
        },
        
        clearAllFavorites() {
            this.favorites = [];
            storage.remove('favorites');
        }
    }
});
