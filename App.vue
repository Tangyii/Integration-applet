<script>
export default {
	onLaunch: function() {
		// 连接云数据库      !!!本行不要反注释
		wx.cloud.init({
			env: '环境ID',
			traceUser: true
		});
		
		// 验证版本更新      !!!本行不要反注释
		if (wx.canIUse('getUpdateManager')) {
			const updateManager = wx.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				console.log('onCheckForUpdate====', res);
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					console.log('res.hasUpdate====');
					updateManager.onUpdateReady(function() {
						wx.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success: function(res) {
								console.log('success====', res);
								// res: {errMsg: "showModal: ok", cancel: false, confirm: true}
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
					updateManager.onUpdateFailed(function() {
						// 新的版本下载失败
						wx.showModal({
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开~'
						});
					});
				}
			});
		}
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {}
};
</script>

<style lang="scss">
@import '@/uni_modules/uview-ui/index.scss';
html,
body {
	box-sizing: border-box;
	height: 100%;
}
.bgImage {
	position: fixed;
	top: 0;
	left: 0;
	z-index: -999;
	width: 100%;
	height: 100%;
}
.home {
	box-sizing: border-box;
	position: fixed;
	bottom: 90px;
	right: -80px;
	width: 160px;
	height: 80px;
	background-color: rgba($color: #999, $alpha: 0.3);
	border-radius: 100px;
	padding: 10px 0 0 25px;
	font-size: 12px;
	image {
		display: block;
		width: 40px;
		height: 40px;
		margin: 0 0 5px 5px;
	}
}
</style>
