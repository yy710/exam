<template>
  <view>
    <view class="cu-form-group margin-top">
      <text class="title">账号：</text>
      <m-input type="text" focus clearable v-model="account" placeholder="请输入账号"></m-input>
    </view>
    <view class="cu-form-group">
      <text class="title">密码：</text>
      <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
    </view>
    <!-- <view class="input-row">
    	<text class="title">邮箱：</text>
    	<m-input type="text" clearable v-model="email" placeholder="请输入邮箱"></m-input>
    </view> -->
    <view class="action"><button type="primary" class="primary" @tap="register">注册</button></view>
  </view>
</template>

<script>
import service from '../../service.js';
import mInput from '../../components/m-input.vue';

export default {
  components: {
    mInput
  },
  data() {
    return {
      account: '',
      password: ''
      //email: ''
    };
  },
  methods: {
    register() {
      const user = {
        userName: this.account,
        pwd: this.password
        //email: this.email
      };
      service.addUser(user).then(res => {
        if (res.errcode) {
          uni.showToast({ title: res.errmsg, duration: 3000, success: () => this.clear() });
        } else {
          uni.showToast({ title: '注册成功', duration: 2000, success: () => uni.navigateBack({ delta: 1 }) });
        }
      });
    },
    clear() {
      this.account = '';
      this.password = '';
    }
  }
};
</script>

<style></style>
