<template>
  <div class="cartDiv">
   <el-button type="danger" @click="drawer = true" class="bi bi-cart el-button--large">
      購物車
    </el-button>

    <el-drawer
      v-model="drawer"
      title="I am the title"
      :with-header="false"
      size="70%"
    >
      <div v-if="store.getters.Cart.length > 0">
        <el-card
          :body-style="{ padding: '10px' }"
          style="background-color: rgb(255, 255, 255); width: 100%"
        >
          <el-card
            :body-style="{ padding: '10px' }"
            style="background-color: rgb(255, 255, 255); width: 100%"
          >
            <ElContainer>
              <ElMain style="width: 5%"> </ElMain>
              <ElMain
                style="width: 10%; background-color: #ffffff"
                class="main"
              >
                <span class="truncate">圖片</span>
              </ElMain>
              <ElMain
                style="width: 30%; background-color: #ffffff"
                class="main"
              >
                <span class="truncate">名稱</span>
              </ElMain>
              <ElMain
                style="width: 20%; background-color: #ffffff"
                class="main"
              >
                <span class="truncate">規格</span>
              </ElMain>
              <ElMain
                style="width: 10%; background-color: #ffffff"
                class="main"
              >
                <span class="truncate">價錢</span>
              </ElMain>
              <ElMain
                class="main"
                style="width: 10%; background-color: #ffffff"
              >
                <span class="truncate">數量</span>
              </ElMain>
              <ElMain
                style="width: 10%; background-color: #ffffff"
                class="main"
              >
                <span class="truncate">總計</span>
              </ElMain>
              <ElMain class="main">
                <div style="width: 60px"></div>
              </ElMain>
            </ElContainer>
          </el-card>
        </el-card>
        <el-scrollbar height="700px">
          <!--遍歷賣家購物車-->
          <el-row v-for="c in store.state.Cart" :key="c">
            <el-card
              :body-style="{ padding: '10px' }"
              class="box-card"
              style="
                background-color: rgb(245, 245, 245);
                margin-top: 10px;
                width: 100%;
              "
            >
              <span>{{ c.sellerName }}</span>
              <!--遍歷商品-->
              <el-row v-for="msg in c.productMsg" :key="msg.cartId">
                <el-card
                  :body-style="{ padding: '10px' }"
                  class="box-card"
                  style="
                    background-color: rgb(245, 245, 245);
                    width: 100%;
                    margin-top: 5px;
                  "
                  v-if="msg.stocksType=='inStock'"
                >
                  <ElContainer style="background-color: rgb(245, 245, 245)">
                    <ElMain style="width: 5%">
                      <el-checkbox-group v-model="selectedProducts">
                        <el-checkbox
                          :label="msg"
                          size="large"
                          >{{
                        }}</el-checkbox>
                      </el-checkbox-group>
                    </ElMain>
                    <ElMain
                      style="
                        height: 80px;
                        width: 10%;
                        background-color: rgb(245, 245, 245);
                        padding: 0px;
                      "
                      class="main"
                    >
                      <img
                        style="
                          max-width: 100%;
                          max-height: 100%;
                          width: auto;
                          height: auto;
                        "
                        :src="msg.productPhoto"
                      />
                    </ElMain>
                    <ElMain
                      style="width: 30%; background-color: #f5f5f5"
                      class="main"
                    >
                      <span class="truncate">{{ msg.productName }}</span>
                    </ElMain>
                    <ElMain
                      style="width: 20%; background-color: #f5f5f5"
                      class="main"
                    >
                      <span
                        v-if="msg.productMainName != '~NoSpecification'"
                        class="truncate"
                        >{{ msg.productMainName }}</span
                      >
                      <span
                        v-if="msg.productSecondName != '~NoSpecification'"
                        class="truncate"
                        >{{ "/" + msg.productSecondName }}</span
                      >
                    </ElMain>
                    <ElMain
                      style="width: 10%; background-color: #f5f5f5"
                      class="main"
                    >
                      <span class="truncate">{{
                        Intl.NumberFormat().format(msg.productPrice)
                      }}</span>
                    </ElMain>
                    <ElMain
                      style="width: 10%; background-color: #f5f5f5"
                      class="main"
                    >
                      <el-input-number
                        v-model="msg.productCount"
                        :min="1"
                        :max="msg.stocks"
                        @change="countChange(msg.cartId, msg.productCount)"
                      />
                    </ElMain>
                    <ElMain
                      style="width: 10%; background-color: #f5f5f5"
                      class="main"
                    >
                      <span class="truncate">{{
                        Intl.NumberFormat().format(
                          msg.productPrice * msg.productCount
                        )
                      }}</span>
                    </ElMain>
                    <ElMain style="width: 5%" class="main">
                      <ElButton @click="deleteCart(msg.cartId)"
                        ><span>刪除</span></ElButton
                      >
                    </ElMain>
                  </ElContainer>
                </el-card>
                <!-- 沒庫存 -->
                <el-card
                  :body-style="{ padding: '10px' }"
                  class="box-card"
                  style="
                    background-color: rgb(245, 245, 245);
                    width: 100%;
                    margin-top: 5px;
                  "
                   v-else-if="msg.stocksType=='emptyStocks'"
                >  
                  <ElContainer style="background-color: rgb(245, 245, 245)">
                    <ElMain style="width: 5%; padding: 20px 0px 20px 0px;">
                     <el-button    disabled style="width: 100%;color: #f80707;">無庫存</el-button>
                    </ElMain>
                  
                    <ElMain
                      style="
                        height: 80px;
                        width: 10%;
                        background-color: rgb(245, 245, 245);
                        padding: 0px;
                      "
                      class="main"
                    >
                    
                      <img
                        style="
                          max-width: 100%;
                          max-height: 100%;
                          width: auto;
                          height: auto;
                        "
                        :src="msg.productPhoto"
                      />
                    </ElMain>
                    <ElMain
                      style="width: 30%; background-color: #f5f5f5"
                      class="main"
                    >
                      <span class="truncate">{{ msg.productName }}</span>
                    </ElMain>
                    <ElMain
                      style="width: 20%; background-color: #f5f5f5"
                      class="main"
                    >
                      <span
                        v-if="msg.productMainName != '~NoSpecification'"
                        class="truncate"
                        >{{ msg.productMainName }}</span
                      >
                      <span
                        v-if="msg.productSecondName != '~NoSpecification'"
                        class="truncate"
                        >{{ "/" + msg.productSecondName }}</span
                      >
                    </ElMain>
                    <ElMain
                      style="width: 10%; background-color: #f5f5f5"
                      class="main"
                    >
                      <span class="truncate">{{
                        Intl.NumberFormat().format(msg.productPrice)
                      }}</span>
                    </ElMain>
                    <ElMain
                      style="width: 10%; background-color: #f5f5f5"
                      class="main"
                    >
                      <el-input-number
                        v-model="msg.productCount"
                        :min="1"
                        :max="msg.stocks"
                        disabled
                      />
                    </ElMain>
                    <ElMain
                      style="width: 10%; background-color: #f5f5f5"
                      class="main"
                    >
                      <span class="truncate">{{
                        Intl.NumberFormat().format(
                          msg.productPrice * msg.productCount
                        )
                      }}</span>
                    </ElMain>
                    <ElMain style="width: 5%" class="main">
                      <ElButton @click="deleteCart(msg.cartId)"
                        ><span>刪除</span></ElButton
                      >
                    </ElMain>
                  </ElContainer>
        
                </el-card>
              </el-row>


              <el-row v-for="coupon in couponMsg" :key="coupon.sellerId">
                <el-col v-if="c.id == coupon.sellerId" :span="24">
                  <el-card
                    :body-style="{ padding: '10px' }"
                    class="box-card"
                    style="
                      background-color: rgb(245, 245, 245);
                      width: 100%;
                      margin-top: 5px;
                    "
                  >
                    <!-- 優惠券選擇 -->
                    
                    <el-popover
                      placement="bottom"
                      :width="400"
                      trigger="hover"
                      content="暫無優惠"
                    >
                    <!-- 彈框內容 -->
                    <ul  class="infinite-list" style="overflow: auto; "  >
                    <el-card class="box-card"  v-for="sellerCoupon in coupon.sellerCoupon" :key="sellerCoupon.couponId" style="width: 100%;">
                    <div v-if="coupon.bestCouponId==sellerCoupon.couponId" ><span style="font-size: 20px;color:#f08383;">最佳首選</span></div>
                      <el-row>    
                          <el-col :span="18">
                            <div v-if="sellerCoupon.type=='rate'" >
                            <div style="font-size: 20px;">{{ sellerCoupon.discountRate*10 }}折</div>    
                            <div>低消:{{sellerCoupon.miniumSpendingAmoun}} 最高折抵:{{sellerCoupon.discountMaximum}}</div>
                            <div>有效日期:{{newDate(sellerCoupon.endTime)}}</div>
                          </div>
                          <div v-else-if="sellerCoupon.type=='amount'" >
                            <span style="font-size: 20px;">折${{sellerCoupon.discountAmount}}</span>
                            <div>低消:{{sellerCoupon.miniumSpendingAmoun}}</div>
                            <div>有效日期:{{newDate(sellerCoupon.endTime)}}</div>
                          </div>
                          </el-col>
                           <el-col :span="6">
                        <el-checkbox-group v-model="selectCoupon">
                          <!--如果使用者優惠券中有此優惠券且數量大於0-->
                          <ElButton v-if="couponType(sellerCoupon.couponId,coupon.sellerId)=='沒領過'" @click="addCoupon(sellerCoupon.couponId)">領取</ElButton>
                          <ElButton v-else-if="couponType(sellerCoupon.couponId,coupon.sellerId)=='領過用光'" :disabled=true >已達上限</ElButton>
                        <el-checkbox
                          v-else-if="couponType(sellerCoupon.couponId,coupon.sellerId)=='領過沒用光'"
                          :label="{id: sellerCoupon.couponId, sellerId: coupon.sellerId,sellerCoupon:sellerCoupon}"
                           :disabled="checkBoxControl(sellerCoupon.couponId,sellerCoupon.miniumSpendingAmoun,sellerPrice(coupon.sellerId))"
                          size="large"
                          >{{
                        }}</el-checkbox>
                      </el-checkbox-group>
                        </el-col>
                      </el-row>
                      </el-card>
                     </ul>
                      <template #reference>
                        <el-button class="m-2" v-if="coupon.sellerCoupon.length>0">優惠券</el-button>
                      </template>
                    </el-popover>
                    <!-- 判斷有沒有選擇優惠券 -->
                     <span  v-if="coupon.sellerCoupon.length>0">{{ selectSellerCoupon(coupon.sellerId)}}</span>
                     <span  v-else>暫無可用優惠券</span>
                    <!-- //////////////////-->
                  </el-card>
                </el-col>
              </el-row>


            </el-card>
          </el-row>
        </el-scrollbar>
        <el-card
          style="
            background-color: rgb(234, 173, 173);
            width: 97%;
            position: absolute;
            bottom: 0;
          "
        >
          <el-row>
            <el-col :span="3">
              <el-checkbox v-model="selectAll" @change="toggleSelectAll"
                >全選</el-checkbox
              ></el-col
            >
            <el-col :span="6"><span>折扣{{discount()}}</span></el-col>
            <el-col :span="5"
              ><span style="font-size: 22px"
                >{{ selectedProducts.length }}項商品</span
              ></el-col
            >
            <el-col :span="5"
              ><span style="font-size: 22px"
                >總金額$:{{new Intl.NumberFormat().format(selectPruductPrice()-discount())}}</span
              ></el-col
            >
            <el-col :span="5"
              ><ElButton style="width: 100%" @click="checkout()"
                >結帳</ElButton
              ></el-col
            >
          </el-row>
        </el-card>
      </div>
      <div v-else><ElCard><span>暫無商品</span></ElCard> </div>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  ElButton,
  ElDrawer,
  ElRow,
  ElCard,
  ElMain,
  ElContainer,
  ElCheckbox,
  ElCheckboxGroup,
  ElScrollbar,
  ElInfiniteScroll,
  ElInputNumber,
  ElCol,
  ElPopover,
  ElNotification,
} from "element-plus";
import { ref, onMounted, watch } from "vue";
import { axios, CookieAxios } from "../../../service/api";
import { useStore } from "vuex";
import { errorMsg ,infoMsgTimer} from "../../../service/sweetalert2.js";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const isLoggedIn = localStorage.getItem("loggedIn") == "true";
const drawer = ref(false);

