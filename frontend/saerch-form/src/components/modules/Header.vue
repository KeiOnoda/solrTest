<template>
    <div class="linkblock">   
        <router-link to="/" class='link' >トップページへ</router-link>
        <router-link to="/Search" class='link' v-if="searchLink">検索画面へ</router-link>
        <router-link to="/SolrCtl" class='link' v-if="solrCtlLink">管理画面へ</router-link>
    </div>
</template>

<script>
export default {
    computed: {
        searchLink: {
            get: function(){
                if(location.href.endsWith("/Search")){
                    return false;
                }else{
                    return true;
                }
            },
            set: function(){}
        },
        solrCtlLink: {
            get: function(){
                if(location.href.endsWith("/SolrCtl")){
                    return false;
                }else{
                    return true;
                }
            },
            set: function(){}
        }
    }
}
</script>

<style scoped>
.linkblock{
    float: right;
    margin-right: 20px;
}
.link{
    margin-left: 10px;
}
</style>