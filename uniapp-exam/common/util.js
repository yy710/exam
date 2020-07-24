function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}
var dateUtils = {
  UNITS: {
    '年': 31557600000,
    '月': 2629800000,
    '天': 86400000,
    '小时': 3600000,
    '分钟': 60000,
    '秒': 1000
  },
  humanize: function(milliseconds) {
    var humanize = '';
    for (var key in this.UNITS) {
      if (milliseconds >= this.UNITS[key]) {
        humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
        break;
      }
    }
    return humanize || '刚刚';
  },
  format: function(dateStr) {
    var date = this.parse(dateStr)
    var diff = Date.now() - date.getTime();
    if (diff < this.UNITS['天']) {
      return this.humanize(diff);
    }
    var _format = function(number) {
      return (number < 10 ? ('0' + number) : number);
    };
    return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
      _format(date.getHours()) + ':' + _format(date.getMinutes());
  },
  parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/);
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
  }
};

function request(action, data = {}, method = "GET", header = {}) {
  const url = 'http://www.all2key.cn/race/api/' + action;
  const sid = getSid();
  const userName = getUser('user').userName;
  
  return new Promise(function(resolve, reject) {
    uni.request({
      url,
      data: { sid, userName, ...data },
      header,
      method,
      success: res => resolve(res.data),
      fail: reject
    });
  });
}

function getUser(key) {
  let ret = uni.getStorageSync(key);
  if (!ret) ret = '{}';
  return JSON.parse(ret);
}

function getSid(){
    return getUser('user').sid || uni.getStorageSync('sid');
  }

function log(title) {
  return function(r) {
    console.log(title, r);
    return Promise.resolve(r);
  };
}

function checkInput(input){
  /**
   * 客户端对账号信息进行一些必要的校验。
   * 实际开发中，根据业务需要进行处理，这里仅做示例。
   */
  if (input.account.length < 5) {
  	uni.showToast({
  		icon: 'none',
  		title: '账号最短为 5 个字符'
  	});
  	return;
  }
  if (input.password.length < 6) {
  	uni.showToast({
  		icon: 'none',
  		title: '密码最短为 6 个字符'
  	});
  	return;
  }
  if (input.email.length < 3 || !~input.email.indexOf('@')) {
  	uni.showToast({
  		icon: 'none',
  		title: '邮箱地址不合法'
  	});
  	return;
  }
}

function errmsg2modal(res){
  uni.showModal({
    content: res.errmsg,
    showCancel: false,
    success: () => {}
  });
  return Promise.resolve(res);
}

module.exports = {
  formatTime,
  formatLocation,
  dateUtils,
  request,
  log,
  errmsg2modal,
  getUser
};
