//开发

 var version = "v0.01";
// const IP='192.168.0.7:9003'
// const Websocket_IP='192.168.0.7:8091'

// const IP='192.168.0.7:8090'
// const Websocket_IP='192.168.0.7:8089'

const IP='www.omc.company'
const Websocket_IP='www.omc.company'
var ISHTTPS = false;

const webUrl = (ISHTTPS?'https://':'http://')+IP;
// const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + IP;

// 开发
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + Websocket_IP;
const slideURL = webUrl + "/search/downloadSlide?id=";
const currnecyURL = webUrl + "/search/currencyById?id=";
const currnecyNameURL = webUrl + "/search/currencyByName?name=";
const basePthURL = "";
const basePthURL2 = webUrl + "/search/download?path=";
export default {
	webUrl: webUrl,
	websocketUrl: websocketUrl,
	slideURL: slideURL,
	currnecyURL: currnecyURL,
	currnecyNameURL: currnecyNameURL,
	basePthURL: basePthURL,
	basePthURL2: basePthURL2,
	version: version
}
