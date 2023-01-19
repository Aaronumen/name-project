<template>
  <view class="index">
    <view v-if="state.userInfo.avatarUrl">
      <nut-avatar size="large" shape="round">
        <img :src="state.userInfo.avatarUrl" />
      </nut-avatar>
    </view>
    <view>
      <nut-form :model-value="formValue">
        <nut-form-item label="姓" required>
          <nut-input v-model="formValue.name"></nut-input>
        </nut-form-item>
        <nut-form-item label="出生日期">
          <nut-input
            v-model="formValue.time"
            @click-input="datePickerVisible=!datePickerVisible"
          ></nut-input>
        </nut-form-item>
        <nut-form-item label="名字风格">
         <nut-range v-model='formValue.style' max="10" min="0" :marks="{0:'阳',5:'中',10:'阴'}"></nut-range>
        </nut-form-item>
      </nut-form>
    </view>
    <view class="btn">
      <nut-button type="primary" @click="handleClick('text', state.msg2, true)"
        >点我</nut-button
      >
    </view>
    <nut-popup position="bottom" v-model:visible="datePickerVisible">
      <nut-date-picker
        v-model="currentDate"
        title="日期时间选择"
        type="datetime"
        @confirm="datePikerConfirm"
      ></nut-date-picker>
      <nut-toast
        :msg="state.msg2"
        v-model:visible="state.show"
        :type="state.type"
        :cover="state.cover"
      />
    </nut-popup>

    <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
      获取手机号
    </button>
  </view>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import dayjs from "dayjs";
onMounted(() => {});

const datePickerVisible = ref(false);

const currentDate = ref(dayjs());

const formValue = ref({
  name: "",
  time: "",
  style:0
});

const getPhoneNumber = (e) => {
  console.log(e);
};

const datePikerConfirm = (e: any) => {
  const {selectedValue}=e;
  console.log('selectedValue: ', selectedValue);
  const time=`${selectedValue[0]}-${selectedValue[1]}-${selectedValue[2]} ${selectedValue[3]}:${selectedValue[4]}`
  formValue.value.time=time
  datePickerVisible.value=false
  console.log('time: ', time);
};

const state = reactive({
  msg: "欢迎使用 NutUI4.0 开发小程序",
  msg2: "你成功了～",
  type: "text",
  show: false,
  cover: false,
  userInfo: {
    avatarUrl: "",
    nickName: "游客",
  },
});

const handleClick = (type, msg, cover = false) => {
  state.show = true;
  state.msg2 = msg;
  state.type = type;
  state.cover = cover;
  wx.getUserProfile({
    desc: "sss用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      const {
        userInfo: { avatarUrl, nickName },
      } = res;
      console.log(res);
      state.userInfo.avatarUrl = avatarUrl;
      state.userInfo.nickName = nickName;
    },
  });
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
