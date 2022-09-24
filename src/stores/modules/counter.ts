import { defineStore } from 'pinia'

export const counters = defineStore({
  id: 'counters',
  state: () => ({
    counter: 0,
    list: [
      {
        bugNum: 1000007,
      },
      {
        bugNum: 1000001,
      },
    ],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.list[0].bugNum++
    },
    incrementCounter() {
      this.counter++
    },
    // async getLogin() {
    //   const { list } = await getLoginApi()
    //   console.log('list', list)
    // }
  },
})

// function getLoginApi(): Promise<any> {
//   return new Promise((resolve, reject) => {
//     resolve({
//       list: []
//     }),
//     reject((err: Error) => {console.log('err', err)})
//   })
// }
