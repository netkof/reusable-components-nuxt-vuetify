import Vue from 'vue';

//currency format 

import cf from 'currency-formatter';

const mxnFilter = value =>{
  return testFn(value);
};


function testFn(value){
  return cf.format(value,{code:'MXN'});
}

Vue.filter('mxnFilter',mxnFilter);
