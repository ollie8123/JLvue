<template>
  <div>
        <el-container style="height: auto">
          <el-aside style="background-color: rgb(242, 194, 132); width: 40%">
            
            <product_page_photo :ProductPageId="ProductPageId" :photoId="select.main"></product_page_photo>
          </el-aside>
            <el-main style="background-color: rgb(231, 165, 80); width: 40%">
            <el-main style="padding: 10px;background-color: rgb(242, 194, 132) ;font-size: 30px;">{{productPage.name}}</el-main>
            <el-main style="padding: 0 10px 0 10px; background-color: rgb(246, 212, 166)">
              <span v-if="productPage.averageRating!=0"><el-rate disabled  size="large" v-model=productPage.averageRating /></span>
              <span v-else>暫無評價</span>
              <el-divider direction="vertical" />
              <span>已售出 {{productPage.sales}}</span>
            </el-main>
          <el-container>
           <el-aside style="padding: 10px; background-color: rgb(240, 240, 240); width: 20% ;font-size: 20px;">價格</el-aside>
           <el-main style="padding: 10px; background-color: rgb(247, 243, 238);font-size: 30px;">
                 <span v-if="price!=''">{{ `$`+price}}</span>
                 <span v-else-if="priceScope.min==priceScope.max">{{`$`+priceScope.min}}</span>
                 <span v-else>{{ `$`+priceScope.min+` ~ $`+priceScope.max}}</span>
          </el-main>
         </el-container>
         <!--優惠券-->
        <product_page_coupon :ProductPageId="ProductPageId"></product_page_coupon>
          
        <el-container v-if="specificationsMainName!=''">
           <el-aside style="padding: 10px; background-color: rgb(240, 240, 240); width: 20%">{{specificationsMainName}}</el-aside>
           <el-main style="padding: 10px; background-color: rgb(247, 243, 238)">

            <el-checkbox-group v-model="mainCheckBox" v-for="main in mains" :key="main.Id" style="float: left;" :disabled="mainDisabled(main.Id)" fill="#f9a751">
             <el-checkbox-button  :label="main.Id"><span style="font-size: 20px;">{{main.name}}</span></el-checkbox-button>
            </el-checkbox-group>

          </el-main>
         </el-container>

         <el-container v-if="specificationsSecondName!=''" >
           <el-aside style="padding: 10px;  background-color: rgb(240, 240, 240); width: 20%">{{specificationsSecondName}}</el-aside>
           <el-main style="padding: 10px; background-color: rgb(247, 243, 238)">

            <el-checkbox-group v-model="secondCheckBox" 
            v-for="second in seconds" 
            :key="second.Id" 
            style="float: left; " 
            :disabled="secondDisabled(second.Id)"
            fill="#f9a751"
            >
              <el-checkbox-button :label="second.Id"><span style="font-size: 20px;">{{second.name}}</span></el-checkbox-button>
          </el-checkbox-group>
          </el-main>
         </el-container>
         <el-container v-else >
             <el-aside style="padding: 10px;  background-color: rgb(240, 240, 240); width: 20%"></el-aside>
           <el-main style="padding: 10px; background-color: rgb(247, 243, 238);height: 75px;">
          </el-main>
        </el-container>
        <el-container>
         <el-aside style="padding: 10px; background-color: rgb(240, 240, 240); width: 20%"><span>數量</span></el-aside>
            <el-main style="padding: 10px; background-color: rgb(247, 243, 238);font-size: 20px; "> 
                <el-input-number v-if="stocks>0" v-model="constNum" :min="1" :max="stocks" @change="handleChange" />  
                <span v-else style="font-size: 20px;">請選擇規格</span>
                <span v-if="stocks!=''"> 庫存數:{{stocks}}</span>
            </el-main>
        </el-container>
        <el-main style="padding: 10px;background-color: rgb(242, 194, 132)">
               <el-button style="margin-left: 20%;" class="elButton" color="#f9a751" @click="addCart" plain>加入購物車</el-button>
               <el-button class="elButton" color="#f9a751" plain>直接購買</el-button>
       </el-main>
          </el-main>
        </el-container>
  </div>
</template>

<script setup >
import { ElHeader, ElMain, ElContainer, ElAside, ElButton, ElRow, ElCol, ElDivider, ElCheckboxButton, ElCheckboxGroup, ElInputNumber, ElRate } from "element-plus";
import {errorMsg,errorsMsgTimer,successMsgTimer }from"../../../service/sweetalert2"
import { CookieAxios } from "../../../service/api";
import "element-plus/dist/index.css";
import product_page_photo from './product_page_photo.vue';
import product_page_coupon from "./product_page_coupon.vue";
import { ref, onMounted, watch } from "vue";
import { useStore } from 'vuex';
const store = useStore();
const props = defineProps(["ProductPageId"]);
const productPage = ref([])
const priceScope = ref({ max:'',min:''})
//主規格、次規格名稱
const specificationsMainName = ref('')
const specificationsSecondName = ref('')
//主規格、次規格選項
const mains = ref([]);
const seconds = ref([]);
//主規格、次規格CheckBox控制
const mainCheckBox = ref()
const secondCheckBox = ref()
//監聽主規格按鈕，點擊時改變值，點選新的選項時移除舊選項
watch(mainCheckBox, (newVal) => {
  if (newVal.length > 1) {
      mainCheckBox.value.splice(0, 1)
    }
  select.value.main = mainCheckBox.value
   
})
//監聽次規格按鈕，點擊時改變值，點選新的選項時移除舊選項
watch(secondCheckBox, (newVal) => {
  if (newVal.length > 1) {
    secondCheckBox.value.splice(0, 1)
    }
    select.value.second = secondCheckBox.value
})
const select = ref({ main: '', second: '' })
//主規格無庫存id列表
const mainNoStock=ref([])
//次規格無庫存id列表
const secondNoStock = ref([])
//庫存
const stocks=ref('')
//價格
const price = ref('')

