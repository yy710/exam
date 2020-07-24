// 管理账号信息
const { request, log, getUser } = require('@/common/util.js');
const USER_KEY = "user";

function login(userName = getUser(USER_KEY).userName, pwd = '') {
  return request('login', { userName, pwd })
    .then(log('login: '))
    .then(res => {
      if (res.errcode) return Promise.reject(res);
      uni.setStorageSync(USER_KEY, JSON.stringify(res.content));
      return res.content;
    }).catch(log("login error: "));
}

function addUser(user, key = USER_KEY) {
  return request('add-user', user)
    .then(log("add-user: "))
    .then(res => {
      if (res.errcode) return Promise.reject(res);
      uni.setStorageSync(key, JSON.stringify(res.content));
      return res.content;
    })
    .catch(log("add-user error: "));
}

function chenckLogin(page){
  console.log(page.hasLogin);
  if (!page.hasLogin) {
  	uni.showModal({
  		title: '未登录',
  		content: '您未登录，需要登录后才能继续',
  	  // 如果需要强制登录，不显示取消按钮
  		showCancel: !page.forcedLogin,
      // 如果需要强制登录，使用reLaunch方式
  		success: res => { if (res.confirm) this.forcedLogin ? uni.reLaunch({ url: '../login/login' }) : uni.navigateTo({ url: '../login/login' }); }
  	});
  }
}

export default {
  addUser,
  login,
  chenckLogin
}
