import Vuex from 'vuex'

const initState = {
  name: 'hdd',
  count: 0
}

const mutations = {
  updateCount (state, { num, num2 }) {
    console.log(num2)
    state.count = num
  },
  changeName (state) {
    state.name = 'xxx'
  }
}

const getters = {
  getName: state => state.name,
  getCount: state => state.count
}
const actions = {
  updateCountAsync ({ commit }, payload) {
    setTimeout(() => {
      commit('updateCount', {
        num: payload.num
      })
    }, 3000)
  }
}

export default () => {
  const store = new Vuex.Store({
    state: initState,
    getters,
    mutations,
    actions
  })
  return store
}
