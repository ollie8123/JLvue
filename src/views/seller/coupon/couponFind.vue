<template>
  <div class="container">
    <div class="flex">
      <chatroom></chatroom>
       <!-- <RouterLink
            class="btn btn-secondary me-3"
            :to="'../../seller/chat'"
            ><i class="bi bi-pencil-fill"></i> 聊天</RouterLink> -->
      
    <span>總共 {{total}} 筆資料</span>
    <span class="col-3"><PageSize @pageSizeChange="changeHandler"></PageSize></span>

   

  <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button @click="loadValidity" class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">有效</button>
  </li>
  <li class="nav-item" role="presentation">
    <button @click="loadNoVailbleNumber" class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">發完</button>
  </li>
  <li class="nav-item" role="presentation">
    <button @click="loadExpired" class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">失效</button>
  </li>
</ul>
</div>

  <table class="table table-bordered " >
    <thead>
      <tr >
        <th>名稱</th>
        <th>優惠碼</th>
        <th>開始時間</th>
        <th>結束時間</th>
        <th>折扣內容</th>
        <th>最低消費</th>
        <th></th>
        
      </tr>
    </thead>
    <tbody>
      <!-- {{coupons}} -->
      <tr v-for="coupon in coupons" :key="coupon.id">
        <td>{{ coupon.name }}</td>
        <td>{{ coupon.code }}</td>
        <td>{{ coupon.startTime }}</td>
        <td>{{ coupon.endTime }}</td>
        <td v-if="coupon.discountAmount != null && coupon.discountAmount != ''">
          {{ coupon.discountAmount }}元
        </td>
        <td v-if="coupon.discountRate != null && coupon.discountRate != ''">
          {{ coupon.discountRate*10 }}折
          <br>
          <small>(最高折 {{ coupon.discountMaximum }}元)</small>
           
        </td>
        <td>{{ coupon.miniumSpendingAmount }}元</td>
        <td >
        
          <button class="btn btn-primary" @click="findMore(coupon.id)"><i class="bi bi-search"></i>
           查看更多
          </button>
        </td>
        
      </tr>
    </tbody>
  </table>
  <Paging :totalPages="totalPages" :thePage="datas.start + 1" @childClick="clickHandler"></Paging>
  
  
  <!-- more -->

  <el-dialog v-model="dialogTableVisible" width="600px" center >
    <fieldset>
   <header >{{singleCoupon.name}}</header>
      <legend> 上一次更新時間: {{ singleCoupon.dataUpdateTime }}</legend>
         <ol>
           <li>
             <label for="name">優惠券代碼:</label>
             <input id="name" name="name" type="text" class="fildform" v-model="singleCoupon.code" disabled/>
           </li>
           <li>
             <label for="email">開始時間:</label>
             <input
          type="datetime-local"
          id="begin"
          :min="currentTime"
          v-model="singleCoupon.startTime"
          @change="updateEndTime"
          :max="maxStarttime"
          style="width: 199px;"
        />
           </li>
           <li>
             <label for="phone">結束時間:</label>
             <input
          type="datetime-local"
          id="end"
          :min="minEndtime"
          v-model="singleCoupon.endTime"
          
        />
           </li>
           <!-- v-if="singleCoupon.discountAmount!=null&&singleCoupon.discountAmount!=''" -->
           <div v-if="discountContent==1">
             <li>
               <label for="phone">折扣內容:</label>
               <input id="phone" name="phone" type="text" class="fildform" v-model="singleCoupon.discountAmount" :disabled="singleCoupon.received!==0"/>
             </li>
           </div>
           <!-- v-if="singleCoupon.discountRate!=null&&singleCoupon.discountRate!=''" -->
           <div v-if="discountContent==2">
            <li>
                <label for="phone">折扣內容:</label>
                <input id="phone" name="phone" type="text" class="fildform" v-model="singleCoupon.discountRate" :disabled="singleCoupon.received!==0"/>
            </li>
            <li>
                <label for="phone">最高折抵金額:</label>
                <input id="phone" name="phone" type="text" class="fildform" v-model="singleCoupon.discountMaximum" :disabled="singleCoupon.received!==0"/>
            </li>

           </div>
           <li>
             <label for="">最低消費:</label>
             <input id="phone" name="phone" type="text" class="fildform" v-model="singleCoupon.miniumSpendingAmount"/>
           </li>
           <li>
             <label for="">每人配額:</label>
             <input id="" name="" type="text" class="fildform" v-model="singleCoupon.perPersonQuota" :disabled="singleCoupon.received!==0"/>
           </li>
           <li>
             <label for="">已領取數:</label>
             <input id="" name="" type="text" class="fildform" v-model="singleCoupon.received " disabled/>
           </li>
           <li>
             <label for="phone">已使用數:</label>
             <input id="phone" name="phone" type="text" class="fildform" v-model="singleCoupon.used" disabled/>
           </li>
           <li>
             <label for="phone">使用率:</label>
             <input id="phone" name="phone" type="text" class="fildform" v-model="rate" disabled/>
           </li>
           <li>
             <label for="phone">剩餘可使用數量:</label>
             <input id="phone" name="phone" type="text" class="fildform" v-model="singleCoupon.availableNumber"/>
           </li>
           <li>
             <label for="phone">建立時間:</label>
             <input id="phone" name="phone" type="text" class="fildform" v-model="singleCoupon.dataCreateTime" disabled/>
           </li>
           <div v-if="status!=2" class="bttn">
           

            <!-- <RouterLink
            class="btn btn-secondary me-3"
            :to="'/seller/coupon/edit/'+singleCoupon.id"
            ><i class="bi bi-pencil-fill"></i> 修改</RouterLink> -->
          <button   class="btn btn-secondary me-3" @click="edit()">
            <i class="bi bi-pencil-fill"></i> 修改
          </button>

          <button  v-if="singleCoupon.received ===0" class="btn btn-danger" @click="deleteCoupon(singleCoupon.id)">
            <i class="bi bi-trash-fill"></i> 刪除
          </button>
          <button  v-if="singleCoupon.received !==0 && singleCoupon.availableNumber!==0" class="btn btn-danger" @click="stop()">
            <i class="bi bi-trash-fill"></i> 下架
          </button>
           </div>
           
           
          </ol>
   </fieldset>
  </el-dialog>
