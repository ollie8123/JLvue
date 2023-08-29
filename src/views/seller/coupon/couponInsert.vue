<template>
  <el-main>

  
  <div class="container" width="450px">
    <fieldset  width="450px">
      <legend> 新增優惠券</legend>
         <ol>
          <section
					id="productPageInfo"
					class="card"
				>
        <h3 margin-left="10px">
          基本資料:
        </h3>
        <br>
           <li>
            <label for="id" class="form-label">優惠券名稱:</label>
        <el-input
          type="text"
          id="id"
          v-model="name"
          show-word-limit
          maxlength="40"
          placeholder="請輸入"
          style="margin-right: 10px;"
        />
        <small>優惠券名稱不會向買家顯示</small>
           </li>
           <li>
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
          style="margin-right: 10px;"
        />
           </li>
           <li>
            <label for="begin" class="form-label">優惠券開始時間: </label>
            <input
          type="datetime-local"
          id="begin"
          :min="currentTime"
          v-model="startTime"
          @change="updateEndTime"
        />
           </li>
           <li>
            <label for="end" class="form-label">優惠券結束時間: </label>
            <input
          type="datetime-local"
          id="end"
          :min="startTimeOneHourLater"
          v-model="endTime"
          
        />
           </li>
           </section>
           <section
					id="productPageInfo"
					class="card"
				   >
           <h3 margin-left="10px">
          折扣內容:
        </h3>
           <li>
            <label for="">折扣設定:</label>
            
      <select v-model="discount" @change="clear">
        <option value="amount">折扣金額</option>
        <option value="ratio">折扣折數</option>
      </select>
           </li>
           <div v-if="discount === 'ratio'">
            <li>
             <label for="">折扣折數:</label>
             <input type="number" v-model="discountRate" 
             placeholder="請輸入"/>
             
             <small>  請輸入0~1兩位小數</small>
           </li>
           <li>
             <label for="">最高折抵金額:</label>
             <input type="number" v-model="discountMaximum"
             placeholder="請輸入"/>
           </li>
           </div>
           <li v-if="discount === 'amount'">
             <label for="">折扣金額:</label> 
          <input type="number" v-model="discountAmount" 
          placeholder="請輸入"/> 
           </li>

           <li>
             <label for="">最低消費金額:</label>
             
        <input type="number" v-model="miniumSpendingAmount" 
        placeholder="請輸入"/> 
           </li>
           <li>
             <label for="phone">每人配額:</label>
             <input type="number" v-model="perPersonQuota" placeholder="請輸入"/>
           </li>
           <li>
             <label for="phone">可使用數量:</label>
        <input type="number" v-model="availableNumber" placeholder="請輸入">
           </li>
           
          </section>
          <el-button class="btnInsert" type="primary" @click="insert" >新增</el-button>
        </ol>
          
   </fieldset>
    
</div>
</el-main>
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

small {
  color: gray;
}

fieldset {
	/* margin: 1.5em 0 0 1.5em;
   */
   margin: auto;
	padding: 0;
  border: 1px solid #CCC;
  width: 800px;
  justify-content: center;
}
legend {
	margin-left: 1em;
	color: #009;
    font-weight: bold;
    font-size: 40px;
    display: flex;
}
label {
	float: left;
	width: 10em;
	margin-right: 1em;
}
fieldset ol {
	list-style: none;
	padding-top: 3px;
	padding-left: 2em;
  padding-right: 2em;
	padding-bottom: 1px;
}
fieldset li {
	line-height: 24px;
	margin-top: 10px;
	margin-bottom: 10px;
  margin-left: 10px;
}
fieldset li input.fildform{
	line-height: 24px;
	height: 24px;
	border: 1px solid #CCC;
}
fieldset .submit {
	border-style: none;
}
.card {
	scroll-margin-top: 110px;
	margin: 1rem !important;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
	border-radius: var(--bs-border-radius) !important;
  padding-right: 10px;
}
.cards-block {
	height: 100%;
	padding-bottom: 50px;
}
.li{
  margin-left: 2px;
}
h3{
  padding-top: 10px;
  padding-left: 5px;
}
.btnInsert{
 display: flex;
 margin: auto;
 text-align: center;
 width: 80px;
 height: 40px;
}

</style>
