import Vue from 'vue'
import Vuex from 'vuex'
const { getUser, request, log } = require('@/common/util.js');
// import service from '@/service.js';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 是否需要强制登录
    forcedLogin: false,
    hasLogin: false,
    userName: "",
    inWorkWx: false
  },
  mutations: {
    login(state, userName) {
      state.userName = userName || '新用户';
      state.hasLogin = true;
    },
    logout(state) {
      uni.removeStorageSync('user');
      state.userName = "";
      state.hasLogin = false;
      state.inWorkWx = false;
    },
    setInWorkWx(state, inWorkWx){
      state.inWorkWx = inWorkWx;
    }
  },
  actions: {
    login({ commit, state }, url = 'http://www.all2key.cn') {
      url = decodeURIComponent(url);
      console.log('url: ', url);
      const code = new URL(url).searchParams.get('code');
      if (code) {
        return request('get-user', { url })
          .then(res => {
            console.log("/get-user: ", res);
            const user = res.content.user;
            uni.setStorageSync('user', JSON.stringify(user));
            // const { userName, inWorkWx } = user;
            commit('login', user.userName);
            commit('setInWorkWx', user.inWorkWx);
            return user;
          })
          .catch(log('/get-user error: '));
      } else {
        const user = getUser('user');
        user.userName && commit('login', user.userName, user.inWorkWx);
        return Promise.resolve(user);
      }
    }
  }
})

export default store