</div>

</template>

<script setup>
import dayjs from 'dayjs';
import { ref, reactive} from "vue";
import { CookieAxios } from "../../../service/api";
import PageSize from '../../../components/page/PageSize.vue'
import Paging from '../../../components/page/Paging.vue'
import Swal from 'sweetalert2'
import chatroom from'../../chat/chatRoom.vue'


const discountContent=ref()
const maxStarttime=ref()
const minEndtime=ref()
const coupons = ref([]);
const totalPages = ref(0);
const datas = reactive({
  start: 0,
  rows: 0,
});
const status=ref(1)
const total=ref()
const dialogTableVisible = ref(false)
const rate=ref(0)

const loadValidity = async () => {
  const API_URL = `findValidity`;
  const response = await CookieAxios.post(API_URL,datas);
  status.value=1
  //取得所有商品放進products變數
  coupons.value = response.data.data.data;
  total.value=response.data.data.total
  // coupons.value.forEach(item=>{
  //   item.startTime=dayjs(item.startTime).format("YYYY-MM-DD HH:mm")
  //   item.endTime=dayjs(item.endTime).format("YYYY-MM-DD HH:mm")
  // })
  timeFormat(coupons.value)
  //計算總共幾頁
     totalPages.value = +datas.rows === 0 ? 1 : Math.ceil(response.data.data.total / datas.rows)
};

function timeFormat(timeArray){
  timeArray.forEach(item=>{
    item.startTime=dayjs(item.startTime).format("YYYY-MM-DD HH:mm")
    item.endTime=dayjs(item.endTime).format("YYYY-MM-DD HH:mm")
  })
  return timeArray;
}


loadValidity();

