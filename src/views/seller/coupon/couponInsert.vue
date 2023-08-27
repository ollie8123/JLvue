<template>
  <div class="123">
    <div class="row">
      <div class="">
        <label for="id" class="form-label">優惠券名稱:</label>
        <el-input
          type="text"
          id="id"
          v-model="name"
          show-word-limit
          maxlength="40"
          placeholder="請輸入"
        />
        <small>優惠券名稱不會向買家顯示</small>
      </div>
      <br />

      <div class="">
        <label for="code" class="form-label">優惠代碼: </label>
        <el-input
          type="text"
          placeholder="請輸入"
          id="code"
          v-model="code"
          minlength="5"
          maxlength="5"
          show-word-limit
          @input="filterCode"
        />
      </div>
      <div class="block">
        <label for="begin" class="form-label">優惠券開始時間: </label>
        <input
          type="datetime-local"
          id="begin"
          :min="currentTime"
          v-model="startTime"
          @change="updateEndTime"
        />
      </div>

      <div class="">
        <label for="end" class="form-label">結束時間: </label>
        　<input
          type="datetime-local"
          id="end"
          :min="startTimeOneHourLater"
          v-model="endTime"
        />
      </div>
<div>


      折扣設定:
      <select v-model="discount" @change="clear">
        <option value="amount">折扣金額</option>
        <option value="ratio">折扣折數</option>
      </select>

      <div v-if="discount === 'amount'">
        折扣金額: 
        <input type="number" v-model="discountAmount" /> 
        最低消費金額:
        <input type="number" v-model="miniumSpendingAmount" /> 
        每個買家最大配額:
        <input type="number" v-model="perPersonQuota" />
        可使用數量:
        <input type="number" v-model="availableNumber">
      </div>

      <div v-if="discount === 'ratio'">
        折扣折數:
        <input type="number" v-model="discountRate" /> 
        最高折抵金額:　
        <input type="number" v-model="discountMaximum"/>
        最低消費金額:
        <input type="number" v-model="miniumSpendingAmount" />
        每個買家最大配額:
        <input type="number" v-model="perPersonQuota" />
        可使用數量:
        <input type="number" v-model="availableNumber">
      </div>
      <button @click="insert">新增</button>
</div>
</div>
</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { axios, CookieAxios } from "../../../service/api";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2'

const $router = useRouter();
const name = ref();
const code = ref();
//優惠代碼輸入只允許字母數字自動轉大寫
const filterCode = () => {
  const pattern = /^[a-zA-Z0-9]*$/; // 只允許字母數字
  code.value = code.value.toUpperCase();
  if (!pattern.test(code.value)) {
    code.value = code.value.replace(/[^a-zA-Z0-9]/g, ""); // 移除特殊符號
  }
};

const discount = ref("amount");
const discountAmount = ref();
const discountRate = ref();
const discountMaximum= ref();
const miniumSpendingAmount = ref();
const perPersonQuota = ref();
const availableNumber = ref();
const currentTime = ref(
  new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16)
);
const startTime = ref(currentTime.value);
const startTimeOneHourLater = computed(() => {
  console.log();
  return new Date(new Date(startTime.value).getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);
});

const endTime = ref(startTimeOneHourLater.value);
const updateEndTime = () => {
  endTime.value = startTimeOneHourLater.value;
};
// function clear(){
//     discountAmount.value=""
//     miniumSpendingAmount.value=""
//     perPersonQuota.value=""
// }
const clear = () => {
  discountAmount.value = "";
  miniumSpendingAmount.value = "";
  perPersonQuota.value = "";
  availableNumber.value="";
};

const insert = async () => {
  Swal.fire({
  title: '確定要新增嗎?',
  text: "部分內容可以之後再修改!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '確認',
  cancelButtonText: '取消'

}).then(async(result) => {
  if (result.isConfirmed) {
    const API_URL = `insert`;
    const data = {
    name: name.value,
    code: code.value,
    startTime: startTime.value,
    endTime: endTime.value,
    discountAmount: discountAmount.value,
    discountRate: discountRate.value,
    discountMaximum:discountMaximum.value,
    miniumSpendingAmount: miniumSpendingAmount.value,
    perPersonQuota: perPersonQuota.value,
    availableNumber:availableNumber.value,
    used:0,
    received:0,
    seller: {
      id: 1,
    },
  };
  const response = await CookieAxios.post(API_URL, data);
  if (response.data.code === 1) {
    Swal.fire(
      '新增成功!',
      '',
      'success'
    )
    $router.push("/seller/coupon/find");
  } else {
    Swal.fire(
      '新增失敗!',
      '請重新檢查輸入資料',
      'error'
    )
  }
    
  }
})
  
};
// console.log(data);

// const { retrunData } = await CookieAxiosaxios.post(API_URL, data);
// console.log(retrunData.data)
// alert(retrunData);
// await CookieAxios.post(API_URL,data).then((req)=>{
//   alert(req.data)
//   console.log(req.data)
//   console.log(req.data.data)
//   console.log(req.data.code)

// }).catch((res)=>{
//   console.log("res.data"+res.data)
//   console.log("res.data.data"+res.data.data)

// })
</script>

<style scoped>
.container {
  display: flex;
}
small {
  color: gray;
}
.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-datetime-picker .block:last-child {
  border-right: none;
}
.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
