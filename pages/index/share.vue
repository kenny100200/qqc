<template>
	<view class="wapShare">
		<u-navbar :title="i18n.text44" back-icon-color='#ffffff' title-color='#ffffff' :title-bold='isBorder'
			:background='backgroundObj' :border-bottom='isHeader'></u-navbar>

		<view class="botWap">

			<view class="qrWap">
				<image :src="img"></image>
			</view>
			<view class="text1">
				{{i18n.text45}}
			</view>
			<view class="link">
				{{link}}
			</view>
			<view class="copy" @click="onCopy(link)">
				{{i18n.text46}}>>
			</view>
		</view>



	</view>
</template>

<script>
	import QR from "../../common/qrcode/qrcode.js";
	import uniCopy from '@/common/uni-copy.js'

	export default {
		data() {
			return {
				isHeader: false,
				isBorder: true,
				backgroundObj: {
					background: "rgba(0,0,0,0)"
				},
				img: '',
				val: '123456',
				size: 200,
				link: 'https://lat/stage?pid=fc0ab9ad-4cf5-484d-a74b-668044468c84&image'
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onShow() {
			this.creatQrcode();
		},
		methods: {
			creatQrcode() {
				let val = String(this.val)
				if (val == '') {
					this.img = '';
					return false
				}
				let img = QR.createQrCodeImg(val, {
					size: parseInt(this.size)
				})
				this.img = img;
			},
			onCopy(value) {
				uniCopy({
					content: value,
					success: (res) => {
						uni.showToast({
							title: this.i18n.text67,
							icon: 'none'
						})
					},
					error: (e) => {
						uni.showToast({
							title: e,
							icon: 'none',
							duration: 3000,
						})
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.wapShare {
		width: 750rpx;
		height: 100vh;
		background: url(../../static/image/shareBag.png) no-repeat;
		background-size: 750rpx auto;
		background-position: center center;

		.botWap {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: fixed;
			bottom: 100rpx;
			left: 50%;
			transform: translateX(-50%);

			.qrWap {
				width: 168rpx;
				height: 168rpx;
				padding: 5rpx;
				background-color: #FFFFFF;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.text1 {
				font-size: 24rpx;
				font-weight: 500;
				color: #FFFFFF;
				opacity: 0.5;
				margin-top: 58rpx;
			}

			.link {
				font-size: 24rpx;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				margin-top: 16rpx;
			}

			.copy {
				font-size: 30rpx;
				font-weight: 500;
				color: #12F6F7;
				margin-top: 44rpx;
			}
		}
	}
</style>
