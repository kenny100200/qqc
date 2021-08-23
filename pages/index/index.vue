<template>
	<view class="content">
		<view class="headerWap">
			<image class="headerLogo" src="../../static/image/headerLogo.png"></image>
			<view class="rightWap">
				<view class="walText" v-if="false" @click="isWallet=true">{{i18n.text1}}</view>
				<view class="langWap" @click="show=true">
					{{langText}}
					<image src="../../static/image/xiala.png"></image>
				</view>
			</view>
		</view>

		<view class="wapSwiper">
			<u-swiper class="swiperMine" mode='rect' :list="list"></u-swiper>
		</view>

		<view class="wapImg">
			<view class="itemImg" @click="$tools.path('../index/rule')">
				{{i18n.text8}}
			</view>
			<view class="itemImg2" @click="onNotOpen">
				{{i18n.text9}}
			</view>
			<view class="itemImg3" @click="onNotOpen">
				{{i18n.text83}}
			</view>
		</view>

		<view class="poolTitle">
			{{i18n.text11}}
		</view>
		<view class="poolListWap">
			<view class="poolItem pool-a">
				<!-- <view class="lenev">POLLV1</view> -->

				<view class="text1">
					{{i18n.text12}}
				</view>
				<view class="text2">
					<!-- {{i18n.text13}} -->
				</view>
				<view class="poolType">
					<view class="infoCol">
						<view class="leftText">
							{{i18n.text2}}
						</view>
						<view class="rightText">
							{{fromSun(getSysInfoData[0])}}
						</view>
					</view>
					<view class="infoCol">
						<view class="infoLeft">
							{{i18n.text3}}
						</view>
						<view class="infoRight">
							{{getSysInfoData[4]}}
						</view>
					</view>
					<view class="infoCol">
						<view class="infoLeft">
							{{i18n.text5}}
						</view>
						<view class="infoRight">
							{{getSysInfoData[5] / 100000000 || 0}}
						</view>
					</view>
					<view class="infoCol">
						<view class="infoLeft">
							{{i18n.text7}}:
						</view>
						<view class="infoRight">
							{{ndAddr}}
						</view>
						<image src="../../static/image/copy.png" @click="onCopy(ndAddr)"></image>
					</view>
				</view>
				<view class="btnGroup">
					<view class="btn" @click="onJoin">
						{{i18n.text14}}
					</view>
				</view>
			</view>
			<view class="poolItem pool-b">
				<!-- <view class="lenev">POLLV2</view> -->

				<view class="text1">
					{{i18n.text79}}
				</view>
				<view class="text2">
					<!-- {{i18n.text80}} -->
				</view>
				<view class="poolType">
					<view class="infoCol">
						<view class="leftText">
							{{i18n.text84}}
						</view>
						<view class="rightText">
							{{fromSun(getSysEneInfoData[0])}}
						</view>
					</view>
					<view class="infoCol">
						<view class="infoLeft">
							{{i18n.text3}}
						</view>
						<view class="infoRight">
							{{getSysEneInfoData[4]}}
						</view>
					</view>
					<view class="infoCol">
						<view class="infoLeft">
							{{i18n.text5}}
						</view>
						<view class="infoRight">
							{{getSysEneInfoData[5] / 100000000 || 0}}
						</view>
					</view>
					<view class="infoCol">
						<view class="infoLeft">
							{{i18n.text86}}:
						</view>
						<view class="infoRight">
							{{zyEneAddr}}
						</view>
						<image src="../../static/image/copy.png" @click="onCopy(ndAddr)"></image>
					</view>
				</view>
				<view class="btnGroup">
					<view class="btn" @click="onPledgeEne">
						{{i18n.text56}}ENE
					</view>
				</view>
			</view>
			<view class="poolItem pool-c">
				<!-- <view class="lenev">POLLV1</view> -->

				<view class="text1">
					{{i18n.text81}}
				</view>
				<view class="text2">
					<!-- {{i18n.text82}} -->
				</view>
				<view class="poolType">
					<view class="infoCol">
						<view class="leftText">
							{{i18n.text85}}
						</view>
						<view class="rightText">
							{{totalZyLp / 1000000}}
						</view>
					</view>
					<view class="infoCol">
						<view class="infoLeft">
							{{i18n.text3}}
						</view>
						<view class="infoRight">
							{{totalZyLpUserCount}}
						</view>
					</view>
					
					<view class="infoCol">
						<view class="infoLeft">
							{{i18n.text86}}:{{zyAddr}}
						</view>
						<view class="infoRight">
						</view>
						<image src="../../static/image/copy.png" @click="onCopy(zyAddr)"></image>
					</view>
				</view>
				<view class="btnGroup">
					<view class="btn" @click="onPledge">
						{{i18n.text56}}LP
					</view>
					<view class="btn out" @click="isExit = true">
						{{i18n.text87}}LP
					</view>
				</view>
			</view>
		</view>

		<view class="poolTitle">
			{{i18n.text15}}
		</view>
		<!-- 我的质押 -->
		<view class="dataInfo">
			<view class="titleWap">
				<view class="leftText">
					{{i18n.text17}}
				</view>
				<view class="rightText">
				</view>
			</view>
			<view class="infoCol">
				<view class="infoLeft">
					<text class="type">ETVs:</text>{{fromSun(getUserData[1])}}
				</view>
				<view class="infoRight" @click="$tools.path('../index/record')">
					{{i18n.text18}}>>
				</view>
			</view>
			<view class="infoCol">
				<view class="infoLeft">
					<text class="type">ENE:</text>{{fromSun(getEneUserData[1])}}
				</view>
			</view>
			<view class="infoCol">
				<view class="infoLeft">
					<text class="type">LP:</text>{{getUserDataZy}}
				</view>
			</view>
		</view>

		<!-- 我的收割 -->
		<view class="dataInfo">
			<view class="titleWap">
				<view class="leftText">
					{{i18n.text20}}
				</view>
				<view class="rightText" v-if="false">
					<text v-if="getUserData.length < 2 ">0 ETVPros</text>
					<text v-else>{{(getUserData[2] / 100000000).toFixed(4)}} ETVPros</text>
				</view>
				<view class="rightText">
					<text class="tips">({{i18n.text92}})</text>
				</view>
			</view>
			<view class="infoCol">
				<view class="infoLeft">
					<text class="type">POOL_V1{{i18n.text21}}:</text>{{getBonusData / 100000000}}
				</view>
				<view class="infoRight">
					<view class="sgBut" @click="isShouGe=true">
						{{i18n.text22}}
					</view>
				</view>
			</view>
			<view class="infoCol">
				<view class="infoLeft">
					<text class="type">POOL_V2{{i18n.text21}}:</text>{{getEneBonusData / 100000000}}
				</view>
				<view class="infoRight">
					<view class="sgBut" @click="isShouGeEne=true">
						{{i18n.text22}}
					</view>
				</view>
			</view>
			<view class="infoCol">
				<view class="infoLeft">
					<text class="type">POOL_V3{{i18n.text21}}:</text>{{earnedAmount / 100000000}}
				</view>
				<view class="infoRight">
					<view class="sgBut" @click="isShouGeLp=true">
						{{i18n.text22}}
					</view>
				</view>
			</view>
		</view>

		<u-mask :show="show" @click="show = false">
			<view class="warpPop">
				<view class="rect" @tap.stop>
					<view @click="changeLng(0)">中文</view>
					<view @click="changeLng(1)">English</view>
				</view>
			</view>
		</u-mask>

		<u-popup mode="center" v-model="isShouGe">
			<view class="popWap">
				<view class="text1">{{i18n.text23}}</view>
				<view class="text2">{{walletAddr}}</view>

				<view class="qanText">{{i18n.text24}}</view>
				<view class="qanNum">
					{{getBonusData / 100000000}}
				</view>

				<view class="wapBut">
					<view class="butLeft" @click="isShouGe=false">{{i18n.text28}}</view>
					<view class="comRight" @click="onWithdrawBonus">
						{{i18n.text25}}
					</view>
				</view>
			</view>
		</u-popup>
		
		<u-popup mode="center" v-model="isShouGeLp">
			<view class="popWap">
				<view class="text1">{{i18n.text23}}</view>
				<view class="text2">{{walletAddr}}</view>
		
				<view class="qanText">{{i18n.text24}}</view>
				<view class="qanNum">
					{{earnedAmount / 100000000}}
				</view>
		
				<view class="wapBut">
					<view class="butLeft" @click="isShouGeLp=false">{{i18n.text28}}</view>
					<view class="comRight" @click="onWithdrawBonusLp">
						{{i18n.text25}}
					</view>
				</view>
			</view>
		</u-popup>
		
		<u-popup mode="center" v-model="isShouGeEne">
			<view class="popWap">
				<view class="text1">{{i18n.text23}}</view>
				<view class="text2">{{walletAddr}}</view>
		
				<view class="qanText">{{i18n.text24}}</view>
				<view class="qanNum">
					{{getEneBonusData / 100000000}}
				</view>
		
				<view class="wapBut">
					<view class="butLeft" @click="isShouGeEne=false">{{i18n.text28}}</view>
					<view class="comRight" @click="onWithdrawBonusEne">
						{{i18n.text25}}
					</view>
				</view>
			</view>
		</u-popup>

		<u-popup mode="center" v-model="isPleg">
			<view class="popWap">
				<view class="title">
					{{i18n.text26}}
				</view>

				<view class="inpWap">
					<input v-model="stakeValue" :placeholder="i18n.text27" placeholder-class="plClass" />
					<text>ETVs</text>
				</view>

				<view class="wapBut">
					<view class="butLeft" @click="isPleg=false">{{i18n.text28}}</view>
					<view class="comRight" @click="onStake(stakeValue)">
						{{i18n.text25}}
					</view>
				</view>
			</view>
		</u-popup>

		<u-popup mode="center" v-model="isPlegLp">
			<view class="popWap">
				<view class="title">
					{{i18n.text26}}
				</view>

				<view class="inpWap">
					<input v-model="stakeValue" :placeholder="i18n.text27" placeholder-class="plClass" />
					<text>LP</text>
				</view>

				<view class="wapBut">
					<view class="butLeft" @click="isPlegLp=false">{{i18n.text28}}</view>
					<view class="comRight" @click="onStakeLp(stakeValue)">
						{{i18n.text25}}
					</view>
				</view>
			</view>
		</u-popup>
		
		<u-popup mode="center" v-model="isPlegEne">
			<view class="popWap">
				<view class="title">
					{{i18n.text26}}
				</view>
		
				<view class="inpWap">
					<input v-model="stakeValue" :placeholder="i18n.text27" placeholder-class="plClass" />
					<text>ENE</text>
				</view>
		
				<view class="wapBut">
					<view class="butLeft" @click="isPlegEne=false">{{i18n.text28}}</view>
					<view class="comRight" @click="onStakeEne(stakeValue)">
						{{i18n.text25}}
					</view>
				</view>
			</view>
		</u-popup>

		<u-popup mode="center" v-model="isShouquan">
			<view class="popWap">

				<view class="inpWap">
					<text>{{i18n.text74}}</text>
					<text>{{i18n.text75}}</text>
				</view>

				<view class="wapBut">
					<view class="butLeft" @click="isShouquan=false">{{i18n.text28}}</view>
					<view class="comRight" @click="onApprove()">
						{{i18n.text25}}
					</view>
				</view>
			</view>
		</u-popup>

		<u-popup mode="center" v-model="isShouquanchenggong">
			<view class="popWap">

				<view class="inpWap">
					<text>{{i18n.text76}}</text>
				</view>

				<view class="wapBut">
					<view class="butLeft" @click="isShouquanchenggong=false">{{i18n.text28}}</view>
					<view class="comRight" @click="isShouquanchenggong=false">
						{{i18n.text25}}
					</view>
				</view>
			</view>
		</u-popup>

		<u-popup mode="center" v-model="isShouquanLp">
			<view class="popWap">

				<view class="inpWap">
					<text>{{i18n.text88}}</text>
					<text>{{i18n.text75}}</text>
				</view>

				<view class="wapBut">
					<view class="butLeft" @click="isShouquanLp=false">{{i18n.text28}}</view>
					<view class="comRight" @click="onApproveLp()">
						{{i18n.text25}}
					</view>
				</view>
			</view>
		</u-popup>
		
		<u-popup mode="center" v-model="isShouquanEne">
			<view class="popWap">
		
				<view class="inpWap">
					<text>{{i18n.text93}}</text>
					<text>{{i18n.text75}}</text>
				</view>
		
				<view class="wapBut">
					<view class="butLeft" @click="isShouquanEne=false">{{i18n.text28}}</view>
					<view class="comRight" @click="onApproveEne()">
						{{i18n.text25}}
					</view>
				</view>
			</view>
		</u-popup>

		<u-popup mode="center" v-model="isExit">
			<view class="popWap popExit">
				<view class="title">
					{{i18n.text87}}LP{{i18n.text56}}
				</view>

				<view class="inpWap">
					{{i18n.text89}}：<input v-model="exitValue" :placeholder="i18n.text91"
						placeholder-class="plClass" />
					<view class="btnSubmit" @click="onZywithdraw">
						{{i18n.text25}}
					</view>
				</view>

				<view class="inpWap flexWap">
					{{i18n.text90}}
					<view class="btnSubmit" @click="onCancel">
						{{i18n.text25}}
					</view>
				</view>

				<view class="wapBut">
					<view class="butLeft" @click="isExit = false">{{i18n.text28}}</view>
				</view>
			</view>
		</u-popup>




		<u-popup mode="center" v-model="isShouquanchenggongLp">
			<view class="popWap">

				<view class="inpWap">
					<text>{{i18n.text76}}</text>
				</view>

				<view class="wapBut">
					<view class="butLeft" @click="isShouquanchenggongLp=false">{{i18n.text28}}</view>
					<view class="comRight" @click="isShouquanchenggongLp=false">
						{{i18n.text25}}
					</view>
				</view>
			</view>
		</u-popup>
		
		<u-popup mode="center" v-model="isShouquanchenggongEne">
			<view class="popWap">
		
				<view class="inpWap">
					<text>{{i18n.text76}}</text>
				</view>
		
				<view class="wapBut">
					<view class="butLeft" @click="isShouquanchenggongEne=false">{{i18n.text28}}</view>
					<view class="comRight" @click="isShouquanchenggongEne=false">
						{{i18n.text25}}
					</view>
				</view>
			</view>
		</u-popup>

		<u-popup mode="center" v-model="isWallet">
			<view class="popWap" style="padding-bottom: 56rpx;">
				<view class="title">
					{{i18n.text29}}
				</view>
				<view class="textAdd">
					{{walletAddr}}
				</view>

				<view class="textMy">
					<text class="text1Text">Trx:</text>{{balance}}
				</view>

				<view class="textMy">
					<text class="text1Text">ETVs:</text>{{tokenBalance}}
				</view>

				<view class="textMy">
					<text class="text1Text">ENE:</text>{{eneBalance}}
				</view>

				<view class="textMy">
					<text class="text1Text">LP:</text>{{lpBalance}}
				</view>

				<view class="textMy">
					<text class="text1Text">ETVPros:</text>
					<text>{{epBalance}} ETVPros</text>
				</view>

				<view class="check" @click="onOpenTronScan">
					{{i18n.text32}}
				</view>

				<view class="check" @click="isWallet=false" style="margin-top: 32rpx;">
					{{i18n.text28}}
				</view>



			</view>
		</u-popup>

	</view>