const constNum = ref(1)
//數量
const handleChange = () => {

}
watch(select.value, async () => { 
  constNum.value = 1;
    if (specificationsSecondName.value != '') {
        if (select.value.second == '' && select.value.main == '') {
            mainNoStock.value = '';
            secondNoStock.value = '';
            price.value = '';
            stocks.value = '';
        } else if (select.value.second != '' && select.value.main != '') {
          const req = await CookieAxios.get(`/public/ProductPageSelectProduct?mainId=${select.value.main}&secondId=${select.value.second}`);
                price.value = req.data.data.product.price;
                stocks.value = req.data.data.product.stocks;
                mainNoStock.value = req.data.data.NoStockMain;
                secondNoStock.value = req.data.data.NoStockSecond;
                return
        } else if (select.value.main != '' && select.value.second == '') {
          const req = await CookieAxios.get(`/public/selectNoStockProduct?mainId=${select.value.main}`);
                secondNoStock.value = req.data.data;
                mainNoStock.value = '';
                price.value = '';
                stocks.value = '';
        } else if (select.value.main == '' && select.value.second != '') {
          const req = await CookieAxios.get(`/public/selectNoStockProduct?secondId=${select.value.second}`);
                mainNoStock.value = req.data.data;
                secondNoStock.value = '';
                price.value = '';
                stocks.value = '';
        }
    } else if(specificationsSecondName.value == ''){ 
        if (select.value.main != '') {
          const req = await CookieAxios.get(`/public/ProductPageSelectProductByMainId?mainId=${select.value.main}`);
                price.value = req.data.data.price;
                stocks.value = req.data.data.stocks;    
        } else { 
            price.value = ''
            stocks.value = '';
        }
    }
})
//判斷是否有庫存
const mainDisabled = (id) => { 
        for (let i = 0; i < mainNoStock.value.length; i++) { 
        if (id == mainNoStock.value[i]) { 
            return true;
        }
    }
     return false;
}
//次類是否有庫存
const secondDisabled = (id) => { 
        for (let i = 0; i < secondNoStock.value.length; i++) { 
        if (id == secondNoStock.value[i]) { 
            return true;
        }
    }
     return false;
}


//加入購物車
const addCart = async () => {
  if (constNum.value == null) { 
    constNum.value = 0;
    return;
  }
   const cartMsg = {
  productPageId: Number(props.ProductPageId),
  count: constNum.value,
  mainId: 0,
  secondId:0
  };
  // if () {
  //   判斷購物車是否有商品，如果有加上數量超過庫存則失敗
  // }
  let req;
  if (specificationsMainName.value == '') {
      req = await CookieAxios.post('/productAddShoppingCart', cartMsg);
  
  } else if (specificationsSecondName.value == '' && (mainCheckBox.value != '' && mainCheckBox.value !== undefined)) {
     cartMsg.mainId=mainCheckBox.value[0]
      req = await CookieAxios.post('/productAddShoppingCart', cartMsg);
  } else if (specificationsSecondName.value != '' && specificationsMainName.value != '' && mainCheckBox.value != '' && mainCheckBox.value !== undefined && secondCheckBox.value != '' && secondCheckBox.value !== undefined) {
    cartMsg.mainId = mainCheckBox.value[0]
    cartMsg.secondId=secondCheckBox.value[0]
     req = await CookieAxios.post('/productAddShoppingCart', cartMsg);
  } else { 
    errorsMsgTimer("未選取規格", 1000)
    return
  }

  if (req.data.code === 1) {
    await store.dispatch('getShoppingCart')
    successMsgTimer(req.data.msg, 1000)
  } else if (req.data.code === 0) { 
    errorsMsgTimer(req.data.msg, 1000)
  }
}

onMounted(() => {
  CookieAxios.get("/public/selectProduct?ProductPageId=" + props.ProductPageId).then(
    (req) => {
          productPage.value = req.data.data.productPage;
          priceScope.value.max = req.data.data.productPage.maxPrice;
          priceScope.value.min = req.data.data.productPage.minPrice;
          if (req.data.data.specifications.main != "~NoSecondSpecificationClass") {
              specificationsMainName.value = req.data.data.specifications.main;
            mains.value = req.data.data.mains;
              if (req.data.data.specifications.second != "~NoSecondSpecificationClass") {
                  specificationsSecondName.value = req.data.data.specifications.second
                  seconds.value = req.data.data.sends;
              } else {
                  CookieAxios.get(`/public/SelectNoStocksMainIdByProductPageId?productPageId=${props.ProductPageId}`).then((req) => {
                      mainNoStock.value = req.data.data;
                  })
              }
          } else { 
            CookieAxios.get(`/public/ProductPageSelectProductStocks?productPageId=${props.ProductPageId}`).then((req) => {
              stocks.value = req.data.data;
        })
    }
    }
  );
});
</script>

<style scoped>
.elButton{
  width: 200px;
  height: 50px;
}
</style>