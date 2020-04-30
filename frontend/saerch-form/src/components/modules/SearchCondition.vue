<template>
  <div id="search" class="inarea">
    <br><b>検索件数（デフォルト10件）</b><br>
    <b-form-input v-model="searchNum" type="text" class="input"></b-form-input>

    <br><b>検索方法</b><br>
    <div style="display:flex">
      <div style="margin-right:20pt">
        <div class="custom-control custom-radio">
          <input type="radio" v-model="searchTech" id="custom-radio-1" class="custom-control-input" value="AND">
          <label class="custom-control-label" for="custom-radio-1">AND検索</label>
        </div>
        <div class="custom-control custom-radio">
          <input type="radio" v-model="searchTech" id="custom-radio-2" class="custom-control-input" value="OR">
          <label class="custom-control-label" for="custom-radio-2">OR検索</label>
        </div>
      </div>
      <label><b-checkbox v-model="kana">かな検索</b-checkbox></label><br>
      <label><b-checkbox v-model="suggest" style="margin-left:15px">サジェスト</b-checkbox></label><br>
    </div>


    <br><b>取得対象フィールド（未選択は全フィールド取得）</b><br>
    <label><b-checkbox v-model="selectAll">全選択</b-checkbox></label><br>
    <span style="diplay:flex; margin-left:15px;" v-for="author in authors" v-bind:key="author.id">
        <label><b-checkbox v-model="checkNames" v-bind:value="author.value">{{ author.name }}</b-checkbox></label>
    </span>
    
    <br><b>検索条件：未入力は全検索</b><br>
    <span v-for="condition in conditions" v-bind:key="condition.id">
        <span style="margin-left:5px">{{ condition.name }}：{{ condition.id }}</span>
        <b-form-input v-bind:id="condition.id" class="input" @input="SuggestCall"></b-form-input>
    </span>
    <br><b>指定された緯度／経度から検索する範囲(Km)</b><br>
    <b-form-input v-model="geoRange" id="geoRange" type="text" class="input"></b-form-input>
  </div>
</template>

<script>
import Methods from '@/api/methods'

export default {
  data(){
    return{
      suggest : false,
      authors: [
        { id: 1, name: '都道府県コード', value:"prefecturesId", checked: false},
        { id: 2, name: '県名', value:"prefectures", checked: false },
        { id: 3, name: '県名かな', value:"prefecturesKana", checked: false },
        { id: 4, name: '市区町村コード', value:"municipalityId", checked: false },
        { id: 5, name: '市区町村名', value:"municipalityName", checked: false },
        { id: 6, name: '市区町村名かな', value:"municipalityNameKana", checked: false },
        { id: 7, name: '大字町丁目コード', value:"townCode", checked: false },
        { id: 8, name: '大字町丁目名', value:"townName", checked: false },
        { id: 9, name: '大字町丁目名かな', value:"townNameKana", checked: false },
        { id: 10, name: '原点資料コード', value:"referenceCode", checked: false },
        { id: 11, name: '大字・字・丁目区分コード', value:"classCode", checked: false },
        { id: 12, name: '緯度,経度', value:"geo_p", checked: false },
      ],
    }
  },
  methods:{
    async SuggestCall(){
      // 検索入力エリアの入力値を全て取得
      var reqObj = new Object();
      var flg = true;  // サジェスト実行フラグ(入力値がある場合のみ検索実行)
      this.$store.state.conditions.forEach( function( item ){
        reqObj[item.id] = document.getElementById(item.id).value;
        let checkResult = Methods.inputCheck(item.id, reqObj[item.id]);
        if(checkResult){
          document.getElementById(item.id).style.backgroundColor="#ffffff";
        }else{
          document.getElementById(item.id).style.backgroundColor="#ffc0cb";
          flg = false;
        }
      });
      // 緯度経度の範囲も個別で判定
      if(Methods.inputCheck("geoRange", this.$store.state.geoRange)){
          document.getElementById("geoRange").style.backgroundColor="#ffffff";
        }else{
          document.getElementById("geoRange").style.backgroundColor="#ffc0cb";
          flg = false;
        }

      if(flg){
        this.$store.state.searchFlg = false;
        if(this.suggest){
          try {
            // リクエスト用のパラメータを生成        
            reqObj.searchTech = this.$store.state.searchTech
            reqObj.checked = this.$store.state.checkNames;
            reqObj.searchNum = this.$store.state.searchNum;
            reqObj.geoRange = this.$store.state.geoRange;
            reqObj.kana = this.$store.state.kana;
            this.$store.state.solrReqParam = "";
            this.$store.state.result = "";        
            let response = await Methods.searchPosting(reqObj);
            this.$store.state.solrReqParam = JSON.stringify(response.data.url);
            this.$store.state.result = JSON.stringify(response.data.response, null, "\t");
          } catch (error) {
            window.confirm('検索に失敗しました');
          }
        }
      }else{
        this.$store.state.searchFlg = true; 
      }
    }
  },
  computed: {
    selectAll: {
      get: function () {
        //authorsのチェックボックスのすべてにチェックが入ったかを判定
        if(this.checkNames.length == this.authors.length){
            return true //authorsにすべてチェックを入れるとselectAllはtrueとなりチェックが入る
        }else{
            return false
        }
      },
      set: function (value) { //全選択のチェックボックスを操作した場合
        //空の配列を用意
        let checkArray = [];

        //チェックが入った場合（trueでの判定）
        if (value) {
            this.authors.forEach(function (author) {
                checkArray.push(author.value);
            });
        }
        this.checkNames = checkArray;
        this.$store.setCheckNames({
          CheckNames : checkArray
        });
      }
    },
    searchNum:{
      get: function(){
        return this.$store.state.setCheckNames;
      },
      set: function (value) { // 検索件数を入力した場合
        // 後で入力チェック追加
        this.$store.commit('setSearchNum', {searchNum : value});
      }
    },
    searchTech:{
      get: function(){
        return this.$store.state.searchTech;
      },
      set: function (value) { // 検索方法を選択した場合
        // 後で入力チェック追加
        this.$store.commit('setSearchTech', {searchTech : value});
      }
    },
    kana:{
      get: function(){
        return this.$store.state.kana;
      },
      set: function (value) { // 検索方法を選択した場合
        // 後で入力チェック追加
        this.$store.commit('setKana', {kana : value});
      }
    },
    checkNames:{
      get: function(){
        return this.$store.state.checkNames;
      },
      set: function (value) { // 取得対象データを選択した場合
        // 後で入力チェック追加
        this.$store.commit('setCheckNames', {checkNames : value});
      }
    },
    conditions:{
      get: function(){
        return this.$store.state.conditions;
        },
      set: function (value) { // 検索条件を入力した場合
        // 後で入力チェック追加
        this.$store.commit('setConditions', {conditions : value});
      }
    },
    geoRange:{
      get: function(){
        return this.$store.state.geoRange;
      },
      set: function (value) { // 検索条件を入力した場合
        // 後で入力チェック追加
        this.$store.commit('setGeoRange', {geoRange : value});
        this.SuggestCall();
      }
    },
  } 
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.input{
  width: 95%;
  /* height:15pt; */
  margin:5pt;
}
</style>