const loadExpired =async()=>{
  const API_URL = `findExpired`;
  const response = await CookieAxios.post(API_URL,datas);
  status.value=2
  //取得所有商品放進products變數
  coupons.value = response.data.data.data;
  console.log(coupons.value);
  console.log('aaa')
  total.value=response.data.data.total
  timeFormat(coupons.value)
  //計算總共幾頁
   totalPages.value = +datas.rows === 0 ? 1 : Math.ceil(response.data.data.total / datas.rows)

}
//查看更多
const singleCoupon =ref({})


// async function findMore (Id){
  const findMore=async(Id)=>{
  dialogTableVisible.value=true
  // let params={
  //   id:oneId
  // }
  // const response = await CookieAxios.get(API_URL,{params:params});
  const API_URL = `findById/${Id}`;
  const response = await CookieAxios.get(API_URL);
  singleCoupon.value = response.data.data;
  console.log('singleCoupon',singleCoupon)
  console.log('singleCoupon.value.name',singleCoupon.value.name)
  singleCoupon.value.startTime=dayjs(singleCoupon.value.startTime).format("YYYY-MM-DD HH:mm")
  singleCoupon.value.endTime=dayjs(singleCoupon.value.endTime).format("YYYY-MM-DD HH:mm")
  singleCoupon.value.dataUpdateTime=dayjs(singleCoupon.value.dataUpdateTime).format("YYYY-MM-DD HH:mm")
  singleCoupon.value.dataCreateTime=dayjs(singleCoupon.value.dataCreateTime).format("YYYY-MM-DD HH:mm")
  if(singleCoupon.value.used!=0&&singleCoupon.value.received!=0){
    rate.value=parseFloat((singleCoupon.value.used/singleCoupon.value.received).toFixed(2))

  }
  if(singleCoupon.value.received==0){
    maxStarttime.value=singleCoupon.value.startTime;
    minEndtime.value=singleCoupon.value.endTime;

  }
  if(singleCoupon.value.discountAmount!=null&&singleCoupon.value.discountAmount!=''){
    discountContent.value=1
  }else if(singleCoupon.value.discountRate!=null&&singleCoupon.value.discountRate!=''){
    discountContent.value=2
  }

//   if(coupons.value.discountRate!=null&&coupons.value.discountRate!=''){
//      discount.value='ratio'
//  }else{
//   discount.value='amount'
//  }
}

const loadNoVailbleNumber =async()=>{
  const API_URL = `findNoVailbleNumber`;
  const response = await CookieAxios.post(API_URL,datas);
  status.value=3
  //取得所有商品放進products變數
  coupons.value = response.data.data.data;
  console.log(coupons.value);
  console.log('aaa')
  total.value=response.data.data.total
  timeFormat(coupons.value)
  //計算總共幾頁
   totalPages.value = +datas.rows === 0 ? 1 : Math.ceil(response.data.data.total / datas.rows)

}
//paging 由子元件觸發
const clickHandler = page =>{
    datas.start = page - 1
    if(status.value===1){
      loadValidity()
    }else if(status.value===2){
      loadExpired()
    }else if(status.value===3){
      loadNoVailbleNumber()
    }
}
//一頁幾筆資料
const changeHandler = value => {
    datas.rows = value
    datas.start = 0
    console.log("pagesize：",datas)
    if(status.value===1){
      loadValidity()
    }else if(status.value===2){
      loadExpired()
    }else if(status.value===3){
      loadNoVailbleNumber()
    }
}

