<template>
  <div>
    <Header></Header>
    <SearchHeader></SearchHeader>
    <div class="universe">
      <SearchCondition></SearchCondition>
      <SearchResult></SearchResult>
    </div>
  </div>
</template>


<script>
import Header from './modules/Header'
import SearchHeader from './modules/SearchHeader.vue'
import SearchCondition from './modules/SearchCondition.vue'
import SearchResult from './modules/SearchResult.vue'

export default {
  title: '検索ページ',
  components: {
    Header,
    SearchHeader,
    SearchCondition,
    SearchResult,
  }
}
</script>

<style>
.universe{
  display: flex;
}

.inarea{
  border-radius: 0.67em;   /* 角丸 */
  width: 50%;
  height: 680px;
  padding: 5pt;
  border: solid 1px silver;
  font-size: 1em;          /* 文字サイズ */
  line-height: 1.2;        /* 行の高さ */
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>