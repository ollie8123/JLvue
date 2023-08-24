<template>
  <div>
    <el-main style="background-color: rgb(236, 193, 193); margin-top: 5px">
        <div style="font-size: 30px;">商品評價</div>
         <el-card style="background-color: rgb(238, 230, 219);">
          <ElContainer>
           <el-aside style="width: 20%; display: flex; justify-content: center; align-items: center; flex-direction: column;">
                 <div ><span style="font-size: 25px;">{{reviewMsg.avg }}</span><span>/5</span></div>
                 <el-rate disabled  size="large" v-model=reviewMsg.avg />
           </el-aside>
             <el-main style="margin-left: 0px;">
                 <el-button class="elButton" color="#f9a751" plain @click="choose(0)">全部評價({{reviewMsg.total}})</el-button>
                 <el-button class="elButton" color="#f9a751" plain @click="choose(5)">5星({{reviewMsg.level5}})</el-button>
                 <el-button class="elButton" color="#f9a751" plain @click="choose(4)">4星({{reviewMsg.level4}})</el-button>
                 <el-button class="elButton" color="#f9a751" plain @click="choose(3)">3星({{reviewMsg.level3}})</el-button>
                 <el-button class="elButton" color="#f9a751" plain @click="choose(2)">2星({{reviewMsg.level2}})</el-button>
                 <el-button class="elButton" color="#f9a751" plain @click="choose(1)">1星({{reviewMsg.level1}})</el-button>
            </el-main>
            </ElContainer>
         </el-card>
    <div v-if="reviewList.length>0">
      <el-row v-for="review in reviewList" :key="review">
          <!-- 顯示資料 -->
        <el-card  class="box-card" style="background-color: rgb(193, 230, 224);  margin-top: 10px;">
          <ElContainer>
             <ElAside 
             style="padding: 10px; width: 80px; height: 80px;
              display: flex; align-items: center; justify-content: center; overflow: hidden;
              border-radius:50% ">
            <img style="max-width: 140%; max-height: 140%;"
              :src=review.userPhotoPath> 
             </ElAside>
             <ElMain style="padding: 0px 20px 0px 20px;">
                <div >{{review.userAccount}}</div>
                <div> 
                   <el-rate disabled  text-color="#ff9900" score-template="{value} points" v-model=review.level />
                </div>
                <div  style="float: left; margin-right: 20px;">{{review.createTime}}</div>
                <div>{{review.mainClassName}}: {{review.mainName}} | {{review.secondClassName}} :{{review.secondName}}</div>
                <hr style="margin: 5px 0px 5px 0px;">
                <div>{{review.content}}</div>
             </ElMain>
            </ElContainer>
        </el-card>
      </el-row>
     </div>
     <div v-else>
      <el-card  class="box-card" 
      style="background-color: rgb(193, 230, 224);  
      margin-top: 10px ; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      flex-direction: column;">
            <span>暫無評價</span>
        </el-card>
     </div>

 <ElPagination
     style="margin-top: 10px;
       display: flex; 
      justify-content: center; 
      align-items: center;"
    :page-size="pageMsg.PageSize"
    layout="prev, pager, next"
    :total="Number(pageMsg.getTotalElements)"
      v-model:current-page="currentPage"
  />
    </el-main>
  </div>
</template>
<script setup>
import {
  ElPagination,
  ElIcon,
  ElRate,
  ElHeader,
  ElMain,
  ElContainer,
  ElAside,
  ElButton,
  ElRow,
  ElCol,
  ElDivider,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElCard
} from "element-plus";
import { ref, onMounted, watch } from "vue";
import { CookieAxios } from "../../../service/api";
const props = defineProps(["ProductPageId"]);
//評價統計訊息
const reviewMsg = ref({});
//頁面訊息
const pageMsg = ref({});
//評價陣列
const reviewList = ref('');

const currentPage = ref(1);
const level = ref(0)
watch(currentPage, () => {
    CookieAxios.get(
        `/public/SelectPageReview?productPageId=${props.ProductPageId}&pageNum=${currentPage.value-1}&level=${level.value}`
    ).then((res) => {
      reviewList.value = res.data.data.ProductReviewList;
      pageMsg.value = res.data.data.pageMsg;
      console.log(res.data.data)
    });
});

const choose = (newLevel) => {
  currentPage.value = 1;
  level.value = newLevel;
    CookieAxios.get(
        `/public/SelectPageReview?productPageId=${props.ProductPageId}&pageNum=${currentPage.value-1}&level=${level.value}`
    ).then((res) => {
      reviewList.value = res.data.data.ProductReviewList;
      pageMsg.value = res.data.data.pageMsg;
      console.log(res.data.data)
    });
  
};

onMounted(async() => {
   await CookieAxios.get(
        `/public/ProductPageReview?productPageId=${props.ProductPageId}`
    ).then((res) => {
        reviewMsg.value = res.data.data;
    });
 await CookieAxios.get(
        `/public/SelectPageReview?productPageId=${props.ProductPageId}&pageNum=0&level=0`
    ).then((res) => {
      reviewList.value = res.data.data.ProductReviewList;
      pageMsg.value = res.data.data.pageMsg;
    });
});
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
}
.elButton{
    color: black;
     width: 15%;  
}
</style>
