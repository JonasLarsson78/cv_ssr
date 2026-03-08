import { defineStore } from 'pinia'

export const useStore = defineStore('Cv', {
  state: () => ({
    cv: [] as any[],
  }),
  getters: {
    getCv: (state) => state.cv,
  },
  actions: {
    async setCv(cv: any[]) {
      this.cv = cv
    },
  },
})
