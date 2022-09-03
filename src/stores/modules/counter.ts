import { defineStore } from 'pinia';

export const counters = defineStore({
  id: 'counters',
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCount: state => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    },
    async getLogin() {
      const { list } = await getLoginApi<Array<number>>()
      this.counter = list.counter
    }
  }
})
function getLoginApi<T>(): { list: any; } | PromiseLike<{ list: any; }> {
  return new Promise<{ list: any; }>((resolve, reject) => { resolve({ list: 2 }) })
}

