<template>
	<view class="pageAll">
		<view class="add_gift">
			<text class="gtext">任务描述</text>
			<u--input placeholder="请输入任务描述" border="surround" v-model="value1"></u--input>
			<text class="gtext">对应分值</text>
			<u--input placeholder="请输入对应分值" type="number" border="surround" v-model="value2"></u--input>
			<button style="width: 100%;color: #fff;" class="gtext" type="primary" @click="submit">提交</button>
		</view>
		<view class="home" @click="goHome">
			<image src="../../static/home.png" mode="scaleToFill"></image>
			返回首页
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import db from '../js/db.js';

export default {
	data() {
		return {
			value1: '',
			value2: 0,
			toast: [
				{
					type: 'success',
					message: '添加成功!',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				},
				{
					type: 'error',
					message: '添加失败!',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
				},
				{
					type: 'warning',
					message: '任务描述不能空着！',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/warning.png'
				},
				{
					type: 'warning',
					message: '任务分值不能空着！',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/warning.png'
				}
			]
		};
	},
	async onShow() {
	},
	methods: {
		goHome() {
			wx.reLaunch({
				url: '/pages/index/index'
			});
		},
		async submit() {
			if (!this.value1) {
				this.$refs.uToast.show(this.toast[2]);
				return;
			}
			if (!this.value2) {
				this.$refs.uToast.show(this.toast[3]);
				return;
			}
			const newId = await db.getTaskMaxId();
			let obj = {
				id: newId,
				status: 0,
				score: parseInt(this.value2),
				task: this.value1
			};
			db.setTasks(obj);
			this.$refs.uToast.show(this.toast[0]);
			this.value1 = '';
			this.value2 = 0;
		}
	}
};
</script>

<style lang="scss">
.add_gift {
	.gtext {
		display: inline-block;
		margin: 22px 0 6px;
		color: #666;
	}
	margin: 0 auto;
	box-sizing: border-box;
	width: 90%;
	height: 100%;
	padding-top: 44px;
}
</style>
