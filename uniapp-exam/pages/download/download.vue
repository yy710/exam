<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title">请选择试卷</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'请点击选择试卷'}}
				</view>
			</picker>
		</view>
    
    <view class="flex flex-wrap justify-between align-center">
    	<button class="cu-btn" @click="viewData">查看考试统计数据</button>
    	<button class="cu-btn" @click="downloadData">下载考试统计数据</button>
    </view>
    
    <view class="cu-list menu-avatar">
    	<view class="cu-item" v-for="(exam, index) in exams" :key="index">
    		<view class="cu-avatar round lg" style="background-image:url(./static/img/exam.jpg);"></view>
    		<view class="content">
    			<view class="text-grey">姓名：{{ exam.userName }}，考试成绩：{{ exam.score }}分</view>
    			<view class="text-gray text-sm flex">
    				<view class="text-cut">
    					<text class="cuIcon-infofill text-red  margin-right-xs"></text>
    					共计用时：{{ exam.time }}
    				</view> </view>
    		</view>
    		<!-- <view class="action">
    			<view class="text-grey text-xs">{{ exam.time }}</view>
    			<view class="cu-tag round bg-grey sm">{{ exam.score }}</view>
    		</view> -->
    	</view>
    </view>
	</view>
</template>

<script>
  const { request, log } = require('@/common/util.js');
	export default {
		data() {
			return {
				index: 0,
				picker: [ ],
        exams: []
			}
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value;
        console.log("this.index: ", this.index);
			},
      viewData(){
        request('download', { action: "view", exam_name: this.picker[this.index] })
        .then(log("/download: "))
        .then(res => {
          this.exams = res.content;
        }).catch(log("/download error: "));
      },
      downloadData(){
        const url = `http://www.all2key.cn/race/api/download?action=download&exam_name=${encodeURIComponent(this.picker[this.index])}`;
        console.log(url);
        window.location.href = url;
      }
		},
    onLoad(){
      request('all-exams-list').then(res => {
        console.log("/all-exam-list: ", res);
        if(res.errcode)return Promise.reject(res);
        this.picker = res.content;
      }).catch(log("/all-exam-list error: "));
    }
	}
</script>

<style>

</style>