onMounted(() => {
  if (isLoggedIn) {
    store.dispatch("getShoppingCart");
  }
});


//存放選取商品
const selectedProducts = ref([]);
//算選取商品總價
const selectPruductPrice = () => {
  let price = 0;
  for (let i = 0; i < selectedProducts.value.length; i++) {
    price +=
      selectedProducts.value[i].productPrice *
      selectedProducts.value[i].productCount;
  }
  return price;
};
//結帳
const checkout = async() => {
  let checkoutProductList = new Array;
  let checkoutCouponList = selectCoupon.value;
  
  let check = new Array;
  //判斷選取
  if (selectedProducts.value.length > 0) {
    
  for (let i = 0; i < selectedProducts.value.length; i++) { 
    checkoutProductList.push(selectedProducts.value[i].cartId)
    check.push({id:selectedProducts.value[i].cartId,count:selectedProducts.value[i].productCount})
    }
  const res = await CookieAxios.post('/shoppingCartCheckAvailability', check)
   //判斷庫存量
    if (res.data.code == 0 && res.data.msg == '請先填寫地址') { 
      console.log('進入')
      infoMsgTimer("請先填寫地址", 2000);
      setTimeout(() => {
        router.push("/user/account/address");
      }, 500);
      return
    }

    if (res.data.code == 1) {
      store.dispatch("getCheckoutProductList", { checkoutProductList: checkoutProductList});
      store.dispatch("getCheckoutCouponList", { checkoutCouponList: checkoutCouponList });
      router.push({ path: "/checkout" });
    } else { 
      infoMsgTimer('購物車商品資訊有變動', 1500)
       setTimeout(() => {
    location.reload();
  }, 1500);
    }
}
  else {
   errorMsg("請先勾選商品");
 }
};

