<template>
    <div>
        <Loading v-show="loading"></Loading>
        <div class="header">
            <Header></Header>
        </div>
        <b-button @click='solrDelete' class="ma"> Solrデータ削除 </b-button><br>
        <div class="ma">
            <b-button @click='solrRegist' style="margin-bottom:5pt;"> Solrデータ登録 </b-button>
            <b-select v-model="regFormat" class="select">
                <option disabled value="default">登録するファイル形式を指定してください</option>
                <option value="JSON">JSON形式</option>
                <option value="XML">XML形式</option>
                <option value="CSV">CSV形式</option>
            </b-select>
            <b-form-input v-model="regPath" type="text" style="width:95%" placeholder="登録するファイルパスを入力してください"></b-form-input>            
        </div>
        <div class="ma">
            <b-button @click='hiraganaConv' style="margin-bottom:5pt;"> ひらがな変換 </b-button> 
                <a href="http://www.goo.ne.jp/">
                    <img src="//u.xgoo.jp/img/sgoo.png" alt="supported by goo" title="supported by goo" style="width:100px; height:40px;">
                </a>
            <b-form-input v-model="convPath" type="text" style="width:95%" placeholder="変換対象のファイルパスを入力してください"></b-form-input>
        </div>
    </div>
</template>

<script>
import Methods from '@/api/methods'
import Loading from './modules/Loading'
import Header from './modules/Header'

export default {
    title : "管理画面",
    components:{
        Header,
        Loading

    },
    data(){
        return{
        loading: false,
        convPath : "",
        regFormat : "default",
        regPath : ""
        }
    },
    methods: {
        // ひらがな化
        async hiraganaConv(){
            // リクエスト用のパラメータを生成
            var reqObj = new Object();
            reqObj.convPath = this.convPath;
            this.loading = true;
            let response = await Methods.hiraganaPosting(reqObj);
            this.loading = false;
            if(response.data.result){
                window.confirm('ファイルを出力しました');
            }else{
                window.confirm('ファイルの出力に失敗しました');
            }
            console.log(JSON.stringify(response));
        },
        // データ削除
        async solrDelete(){
            try {
                this.loading = true;
                let response = await Methods.solrDeleteGet();
                if(response.data.result  === 200){
                    window.confirm('全削除しました');
                }else{
                    window.confirm('全削除に失敗しました');
                }
            } catch (error) {
                console.log(error)
                window.confirm('例外が発生しました');
            } finally{
                this.loading = false;
            }
        },
        // データ登録
        async solrRegist(){
            try {
                this.loading = true;
                let reqParam = {
                    filePath : this.regPath,
                    format : this.regFormat
                }
                let response = await Methods.solrRegistPosting(reqParam);
                if(response.data.result  === 200){
                    window.confirm('登録成功しました');
                }else{
                    window.confirm('登録失敗しました');
                }
            } catch (error) {
                console.log(error)
                window.confirm('例外が発生しました');
            } finally{
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
.header{
    height: 30px;
    /* display: inline-block; */

}
.ma{
    margin: 15px 0px 5pt 15pt;
}
.select{
    width:270pt;
    position:relative;
    top:-2pt
}
</style>