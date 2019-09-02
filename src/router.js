import Vue from 'vue'
import Router from 'vue-router'

const req = context => context.keys().map(context)
const scanResultDisplayTypes = req(require.context('@/views/result', true, /page\.vue$/)).map(e => e.default)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/index.vue'),
      redirect: {
        name: `scan-result-type-${scanResultDisplayTypes[0].name}`
      },
      children: scanResultDisplayTypes.map(e => ({
        path: `scan-result-type/${e.name}`,
        name: `scan-result-type-${e.name}`,
        component: e
      }))
    }
  ]
})

export const scanResultDisplayTypesMenu = scanResultDisplayTypes.map(e => ({
  name: `scan-result-type-${e.name}`,
  title: e.title
}))
