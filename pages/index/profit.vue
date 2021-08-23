<template>
	<view class="ruleWap">
		<u-navbar :title="i18n.text47" back-icon-color='#ffffff' title-color='#ffffff' :title-bold='isBorder' :background='backgroundObj' :border-bottom='isHeader'></u-navbar>
	    
		<view class="wapList" v-for="(item,index) in pledgeList" :key='index'>
			<view class="leftItem">
				<view class="text1">ETVPros</view>
				<view class="text2">{{formatDate(item.time)}}</view>
				<view class="text3">
					{{i18n.text48}}：<text>{{walletAddr}}</text>
				</view>
			</view>
			<view class="rigtItem">
				<view class="text1">{{(item.amount / 100000000).toFixed(4)}}</view>
				<view class="text2">{{i18n.text22}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TrcToken from '@/common/trcToken'
	
	export default{
		data(){
			return{
				contractAddr: 'TCkCQXGr9byDnsdsnTShu8NUyu9xiwrFE7',
				ndAddr: 'TYuTHyoCCvENq9VtYanfZkbgj7Rxt9sA7x',
				zyAddr: 'TVmj8xz5YSAhBgcMP5q7pkrrsfFHZxuLhV',
				lpAddr: 'TLoa8s9dBKXk8uobpcsPdgBVrYiyYzAe4h',
				// contractAddr: 'TXXubhurYenXqUerLufeyYUGY1T7NpDdPT',
				// ndAddr: 'TT6qtdnmWBYPeXkhyYApdY7PGaXUB65W5s',
				walletAddr: '',
				stakeValue: '',
				isHeader:false,
				isBorder:true,
				tronTimeout: null,
				tronweb: undefined,
				trcToken: null,
				backgroundObj:{
					background:'#0E1866'
				},
				walletAddr: '',
				pledgeList: [],
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onLoad() {
			this.$set(this, 'trcToken', new TrcToken(this.ndAddr))
			uni.getStorage({
			    key: 'walletAddr',
			    success: (res) => {
			        this.$set(this, 'walletAddr', (res.data))
			    }
			})
			
			uni.showLoading()
			const timeout = setTimeout(() => {
				clearTimeout(timeout)
				uni.hideLoading()
				// this.$set(this, 'pledgeList', this.trcToken.getUserOrder(this.walletAddr, 0, 10))
				console.log(this.pledgeList)
				this.getUserRewardList(this.walletAddr, 0, 20)
			}, 4000)
			
			
		},
		methods: {
			fromSun(value) {
				try{
					return this.trcToken.fromSun(value)
				}catch(e){
					//TODO handle the exception
					return 0
				}
				
			},
			formatDate(timestamp) {
				timestamp = timestamp.toNumber() * 1000
				console.log(timestamp)
				let time = new Date(timestamp)
				let year = time.getFullYear()
				let month = time.getMonth() + 1
				let date = time.getDate()
				let hours = time.getHours()
				let minute = time.getMinutes()
				let second = time.getSeconds()

				if (month < 10) { month = '0' + month }
				if (date < 10) { date = '0' + date }
				if (hours < 10) { hours = '0' + hours }
				if (minute < 10) { minute = '0' + minute }
				if (second < 10) { second = '0' + second }
				return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
			},
			async getUserRewardList(address, startIndex, endIndex) {
				const result = this.trcToken.getUserRewardList(address, startIndex, endIndex)
				console.log(result)
				result.then(res => {
					if (res.amountArr.length) {
						let oLen = res.amountArr.length
						for (let i = 0; i < oLen; i++) {
							this.pledgeList[i] = {
								amount: res.amountArr[i],
								time: res.timeArr[i],
							}
						}
					}
					this.$forceUpdate()
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
				return result
			},
		}
	}
</script>

<style lang="less" scoped>
	.ruleWap{
		padding-top: 73rpx;
		.wapList{
			width: 690rpx;
			margin: 0 auto 40rpx;
			height: 220rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 2rpx solid rgba(255,255,255,0.03);
			.leftItem{
				.text1{
					font-size: 34rpx;
					font-family: Barlow Medium;
					font-weight: 400;
					color: #FFFFFF;
				}
				.text2{
					font-size: 24rpx;
					font-family: Barlow;
					font-weight: 400;
					color: rgba(255,255,255,0.4);
					margin-top: 37rpx;
				}
				.text3{
					font-size: 24rpx;
					font-weight: 500;
					color: rgba(255,255,255,0.4);
					margin-top: 40rpx;
					text{
						font-size: 24rpx;
						font-family: Barlow;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
			}
			.rigtItem{
				.text1{
					font-size: 34rpx;
					font-family: Barlow Medium;
					font-weight: 400;
					color: #12F6F7;
				}
				.text2{
					font-size: 24rpx;
					font-weight: 500;
					color: rgba(255,255,255,0.4);
					margin-top: 34rpx;
				}
			}
		}
		
	}
</style>
