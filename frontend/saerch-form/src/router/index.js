import Vue from 'vue'
import Router from 'vue-router'
import SeaechCtl from '@/components/SeaechCtl'
import Index from '@/components/Index'
import SolrCtl from '@/components/SolrCtl'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Search',
      name: 'SeaechCtl',
      component: SeaechCtl
    },
    {
      path: '/SolrCtl',
      name: 'SolrCtl',
      component: SolrCtl
    },
  ],
})