</template>

<script>
	import uniCopy from '@/common/uni-copy.js'
	import TrcToken from '@/common/trcToken'
	import erc20Abi from '@/common/abi.js'

	export default {
		data() {
			return {
				// // production
				// /* contractAddr: 'TCkCQXGr9byDnsdsnTShu8NUyu9xiwrFE7',
				// ndAddr: 'TYuTHyoCCvENq9VtYanfZkbgj7Rxt9sA7x',
				// EpAddr: 'TT1C3kDbug1suD4qcAqnspQDaXARpg2ZGG',
				// zyAddr: 'TVmj8xz5YSAhBgcMP5q7pkrrsfFHZxuLhV', // 质押地址
				// lpAddr: 'TLoa8s9dBKXk8uobpcsPdgBVrYiyYzAe4h', // lp地址
				// eneAddr: 'TRkciExfRh2ZpNEm6UKtnGywKSsEdC6Vgt', // ene地址
				//  */
				// // test
				contractAddr: 'TGxCfTqcm5cmVUdaEbfH2KzQ5DyyKE7Xcf', // etvs地址
				ndAddr: 'TYuTHyoCCvENq9VtYanfZkbgj7Rxt9sA7x', // 质押etvpros地址，第一个矿池
				EpAddr: 'TT1C3kDbug1suD4qcAqnspQDaXARpg2ZGG', // etvpros地址
				zyAddr: 'TVmj8xz5YSAhBgcMP5q7pkrrsfFHZxuLhV', // 质押lp地址，第三个矿池
				lpAddr: 'TLoa8s9dBKXk8uobpcsPdgBVrYiyYzAe4h', // lp地址
				eneAddr: 'TAHuvai4zqbNBuydudAkqwfiWrAKftLDQA', // ene地址
				zyEneAddr: 'TCyp3hqDC2FYVTZKpzMgMHb5WR1atyKwEX', // 质押ene地址，第二个矿池
				
				// // zyAddr: 'TN92Jgx33EC3CdNahnHVFsr52jhCa72bdB',
				// // lpAddr: 'TCvenYT9TxpJWyjUKetLQzPNQPB4QRRvre',
				// // contractAddr: 'TPAz7wJZxUxbCH7xgH5buCtBhqq5rmvGRj',
				// // ndAddr: 'TLh5GF1KUt8GaFqqtbjeceM7qErwqdLenq',
				// // contractAddr: 'TXXubhurYenXqUerLufeyYUGY1T7NpDdPT',
				// // ndAddr: 'TT6qtdnmWBYPeXkhyYApdY7PGaXUB65W5s',
				walletAddr: '',
				stakeValue: '',
				exitValue: '',
				list: [{
						image: require('static/image/banner-a.png'),
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: require('static/image/banner-b.png'),
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: require('static/image/banner-c.png'),
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				show: false,
				isShouGe: false,
				isShouGeLp: false,
				isPleg: false,
				isPlegLp: false,
				isShouquan: false,
				isShouquanchenggong: false,
				isShouquanLp: false,
				isShouquanchenggongLp: false,
				isShouquanEne: false,
				isShouquanchenggongEne: false,
				isShouGeEne: false,
				isPlegEne: false,
				isExit: false,
				langText: "中文",
				isWallet: false,
				tronTimeout: null,
				tronweb: undefined,
				trcToken: null,
				contractToken: null,
				lpToken: null,
				zyToken: null,
				eneToken: null,
				epToken: null,
				zyEneToken: null,
				getSysInfoData: [],
				getSysEneInfoData: [],
				getUserData: [],
				getEneUserData: [],
				getBonusData: 0,
				getEneBonusData: 0,
				balance: 0,
				tokenBalance: 0,
				lpBalance: 0,
				eneBalance: 0,
				epBalance: 0,
				earnedAmount: 0,
				remaining: 0,
				getUserDataZy: [],
				totalZyLp: 0,
				totalZyLpUserCount: 0,
				totalSgEtvpros: 0,
				totalZyEne: 0,
				totalZyEneUserCount: 0,
				totalSgEneEtvpros: 0,
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onShow() {
			let lang = uni.getStorageSync('languageEtv');
			if (lang == 'cn') {
				this.langText = '中文'
			} else {
				this.langText = 'English'
			}
		},
		onLoad() {
			
			this.$set(this, 'trcToken', new TrcToken(this.ndAddr))
			this.$set(this, 'contractToken', new TrcToken(this.contractAddr))
			this.$set(this, 'epToken', new TrcToken(this.EpAddr))
			this.$set(this, 'lpToken', new TrcToken(this.lpAddr, erc20Abi))
			this.$set(this, 'zyToken', new TrcToken(this.zyAddr))
			this.$set(this, 'eneToken', new TrcToken(this.eneAddr, erc20Abi))
			this.$set(this, 'zyEneToken', new TrcToken(this.zyEneAddr))

			uni.showLoading()
			const timeout = setTimeout(() => {
				clearTimeout(timeout)
				this.$set(this, 'walletAddr', this.trcToken.getDefaultAddress())
				uni.setStorage({
					key: 'walletAddr',
					data: this.walletAddr
				})

				this.getBalance()
				this.getTokenBalance()
				this.getCurDayIndex()
				this.getSysInfo()
				this.getUser(this.walletAddr)
				
				const lpTimeout = setTimeout(() => {
					clearTimeout(lpTimeout)
					this.getLpTokenBalance()
				}, 1000)
				
				const zyTimeout = setTimeout(() => {
					clearTimeout(zyTimeout)
					this.getValidCount()
					this.getTotalSupply()
					this.getUserZy()
					this.getEarned()
				}, 2000)
				
				const epTimeout = setTimeout(() => {
					clearTimeout(epTimeout)
					this.getEpBalance()
				}, 3000)
				
				const enTimeout = setTimeout(() => {
					uni.hideLoading()
					clearTimeout(enTimeout)
					this.getEneBalance()
				}, 4000)
				
				const zyEneTimeout = setTimeout(() => {
					clearTimeout(zyEneTimeout)
					this.getSysEneInfo()
					this.getEneUser(this.walletAddr)
					this.getEneCurDayIndex()
					// this.getUserZy()
					// this.getEarned()
				}, 2000)
				
			}, 4000)


		},
		methods: {
			fromSun(value) {
				try {
					return this.trcToken.fromSun(value)
				} catch (e) {
					//TODO handle the exception
					return 0
				}

			},
			changeLng(index) {
				if (index == 0) {
					uni.setStorageSync('languageEtv', 'cn');
					this.$i18n.locale = 'cn';
					this.langText = '中文';
				} else if (index == 1) {
					this.$i18n.locale = 'en';
					uni.setStorageSync('languageEtv', 'en');
					this.langText = 'English';
				}
				this.show = false;
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
			async onJoin() {
				// 是否已授权
				// this.contractToken.approve(this.ndAddr)
				const result = this.contractToken.allowance(this.walletAddr, this.ndAddr)
				result.then(res => {
					if (res.remaining == 0) {
						this.$set(this, 'isShouquan', true)
					} else {
						this.$set(this, 'isPleg', true)
					}
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error || e,
						icon: 'none'
					})
				}).finally(() => {})

				this.$set(this, 'tronweb', window.tronWeb)
			},
			async onPledge() {
				// 是否已授权
				// this.lpToken.approve(this.zyAddr)
				const result = this.lpToken.allowance(this.walletAddr, this.zyAddr)
				result.then(res => {
					console.log(res)
					if (res.remaining == 0) {
						this.$set(this, 'isShouquanLp', true)
					} else {
						this.$set(this, 'isPlegLp', true)
					}
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error || e,
						icon: 'none'
					})
				}).finally(() => {})

				this.$set(this, 'tronweb', window.tronWeb)
			},
			async onPledgeEne() {
				// 是否已授权
				// this.lpToken.approve(this.zyAddr)
				const result = this.eneToken.allowance(this.walletAddr, this.zyEneAddr)
				result.then(res => {
					console.log(res)
					if (res.remaining == 0) {
						this.$set(this, 'isShouquanEne', true)
					} else {
						this.$set(this, 'isPlegEne', true)
					}
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error || e,
						icon: 'none'
					})
				}).finally(() => {})
				
				this.$set(this, 'tronweb', window.tronWeb)
			},
			onNotOpen() {
				uni.showToast({
					title: this.i18n.text68,
					icon: 'none'
				})
			},
			onOpenTronScan() {
				window.open("https://tronscan.io/#/")
			},
			onStake(value) {
				this.stake(value)
			},
			onStakeLp(value) {
				this.stakeLp(value)
			},
			onStakeEne(value) {
				this.stakeEne(value)
			},
			onZywithdraw() {
				this.withdraw(this.exitValue)
			},
			async withdraw(value) {
				if (value === '') {
					uni.showToast({
						title: this.i18n.text69,
						icon: 'none'
					})
					return false
				}
				const result = this.zyToken.withdraw(value)
				uni.showLoading()
				this.$set(this, 'isExit', false)
				result.then(res => {
					console.log(res)
					uni.showToast({
						title: 'success',
						icon: 'none'
					})
					uni.hideLoading()
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async onCancel() {
				const result = this.zyToken.Exit()
				uni.showLoading()
				this.$set(this, 'isExit', false)
				result.then(res => {
					console.log(res)
					uni.showToast({
						title: '您已经授权成功，可以参与质押',
						icon: 'none'
					})
					uni.hideLoading()
					this.$set(this, 'isShouquanchenggongLp', false)
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async onApprove() {
				this.$set(this, 'isShouquan', false)
				this.$set(this, 'isShouquanchenggong', true)
				const result = this.contractToken.approve(this.ndAddr)
				result.then(res => {
					console.log(res)
					uni.showToast({
						title: '您已经授权成功，可以参与质押',
						icon: 'none'
					})
					this.$set(this, 'isShouquanchenggong', false)
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async onApproveLp() {
				this.$set(this, 'isShouquanLp', false)
				this.$set(this, 'isShouquanchenggongLp', true)
				const result = this.lpToken.approve(this.zyAddr)
				result.then(res => {
					console.log(res)
					uni.showToast({
						title: '您已经授权成功，可以参与质押',
						icon: 'none'
					})
					this.$set(this, 'isShouquanchenggongLp', false)
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async onApproveEne() {
				this.$set(this, 'isShouquanEne', false)
				this.$set(this, 'isShouquanchenggongEne', true)
				const result = this.eneToken.approve(this.zyEneAddr)
				result.then(res => {
					console.log(res)
					uni.showToast({
						title: '您已经授权成功，可以参与质押',
						icon: 'none'
					})
					this.$set(this, 'isShouquanchenggongEne', false)
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			onWithdrawBonus() {
				if (this.getBonusData === 0) {
					uni.showToast({
						title: `${this.i18n.text24}${this.getBonusData}`,
						icon: 'none',
						success: () => {
							this.$set(this, 'isShouGe', false)
						}
					})
					return false
				} else {
					this.withdrawBonus(50)
				}
			},
			onWithdrawBonusEne() {
				if (this.getEneBonusData === 0) {
					uni.showToast({
						title: `${this.i18n.text24}${this.getEneBonusData}`,
						icon: 'none',
						success: () => {
							this.$set(this, 'isShouGeEne', false)
						}
					})
					return false
				} else {
					this.withdrawBonusEne(50)
				}
			},
			onWithdrawBonusLp() {
				if (this.earnedAmount === 0) {
					uni.showToast({
						title: `${this.i18n.text24}${this.earnedAmount}`,
						icon: 'none',
						success: () => {
							this.$set(this, 'isShouGeLp', false)
						}
					})
					return false
				} else {
					this.withdrawBonusLp(50)
				}
			},
			async stake(value) {
				if (value === '') {
					uni.showToast({
						title: this.i18n.text69,
						icon: 'none'
					})
					return false
				}
				const result = this.trcToken.stake(value)
				uni.showLoading()
				result.then(res => {
					console.log(res)
				}).catch(e => {

					console.log(e)
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {
					uni.hideLoading()
					this.getBalance()
					this.$set(this, 'stakeValue', '')
					this.$set(this, 'isPleg', false)
				})
			},
			async stakeLp(value) {
				if (value === '') {
					uni.showToast({
						title: this.i18n.text69,
						icon: 'none'
					})
					return false
				}
				const result = this.zyToken.stake(value)
				uni.showLoading()
				result.then(res => {
					console.log(res)
				}).catch(e => {

					console.log(e)
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {
					uni.hideLoading()
					this.getBalance()
					this.$set(this, 'stakeValue', '')
					this.$set(this, 'isPlegLp', false)
				})
			},
			async stakeEne(value) {
				if (value === '') {
					uni.showToast({
						title: this.i18n.text69,
						icon: 'none'
					})
					return false
				}
				const result = this.zyEneToken.stake(value)
				uni.showLoading()
				result.then(res => {
					console.log(res)
				}).catch(e => {
			
					console.log(e)
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {
					uni.hideLoading()
					this.getBalance()
					this.$set(this, 'stakeValue', '')
					this.$set(this, 'isPlegEne', false)
				})
			},
			async getCurDayIndex() {
				const result = this.trcToken.getCurDayIndex()
				result.then(res => {
					const dayIndex = res.toNumber()
					this.getBonus(this.walletAddr, dayIndex)
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getEneCurDayIndex() {
				const result = this.zyEneToken.getCurDayIndex()
				result.then(res => {
					const dayIndex = res.toNumber()
					this.getEneBonus(this.walletAddr, dayIndex)
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getBonus(address, dayIndex) {
				const result = this.trcToken.getBonus(address, dayIndex)
				result.then(res => {
					console.log(res)
					this.$set(this, 'getBonusData', res.toNumber())
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getEneBonus(address, dayIndex) {
				const result = this.zyEneToken.getBonus(address, dayIndex)
				result.then(res => {
					console.log(res)
					this.$set(this, 'getEneBonusData', res.toNumber())
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getValidCount() {
				const result = this.zyToken.validCount()
				result.then(res => {
					console.log(res)
					this.$set(this, 'totalZyLpUserCount', res.toNumber())
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getValidEneCount() {
				const result = this.zyEneToken.validCount()
				result.then(res => {
					console.log(res)
					this.$set(this, 'totalZyEneUserCount', res.toNumber())
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getTotalSupply() {
				const result = this.zyToken.totalSupply()
				result.then(res => {
					console.log(res)
					this.$set(this, 'totalZyLp', res.toNumber())
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getTotalZyEneSupply() {
				const result = this.zyEneToken.totalSupply()
				console.log(9999999);
				result.then(res => {
					console.log(res)
					this.$set(this, 'totalZyEne', res.toNumber())
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getEarned() {
				const result = this.zyToken.earned(this.walletAddr)
				result.then(res => {
					console.log(res)
					this.$set(this, 'earnedAmount', res.toNumber())
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async withdrawBonus(dayCount) {
				uni.showLoading()
				const result = this.trcToken.withdrawBonus(dayCount)
				result.then(res => {
					console.log(res)
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {
					uni.hideLoading()
					this.$set(this, 'isShouGe', false)
				})
			},
			async withdrawBonusEne(dayCount) {
				uni.showLoading()
				const result = this.zyEneToken.withdrawBonus(dayCount)
				result.then(res => {
					console.log(res)
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {
					uni.hideLoading()
					this.$set(this, 'isShouGeEne', false)
				})
			},
			async withdrawBonusLp(dayCount) {
				uni.showLoading()
				const result = this.zyToken.withdrawBonusLp(dayCount)
				result.then(res => {
					console.log(res)
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {
					uni.hideLoading()
					this.$set(this, 'isShouGeLp', false)
				})
			},
			async getUserRewardList(address, startIndex, endIndex) {
				const result = this.trcToken.getUserRewardList(address, startIndex, endIndex)
				result.then(res => {
					console.log(res)
					if (res.length) {
						res.map(item => {
							console.log(item.toNumber())
						})
					}
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getUser(address) {
				const result = this.trcToken.getUser(address)
				console.log(result)
				result.then(res => {
					if (res.length) {
						console.log(res)
						this.$set(this, 'getUserData', res)

						// console.log("getUserData:::", this.getUserData)
						// this.getUserOrder(this.walletAddr, 0, this.getUserData[5])
						// this.getUserRewardList(this.walletAddr, 0, this.getUserData[6])
					}
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getEneUser(address) {
				console.log(888888);
				const result = this.zyEneToken.getUser(address)
				console.log(result)
				result.then(res => {
					if (res.length) {
						console.log(res)
						this.$set(this, 'getEneUserData', res)
				
						// console.log("getUserData:::", this.getUserData)
						// this.getUserOrder(this.walletAddr, 0, this.getUserData[5])
						// this.getUserRewardList(this.walletAddr, 0, this.getUserData[6])
					}
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getUserZy() {
				const result = this.zyToken.getTokenBalanceNew()
				result.then(res => {
					if (res.length) {
						console.log(res)
						this.$set(this, 'getUserDataZy', res)

						// console.log("getUserData:::", this.getUserData)
						// this.getUserOrder(this.walletAddr, 0, this.getUserData[5])
						// this.getUserRewardList(this.walletAddr, 0, this.getUserData[6])
					}
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getUserOrder(address, startIndex, endIndex) {
				const result = this.trcToken.getUserOrder(address, startIndex, endIndex)
				result.then(res => {
					console.log(res)
					if (res.length) {
						res.map(item => {
							console.log(item.toNumber())
						})
					}
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getReceivableBonus(address, startIndex, endIndex) {
				const result = this.trcToken.getReceivableBonus(address, startIndex, endIndex)
				result.then(res => {
					if (res.length) {
						res.map(item => {
							console.log(item.toNumber())
						})
					}
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getSysInfo() {
				const result = this.trcToken.getSysInfo()
				result.then(res => {
					console.log(res)
					if (res.length) {
						this.$set(this, 'getSysInfoData', res.map(item => {
							if (item !== 0) {
								item = item.toNumber()
							}
							return item
						}))
						console.log(this.getSysInfoData)
					}
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getSysEneInfo() {
				const result = this.zyEneToken.getSysInfo()
				result.then(res => {
					console.log(res)
					if (res.length) {
						this.$set(this, 'getSysEneInfoData', res.map(item => {
							if (item !== 0) {
								item = item.toNumber()
							}
							return item
						}))
						console.log(this.getSysEneInfoData)
					}
				}).catch(e => {
					uni.showToast({
						title: e.message || e.error,
						icon: 'none'
					})
				}).finally(() => {})
			},
			async getBalance() {
				const balance = await this.trcToken.getBalance()
				this.$set(this, 'balance', balance)
				console.log(balance,'hello')
			},
			async getEpBalance() {
				const balance = await this.epToken.getBalance()
				console.log(balance)
				this.$set(this, 'epBalance', balance)
			},
			async getEneBalance() {
				const balance = await this.eneToken.getTokenBalanceNew()
				this.$set(this, 'eneBalance', balance)
			},
			async getTokenBalance() {
				console.log(this.contractToken)
				const balance = await this.contractToken.getTokenBalance()
				this.$set(this, "tokenBalance", balance)
			},
			async getLpTokenBalance() {
				console.log(this.lpToken)
				const balance = await this.lpToken.getTokenBalanceNew()
				this.$set(this, "lpBalance", balance)
			},
			onTronWebMessage() {
				window.addEventListener('message', res => {
					// console.log(res)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		padding-bottom: 100rpx;
		padding-top: 130rpx;

		.headerWap {
			width: 750rpx;
			height: 120rpx;
			background: #3337A5;
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			justify-content: space-between;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 9;

			.headerLogo {
				width: 172rpx;
				height: 68rpx;
			}

			.rightWap {
				display: flex;
				align-items: center;

				.walText {
					width: 128rpx;
					height: 56rpx;
					background: rgba(255, 255, 255, 0.2);
					border-radius: 8rpx;
					text-align: center;
					line-height: 56rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #12F6F7;
				}

				.langWap {
					font-size: 24rpx;
					font-weight: 500;
					color: #FFFFFF;
					margin-left: 38rpx;

					image {
						width: 22rpx;
						height: 12rpx;
						margin-left: 9rpx;
					}
				}
			}
		}

		.wapSwiper {
			height: 300rpx;
			width: 690rpx;
			margin: 20rpx auto 0;

			.swiperMine {
				width: 100%;
				height: 100%;
			}
		}

		.dataInfo {
			width: 690rpx;
			background: #3337A5;
			border-radius: 12rpx;
			margin: 20rpx auto 0;
			overflow: hidden;

			.titleWap {
				width: 100%;
				height: 100rpx;
				background: #393EB9;
				display: flex;
				align-items: center;
				padding: 0 30rpx;
				justify-content: space-between;

				.leftText {
					font-size: 28rpx;
					font-weight: bold;
					color: #FFFFFF;
				}

				.rightText {
					font-size: 28rpx;
					font-family: Barlow Medium;
					font-weight: 400;
					color: #12F6F7;
					
					.tips {
						font-size: 20rpx;
						color: #FFFFFF;
					}
				}
			}

			.infoCol {
				display: flex;
				justify-content: space-between;
				width: 650rpx;
				margin: 0 auto;
				height: 90rpx;
				line-height: 90rpx;
				border-bottom: 2rpx solid rgba(255, 255, 255, 0.05);

				.infoLeft {
					font-size: 24rpx;
					font-weight: 500;
					color: #FFFFFF;

					.type {
						opacity: 0.5;
						margin-right: 20rpx;
					}
				}

				.infoRight {
					font-size: 24rpx;
					font-family: Barlow Medium;
					font-weight: 400;
					color: #FFFFFF;
				}

			}

			.infoCol3 {
				border-bottom: none;
			}
		}

		.addWap {
			width: 690rpx;
			height: 200rpx;
			background: #3337A5;
			border-radius: 10px;
			margin: 10rpx auto 0;

			.col1 {
				display: flex;
				height: 100rpx;
				align-items: center;
				padding: 0 20rpx;

				.text1 {
					font-size: 24rpx;
					font-weight: 500;
					color: #FFFFFF;
					opacity: 0.4;
					margin-right: 20rpx;
				}

				.text2 {
					font-size: 24rpx;
					font-weight: 400;
					color: #FFFFFF;
					margin-right: 20rpx;
				}

				image {
					width: 34rpx;
					height: 34rpx;
				}
			}
		}

		.wapImg {
			width: 690rpx;
			margin: 40rpx auto 0;
			display: flex;
			justify-content: space-between;

			view {
				padding: 25rpx 0 0 20rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: #FFFFFF;
			}

			.itemImg {
				width: 218rpx;
				height: 112rpx;
				background: url(../../static/image/centerImg1.png) no-repeat;
				background-size: cover;
			}

			.itemImg2 {
				width: 218rpx;
				height: 112rpx;
				background: url(../../static/image/centerImg2.png) no-repeat;
				background-size: cover;
			}

			.itemImg3 {
				width: 218rpx;
				height: 112rpx;
				background: url(../../static/image/centerImg2.png) no-repeat;
				background-size: cover;
			}
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

		.poolListWap {
			width: 690rpx;
			margin: 41rpx auto 0;

			.poolItem {
				width: 100%;
				// height: 360rpx;
				background-size: 100% 100%;
				padding: 30rpx 30rpx 0;
				margin-bottom: 23rpx;
				position: relative;
				border-radius: 10rpx;



				.poolType {
					font-size: 24rpx;
					color: #FFFFFF;
					margin-left: -30rpx;
					margin-right: -30rpx;
					background: rgba(26, 0, 132, 0.24);

					.infoCol {
						padding: 0 15px;
						height: 50rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
					}

					image {
						width: 36rpx;
						height: 36rpx;
					}
				}

				&.pool-a {
					background: url(../../static/image/a.png) no-repeat;
					background-size: 100% 100%;
				}

				&.pool-b {
					background: url(../../static/image/b.png) no-repeat;
					background-size: 100% 100%;
				}

				&.pool-c {
					background: url(../../static/image/c.png) no-repeat;
					background-size: 100% 100%;
				}

				.lenev {
					width: 100rpx;
					height: 36rpx;
					background: linear-gradient(90deg, #F6F366 0%, #FBD123 100%);
					border-radius: 18rpx 0px 0px 18rpx;
					position: absolute;
					top: 30rpx;
					right: 0;
					font-size: 22rpx;
					font-family: Barlow Medium;
					font-weight: 400;
					color: #A8680D;
					text-align: center;
					line-height: 36rpx;
				}

				.text1 {
					font-size: 30rpx;
					font-weight: bold;
					color: #12F6F7;
				}

				.text2 {
					font-size: 22rpx;
					font-weight: 500;
					color: #FFFFFF;
					opacity: 0.7;
					margin-top: 15rpx;
				}

				.btnGroup {
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.btn {
						padding: 8rpx 30rpx;
						display: inline-block;
						background: linear-gradient(90deg, #F6F366 0%, #FBD123 100%);
						border-radius: 8rpx;
						font-size: 22rpx;
						font-weight: bold;

						&:not(:last-child) {
							margin-right: 40rpx;
						}

						&.out {
							background: linear-gradient(90deg, #f66681 0%, #FBD123 100%);
						}
					}
				}

				.text3 {
					width: 90rpx;
					height: 40rpx;
					background: linear-gradient(90deg, #F6F366 0%, #FBD123 100%);
					border-radius: 8rpx;
					font-size: 22rpx;
					font-weight: bold;
					color: #A8680D;
					text-align: center;
					line-height: 40rpx;
					margin-top: 15rpx;
				}

				.grey {
					width: 120rpx;
					background: #333333;
					color: #FFFFFF;
					padding: 0 10rpx;
				}
			}
		}

		.myAddress {
			display: flex;
			height: 100rpx;
			align-items: center;
			width: 690rpx;
			margin: 20rpx auto 0;
			border-bottom: 2rpx solid rgba(255, 255, 255, 0.03);

			.lable {
				font-size: 24rpx;
				font-weight: 500;
				color: #FFFFFF;
				opacity: 0.4;
				margin-right: 14rpx;
			}

			.value {
				font-size: 24rpx;
				font-weight: 400;
				color: #FFFFFF;
				margin-right: 14rpx;
			}

			.copy {
				width: 34rpx;
				height: 34rpx;
			}
		}

		.myCol {
			width: 690rpx;
			display: flex;
			height: 100rpx;
			align-items: center;
			//padding: 0 30rpx;
			justify-content: space-between;
			border-bottom: 2rpx solid rgba(255, 255, 255, 0.03);
			margin: 0 auto;

			.textLeft {
				font-size: 24rpx;
				font-weight: 500;
				color: rgba(255, 255, 255, 0.4);

				text {
					font-size: 24rpx;
					font-family: Barlow Medium;
					font-weight: 400;
					color: #FFFFFF;
					margin-left: 20rpx;
				}
			}

			.textRight {
				font-size: 24rpx;
				font-weight: 500;
				color: #12F6F7;
			}
		}

		.daishouge {
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			opacity: 0.4;
			text-align: center;
			margin-top: 50rpx;
		}

		.daiQan {
			font-size: 32rpx;
			font-family: Barlow Medium;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			margin-top: 20rpx;
		}

		.sgBut {
			// width: 160rpx;
			// height: 60rpx;
			background: #5d63fd;
			border-radius: 8rpx;
			margin: 14rpx auto 0;
			padding: 0 30rpx;
			text-align: center;
			line-height: 60rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #12F6F7;
		}

		.warpPop {
			height: 100%;
			position: relative;

			.rect {
				width: 180rpx;
				height: 176rpx;
				background: #4F519E;
				border-radius: 12rpx;
				position: absolute;
				right: 30rpx;
				top: 95rpx;
				display: flex;
				flex-direction: column;

				view {
					flex: 1;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
		}

		.popWap {
			width: 630rpx;
			min-height: 420rpx;
			background: #4F519E;
			border-radius: 12rpx;
			padding-top: 40rpx;

			.title {
				font-size: 34rpx;
				font-weight: bold;
				color: #FFFFFF;
				text-align: center;
			}

			.textAdd {
				font-size: 28rpx;
				font-family: Barlow;
				font-weight: 400;
				color: #FFFFFF;
				opacity: 0.5;
				text-align: center;
				margin-top: 15rpx;
			}

			.textMy {
				padding: 0 30rpx;
				font-size: 34rpx;
				font-family: Barlow Medium;
				font-weight: 400;
				color: #FFFFFF;
				margin-top: 62rpx;
			}

			.text1Text {
				font-size: 28rpx;
				font-family: Barlow;
				font-weight: 400;
				color: #FFFFFF;
				opacity: 0.5;
				text-align: center;
				margin-right: 20rpx;
				margin-top: 19rpx;
			}

			.check {
				width: 480rpx;
				height: 80rpx;
				background: #313379;
				border-radius: 12rpx;
				margin: 100rpx auto 0;
				text-align: center;
				line-height: 80rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
			}

			.inpWap {
				width: 540rpx;
				margin: 0 auto;
				border-bottom: 2rpx solid rgba(255, 255, 255, 0.05);
				height: 80rpx;
				display: flex;
				align-items: center;
				margin-top: 70rpx;

				input {
					color: #FFFFFF;
					flex: 1;
				}

				text {
					font-size: 28rpx;
					font-family: Barlow Medium;
					font-weight: 400;
					color: #12F6F7;
				}

				.plClass {
					font-size: 28rpx;
					font-weight: 500;
					color: rgba(255, 255, 255, 0.3);
				}
			}

			.text1 {
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
				opacity: 0.5;
				text-align: center;
			}

			.text2 {
				font-size: 28rpx;
				font-family: Barlow;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
				margin-top: 10rpx;
			}

			.qanText {
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
				opacity: 0.5;
				text-align: center;
				margin-top: 30rpx;
			}

			.qanNum {
				font-size: 28rpx;
				font-family: Barlow;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
				margin-top: 10rpx;
			}

			.wapBut {
				padding: 0 80rpx;
				display: flex;
				justify-content: space-between;
				margin-top: 60rpx;

				.butLeft {
					width: 200rpx;
					height: 72rpx;
					background: rgba(255, 255, 255, 0.08);
					border-radius: 8rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #C9CAE5;
					text-align: center;
					line-height: 72rpx;
				}

				.comRight {
					width: 200rpx;
					height: 72rpx;
					background: rgba(255, 255, 255, 0.16);
					font-size: 28rpx;
					font-weight: bold;
					color: #12F6F7;
					border-radius: 8rpx;
					text-align: center;
					line-height: 72rpx;
				}
			}
		}

		.btnSubmit {
			padding: 0 30rpx;
			background: rgba(255, 255, 255, 0.16);
			font-size: 28rpx;
			font-weight: bold;
			color: #12F6F7;
			border-radius: 8rpx;
			text-align: center;
			line-height: 72rpx;
		}

		.popExit {
			color: #FFFFFF;
			padding-bottom: 50rpx;

			.flexWap {
				display: flex;
				justify-content: space-between;
			}

			.wapBut {
				display: flex;
				justify-content: center;
			}
		}

		.fr {
			float: right;
		}
	}
</style>
