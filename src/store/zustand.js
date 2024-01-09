import axios from "axios";
import { create } from "zustand";
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
  favorites: [],
};

export const useGetData = create((set, get) => ({
  ...initialState,

  execute: async () => {
    set({ ...initialState, loading: true });
    try {
      const res = await axios.get("https://picsum.photos/v2/list?page=1&limit=5");
      const images = res.data.map((item => item.download_url));
      set({ ...initialState, success: true, data: images });
    } catch (err) {
      console.error("Error in data fetch:", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
  addFavorite: (payload) => set((state) => {
    const updatedFavorites = [...state.favorites, payload];
    storage.set('favorites', JSON.stringify(updatedFavorites));
    return { favorites: updatedFavorites };
}),

}));