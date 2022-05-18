<template>
	<view class="pageAll">
		<view class="add_gift">
			<text class="gtext">礼物名字</text>
			<u--input placeholder="请输入礼物名字" border="surround" v-model="value1"></u--input>
			<text class="gtext">礼物价值</text>
			<u--input placeholder="请输入礼物价值" type="number" border="surround" v-model="value2"></u--input>
			<text class="gtext">选择图片</text>
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :maxCount="1"></u-upload>
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
			fileList1: [],
			value1: '',
			value2: 0,
			value3: '',
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
					message: '礼物名不能空着！',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/warning.png'
				},
				{
					type: 'warning',
					message: '礼物价值不能空着！',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/warning.png'
				},
				{
					type: 'warning',
					message: '还没选图片呢！',
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
		deletePic(event) {
			this[`fileList${event.name}`].splice(event.index, 1);
		},
		afterRead(event) {
			const _this = this;
			let lists = [].concat(event.file);
			let fileListLen = this[`fileList${event.name}`].length;
			lists.map(item => {
				this[`fileList${event.name}`].push({
					...item,
					status: 'success',
					message: ''
				});
			});
			wx.cloud.uploadFile({
				cloudPath: `img/${new Date().getTime()}.png`,
				filePath: event.file.url,
				success: res => {
					_this.value3 = res.fileID;
				}
			});
		},
		async submit() {
			const newId = await db.getGiftMaxId();
			if (!this.value1) {
				this.$refs.uToast.show(this.toast[2]);
				return;
			}
			if (!this.value2) {
				this.$refs.uToast.show(this.toast[3]);
				return;
			}
			if (!this.value3) {
				this.$refs.uToast.show(this.toast[4]);
				return;
			}
			let obj = {
				id: newId,
				status: 2,
				score: parseInt(this.value2),
				message: this.value1,
				pic: this.value3
			};
			db.setGifts(obj);
			this.$refs.uToast.show(this.toast[0]);
			this.fileList1 = [];
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
