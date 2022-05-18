<template>
	<view class="pageAll">
		<image class="bgImage" src="https://b2.kuibu.net/file/imgdisk/imgs/2022/04/3a38580a87bf78d3.png" mode="scaleToFill"></image>
		<view class="detail">
			<u-row :customStyle="custom">
				<u-col span="6"><view class="td">任务名称</view></u-col>
				<u-col span="2"><view class="td">积分</view></u-col>
				<u-col span="4"><view class="td">完成时间</view></u-col>
			</u-row>
			<scroll-view scroll-y="true" class="detail_list" ref="scroll" :style="scrollStyle">
				<u-row v-for="(item, index) in dataList" :key="item.id">
					<u-col span="6">
						<view class="th">{{ item.taskName }}</view>
					</u-col>
					<u-col span="2">
						<view class="th">{{ item.score }}</view>
					</u-col>
					<u-col span="4">
						<view class="th">{{ item.insertTime }}</view>
					</u-col>
				</u-row>
			</scroll-view>
		</view>
		<view class="home" @click="goHome">
			<image src="../../static/home.png" mode="scaleToFill"></image>
			返回首页
		</view>
	</view>
</template>

<script>
import db from '../js/db.js';
export default {
	data() {
		return {
			dataList: [],
			custom: `position:absolute;top:44px;width:100%;`,
			scrollStyle: `height:${wx.getSystemInfoSync().windowHeight - 44 - 30 - wx.getSystemInfoSync().statusBarHeight}px;top:75px`
		};
	},
	async onShow() {
		this.dataList = await db.getDeatils();
	},
	methods: {
		goHome() {
			wx.reLaunch({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style lang="scss">
.pageAll {
	.detail {
		position: absolute;
		width: 100%;
		height: 100%;
		.detail_list {
			position: absolute;
			top: 75px;
			left: 0;
			overflow: hidden;
			height: 85%;
		}
		.u-row {
			margin: 0 0 8px 0;
		}
		.wrap {
			padding: 12px;
		}
		.td,
		.th {
			height: 25px;
			text-align: center;
		}
		.u-col-2 {
			border-left: 1px solid #b7e5c8;
			border-right: 1px solid #b7e5c8;
		}
		.u-col-6 {
			.th {
				text-indent: 6px;
				text-align: left !important;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.u-col-4 {
			.th {
				font-size: 14px;
				color: #333;
			}
		}
		.td {
			letter-spacing: 2px;
			background-color: rgba($color: #75c89e, $alpha: 0.6);
		}
		.th {
			// background-color: rgba($color: #daf1dd, $alpha: 0.8);
		}
	}
}
</style>
