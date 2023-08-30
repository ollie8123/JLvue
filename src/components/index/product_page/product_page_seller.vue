<template>
    <div>
         <el-main style="background-color: rgb(242, 194, 132);padding:10px">
          <el-container >
            <ElMain style="padding: 0px 20px;">
                <ElContainer>
             <ElAside 
             style="padding: 10px; width: 90px; height: 90px;
              display: flex; align-items: center; justify-content: center; overflow: hidden;
              border-radius:50% ">
            <img style="max-width: 130%; max-height: 130%;"
              :src=image> 
             </ElAside>
             <ElMain>
                <div>賣家名稱:</div> 
                <div style="padding-top: 5px;">{{seller.account}}</div>
             </ElMain>
        </ElContainer>
         </ElMain>
            
            <ElMain>
                 <div>賣場評價:</div> 
                 <div style="padding-top: 5px;">{{seller.productReviewCount}}</div> 
            </ElMain>
            <ElMain>
                 <div>賣場商品:</div> 
                 <div style="padding-top: 5px;">{{seller.productCount}}</div> 
            </ElMain>
            <ElMain>
                 <div>加入時間:</div> 
                 <div style="padding-top: 5px;">{{newDate(seller.dataCreateTime)}}</div> 
            </ElMain>
          </el-container>
        </el-main>
    </div>
</template>

<script setup>
import { ElHeader, ElMain, ElContainer, ElAside, ElButton, ElRow, ElCol, ElDivider, ElCheckboxButton, ElCheckboxGroup } from "element-plus";
import { CookieAxios } from "../../../service/api";
const props = defineProps(["ProductPageId"]);
import { ref, onMounted, reactive } from "vue";
const seller = reactive({})
const newDate = (time) => { 
    const date = new Date(time);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`;
}
const image=ref('')
onMounted(async() => {
    CookieAxios.get(`/public/ProductPageSelectSeller?productPageId=${props.ProductPageId}`).then((req) => { 
        Object.assign(seller, req.data.data) 
    })
  try {
    const response = await CookieAxios.post('/public/productPageSellerPhoto', {ProductPageId:props.ProductPageId});
        
        if (response.status === 204) {  // Checking for NO_CONTENT status
            return;
        }
        
        image.value = `data:image/*;base64,${response.data}`;

    } catch (error) {
        console.error("An error occurred while fetching user photo:", error);
    }
})


</script>

<style>

</style>