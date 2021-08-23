<template>
	<view class="ruleWap">
		<u-navbar :title="i18n.text33" back-icon-color='#ffffff' title-color='#ffffff' :title-bold='isBorder'
			:background='backgroundObj' :border-bottom='isHeader'></u-navbar>

		<view class="ruleMine">
			<view class="addEvt">
				{{i18n.text34}}：
			</view>
			<view class="addEvt">
				TCkCQXGr9byDnsdsnTShu8NUyu9xiwrFE7
			</view>
			<view class="addEvt" style="margin-top: 34rpx;">
				{{i18n.text35}}：
			</view>
			<view class="addEvt">
				TYuTHyoCCvENq9VtYanfZkbgj7Rxt9sA7x
			</view>

			<view class="poolTitle">
				{{i18n.text36}}
			</view>
			<view class="v1Text">
				{{i18n.text37}}
			</view>
			<view class="v1Text">
				{{i18n.text70}}
			</view>

			<view class="poolTitle">
				Pool v1
			</view>

			<view class="v1Text">
				{{i18n.text71}}
			</view>

			<view class="poolTitle">
				Pool v2
			</view>

			<view class="v1Text">
				{{i18n.text72}}
			</view>

			<view class="poolTitle">
				Pool v3
			</view>
			<view class="v1Text">
				{{i18n.text73}}
			</view>



		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isHeader: false,
				isBorder: true,
				backgroundObj: {
					background: '#0E1866'
				}
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
	}
</script>

<style lang="less" scoped>
	.ruleWap {
		padding: 73rpx 20rpx;

		.ruleMine {
			display: flex;
			flex-direction: column;
			align-items: center;

			.addtitle {
				font-size: 24rpx;
				font-family: Barlow;
				font-weight: 400;
				//color: rgba(255,255,255,0.5);
			}

			.addEvt {
				font-size: 24rpx;
				font-family: Barlow Medium;
				font-weight: 400;
				color: #FFFFFF;
				margin-top: 10rpx;
			}

			.poolTitle {
				width: 270rpx;
				height: 56rpx;
				background: url(../../static/image/titleBag.png) no-repeat;
				background-size: cover;
				margin: 70rpx auto 0;
				text-align: center;
				line-height: 56rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #12F6F7;
			}

			.jhText {
				font-size: 28rpx;
				font-family: Barlow;
				font-weight: 400;
				color: #FFFFFF;
				margin-top: 35rpx;
			}

			.v1Text {
				font-size: 28rpx;
				font-family: Barlow;
				font-weight: 400;
				color: #FFFFFF;
				padding: 0 70rpx;
				text-align: center;
				margin-top: 34rpx;
			}
		}
	}
</style>
