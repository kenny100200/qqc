
import URLMine from '@/common/url.js';
const tools = {};

// 后退
tools.back = (step) => {
	uni.navigateBack({
		delta: step
	});
	
};

tools.path = (path) => {
	uni.navigateTo({
		url:path
	})
};
tools.pathTwo = (path) => {//调手势用
  uni.navigateTo({
  	url:path
  }) 
  // let phone=uni.getStorageSync('etPhone');

  //  if(phone){
	 //   uni.navigateTo({
	 //   	url:'../login/gestureLoginTwo'
	 //   })
  //  }else{
	 //  uni.navigateTo({
	 //  	url:path
	 //  }) 
  //  }

	
};
tools.pathSw = (path) => {
	uni.switchTab({
		url:path
	})
};
// 复制
tools.copy=(val)=>{
	uni.setClipboardData({
		data:val,
		success() {
			uni.hideToast();
			//#ifdef H5
			uni.showToast({
				title: '复制成功',
				duration:2000,
				icon:"none",
				// position:'bottom'
			})
			//#endif
			//#ifdef APP-PLUS
			plus.nativeUI.toast('复制成功',
			 {
			 	align : "center",// 水平居中
			 	verticalAlign:"top",
			 }
			);
			//#endif
			
		}
		
	})
}
tools.toast=(val)=>{
	// uni.showToast({
	// 	title:val,
	// 	icon:"none",
	// 	duration:2000,
	// 	// position:'bottom'
	// })
	//#ifdef H5
	uni.showToast({
		 title:val,
		duration:2000,
		icon:"none",
		// position:'bottom'
	})
	//#endif
	//#ifdef APP-PLUS
	plus.nativeUI.toast(val,{
		align : "center",// 水平居中
		verticalAlign:"top",
	});
	//#endif
}
tools.jump=(path,value1,value2,value3,value4)=>{
	uni.navigateTo({
		url:path+'?'+'value1='+value1+'&value2='+value2+'&value3='+value3 +'&value4='+value4
	})
}
//跳转到 tabBar页面
tools.jumpTo=(path)=>{
	uni.switchTab({
		url:path
	})
}


tools.formatTime = (value,type) => {
	var dataTime="";
    var data = new Date();
    data.setTime(value);
    var year   =  data.getFullYear();
    var month_temp=data.getMonth()+1;
    var month  =  month_temp<10?'0'+month_temp: month_temp;
    var day    =  data.getDate()<10?'0'+data.getDate(): data.getDate();
    var hour   =  data.getHours()<10?'0'+data.getHours(): data.getHours();
    var minute =  data.getMinutes()<10?'0'+data.getMinutes(): data.getMinutes();
    var second =  data.getSeconds()<10?'0'+data.getSeconds(): data.getSeconds();
    if(type == "YMD"){
        dataTime =  year + "-"+ month + "-" + day;
    }else if(type == "YMDHMS"){
        dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
    }else if(type == "HMS"){
        dataTime = hour+":" + minute+":" + second;
    }else if(type == "YM"){
        dataTime = year + "-" + month;
    }
    return dataTime;//将格式化后的字符串输出到前端显示
}
tools.formatTime2=(value)=>{
	var timeValue=value.replace(/-/g,"/");
	var T_pos = timeValue.indexOf('T');
	var year_month_day = timeValue.substr(0,T_pos);
	var hour_minute_second = timeValue.substr(T_pos+1,8);
	var new_datetime = year_month_day+" "+hour_minute_second;
	var dateee = new Date(new_datetime).toJSON();
	var sjc=new Date(dateee).getTime();
	var chinaT=sjc+8*3600*1000;
	var date=tools.formatTime(chinaT,'YMDHMS');
	return date;
},
tools.number = (value,type) => {
    if(value==null || value==''){
        value=0;
    }
    //处理科学计数法
    value=value.toFixed(8);
    var arr=(value+"").split(".");
    var a1=arr[0];
    var a2=0;
    if(arr.length>1){
        a2=arr[1];
        if(a2.length>type){
            a2=a2.substring(0,type);
        }
    }
    value= Number(a1+"."+a2);
    return Number(value).toFixed(type)
},
tools.number2 = (value,type) => {
    if(value==null || value==''){
        value=0;
    }
    //处理科学计数法
    value=value.toFixed(8);
    var arr=(value+"").split(".");
    var a1=arr[0];
    var a2=0;
    if(arr.length>1){
        a2=arr[1];
        if(a2.length>type){
            a2=a2.substring(0,type);
        }
    }
    value= Number(a1+"."+a2);
    return Number(value);
},
tools.number3 = (value) => {
    if(value==null || value==''){
        value=0;
    }
   
    value= parseFloat(value);
    return value;
},

