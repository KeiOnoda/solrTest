<template>
  <div v-show="loading">
    <div class="fullview">
      <div class="loading-spacer"></div>
      <vue-loading 
        type="spiningDubbles"
        color="#aaa"
        :size="{ width: '100px', height: '100px' }"
        >
      </vue-loading>
    </div>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template'

export default {
  data(){
    return{
      loading: false,
    }
  },
  name: 'loading',
  components: {
    VueLoading,
  },

}
</script>

<style>
.fullview {
  width: 100%;
  height: 100%;
  background: rgba(41, 40, 40, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
.loading-spacer {
  height: 30%;
}
</style>