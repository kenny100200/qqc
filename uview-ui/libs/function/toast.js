function toast(title, duration = 1500) {
	//#ifdef H5
	uni.showToast({
		title: title,
		icon: 'none',
		duration: duration,
		
	})
	//#endif
	//#ifdef APP-PLUS
	plus.nativeUI.toast(title,{
		align : "center",// 水平居中
		verticalAlign:"top",
	});
	//#endif
}

export default toast
