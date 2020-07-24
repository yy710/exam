<template>
  <view>
    <!-- <view class="uni-list">
      <radio-group @change="radioChange">
        <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in tags" :key="item.value">
          <view><radio :value="item.value" :checked="index === current" /></view>
          <view>{{ item.name }}</view>
        </label>
      </radio-group>
    </view> -->
    
    <view class="action-row">
      <uni-card v-for="(item, index) in tags" :key="item.name" :title="item.name" thumbnail="../../static/img/exam.jpg" :extra="'当前成绩:'+item.test.score+'分'" :note="item.test.currentQs != -1?'单击开始考试,限时60分钟':'已交卷，请点击查看答案'" @click="testBegin(item)">
        {{item.name+'，共计'+item.qsAmount+'道题，总分'+item.score+'分。'}}
      </uni-card>
    </view>
    
    <!-- <view class="action-row"><button type="default" @click="startTest">开始考试</button></view> -->
  </view>
</template>

<script>
const { request, log } = require('@/common/util.js');
import service from '../../service.js';
import uniCard from '@/components/uni-card/uni-card.vue'
import { mapState } from 'vuex';
export default {
  components: { uniCard },
  computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
  data() {
    return {
      tags: [{ value: '1', name: '试卷A', test:{} }, { value: '2', name: '试卷B', test:{} }],
      current: 0
    };
  },
  onLoad() {
    service.chenckLogin(this);
  },
  onShow() {
    this.getExamsList();
  },
  
  methods: {
    radioChange: function(evt) {
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i].value === evt.target.value) {
          this.current = i;
          break;
        }
      }
    },
    getExamsList() {
      const _this = this;
      request('get-exams-list')
        .then(log('get-exams-list: '))
        .then(res => {
          _this.tags = res.content;
        })
        .catch(log('get-tags error: '));
    },
    startTest() {
      //console.log(this.current);
      request('next-test', { exam: this.current })
        .then(log("next-test: "))
        .catch(log('next-test error: '));
    },
    testBegin(e){
      const url = `../exam/exam?name=${encodeURIComponent(e.name)}&colName=${e.colName}&currentQs=${e.test.currentQs}`;
      console.log(url);
      uni.redirectTo({ url });
    }
  }
};
</script>

<style>
  @import "../../colorui/animation.css";
</style>
