<template>
  <view class="detail-calendar" ref="calendar">
    <!-- <view>{{ `${curDate} ${dateWeek}` }}</view>
    <view> {{ `值班人：${curPeople}` }}</view> -->
    <nut-calendar
      :poppable="false"
      @close="show = false"
      @choose="setChooseValue"
      :start-date="startDate"
      :endDate="endDate"
      :title="title"
    >
      <template #bottom-info="date">
        <span class="info">{{ getPeopel(date) }}</span>
      </template>
    </nut-calendar>
  </view>
</template>

<script setup lang="ts">
import { shallowRef, computed,onMounted, nextTick } from "vue";
import { format, differenceInDays, getDay ,add} from "date-fns";

const show = shallowRef(false);

const endDate=format(add(new Date(),{months:1}),"yyyy-MM-dd")

const calendar=shallowRef()

const getPeopel=(date:any) => {
    const {date:{year,month,day}}=date
    const curDate=`${year}-${month}-${day}`
    const curIdx= differenceInDays(new Date(curDate), new Date(startDate.value))%5
    return (peopleData.value as any).at(curIdx)
}

enum WEEK {
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
}

const curDate = shallowRef(format(new Date(), "yyyy-MM-dd"));

const curIdx = computed(() => dayDifference.value % 5);

const startDate = shallowRef("2023-10-24");

const title=computed(() => `${transformDate(curDate.value)} ${dateWeek.value} ${curPeople.value}`)

const getMonthOrDay=(str:string) => {
  return str.length === 1? `0${str.length}` : str
}

const transformDate = (date: string) => {
  if (!date) return "";
  const parts = date.split('-');
  return `${parts[0]}-${getMonthOrDay(parts[1])}-${getMonthOrDay(parts[2])}`
}

const dateWeek = computed(() => `${WEEK[getDay(new Date(curDate.value))]}`);

const curPeople = computed(() => peopleData.value[curIdx.value]);


const setChooseValue = (param) => {
  curDate.value = param[3];
};

const dayDifference = computed(() =>
  differenceInDays(new Date(curDate.value), new Date(startDate.value))
);

const peopleData = shallowRef(["小曾", "小杨", "小伍", "小陈", "小李子"]);

const clickHandle=(e) => {
  e.preventDefault();
  e.stopPropagation()
}

onMounted(() => {
  nextTick(()=>{
    document.getElementById('_PV')?.addEventListener('click',clickHandle,false);
  })
  
})
</script>

<style lang="scss">
.detail-calendar {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.info {
  // font-weight: bold;
  // color:#9c88ff ;
}
</style>
