<template>
  <view class="index">
    <view>{{ `${curDate} ${dateWeek}` }}</view>
    <view> {{ `值班人：${curPeople}` }}</view>
    <!-- <nut-cell title="选择日期" :desc="curDate" @click="show = true"></nut-cell>
    <nut-popup position="bottom" v-model:visible="show">
      <nut-date-picker
        v-model="curDate"
        :min-date="minDate"
        @confirm="popupConfirm"
        :is-show-chinese="true"
      >
      </nut-date-picker>
    </nut-popup> -->
    <nut-cell
    :showIcon="true"
    title="选择日期"
    :desc="curDate"
    @click="show=true"
  >
  </nut-cell>
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
  '星期一'=1,
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日',
}

const minDate = new Date();

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
  const parts = date.split(/(年|月|日)/);
  return `${parts[0]}-${getMonthOrDay(parts[2])}-${getMonthOrDay(parts[4])}`
}

const popupConfirm = ({ selectedValue, selectedOptions }) => {
  curDate.value = selectedOptions.map((val: any) => val.text).join("");
  show.value = false;
};

</script>

<style lang="scss">
.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.top {
  width: 100%;
  height: 30px;
}
</style>
