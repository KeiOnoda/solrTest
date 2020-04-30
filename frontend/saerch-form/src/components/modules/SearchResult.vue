<template>
    <div class="inarea" style="overflow-y : hidden">
    <br><b>検索パラメータ</b><br>
    <b-textarea v-model="solrReqParam" class="reqUrl" readonly>{{ solrReqParam }}</b-textarea>
    <br><b>検索結果</b><br>        
    <b-textarea v-model="result" class="resultArea" readonly>{{ result }}</b-textarea>
    </div>
</template> 

<script>
export default {
  computed: {
    solrReqParam:{
      get: function(){
        return this.$store.state.solrReqParam;
      },
      set: function (value) { // レスポンスデータが設定されたとき
        // 後で入力チェック追加
        this.$store.commit('setSolrReqParam', {solrReqParam : value});
      }
    },
    result:{
      get: function(){
        return this.$store.state.result;
      },
      set: function (value) { // レスポンスデータが設定されたとき
        // 後で入力チェック追加
        this.$store.commit('setResult', {result : value});
      }
    }
  } 
}
</script>

<style scoped>
.reqUrl{
  width: 95%;
  height: 20%;
  margin:5pt;
}
.resultArea{
  width: calc(100% - 10pt);
  height: 60%;
}
</style>