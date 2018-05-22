import Vue from 'vue';
//date filters
var format = require('date-fns/format')
var distanceInWordsToNow = require('date-fns/distance_in_words_to_now')
var esLocale = require('date-fns/locale/es')

const dateFilterFn = (value,type) =>{
  return testFn(value,type);
};


function testFn(value,type){
  if(type == 'toNow')
    return 'Hace ' + distanceInWordsToNow(value,{locale:esLocale});  
  else
    return format(value,'DD MMMM YYYY', {locale:esLocale});
}

Vue.filter('dateFilter',dateFilterFn);
