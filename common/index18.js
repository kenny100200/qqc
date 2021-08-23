import VueI18n from './vue-i18n.js';//需先安装vue-i18n
import Vue from 'vue';

Vue.use(VueI18n);
import messagesEn from './en';
import messagesCn from './cn';
const messages = {
  en: {
    message: messagesEn
  },
  cn: {
    message: messagesCn
  }

}
  console.log(langular);
 var langular =uni.getStorageSync('languageEtv') ? uni.getStorageSync('languageEtv') : 'cn';
 console.log(langular);
 if(langular=='cn'){
	 uni.setStorageSync('languageEtv','cn');
 }
 
 //var langular =  'en';
console.log(langular)
var i18n = new VueI18n({
  locale: langular,    // 语言标识
  messages
});
Vue.prototype._i18n = i18n;  
export default i18n
