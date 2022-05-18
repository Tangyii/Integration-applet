<template>
	<view class="pageAll">
		<view class="listBox">
			<view v-for="item in taskList" :key="item.id" :class="[item.score <= 10 ? 's' : item.score <= 20 ? 'ss' : 'sss', 'forList']">
				<view class="task_message">
					<text class="left">{{ item.task }}</text>
					<text class="right">积分 {{ item.score }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	data() {
		return {
			taskList: []
		};
	},
	onShow() {
		this.taskList = wx.getStorageSync('list');
	},
	methods: {}
};
</script>

<style lang="scss">
.listBox {
	padding-top: 44px;
	.s {
		background: linear-gradient(to right bottom, #fff 40%, #fddfef);
		border: 1px solid #feb1da;
	}
	.ss {
		background: linear-gradient(to right bottom, #fff 40%, #ffeee8);
		border: 1px solid #ffcab7;
	}
	.sss {
		background: linear-gradient(to right bottom, #fff 40%, #d9daff);
		border: 1px solid #acafff;
	}
	.forList {
		margin: 12px auto;
		display: flex;
		align-items: center;
		width: 85%;
		height: 74px;
		border-radius: 10px;
		box-sizing: border-box;
		padding: 5px 0;
		.task_message {
			position: relative;
			display: flex;
			flex-direction: column;
			height: 100%;
			margin: 0 16px;
			width: 100%;
			.left,
			.right {
				position: absolute;
				display: inline-block;
				width: 100%;
			}
			.left {
				box-sizing: border-box;
				margin: 6px 0;
				color: #000;
				font-size: 17px;
				letter-spacing: 3px;
			}
			.right {
				text-align: right;
				font-size: 20px;
				bottom: 0;
			}
		}
	}
}
.backimage {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
