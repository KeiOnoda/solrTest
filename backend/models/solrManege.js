const solrUrl = "http://localhost:8983/solr/geosscore/select?q=";
const AND = " AND ";
const OR = " OR ";

/**
 * 削除リクエストオプション
 */
exports.solrDelOptions = {
  method: 'post',
  url: "http://localhost:8983/solr/geosscore/update?commit=true",
  headers: {
      'Content-Type': `text/json`
  },
  data: {
    "delete": { "query":"*:*" }
  }
};

/**
 * 登録リクエストオプション
 */
exports.solrRegOptions = {
  method: 'post',
  url: "http://localhost:8983/solr/geosscore/update?commit=true",
  headers: {
      'Content-Type': ''
  },
};

/**
 * queryパラメータの生成
 * @param {Object} reqParam リクエストパラメータ
 */
exports.createQuery = function(reqParam){
    let query = "";
    query += solrUrl;
    let searchTech = "";
    // 検索条件の設定
    if(reqParam.searchTech === AND){
      searchTech = AND;
    } else{
      searchTech = OR;
    }
    // 検索条件の設定
    if(reqParam.prefecturesId){
      query+= "prefecturesId:" + reqParam.prefecturesId + searchTech;
    }
    if(reqParam.prefectures){
      query+= "prefectures:" + reqParam.prefectures + searchTech;
      if(reqParam.kana){
        if(reqParam.searchTech === AND){
          // かな検索のみセパレータをORに変更
          query += query.slice(0, AND.length) + OR;
        }
        query+= "prefecturesKana:" + reqParam.prefectures + searchTech;
      }
    }
    if(reqParam.municipalityId){
      query+= "municipalityId:" + reqParam.municipalityId + searchTech;
    }
    if(reqParam.municipalityName){
      query+= "municipalityName:" + reqParam.municipalityName + searchTech;
      if(reqParam.kana){
        if(reqParam.searchTech === AND){
          // かな検索のみセパレータをORに変更
          query += query.slice(0, AND.length) + OR;
        }
        query+= "municipalityNameKana:" + reqParam.municipalityName + searchTech;
      }
    }
    if(reqParam.townCode){
      query+= "townCode:" + reqParam.townCode + searchTech;
    }
    if(reqParam.townName){
      query+= "townName:" + reqParam.townName + searchTech;
      if(reqParam.kana){
        if(reqParam.searchTech === AND){
          // かな検索のみセパレータをORに変更
          query += query.slice(0, AND.length) + OR;
        }
        query+= "townNameKana:" + reqParam.townName + searchTech;
      }
    }
    if(reqParam.referenceCode){
      query+= "referenceCode:" + reqParam.referenceCode + searchTech;
    }
    if(reqParam.classCode){
      query+= "classCode:" + reqParam.classCode + searchTech;
    }
  
    if(reqParam.geo_p){
      // 範囲検索する場合
      if(reqParam.geoRange){
        if(query !== solrUrl){
          // すでにクエリが設定されている場合
          query+= "fq={!geofilt sfield=geo_p}&pt=" + reqParam.geo_p + "&d=" + reqParam.geoRange + searchTech;
        }else{
          query+= "*:*&fq={!geofilt sfield=geo_p}&pt=" + reqParam.geo_p + "&d=" + reqParam.geoRange + searchTech;
        }
      }else{
        if(query !== solrUrl){
          // すでにクエリが設定されている場合
          query+= "fq={!geofilt sfield=geo_p}&pt=" + reqParam.geo_p + "&d=" + 0 + searchTech;
        }else{
          query+= "*:*&fq={!geofilt sfield=geo_p}&pt=" + reqParam.geo_p + "&d=" + 0 + searchTech;
        }
      }
    }
    // query文字列判定
    if(query === solrUrl){
      // 検索条件がない場合は全検索
      query+= "*:*&";
    }else if(query.endsWith(searchTech)){
      query = query.slice( 0, -searchTech.length );
      query += "&";
    }
  
    // 取得件数の設定
    if(reqParam.searchNum){
      query+= "rows=" + reqParam.searchNum + "&";
    }
  
    // 取得フィールドの設定
    if(reqParam.checked.length !== 0){
      query+= "fl=";
      reqParam.checked.forEach(function(item){
        query+= item + ",";
      })
      query = query.slice( 0, -1 );
      query += "&";
    }
  
    // 最終文字が&判定
    if(query.endsWith("&")){
      query = query.slice( 0, -1 ) ;
    }
    return encodeURI(query);
}