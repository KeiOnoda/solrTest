// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(Vuex);

Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
      searchNum : "",       // 取得件数
      searchTech : "AND",   // 検索方法
      kana : false,         // かな検索有効
      geoRange : "",        // 検索範囲
      checkNames: [],       // 取得対象データ
      searchFlg: false,     // 検索OKフラグ
      conditions: [
        { id: "prefecturesId", name: '都道府県コード'},
        { id: "prefectures", name: '県名'},
        { id: "municipalityId", name: '市区町村コード'},
        { id: "municipalityName", name: '市区町村名'},
        { id: "townCode", name: '大字町丁目コード'},
        { id: "townName", name: '大字町丁目名'},
        { id: "referenceCode", name: '原点資料コード'},
        { id: "classCode", name: '大字・字・丁目区分コード'},
        { id: "geo_p", name: '緯度,経度'},
      ],
      result : "",          // 検索結果
      solrReqParam : "",    // 検索リクエストパラメータ
    },
    mutations:{
      // 検索実行フラグ
      setSearchFlg(state, payload){
        state.searchFlg = payload.searchFlg;
      },
      // 取得件数
      setSearchNum(state, payload){
        state.searchNum = payload.searchNum;
      },
      // 検索方法
      setSearchTech(state, payload){
        state.searchTech = payload.searchTech;
      },
      // かな検索指定
      setKana(state, payload){
        state.kana = payload.kana;
      },
      // 緯度範囲
      setGeoRange(state, payload){
        state.geoRange = payload.geoRange;
      },
      // 取得対象データ
      setCheckNames(state, payload){
        state.checkNames = payload.checkNames;
      },
      // 検索条件
      setConditions(state, payload){
        state.conditions = payload.conditions;
      },
      // 検索リクエストURI
      setSolrReqParam(state, payload){
        state.solrReqParam = payload.solrReqParam;
      },
      // 検索結果
      setResult(state, payload){
        state.result = payload.result;
      },
    }
});

// 各コンポーネントのページタイトル定義
const globalMixIn = {
  created() {
    let { title} = this.$options
    if (title) {
      document.title = title;
    }
  }
}

Vue.mixin(globalMixIn);
 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
