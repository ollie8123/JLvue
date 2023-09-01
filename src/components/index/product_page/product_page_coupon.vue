<template>
<el-container v-if="sellerCouponList.length>0">      
     <el-aside  style="padding: 10px; background-color:#fafaec; width: 20%">優惠券</el-aside>     
        <el-main style="padding-top: 5px; background-color: #fafaec">      
  <el-popover
    placement="bottom-start"
    title="優惠券列表"
    :width="400"
    trigger="hover"
    content="this is content, this is content, this is content"
  >
  <ul  class="infinite-list" style="overflow: auto;"  >
    <el-card class="box-card"  v-for="(coupon,index) in sellerCouponList" :key="index" style="width: 100%;">
    <template #header >
        <div class="card-header" style="font-size: 20px;" >
        <span v-if="coupon.type=='rate'" >{{coupon.Discount*10}}折</span>
        <span v-else>折${{coupon.Discount}}</span>
         <span>低消${{coupon.minSpending}}</span>
         <span>X{{coupon.perPersonQuota}}</span>
        <el-button v-if="userType=='notLogin'" class="elButton" color="#f9a751" @click="couponButton($event,coupon.id)">領取</el-button>
        <el-button v-else-if="checkCoupon(coupon.id)" class="elButton" color="#f9a751" @click="couponButton(coupon.id)">領取</el-button>
        <el-button v-else class="elButton" color="#f9a751" disabled>已領取</el-button>
      </div>
    </template>
    
    <div  class="text item">使用時間:</div>
    <div  class="text item">{{newDate(coupon.startTime)}} ~ {{newDate(coupon.endTime)}}</div>
  </el-card>
  </ul>
    <template #reference >  
        <div>
           <el-button  v-for="(coupon,index) in sellerCouponList" :key="index" type="warning" disabled color="#ff4000">
                  <span v-if="coupon.type=='rate'" >{{coupon.Discount*10}}折</span>
                  <span v-else>折${{coupon.Discount}}</span>
            </el-button>
        </div>
    </template>
     </el-popover>
     </el-main>
  </el-container>

</template>
<script setup>
import { ElPopover, ElButton,ElCard,ElNotification,ElMain,ElAside,ElContainer } from "element-plus";
import { ref, onMounted } from 'vue'
import { CookieAxios } from "../../../service/api";
import router from "../../../router";
import axios from "axios";
const props = defineProps(["ProductPageId"])
const sellerCouponList = ref(['']);
const userCouponList = ref({});
const userType = ref();

const checkCoupon = (id) => { 
  for (let i = 0; i < userCouponList.value.length; i++) { 
    if (userCouponList.value[i] == id) {
       return false;
    }
  }
    return true;
}
onMounted(() => { 
getUserAndSellerCouponList()
})
const getUserAndSellerCouponList =(async () => { 
const res= await CookieAxios.get(`/public/SellerCoupon?productPageId=${props.ProductPageId}`)
  sellerCouponList.value = res.data.data.seller;
  userType.value = res.data.data.userType;
  if (userType.value == 'login') {
    userCouponList.value = res.data.data.userCoupon;
  }
})

const couponButton = async (couponId) => { 
  if (userType.value != 'notLogin') {
    const req = await CookieAxios.post('/addCoupon', null, { params: { couponId: couponId } });
    console.log(req.data.msg)
    if (req.data.msg == '領取成功') { 
          ElNotification({
            title: '領取成功',
            position: 'bottom-right',
            type:'success'
       })
    }
    getUserAndSellerCouponList()
     return 
  } else { 
      router.push("/login")
  }

}


const newDate = (time) => { 
let date = new Date(time); // 假設 coupon.startTime 是一個 Date 物件或類似的日期時間表示方式
let year = date.getFullYear();
let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JS
let day = date.getDate().toString().padStart(2, '0');
let hours = date.getHours().toString().padStart(2, '0');
let minutes = date.getMinutes().toString().padStart(2, '0');
let seconds = date.getSeconds().toString().padStart(2, '0');
return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
</script>
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  font-size: 12x;
}
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>