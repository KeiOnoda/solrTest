import Api from './createAxios'

const inputNum = "num"
const inputChar = "char"
const inputGeoss = "geoss"

const inputType = {
  prefecturesId: inputNum,
  prefectures: inputChar,
  municipalityId: inputNum,
  municipalityName: inputChar,
  townCode: inputNum,
  townName: inputChar,
  referenceCode: inputNum,
  classCode: inputNum,
  geo_p: inputGeoss,
  geoRange: inputNum,
}

export default {
 
  /**
   * 検索リクエスト
   * @param {Object} reqObj 
   */
  searchPosting (reqObj) {
    return Api().post('/api/search', reqObj)
  },

  /**
   * ひらがな化APIリクエスト
   * @param {Object} reqObj 
   */
  hiraganaPosting (reqObj) {
    return Api().post('/api/hiragana', reqObj)
  },

  /**
   * Solr全削除リクエスト
   */
  solrDeleteGet () {
    return Api().get('/api/solrDelete')
  },

   /**
   * solr登録リクエスト
   * @param {Object} reqObj 
   */
  solrRegistPosting (reqObj) {
    return Api().post('/api/solrRegist', reqObj)
  },


  /**
   * 入力チェック
   * @param {String} type 入力タイプ 
   * @param {String} val  入力値 
   */
  inputCheck(type, val){
    let flg = true;
    if(!val) return flg;
    switch (inputType[type]){
      // 数値チェック
      case inputNum:
        // 数値以外であればtrueを返す
        flg = !isNaN(val);
        break;

      // 文字列チェック
      case inputChar:
        // 全ての文字を許容するためノーチェック
        break;
      
      // 座標チェック
      case inputGeoss:
        // 緯度,経度形式以外はチェックエラー
        let regex = new RegExp(/^\d{1,3}\.\d+,\d{1,3}\.\d+$/);
        flg = regex.test(val);
        break;
    }
    return flg;
  } 
}