//全選按鈕狀態
const selectAll = ref(false);
//點擊全選按鈕事件
const toggleSelectAll = () => {

      if (selectAll.value) {
    // 當全選時，將所有商品添加到 selectedProducts 中
    selectedProducts.value = store.state.Cart.flatMap((c) => 
      c.productMsg.filter(msg => msg.stocksType !== 'emptyStocks')
    );
  } else {
      // 當取消全選時，清空 selectedProducts
    selectedProducts.value = [];
  }
};
// 監聽 selectedProducts 的變化，以確保全選的狀態是正確的
watch(selectedProducts, (newVal) => {
  if (newVal.length === store.state.Cart.flatMap((c) => c.productMsg).length) {
    selectAll.value = true;
  } else {
    selectAll.value = false;
  }
  test(selectedProducts.value);
});

//更改購物車
const countChange = async (id, count) => {
  await store.dispatch("changeShoppingCartProductCount", { id, count });
  test(selectedProducts.value);
};
//刪除按鈕
const deleteCart = (id) => {

 console.log(selectedProducts.value)
  const index = selectedProducts.value.findIndex(product => product.cartId === id);
  selectedProducts.value.splice(index, 1);
  console.log(selectedProducts.value)
  let arr = new Array();
  arr.push(id);
  store.dispatch("deleteShoppingCart", { ids: arr });
};
//新增優惠券
const addCoupon = async (couponId) => { 
  const req = await CookieAxios.post('/addCoupon', null, { params: { couponId: couponId } });
  if (req.data.msg == '領取成功') { 
        ElNotification({
          title: '領取成功',
          position: 'bottom-right',
          type:'success'
       })
   }
  test(selectedProducts.value);
}

