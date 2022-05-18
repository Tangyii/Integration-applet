<template>
	<view>
		<image class="bgImage" src="https://b2.kuibu.net/file/imgdisk/imgs/2022/04/035f9d9f216b768c.jpeg" mode="scaleToFill"></image>
		<view class="l_title">幸运大抽奖</view>
		<view class="zhuanpan">
			<LuckyWheel
				ref="myLucky"
				width="600rpx"
				height="600rpx"
				:blocks="blocks"
				:prizes="prizes"
				:buttons="buttons"
				:defaultStyle="defaultStyle"
				@start="startCallBack"
				@end="endCallBack"
			/>
		</view>
	</view>
</template>

<script>
import LuckyWheel from '../components/lucky/components/@lucky-canvas/uni/lucky-wheel.vue'; // 大转盘
import db from '../js/db.js';
export default {
	components: { LuckyWheel },
	data() {
		return {
			blocks: [
				{
					padding: '20px',
					imgs: [
						{
							src: 'https://cdn.jsdelivr.net/gh/buuing/cdn/demo/wheel-border.jpg',
							width: '100%',
							height: '100%'
						}
					]
				},
				{
					imgs: [
						{
							src: 'https://cdn.jsdelivr.net/gh/buuing/cdn/demo/wheel-bg.png',
							width: '100%',
							height: '100%'
						}
					]
				}
			],
			prizes: [
				{
					range: 3,
					fonts: [{ text: '礼物0', top: '10%', lineClamp: 1 }],
					background: '#765AF0',
					imgs: [
						{
							src: 'https://cdn.jsdelivr.net/gh/buuing/cdn/demo/prize.png',
							width: '30%',
							top: '40%'
						}
					]
				},
				{
					range: 5,
					fonts: [{ text: '礼物1', top: '10%', lineClamp: 1 }],
					background: '',
					imgs: [
						{
							src: 'https://cdn.jsdelivr.net/gh/buuing/cdn/demo/prize.png',
							width: '30%',
							top: '40%'
						}
					]
				},
				{ range: 7, fonts: [{ text: '礼物2', top: '10%', lineClamp: 1 }], background: '#765AF0' },
				{ range: 10, fonts: [{ text: '礼物3', top: '10%', lineClamp: 1 }], background: '' },
				{ range: 35, fonts: [{ text: '礼物4', top: '10%', lineClamp: 1 }], background: '#765AF0' },
				{ range: 40, fonts: [{ text: '礼物5', top: '10%', lineClamp: 1 }], background: '' }
			],
			buttons: [
				{ radius: '35%', background: '#617df2' },
				{ radius: '30%', background: '#afc8ff' },
				{
					radius: '25%',
					background: '#FB652D',
					pointer: true,
					fonts: [{ text: '开始\n抽奖', top: '-20px' }]
				}
			]
		};
	},
	methods: {
		async startCallBack() {
			let integral = await db.getIntegral();
			if (integral >= 20) {
				let obj = {
					taskName: '幸运大转盘',
					insertTime: this.getNowTime(),
					score: -20
				};
				db.updateIntegral(-20);
				db.setDeatils(obj);
				this.$refs.myLucky.play();
				setTimeout(() => {
					this.$refs.myLucky.stop();
				}, 3000);
			}
		},
		endCallBack(prize) {
			setTimeout(() => {
				wx.redirectTo({
					url: `/pages/index/re?prize=${prize.fonts[0].text}`
				});
			}, 100);
		}
	}
};
</script>

<style lang="scss">
.l_title {
	margin-top: 30px;
	width: 100%;
	text-align: center;
	letter-spacing: 5px;
	font-size: 60px;
	color: #fff;
	font-weight: 800;
	text-shadow: #000 4px 0 0, #000 0 2px 0, #000 -1px 0 0, #000 0 -1px 0;
}
.zhuanpan {
	position: absolute;
	bottom: 100px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
