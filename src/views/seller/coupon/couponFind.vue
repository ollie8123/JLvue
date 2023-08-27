<template>
  <div class="container">
    <div class="flex">
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
          {{ coupon.discountRate*100 }}折
          <br>
          <small>(最高折 {{ coupon.discountMaximum }}元)</small>
           
        </td>
        <td>{{ coupon.miniumSpendingAmount }}元</td>
        <td v-if="status===1||status===3">
          <RouterLink
            class="btn btn-secondary me-3"
            :to="'/seller/coupon/edit/'+coupon.id"
            ><i class="bi bi-pencil-fill"></i> 修改</RouterLink
          >
          <button class="btn btn-danger" @click="deleteCoupon(coupon.id)">
            <i class="bi bi-trash-fill"></i> 刪除
          </button>
        </td>
        <td v-if="status===2">
          <button class="bi bi-pencil-fill" >更多</button>
          <el-button  @click="findMore(coupon.id)">
           查看更多
          </el-button>
        </td>
        
      </tr>
    </tbody>
  </table>
  <Paging :totalPages="totalPages" :thePage="datas.start + 1" @childClick="clickHandler"></Paging>
  
  <!-- singleCoupon.name.is?'':singleCoupon.name -->
  <el-dialog v-model="dialogTableVisible" :title="singleCoupon.name" width="30%" center>
    <div>
    優惠券代碼:{{ singleCoupon.code}}
    <br>  
    開始時間:{{ singleCoupon.startTime}}
    <br>
    結束時間:{{ singleCoupon.endTime}}
    <br>
    折扣內容:{{ singleCoupon.discountRate}}
    <br>
    最低消費:{{ singleCoupon.miniumSpendingAmount}}
    <br>
    每人配額:{{ singleCoupon.perPersonQuota}}
    <br>
    已領取數:{{ singleCoupon.received}}
    <br>
    已使用數:{{ singleCoupon.used}}
    <br>
    剩餘可使用數量:{{ singleCoupon.availableNumber}}
    <br>
    建立時間:{{ singleCoupon.dataCreateTime}}
    <br>
    更新時間:{{ singleCoupon.dataUpdateTime}}
  </div>
  </el-dialog>
</div>

</template>

<script setup>
import dayjs from 'dayjs';
import { ref, reactive} from "vue";
import { axios, CookieAxios } from "../../../service/api";
import PageSize from '../../../components/page/PageSize.vue'
import Paging from '../../../components/page/Paging.vue'
const coupons = ref([]);
const totalPages = ref(0);
const datas = reactive({
  start: 0,
  rows: 0,
});
const status=ref(1)
const total=ref()
const dialogTableVisible = ref(false)

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
  console.log("id是:")
  console.log(couponId)
  if(window.confirm("真的要刪除嗎?")){

    const API_URL=`deleteById/${couponId}`
    const response= await CookieAxios.delete(API_URL);
    if(response.data.code===1){
      alert("刪除成功")
      if(status.value===1){
      loadValidity()
    }else if(status.value===2){
      loadExpired()
    }else if(status.value===3){
      loadNoVailbleNumber()
    }
    }
    else{
    alert("刪除失敗")
    if(status.value===1){
      loadValidity()
    }else if(status.value===2){
      loadExpired()
    }else if(status.value===3){
      loadNoVailbleNumber()
    }
    }
  }
  
}
</script>

<style scoped>
tr:hover {
  background-color: lightblue;
  /* 其他樣式設定 */
}
</style>
