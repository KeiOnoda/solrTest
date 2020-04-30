'use strict'
const axios = require('axios');
const APIKEY = 'c04e63e6d8deae6e8b9192aac8fa767a628a226f37476165b3ab0dbcb2bf0e7e'; //API KEY
const BASE_URL = 'https://labs.goo.ne.jp/api/hiragana';
const OUTPUT_TYPE = 'hiragana';

/**
 * ひらがな化APIリクエストオプション
 */
exports.options = {
    method: 'post',
    sentence: '',
    url: BASE_URL,
    headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'Content-Type': `application/json`
    },
    data: {
        app_id: APIKEY,
        output_type: OUTPUT_TYPE
    }
};

exports.getFileName = function (str){
    var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}