const deleteCoupon =async (couponId)=>{

  Swal.fire({
  title: '確定要刪除嗎?',
  // text: "部分內容可以之後再修改!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '確認',
  cancelButtonText: '取消'

}).then(async(result) => {
  if (result.isConfirmed) {
   const API_URL=`deleteById/${couponId}`
   const response= await CookieAxios.delete(API_URL);
  
  if (response.data.code === 1) {
    Swal.fire(
      '刪除成功!',
      '',
      'success'
    )
    if(status.value===1){
      loadValidity()
    }else if(status.value===2){
      loadExpired()
    }else if(status.value===3){
      loadNoVailbleNumber()
    }
    dialogTableVisible.value=false
    
  } else {
    Swal.fire(
      '刪除失敗!',
      '請重新嘗試',
      'error'
    )
    if(status.value===1){
      loadValidity()
    }else if(status.value===2){
      loadExpired()
    }else if(status.value===3){
      loadNoVailbleNumber()
    }
    dialogTableVisible.value=false
  }
  }
})

  // if(window.confirm("真的要刪除嗎?")){

  //   const API_URL=`deleteById/${couponId}`
  //   const response= await CookieAxios.delete(API_URL);
  //   if(response.data.code===1){
  //     alert("刪除成功")
  //     if(status.value===1){
  //     loadValidity()
  //   }else if(status.value===2){
  //     loadExpired()
  //   }else if(status.value===3){
  //     loadNoVailbleNumber()
  //   }
  //   }
  //   else{
  //   alert("刪除失敗")
  //   if(status.value===1){
  //     loadValidity()
  //   }else if(status.value===2){
  //     loadExpired()
  //   }else if(status.value===3){
  //     loadNoVailbleNumber()
  //   }
  //   }
  // }
  
}
const edit = async () => {
  Swal.fire({
  title: '確定要修改嗎?',
  // text: "部分內容可以之後再修改!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '確認',
  cancelButtonText: '取消'

}).then(async(result) => {
  if (result.isConfirmed) {
  const API_URL = `edit`;
  coupons.value.dataUpdateTime=null;
  singleCoupon.value.startTime=new Date(new Date(singleCoupon.value.startTime).getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16)
  singleCoupon.value.endTime=new Date(new Date(singleCoupon.value.endTime).getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16)
  const response = await CookieAxios.post(API_URL, singleCoupon.value);
  if (response.data.code === 1) {
    Swal.fire(
      '修改成功!',
      '',
      'success'
    )
    loadValidity();
    dialogTableVisible.value=false
    
  } else {
    Swal.fire(
      '修改失敗!',
      '請重新嘗試',
      'error'
    )
  }
  }
})
 
}

const stop = async () => {
  Swal.fire({
  title: '確定要下架嗎?',
  text: "可以在發完重新上架!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '確認',
  cancelButtonText: '取消'

}).then(async(result) => {
  if (result.isConfirmed) {
  const API_URL = `stop`;
  coupons.value.dataUpdateTime=null;
  singleCoupon.value.startTime=new Date(new Date(singleCoupon.value.startTime).getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16)
  singleCoupon.value.endTime=new Date(new Date(singleCoupon.value.endTime).getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16)
  const response = await CookieAxios.post(API_URL, singleCoupon.value);
  if (response.data.code === 1) {
    Swal.fire(
      '修改成功!',
      '',
      'success'
    )
    loadValidity();
    dialogTableVisible.value=false
    
  } else {
    Swal.fire(
      '修改失敗!',
      '請重新嘗試',
      'error'
    )
  }
  }
})
 
}
</script>

<style scoped>
tr:hover {
  background-color: lightblue;
  /* 其他樣式設定 */
}

body {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
}
fieldset {
	margin: 0 0 0 0;
	padding: 0;
  border: 1px solid #CCC;
}
legend {
	justify-content: center;
  display: flex;
	color: gray;
  font-weight: bold;
  font-size: 20px;
}
label {
	float: left;
	width: 10em;
	margin:auto;
  padding: auto;
}
fieldset ol {
	list-style: none;
	padding-top: 3px;
	padding-left: 16px;
  padding-right: 16px;
	padding-bottom: 3px;
}
fieldset li {
	line-height: 24px;
	margin-top: 5px;
	margin-bottom: 5px;
  justify-content: center;
  display: flex;
  
}
fieldset li input.fildform{
	line-height: 24px;
	height: 24px;
	border: 1px solid #CCC;
  width: 199px;
}
fieldset .submit {
	border-style: none;
}
header{
  font-size: 50px;
  color: lightblue;
  font-weight: bold;
  display: flex;
  justify-content: center;
}
.bttn{
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>
