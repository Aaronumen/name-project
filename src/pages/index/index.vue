<template>
  <view class="index">
    <view>{{ `${curDate} ${dateWeek}` }}</view>
    <view> {{ `值班人：${curPeople}` }}</view>
    <!-- <nut-cell
    :showIcon="true"
    title="选择日期"
    :desc="curDate"
    @click="show=true"
    class="cell"
  > -->
  <!-- </nut-cell> -->
  <nut-button type="info" class="cell" @click="show=true">选择日期</nut-button>
  <nut-calendar
    v-model:visible="show"
    :default-value="curDate"
    is-auto-back-fill
    @close="show=false"
    @choose="setChooseValue"
  >
  </nut-calendar>
  </view>
</template>

<script setup lang="ts">
import {  shallowRef, computed } from "vue";
import { format, differenceInDays,getDay } from "date-fns";

const show = shallowRef(false);

enum WEEK{
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
}


const curDate = shallowRef(format(new Date(), "yyyy-MM-dd"));

const curIdx = computed(() => dayDifference.value % 5);

const startDate = shallowRef("2023-10-24");

const dateWeek=computed(()=> `${WEEK[getDay(new Date(curDate.value))]}`)

 const setChooseValue = (param) => {
        curDate.value = param[3];
};

const dayDifference = computed(() =>
  differenceInDays(new Date(curDate.value), new Date(startDate.value))
);

const peopleData = shallowRef(["小曾", "小杨", "小伍", "小陈", "小李子"]);

const curPeople = computed(() => peopleData.value[curIdx.value]);

const getMonthOrDay=(str:string) => {
  return str.length === 1? `0${str.length}` : str
}


const transformDate = (date: string) => {
  if (!date) return "";
  const parts = date.split(/(年|月|日)/);
  return `${parts[0]}-${getMonthOrDay(parts[2])}-${getMonthOrDay(parts[4])}`
}


</script>

<style lang="scss">
:deep(.nut-button--default){
  background-color: #9c88ff!important;
}
.index {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #9c88ff;
  font-weight: bold;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../../assets/images/bg.jpg');
  background-size: cover;
}
.cell{
  position: absolute;
  bottom: 20px;
  width: 100%;
}
.top {
  width: 100%;
  height: 30px;
}
</style>
