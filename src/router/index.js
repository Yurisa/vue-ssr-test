import Router from 'vue-router'
import comp1 from '../views/component1.vue'
import comp2 from '../views/component2.vue'

export default () => {
  return new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/comp1',
        component: comp1
      },
      {
        path: '/comp2',
        component: comp2
      },
      { path: '/', redirect: '/comp1' }
    ]
  })
}
