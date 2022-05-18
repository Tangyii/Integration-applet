import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import share from '@/pages/js/share.js'
Vue.mixin(share)
Vue.use(uView)
Vue.config.productionTip = false
Vue.prototype.getNowTime = function() {
	let d = new Date();
	let m = d.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	let da = d.getDate();
	da = da < 10 ? '0' + da : da;
	let h = d.getHours();
	h = h < 10 ? '0' + h : h;
	let minute = d.getMinutes();
	minute = minute < 10 ? '0' + minute : minute;
	let second = d.getSeconds();
	second = second < 10 ? '0' + second : second;
	return m + '-' + da + ' ' + h + ':' + minute + ':' + second;
}

App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
