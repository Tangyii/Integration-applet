<template>
	<view class="pageAll">
		<view class="text-area">
			<view class="countTime">
				<image class="c_image" src="https://b2.kuibu.net/file/imgdisk/imgs/2022/04/aafbe8b849504d6b.png" mode="aspectFit"></image>
				<text class="c_text">文字在这改 时间在下面</text>
				<text class="c_time">
					<text class="c_day b">{{ countTimed }}</text>
					天
					<text class="c_hou b">{{ countTimeh }}</text>
					时
					<text class="c_min b">{{ countTimem }}</text>
					分
					<text class="c_sec b">{{ countTimes }}</text>
					秒
				</text>
			</view>
			<text class="title">{{ title }}</text>
			<text class="title">当前积分余额 : {{ integral }}</text>
			<text @click="toDetails">查看积分记录</text>
			<text @click="toAddGift">新增礼物</text>
			<text @click="toAddTask">新增任务</text>
			<text @click="toLucky">抽奖</text>
		</view>
	</view>
</template>

<script>
import db from '../js/db.js';
export default {
	data() {
		return {
			alertShow: false,
			countTimed: '00',
			countTimeh: '00',
			countTimem: '00',
			countTimes: '00',
			title: '欢迎使用积分商城',
			integral: 0,
		};
	},
	async onShow() {
		this.integral = await db.getIntegral();
		this.checkDay();
		this.countDown();
	},
	methods: {
		toDetails() {
			wx.navigateTo({
				url: '/pages/index/details'
			});
		},
		toLucky() {
			wx.navigateTo({
				url: '/pages/index/lucky'
			});
		},
		toAddTask() {
			wx.navigateTo({
				url: '/pages/index/addtasks'
			});
		},
		toAddGift() {
			wx.navigateTo({
				url: '/pages/index/addgifts'
			});
		},
		// 每日刷新
		checkDay() {
			let oldDay = wx.getStorageSync('dayTime');
			let newDay = parseInt(new Date().getDate());
			if (newDay == oldDay) {
				return;
			}
			wx.removeStorageSync('list');
			wx.setStorageSync('dayTime', newDay);
			wx.setStorageSync('dotList', false);
		},
		// 倒计时
		countDown() {
			const _this = this;
			let date1 = new Date().getTime();
			// 时间改下面这行---------------------------------------------
			let date2 = new Date('2022-12-24 00:00:00').getTime();
			let lastTime = (date2 - date1) / 1000;
			let d, h, m, s;
			setInterval(function() {
				lastTime--;
				d = parseInt(lastTime / (24 * 3600));
				h = parseInt((lastTime / 60 / 60) % 24);
				m = parseInt((lastTime / 60) % 60);
				s = parseInt(lastTime % 60);
				_this.countTimed = d;
				_this.countTimeh = h;
				_this.countTimem = m;
				_this.countTimes = s < 10 ? '0' + s : s;
			}, 1000);
		}
	}
};
</script>

<style lang="scss">
.wrap {
	width: 100%;
	height: 300px;
}
.pageAll {
	background-image: 'https://b2.kuibu.net/file/imgdisk/imgs/2022/03/0fd3ff94cf26ccf8.png';
	.u-notice-bar {
		position: absolute;
		top: 44px;
		width: 100%;
	}
	.text-area {
		position: absolute;
		top: 5%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
		height: 100%;
		padding-top: 10px;
		.countTime {
			width: 100%;
			.c_image,
			.c_text,
			.c_time {
				display: block;
				width: 100%;
				margin: 2px 0;
			}
			.c_text {
				padding: 10px 0;
				letter-spacing: 11px;
				font-size: 22px;
				text-align: center;
				color: #0f0e1e;
			}
			.c_time {
				line-height: 26px;
				padding: 6px 0;
				letter-spacing: 8px;
				font-size: 22px;
				text-align: center;
				color: #0f0e1e;
				vertical-align: middle;
				.b {
					font-size: 28px;
					font-weight: 600;
				}
				.c_day {
					background: linear-gradient(to right, #fbc203, #ffa656);
					-webkit-background-clip: text;
					color: transparent;
				}
				.c_hou {
					background: linear-gradient(to right, #8f62fb, #716bff);
					-webkit-background-clip: text;
					color: transparent;
				}
				.c_min {
					background: linear-gradient(to right, #2fccef, #32a3ff);
					-webkit-background-clip: text;
					color: transparent;
				}
				.c_sec {
					background: linear-gradient(to right, #37fdad, #2ed7d0);
					-webkit-background-clip: text;
					color: transparent;
				}
			}
		}

		.u-fade-enter-active {
			width: 100%;
			position: absolute;
		}
		.calendar {
			width: 100%;
		}
		.title {
			display: block;
			margin: 5px 0;
			width: 100%;
			text-align: center;
			font-size: 20px;
			color: #8f8f94;
		}
	}
}

.u-popup__content {
	top: -30px !important;
}
</style>
