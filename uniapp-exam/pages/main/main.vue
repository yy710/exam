<template>
  <view class="solids-bottom padding-xs">
    <view class="flex-sub radius shadow bg-white">
      <view class="solid-bottom text-lg padding text-center">
        <!-- <view v-for="(value, name) in user" :key="name">{{ name }}: {{ value }}</view> -->
        <text class="lg text-red" :class="{'cuIcon-warnfill':!hasLogin, 'cuIcon-emoji':hasLogin}"></text>
        <text class="text-red">您好 {{ userName }}，{{ hasLogin ? '您已成功登录' : '请点击下方“我的”按钮登陆系统！' }}</text>
      </view>
      <view class="solid-bottom text-df padding" style="text-indent: 2em;">
        欢迎使用谊众产品知识考试系统，请单击下方试卷列表开始考试。
        每份考卷试题均为随机从题库生成，请在规定时间内完成答题并点击交卷，中途请不要切换或退出考试页面，否则可能会被判定作弊而取消考试资格。
        每人只有一次交卷机会，交卷后系统将会自动计算考试成绩。单击已交卷可查看正确答案。
      </view>
      <view class="solid-bottom text-sm padding">
        <text class="lg text-gray cuIcon-comment"></text>
        <text class="text-grey" v-if="!inWorkWx">本系统当前正在测试阶段，欢迎自行注册用户参与测试，发现BUG请及时联系开发者：余春健，谢谢！！</text>
        <text class="text-grey" v-if="inWorkWx">本系统由余春健开发维护，当前正在测试阶段，欢迎各位同事积极参与，发现BUG请及时与我联系，谢谢！！</text>
      </view>
    </view>
  </view>
</template>

<script>
import service from '../../service.js';
import { mapState, mapMutations, mapActions } from 'vuex';
const { request, log } = require('@/common/util.js');

export default {
  computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'inWorkWx']),
  
  data: function(){
    return {
      user: { userName: 'guest' }
    };
  },
  
  methods: {
    ...mapActions(['login'])
  },
  
  onLoad() {
    const url = encodeURIComponent(window.location.href);
    // const url = encodeURIComponent('http://www.all2key.cn/?code=12324325235');
    console.log('url: ', url);
    this.login(url).then(res => {
      // console.log('page/main.hasLogin: ', this.hasLogin);
      this.user = { userName: this.userName, inWorkWx: this.inWorkWx };
      service.chenckLogin(this);
    }).catch(log('login error: '));
  }
};

</script>

<style>
.hello {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.title {
  color: #8f8f94;
  margin-top: 25px;
}

.ul {
  font-size: 15px;
  color: #8f8f94;
  margin-top: 25px;
}

.ul > view {
  line-height: 25px;
}
</style>