tools.prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

tools.numberUp = (num, fix) => {
	// num为原数字，fix是保留的小数位数
	  let result = '0'
	  if (Number(num) && fix > 0) { // 简单的做个判断
	    fix = +fix || 2
	    num = num + ''
	    if (/e/.test(num)) { // 如果是包含e字符的数字直接返回
	      result = num
	    } else if (!/\./.test(num)) { // 如果没有小数点
	      result = num + `.${Array(fix + 1).join('0')}`
	    } else { // 如果有小数点
	      num = num + `${Array(fix + 1).join('0')}`
	      let reg = new RegExp(`-?\\d*\\.\\d{0,${fix}}`)
	      let floorStr = reg.exec(num)[0]
	      if (+floorStr >= +num) {
	        result = floorStr
	      } else {
	        let floorNumber = +floorStr + +`0.${Array(fix).join('0')}1`
	        let point = /\./.test(floorNumber + '') ? '' : '.'
	        let floorStr2 = floorNumber + point + `${Array(fix + 1).join('0')}`
	        result = reg.exec(floorStr2)[0]
	      }
	    }
	  }
	  return result
	
	
	
}

tools.numberDown = (num, fix) => {
	// num为原数字，fix是保留的小数位数
	  let result = '0'
	  if (Number(num) && fix > 0) { // 简单的做个判断
	    fix = +fix || 2
	    num = num + ''
	    if (/e/.test(num)) { // 如果是包含e字符的数字直接返回
	      result = num
	    } else if (!/\./.test(num)) { // 如果没有小数点
	      result = num + `.${Array(fix + 1).join('0')}`
	    } else { // 如果有小数点
	      num = num + `${Array(fix + 1).join('0')}`
	      let reg = new RegExp(`-?\\d*.\\d{0,${fix}}`)
	      result = reg.exec(num)[0]
	    }
	  }
	  return result
}

//预览图片
tools.preview = (urls,current) => {
	console.log(urls,current)
	uni.previewImage({
		urls: urls,
		current:current
	})
}


tools.getCode = (url,phone,zone,sedCode) => {

	if (sedCode.timerStart) return;
	let data={};
	console.log(2333);
	if(phone){
		data.phoneEmail=phone;
	}
	if(zone){
		data.zone=zone;
	}
	uni.request({
		url: URLMine.webUrl + url,
		method: 'POST',
		dataType: 'json',
		data: data,
		header: {
			'content-type': 'application/x-www-form-urlencoded',
			'token':uni.getStorageSync('token')
		},
		success: res => {
			var code = res.data.code;
			if (code == 0) {
				tools.toast('发送成功')
				tools.Timer(sedCode)
			}else{
				tools.toast(res.msg);
			}
		},
		fail: () => {
			tools.toast('请稍后重试')
		}
	});
	
}

/*倒计时*/
tools.Timer = (data) => {
  if (data.timerStart) return;
  data.timerStart=true;
  var timeT = 59;
  data.timer = timeT + 's';
  data.timerStart = setInterval(() => {
    if (timeT <= 0) {
      clearInterval(data.timerStart);
      data.timerStart = false;
      data.timer = '发送验证码';
      return;
    }
    timeT--;
    data.timer = timeT + 's';
  }, 1000)
};

export default tools
