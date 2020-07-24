<script>
  import service from './service.js';
  import { mapState, mapMutations, mapActions } from 'vuex';
  
	export default {
    computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
    methods: { ...mapActions(['login']) },
		onLaunch: function() {
			console.log('App Launch');
      this.login();
      // service.login().then(user => {
      //   user.userName && this.login(user.userName);
      // });
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
  @import "colorui/main.css";
  @import "colorui/icon.css";
  
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "components/m-icon/m-icon.css";
  
  /* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
  /* @import './common/uni.css'; */

	/*每个页面公共css */
  @import './uni.scss';
</style>
