<template>
	<view class="pageAll duihuan">
		<scroll-view scroll-y="true" class="giftList" :style="height">
			<view class="giftOnce" v-for="(item, index) in giftList" :key="item.id">
				<view class="giftInfo">
					<image class="pic" :src="`${item.pic}`" mode="aspectFit"></image>
					<text class="textm">{{ item.message }}</text>
					<text class="textm">{{ item.score }} 积分</text>
					<button :class="[item.status == 0 ? 'getted' : '', 'button']" @click="exchange(item.id, item.status)"><text class="text">立即兑换</text></button>
				</view>
			</view>
		</scroll-view>
		<u-modal :show="modalShow" :title="title" :content="content" showCancelButton="true" @confirm="confirm" @cancel="cancel"></u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import db from '../js/db.js';
export default {
	data() {
		return {
			height:`height:${wx.getSystemInfoSync().windowHeight - 44 - wx.getSystemInfoSync().statusBarHeight}px`,
			giftList: [
			],
			modalShow: false,
			status:0,
			title: '请确认',
			content: '确认兑换',
			score: 0,
			integral: 0,
			toast: [
				{
					type: 'success',
					message: '兑换成功',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				},
				{
					type: 'error',
					message: '积分不足，兑换失败',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
				},
				{
					type: 'warning',
					message: '已经兑换过啦！',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/warning.png'
				}
			]
		};
	},
	async onShow() {
		this.giftList = await db.getGifts();
	},
	methods: {
		async confirm() {
			this.modalShow = false;
			let dhm = this.getRandom();
			let result = '已成功兑换:' + wx.getStorageSync('success') + '兑换码是:' + dhm;
			this.toast[0].message = result;
			this.$refs.uToast.show(this.toast[0]);
			db.updateIntegral(-this.score);
			db.updateSuList(result);
			let obj1 = {
				taskName: '兑换' + wx.getStorageSync('success'),
				insertTime: this.getNowTime(),
				score: '-' + this.score
			};
			db.setDeatils(obj1);
			setTimeout(async () =>{
				this.giftList = await db.getGifts();
			},300)
		},
		cancel() {
			this.modalShow = false;
		},
		async exchange(id, status) {
			if (status == 0) {
				this.$refs.uToast.show(this.toast[2]);
				return;
			}
			let result = {}
			this.giftList.filter((item) =>{
				if(item.id === id){
					result = item
				}
			})
			this.score = result.score;
			this.integral = await db.getIntegral();
			if (this.integral >= this.score) {
				this.status = status
				this.content = ' 确认兑换 ' + result.message + ' 兑换成功后请凭借 兑换截图 和 兑换码 找我实现哦！！！';
				this.modalShow = true;
				wx.setStorageSync('success', result.message);
			} else {
				this.$refs.uToast.show(this.toast[1]);
			}
		},
		getRandom() {
			let chars = '0123456789';
			let maxPos = chars.length;
			let code = '';
			for (let i = 0; i < 6; i++) {
				code += chars.charAt(Math.floor(Math.random() * maxPos));
			}
			return code;
		},
	}
};
</script>

<style lang="scss">
.duihuan {
	.giftList {
		background: linear-gradient(to bottom, #fe6033, #fdc77f 20%);
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding-top: 44px;
		height: 100%;
		// box-sizing: border-box;
		.giftOnce {
			width: 50%;
			height: 240px;
			display: inline-block;
			width: 50%;
			.giftInfo {
				padding-top: 10px;
				background-color: #fff;
				box-sizing: border-box;
				border-radius: 8px;
				margin: 10px;
				display: flex;
				height: 220px;
				flex-direction: column;
				// justify-content: center;
				align-items: center;
				.textm {
					display: block;
					margin: 3px 0;
				}
				.pic {
					width: 80%;
					height: 200rpx;
				}
				.getted {
					background-color: #999 !important;
				}
				.button {
					margin-top: 10px;
					position: relative;
					background-color: #fd6601;
					width: 65%;
					height: 36px;
					border-radius: 25px;
					font-size: 16px;
					color: #fff;
					.text {
						width: 100%;
						position: absolute;
						top: -3px;
						left: 50%;
						transform: translateX(-50%);
					}
				}
			}
		}
	}
}
</style>
