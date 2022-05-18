<template>
	<view>
		<image class="bgImage" src="https://b2.kuibu.net/file/imgdisk/imgs/2022/04/035f9d9f216b768c.jpeg" mode="scaleToFill"></image>
		<view class="l_title">幸运大抽奖</view>
		<view class="res">
			恭喜获得
			<br />
			{{ prize }}
		</view>
		<view class="r_button" @click="goback()">返回</view>
	</view>
</template>

<script>
import db from '../js/db.js';
export default {
	data() {
		return {
			prize: ''
		};
	},
	onLoad(options) {
		this.prize = options.prize;
		let obj = {
			prize: options.prize,
			insertTime: this.getNowTime()
		};
		db.setLucky(obj);
	},
	methods: {
		goback() {
			wx.redirectTo({
				url: '/pages/index/lucky'
			});
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
.res {
	width: 100%;
	text-align: center;
	font-size: 40px;
	position: absolute;
	bottom: 200px;
	left: 50%;
	transform: translateX(-50%);
	z-index: -1;
}
.r_button {
	position: absolute;
	bottom: 100px;
	left: 50%;
	transform: translateX(-50%);
	text-align: center;
	width: 138px;
	background-color: #fff;
	height: 70px;
	font-size: 32px;
	line-height: 70px;
	border-radius: 20px;
	margin-top: 20px;
}
</style>
