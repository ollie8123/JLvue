<template>
  <div class="123">
    <div class="row">
      <div class="">
        <label for="id" class="form-label">優惠券名稱:</label>
        <el-input type="text" id="id" :value="coupons.name" disabled />
      </div>
      <br />

      <div class="">
        <label for="code" class="form-label">優惠代碼: </label>
        <el-input
          type="text"
          placeholder="請輸入"
          id="code"
          v-model="coupons.code"
          maxlength="5"
          disabled
        />
      </div>
      <div class="">
        <label for="begin" class="form-label">優惠券開始時間: </label>
        <input
          type="datetime-local"
          id="begin"
          :min="coupons.startTime"
          v-model="coupons.startTime"
          @change="updateEndTime"
          :disabled="coupons.received!=0"
        />
      </div>

      <div class="">
        <label for="end" class="form-label">結束時間: </label>
        　<input
          type="datetime-local"
          id="end"
          :min="coupons.endTime"
          v-model="coupons.endTime"
          :disabled="coupons.received!=0"
        />
      </div>

      折扣設定:
      <select v-model="discount" @change="clear" :disabled="coupons.received!=0">
        <option value="amount">折扣金額</option>
        <option value="ratio">折扣折數</option>
      </select>
      <div v-if="discount === 'amount'">
        折扣金額: 
        <input type="number" v-model="coupons.discountAmount" :disabled="coupons.received!=0"/> 
        最低消費金額:
        <input type="number" v-model="coupons.miniumSpendingAmount" :disabled="coupons.received!=0"/> 
        每個買家最大配額:
        <input type="number" v-model="coupons.perPersonQuota" :disabled="coupons.received!=0"/>
        可使用數量:
        <input type="number" v-model="coupons.availableNumber" >
      </div>
      <div v-if="discount === 'ratio'">
        折扣折數:
        <input type="number" v-model="coupons.discountRate" /> 
        最高折抵金額:　
        <input type="number" :disabled="coupons.received!=0"/>
        最低消費金額:
        <input type="number" v-model="coupons.miniumSpendingAmount" :disabled="coupons.received!=0"/>
        每個買家最大配額:
        <input type="number" v-model="coupons.perPersonQuota" :disabled="coupons.received!=0"/>
        可使用數量:
        <input type="number" v-model="coupons.availableNumber">
      </div>
      <button @click="edit">更新</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { axios, CookieAxios } from "../../../service/api";
import { useRoute, useRouter } from "vue-router";

const $router = useRouter();
const route =useRoute();
const coupons=ref({})
const currentTime = ref(
  new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16)
);
const startTime = ref(currentTime.value);
const startTimeOneHourLater = computed(() => {
  return new Date(new Date(startTime.value).getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);
});

const endTime = ref(startTimeOneHourLater.value);
const updateEndTime = () => {
  endTime.value = startTimeOneHourLater.value;
};
let id=ref();
const discount =ref()

const loadData = async () => {
   id = route.params.id; //讀取 id 參數的值
  const API_URL = `${import.meta.env.VITE_API_JAVAURL}findById/${id}`;
  const response = await CookieAxios.get(API_URL);
  coupons.value = response.data.data;
  console.log('修改前coupons.value');
  console.log(coupons.value.miniumSpendingAmount);
  if(coupons.value.discountRate!=null&&coupons.value.discountRate!=''){
     discount.value='ratio'
 }else{
  discount.value='amount'
 }
}
loadData();

const clear = () => {
  console.log("clear function")
  coupons.value.discountAmount = "";
  coupons.value.miniumSpendingAmount = "";
  coupons.value.perPersonQuota = "";
  coupons.value.availableNumber="";
};

const edit = async () => {
  const API_URL = `edit`;
  coupons.value.dataUpdateTime=null;
  console.log('修改後coupon.value');
  console.log(coupons.value.miniumSpendingAmount);
  const response = await CookieAxios.post(API_URL, coupons.value);
  if (response.data.code === 1) {
    alert("修改成功");
    $router.push("/seller/coupon/find");
  } else {
    alert("修改失敗");
  }
};

</script>

<style scoped>
.container {
  display: flex;
}
</style>
