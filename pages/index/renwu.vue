<template>
	<view class="pageAll">
		<view class="calend"><zzx-calendar :dotList="dotList"></zzx-calendar></view>
		<scroll-view scroll-y="true" class="listBox">
			<button class="daka" type="default" @click="dataDk">每日打卡</button>
			<view class="forList" v-for="(item, index) in taskList" :key="item.id">
				<view class="task_message">
					<text class="spic">{{ item.spic }}</text>
					<u-tooltip :text="`${item.task}`" @click="click(item.id)"></u-tooltip>
				</view>
				<view class="task_submit">
					<u-tag v-if="item.status === 0" text="完成" @click="submit(item.id)" type="success" plain plainFill></u-tag>
					<u-tag v-if="item.status === 1" text="已完成" type="warning" plain plainFill></u-tag>
				</view>
			</view>
		</scroll-view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import db from '../js/db.js';
import zzxCalendar from '../components/zzx-calendar/zzx-calendar.vue';

export default {
	components: {
		zzxCalendar
	},
	data() {
		return {
			toast: [
				{
					type: 'success',
					message: '兑换成功',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				},
				{
					type: 'error',
					message: '每天只能完成6个任务哦！！',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
				},
				{
					type: 'error',
					message: '今天已经打过卡了！',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
				},
				{
					type: 'success',
					message: '打卡成功',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				}
			],
			dotList: [],
			alertShow: false,
			integral: 0,
			taskList: [],
			taskListLength: 1,
			numList: [],
			taskListAll: []
		};
	},
	async onShow() {
		this.taskListAll = await db.getTasks();
		this.dotList = await db.getDotList();

		this.taskListLength = this.taskListAll.length;
		if (wx.getStorageSync('list').length === 6) {
			this.taskList = wx.getStorageSync('list');
			this.numList = wx.getStorageSync('num');
		} else {
			for (let i = 0; i < 6; i++) {
				let obj = this.taskListAll[this.getRandom()];
				this.taskList.push(obj);
			}
		}
	},
	watch: {
		taskList(val) {
			wx.setStorageSync('list', this.taskList);
		},
		numList() {
			wx.setStorageSync('num', this.numList);
		}
	},
	methods: {
		dataDk() {
			const _this = this;
			if (wx.getStorageSync('dotList') === false) {
				let d = new Date();
				let m = d.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				let da = d.getDate();
				da = da < 10 ? '0' + da : da;
				let obj = { date: `${d.getFullYear()}-${m}-${da}` };
				let num = parseInt(Math.floor(Math.random() * 20) + 10);
				let obj1 = {
					taskName: '每日打卡',
					insertTime: this.getNowTime(),
					score: '+' + num
				};
				this.toast[3].message = `打卡成功 获得积分 ${num}`;
				this.$refs.uToast.show(this.toast[3]);
				wx.setStorageSync('dotList', true);
				db.insertDotList(obj);
				this.dotList.push(obj);
				db.updateIntegral(num);
				db.setDeatils(obj1);
			} else {
				this.$refs.uToast.show(this.toast[2]);
			}
		},
		getRandom() {
			if (this.numList.length == this.taskListLength) {
				return -1;
			}
			let num = Math.floor(Math.random() * this.taskListLength);
			while (this.numList.indexOf(num) !== -1) {
				num = Math.floor(Math.random() * this.taskListLength);
			}
			this.numList.push(num);
			return num;
		},
		// 删除任务
		click(id) {
			let index = null;
			this.taskList.filter(function(val, ind) {
				if (val.id === id) {
					index = ind;
				}
			});
			this.taskList.splice(index, 1);
			let n = this.getRandom();
			if (n > 0) {
				this.taskList.push(this.taskListAll[n]);
			} else {
				console.log('本次没放');
			}
		},
		async submit(id) {
			let index = null;
			let cloudValue = '';
			this.taskList.filter(function(val, ind) {
				if (val.id === id) {
					index = ind;
					cloudValue = val.task;
				}
			});
			if (this.taskList[index].status === 1) {
				return;
			} else if (i === 0) {
				this.$refs.uToast.show(this.toast[1]);
				return;
			} else {
				let cloudKey = wx.getStorageSync('dayTime');
				db.updateTakeList(cloudKey, cloudValue);
				this.taskList[index].status = 1;
				db.updateIntegral(this.taskList[index].score);
				wx.setStorageSync('list', this.taskList);
				let obj = {
					taskName: this.taskList[index].task,
					insertTime: this.getNowTime(),
					score: '+' + this.taskList[index].score
				};
				db.setDeatils(obj);
			}
		}
	}
};
</script>

<style lang="scss">
.u-tooltip__wrapper__text {
	font-family: Consolas;
	color: #606266;
	font-size: 15px !important;
	font-weight: 600;
	letter-spacing: 3px;
}
.pageAll {
	display: flex;
	flex-direction: column;
	background-image: linear-gradient(#8cc6d3 80%, #ebf2f8 20%);
	border-radius: 30px;
}
.cell-hover-class {
	opacity: 0.5;
}
.listBox {
	box-sizing: border-box;
	height: 100%;
	width: 100%;
	background-color: #ebf2f8;
	border-radius: 30px;
	padding-top: 30px;
	.daka {
		width: 90%;
		border-radius: 30px;
		background-color: #e1ecee;
		color: #5b797e;
		border: 1px solid #5b797e;
	}
}
.forList {
	margin: 10px auto;
	display: flex;
	align-items: center;
	border: 1px solid #e3eef0;
	width: 90%;
	height: 80px;
	background-color: #ffffff;
	border-radius: 20px;
	box-shadow: 0px 0px 12px #eee;
	padding-left: 10px;
	.task_message {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		width: 80%;
		word-wrap: break-word;
		.u-toolbar {
			width: 100%;
		}
		.spic {
			font-size: 12px;
			letter-spacing: 3px;
			color: #ff6633;
		}
	}
	.task_submit {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 61px;
	}
}
.u-tooltip__wrapper__text {
	font-size: 16px !important;
}
.u-button.data-v-2bf0e569 {
	display: none !important;
	width: 80% !important;
	position: relative;
	top: 130px;
}
.u-demo-block__content {
	padding-top: 10px;
}
</style>
