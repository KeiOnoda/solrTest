<template>
  <div>
    <Loading v-show="loading"></Loading>
    <b-button @click='post' :disabled="searchFlg" class="botton"> 検索 </b-button>
    <b-button @click='inputCleen' class="botton"> デフォルトに戻す </b-button>
    <b-button @click='openMap' class="botton"> 地図を開く </b-button> 
    <b-form-input v-model="latlon" type="text" class="openMap" placeholder="地図を開く緯度経度を入力してください"></b-form-input>        
  </div>
</template>

<script>
import Methods from '@/api/methods'
import Loading from './Loading'

export default {
  data(){
    return{
      latlon : "",
      loading : false,
    }
  },
  components: {
    Loading,
  },
  methods: {
    async post() {
      try {
        // リクエスト用のパラメータを生成
        var reqObj = new Object();
        this.$store.state.conditions.forEach( function( item ){
          reqObj[item.id] = document.getElementById(item.id).value;
        });
        reqObj.searchTech = this.$store.state.searchTech
        reqObj.checked = this.$store.state.checkNames;
        reqObj.searchNum = this.$store.state.searchNum;
        reqObj.geoRange = this.$store.state.geoRange;
        reqObj.kana = this.$store.state.kana;
        this.$store.state.solrReqParam = "";
        this.$store.state.result = "";
        this.loading = true;
        let response = await Methods.searchPosting(reqObj);
        this.$store.state.solrReqParam = JSON.stringify(response.data.url);
        this.$store.state.result = JSON.stringify(response.data.response, null, "\t");
        if(response.data.result){
          window.confirm('検索が終了しました');
        }else{
          window.confirm('検索に失敗しました');
        }
      } catch (error) {
        window.confirm('検索に失敗しました');
      } finally{
        this.loading = false;
      }

    },
    inputCleen(){
      // 入力情報をすべて初期化する
      this.$store.state.searchNum = "";
      this.$store.state.result = "";  
      this.$store.state.solrReqParam = "";
      this.$store.state.searchTech = "AND";
      this.$store.state.kana = false;
      this.$store.state.checkNames = [];
      this.$store.state.conditions.forEach( function( item ){
        document.getElementById(item.id).value = "";
      });
      this.$store.state.geoRange = "";
    },
    openMap(){
      // 入力された緯度経度でGoogleMapを起動する
      var url = "https://www.google.com/maps?q=" + this.latlon
      window.open(url, '_blank');
    },
  },
  computed: {
    searchFlg:{
      get: function(){
        return this.$store.state.searchFlg;
      },
      set: function (value) {
        // 後で入力チェック追加
        this.$store.commit('setSearchFlg', {searchFlg : value});
      }
    },
  }
}



</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.botton {
  margin-left: 5pt;
  margin-bottom: 5pt;
  margin-top: 1rem;
  width: auto;
  border: solid 1px silver;
  border-radius: 0.5rem 0.5rem;
  text-decoration: none;
}

.openMap{
  margin: 5pt;
  width: 400px;
  display:initial;
  position: relative;
  top: 5.5pt;
}

</style>