//存放優惠券訊息
const couponMsg = ref([]);
//計算最佳優惠券，獲取選取購物車的賣家優惠券資訊及最佳優惠券
const test = async (arr) => {
  let cartIds = new Array();
  for (let i = 0; i < arr.length; i++) {
    cartIds.push(arr[i].cartId);
  }
  const res = await CookieAxios.post("/ShoppingCartBestCoupon", { cartIds });
  couponMsg.value = res.data.data;
};
//計算折扣金額
const discount = () => { 
  let total = 0;
  if (selectCoupon.value.length > 0) { 
  for (let i = 0; i < selectCoupon.value.length; i++) { 
    let couponList = selectCoupon.value[i];
    if (couponList.sellerCoupon.type == 'amount') { 
      total += couponList.sellerCoupon.discountAmount;
    } else {
      if (sellerPrice(couponList.sellerId) - (sellerPrice(couponList.sellerId) * couponList.sellerCoupon.discountRate) > couponList.sellerCoupon.discountMaximum) {
        total +=couponList.sellerCoupon.discountMaximum
      } else { 
        total +=(sellerPrice(couponList.sellerId)-(sellerPrice(couponList.sellerId) * couponList.sellerCoupon.discountRate))
      }
    }
  }
  }
  return Math.ceil(total);
}
//判斷是否有選擇優惠券
const selectSellerCoupon = (sellerId) => { 
  for (let i = 0; i < selectCoupon.value.length; i++) { 
    let product=selectCoupon.value[i]
    if (product.sellerId == sellerId) {
      let sellerCoupon = product.sellerCoupon;
      if (sellerCoupon.type == "rate") {
        let price = (sellerPrice(sellerId) - (sellerPrice(sellerId) * sellerCoupon.discountRate)) > sellerCoupon.discountMaximum ? sellerCoupon.discountMaximum : Math.ceil((sellerPrice(sellerId) * sellerCoupon.discountRate));
        return `${sellerCoupon.discountRate*10}折\t最高折抵${sellerCoupon.discountMaximum}\t以折扣:${price}`;
      } else { 
        return `折抵${sellerCoupon.discountAmount}`;
      } 
    }
  }

  return '請選擇';
}
//存放選取優惠券
const selectCoupon=ref([]) 
watch(selectCoupon, () => {
    const lastIndex = selectCoupon.value.length - 1;
    const lastCoupon = selectCoupon.value[lastIndex];
    const existingIndex = selectCoupon.value.findIndex((coupon, idx) => coupon.sellerId === lastCoupon.sellerId && idx !== lastIndex);
    if (existingIndex !== -1) {
        selectCoupon.value.splice(existingIndex, 1);
    }
});
//判斷優惠券顯示狀態(查看使用者是否有領取，有領取過是否還有數量)
const couponType = (couponId, sellerId) => {
  //所有賣家訊息
  let msg = couponMsg.value;
  for (let i = 0; i < msg.length; i++) { 
    //找出賣家訊息陣列中為sellerId的
    if (msg[i].sellerId == sellerId) {
      //賣家優惠券陣列
      let userCoupon = msg[i].userCoupon;
      for (let j = 0; j < userCoupon.length; j++) { 
        //檢查是否領過此優惠
        if (userCoupon[j].couponId == couponId) { 
              //檢查是否還有couponCount
          if (userCoupon[j].couponCount>0) { 
                return '領過沒用光';
          } else {
                return '領過用光';
          }
        }
      }
    }
  }
  return '沒領過';
}

//優惠券時間
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
//單賣家選取金額
const sellerPrice = (sellerId) => { 
let price = 0;
  for (let i = 0; i < selectedProducts.value.length; i++) {
    if (selectedProducts.value[i].sellerId == sellerId) { 
     price +=
      selectedProducts.value[i].productPrice *
      selectedProducts.value[i].productCount;
    }
  }
  return price;
}
//優惠券checkBox控制根據，單賣家選取金額判斷
const checkBoxControl = (couponId, miniumSpendingAmoun,price) => { 
  if (price >= miniumSpendingAmoun) {
    return false;
  } else {
    const index = selectCoupon.value.findIndex(coupon => coupon.id === couponId);
    if (index !== -1) {
      selectCoupon.value.splice(index, 1);
    }
    return true;
  }
}
</script>
<style scoped>
.truncate {
  display: block; /* or inline-block, depending on your needs */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; /* or any other value that fits your design */
}
.main {
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
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

.cartDiv{

  margin-right: 30px;
}
</style>
