<template>
  <div class="cartDiv">
  <el-button type="danger" style="margin-left: 16px" @click="drawer = true" class="bi bi-cart el-button--large">
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
          style="background-color: rgb(245, 245, 245); width: 100%"
        >
          <el-card
            :body-style="{ padding: '10px' }"
            style="background-color: rgb(245, 245, 245); width: 100%"
          >
            <ElContainer>
              <ElMain style="width: 5%"> </ElMain>
              <ElMain
                style="width: 10%; background-color: #c7edcb"
                class="main"
              >
                <span class="truncate">圖片</span>
              </ElMain>
              <ElMain
                style="width: 30%; background-color: #ed9898"
                class="main"
              >
                <span class="truncate">名稱</span>
              </ElMain>
              <ElMain
                style="width: 20%; background-color: #c7edcb"
                class="main"
              >
                <span class="truncate">規格</span>
              </ElMain>
              <ElMain
                style="width: 10%; background-color: #ebed98"
                class="main"
              >
                <span class="truncate">價錢</span>
              </ElMain>
              <ElMain
                class="main"
                style="width: 10%; background-color: #98edcf"
              >
                <span class="truncate">數量</span>
              </ElMain>
              <ElMain
                style="width: 10%; background-color: #a798ed"
                class="main"
              >
                <span class="truncate">規格</span>
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
              <span>{{ c.account }}</span>
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
                      style="width: 30%; background-color: #ed9898"
                      class="main"
                    >
                      <span class="truncate">{{ msg.productName }}</span>
                    </ElMain>
                    <ElMain
                      style="width: 20%; background-color: #c7edcb"
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
                      style="width: 10%; background-color: #ebed98"
                      class="main"
                    >
                      <span class="truncate">{{
                        Intl.NumberFormat().format(msg.productPrice)
                      }}</span>
                    </ElMain>
                    <ElMain
                      style="width: 10%; background-color: #98edcf"
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
                      style="width: 10%; background-color: #a798ed"
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
                          <el-col :span="23">
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
                              <el-col :span="1">
                        <el-checkbox-group v-model="selectCoupon">
                        <el-checkbox
                          :label="{id: sellerCoupon.couponId, sellerId: coupon.sellerId}"
                          size="large"
                          >{{
                        }}</el-checkbox>
                      </el-checkbox-group>
                        </el-col>
                      </el-row>
                      </el-card>
                     </ul>
                      <template #reference>
                        <el-button class="m-2">優惠券</el-button>
                      </template>
                    </el-popover>
                    <!-- 判斷有沒有選擇優惠券 -->
                     <span>{{ selectSellerCoupon(coupon.sellerId)}}</span>
                    <!-- //////////////////-->
                    <div
                      v-for="sellerCoupon in coupon.sellerCoupon"
                      :key="sellerCoupon.couponId"
                    >
                      {{ sellerCoupon }}
                    </div>
                    <div>最好的{{ coupon.bestCouponId }}</div>
                    <div>{{ coupon }}</div>
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
            <el-col :span="6"></el-col>
            <el-col :span="5"
              ><span style="font-size: 22px"
                >{{ selectedProducts.length }}項商品</span
              ></el-col
            >
            <el-col :span="5"
              ><span style="font-size: 22px"
                >總金額:{{ `$` + selectPruductPrice() }}</span
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
      <div v-else><span>暫無商品</span></div>
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

} from "element-plus";
import { ref, onMounted, watch } from "vue";
import { CookieAxios } from "../../../service/api";
import { useStore } from "vuex";
import { errorMsg } from "../../../service/sweetalert2.js";
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
const aa = ref('');
//判斷是否有選擇
const selectSellerCoupon = (sellerId) => { 
  for (let i = 0; i < selectCoupon.value.length; i++) { 
    if (selectCoupon.value[i].id == sellerId) {
     console.log('aaaaaaaaaaaaaaaaaaaaa')
     console.log(sellerId)
     console.log(  selectCoupon.value[i].id)
    }
  }

}
//存放優惠券
const selectCoupon=ref([[]]) 
watch(selectCoupon, (newSelectCoupon, oldSelectCoupon) => {
  // 對於新選擇的每一個項目
  newSelectCoupon.forEach((newCoupon, newIndex) => {
    // 檢查是否存在相同的 sellerId
    const existingIndex = oldSelectCoupon.findIndex(oldCoupon => oldCoupon.sellerId === newCoupon.sellerId)
    if (existingIndex !== -1) {
      // 如果存在，替換舊項目
    selectCoupon.value.splice(existingIndex, 1)
    }
  })
  console.log(selectCoupon.value);
})
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
  return new Intl.NumberFormat().format(price);
};
//結帳
const checkout = () => {
  if (selectedProducts.value.length > 0) {
    store.dispatch("getCheckoutList", { checkoutList: selectedProducts.value });
    router.push({ path: "/checkout" });
  } else {
    errorMsg("請先勾選商品");
  }
};

//全選按鈕狀態
const selectAll = ref(false);
//點擊全選按鈕事件
const toggleSelectAll = () => {
  if (selectAll.value) {
    // 當全選時，將所有商品添加到 selectedProducts 中
    selectedProducts.value = store.state.Cart.flatMap((c) => c.productMsg);
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
//存放優惠券訊息
const couponMsg = ref([]);
//計算最佳優惠券(參數一)
const test = async (arr) => {
  let cartIds = new Array();
  for (let i = 0; i < arr.length; i++) {
    cartIds.push(arr[i].cartId);
  }
  const res = await CookieAxios.post("/ShoppingCartBestCoupon", { cartIds });
  couponMsg.value = res.data.data;
  console.log(couponMsg.value[0].sellerId);
};
//更改購物車
const countChange = async (id, count) => {
  await store.dispatch("changeShoppingCartProductCount", { id, count });
  test(selectedProducts.value);
};
//刪除按鈕
const deleteCart = (id) => {
  let arr = new Array();
  arr.push(id);
  store.dispatch("deleteShoppingCart", { ids: arr });
};
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
