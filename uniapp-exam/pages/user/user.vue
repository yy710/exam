<template>
	<view>
    <view class="flex-sub text-center padding">
      <view class="cu-avatar xl radius margin-left" style="background-image:url(./static/img/exam.jpg);"></view>
    	<view class="solid-bottom text-xl padding">
    		<text class="text-black text-bold">您好 {{userName}}，{{hasLogin ? "您已成功登录" : "请点击按钮登陆系统！" }}</text>
    	</view>
    	<!-- <view class="padding">页面大标题，用于结果页等单一信息页</view> -->
    </view>
   
		<view class="btn-row" v-if="!inWorkWx">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'inWorkWx'])
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({ url: '../login/login' });
			},
			bindLogout() {
				this.logout();
			  // 如果需要强制登录跳转回登录页面
				if (this.forcedLogin) {
					uni.reLaunch({ url: '../login/login' });
				}
			}
		}
	}
</script>

<style>

</style>
