export default {
	onShareAppMessage(res) {
		return {
			path: '/pages/index/index',
			title: '分享',
			// imageUrl: 'https://',
		}
	},
	onShareTimeline() {
		undefined
		return {
			path: '/pages/index/index',
			title: '分享',
			// imageUrl: 'https://',
		}
	},
}
