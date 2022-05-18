const db = wx.cloud.database({
	env: '环境id'
});
const _ = db.command;

// 积分余额查询
const getIntegral = function() {
	let value = 0
	return new Promise(function(resolve) {
		db.collection('database')
			.doc('jifen')
			.get({
				success: function(res) {
					value = res.data.value
					resolve(value)
				}
			});
	});
}
// 积分更新
const updateIntegral = function(num) {
	db.collection('database')
		.doc('jifen')
		.update({
			data: {
				"value": _.inc(num)
			},
			success: function(res) {}
		});
}

// 更新任务完成
const updateTakeList = function(key, value) {
	db.collection('database')
		.doc('renwu')
		.update({
			data: {
				[key]: _.push(value)
			},
			success: function(res) {}
		});
}
// 更新兑换成功
const updateSuList = function(result) {
	db.collection('database')
		.doc('duihuan')
		.update({
			data: {
				"success": _.push(result)
			},
			success: function(res) {

			}
		});
}

// 获取详细积分
const getDeatils = function() {
	let result = []
	return new Promise(function(resolve) {
		db.collection('database')
			.doc('xiangqing')
			.get({
				success: function(res) {
					result = res.data.data
					resolve(result)
				}
			});
	});
}

// 新增积分详情
const setDeatils = function(obj) {
	db.collection('database')
		.doc('xiangqing')
		.update({
			data: {
				data: _.unshift(obj)
			},
			success: function(res) {}
		});
}

// 获取打卡记录
const getDotList = function(obj) {
	let result = []
	return new Promise(function(resolve) {
		db.collection('database')
			.doc('daka')
			.get({
				success: function(res) {
					result = res.data.dotList
					resolve(result)
				}
			});
	});
}

// 新增打卡记录
const insertDotList = function(obj) {
	db.collection('database')
		.doc('daka')
		.update({
			data: {
				dotList: _.push(obj)
			},
			success: function(res) {}
		});
}

// 获取礼物列表
const getGifts = function(obj) {
	let result = []
	return new Promise(function(resolve) {
		db.collection('database')
			.doc('gifts')
			.get({
				success: function(res) {
					result = res.data.data
					resolve(result)
				}
			});
	});
}

// 设置礼物
const setGifts = function(obj) {
	db.collection('database')
		.doc('gifts')
		.update({
			data: {
				data: _.push(obj)
			},
			success: function(res) {}
		});

}
// 根据id获取礼物
const getGiftById = function(id) {
	let result = {}
	return new Promise(function(resolve) {
		db.collection('database')
			.doc('gifts')
			.get({
				success: function(res) {
					res.data.data.filter((item) => {
						if (item.id === id) {
							result = item
						}
					})
					resolve(result)
				}
			});
	})
}

// 获取最大的id
const getGiftMaxId = function(id) {
	let result = 0
	return new Promise(function(resolve) {
		db.collection('database')
			.doc('gifts')
			.get({
				success: function(res) {
					res.data.data.filter((item) => {
						if (item.id > result) {
							result = item.id
						}
					})
					result = parseInt(result) + 1
					resolve(result)
				}
			});
	})
}
// 根据id修改gift status
const setGiftsById = function(id) {
	db.collection('database').where({
		'_id': 'gifts',
		'data.id': id
	}).update({
		data: {
			'data.$.status': 0,
		}
	})
}


// 获取任务列表
const getTasks = function(obj) {
	let result = []
	return new Promise(function(resolve) {
		db.collection('database')
			.doc('tasks')
			.get({
				success: function(res) {
					result = res.data.data
					resolve(result)
				}
			});
	});
}

// 设置任务
const setTasks = function(obj) {
	db.collection('database')
		.doc('tasks')
		.update({
			data: {
				data: _.push(obj)
			},
			success: function(res) {}
		});

}
// 根据id获取任务
const getTaskById = function(id) {
	let result = {}
	return new Promise(function(resolve) {
		db.collection('database')
			.doc('tasks')
			.get({
				success: function(res) {
					res.data.data.filter((item) => {
						if (item.id === id) {
							result = item
						}
					})
					resolve(result)
				}
			});
	})
}

// 获取最大的id
const getTaskMaxId = function(id) {
	let result = 0
	return new Promise(function(resolve) {
		db.collection('database')
			.doc('tasks')
			.get({
				success: function(res) {
					res.data.data.filter((item) => {
						if (item.id > result) {
							result = item.id
						}
					})
					result = parseInt(result) + 1
					resolve(result)
				}
			});
	})
}
// 根据id修改status
const setTasksById = function(id) {
	db.collection('database').where({
		'_id': 'tasks',
		'data.id': id
	}).update({
		data: {
			'data.$.status': 0,
		}
	})
}
// 新增抽奖记录
const setLucky = function(obj) {
	db.collection('database')
		.doc('lucky')
		.update({
			data: {
				data: _.push(obj)
			},
			success: function(res) {}
		});
}
export default {
	getIntegral,
	updateIntegral,
	updateTakeList,
	updateSuList,
	getDeatils,
	setDeatils,
	getDotList,
	insertDotList,
	getGifts,
	setGifts,
	getGiftById,
	setGiftsById,
	getGiftMaxId,
	getTasks,
	setTasks,
	getTaskById,
	setTasksById,
	getTaskMaxId,
	setLucky
}
