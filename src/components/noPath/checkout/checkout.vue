<template>
  <div class="common-layout">
    <el-container>
      <el-main style="background-color: antiquewhite; height: auto">
        <el-card>
          <el-row type="flex" align="middle">
            <el-col :span="3">圖片</el-col>
            <el-col :span="8">名稱</el-col>
            <el-col :span="5">規格</el-col>
            <el-col :span="3" class="col">單價</el-col>
            <el-col :span="3" class="col">數量</el-col>
            <el-col :span="2" class="col">總價</el-col>
          </el-row>
        </el-card>
        <!-- 訂單陣列(根據賣家陣列) -->
        <el-row v-for="(seller, index) in sellerMsg" :key="seller.sellerId">
          <el-card
            :body-style="{ padding: '10px' }"
            class="box-card"
            style="
              background-color: rgb(245, 245, 245);
              margin-top: 10px;
              width: 100%;
            "
          >
            <el-row>
              <el-col :span="12" style="font-size: 20px">{{
                seller.sellerName
              }}</el-col>
            </el-row>
            <!-- 賣家商品陣列(根據賣家陣列裡面的商品陣列) -->
            <el-card
              v-for="product in seller.productList"
              :key="product.cartId"
              :body-style="{ padding: '10px' }"
              class="box-card"
              style="
                background-color: rgb(245, 245, 245);
                margin-top: 10px;
                width: 100%;
              "
            >
              <el-row type="flex" align="middle">
                <el-col :span="3">
                  <img
                    :src="product.productPhoto"
                    style="width: 40px; height: 40px"
                  />
                </el-col>
                <el-col :span="8">名稱{{ product.productName }}</el-col>
                <!-- ~NoSpecification -->
                <el-col :span="5">
                  <span v-if="product.productMainName != '~NoSpecification'">{{
                    product.productMainName
                  }}</span>
                  <span v-if="product.productSecondName != '~NoSpecification'"
                    >/{{ product.productSecondName }}</span
                  >
                </el-col>
                <el-col :span="3" class="col">{{
                  product.productPrice
                }}</el-col>
                <el-col :span="3" class="col">{{
                  product.cartProductQuantity
                }}</el-col>
                <el-col :span="2" class="col">{{
                  product.productPrice * product.cartProductQuantity
                }}</el-col>
              </el-row>
            </el-card>
            <!--遍歷商品-->
          </el-card>
          <!-- 地址、優惠券、總價... -->
          <el-card
            :body-style="{ padding: '10px' }"
            class="box-card"
            style="background-color: rgb(219, 214, 214); width: 100%"
          >
            <el-row v-if="checkSellerCoupon(seller.sellerId)">
              <el-col :span="11"></el-col>

              <el-col :span="6">優惠券 </el-col>

              <el-col :span="2"></el-col>
              <el-col :span="3"></el-col>
              <el-col :span="2" class="col"
                >折抵金額{{ sellerDiscount(seller.sellerId) }}</el-col
              >
            </el-row>
            <hr />
            <el-row style="margin-top: 10px">
              <el-col :span="4" class="col"></el-col>
              <el-col :span="5">寄送資訊</el-col>

              <el-col :span="2" v-if="resMsg[index].address.length > 0">{{
                resMsg[index].address[0].name
              }}</el-col>
              <el-col :span="3" v-if="resMsg[index].address.length > 0">{{
                resMsg[index].address[0].phone
              }}</el-col>
              <el-col :span="2" v-if="resMsg[index].address.length > 0">
                <span v-if="resMsg[index].address[0].type != 'Normal'">{{
                  resMsg[index].address[0].storeName
                }}</span>
                <span v-else>{{ resMsg[index].address[0].addressType }}</span>
              </el-col>
              <el-col
                class="col"
                :span="6"
                v-if="resMsg[index].address.length > 0"
                >{{ resMsg[index].address[0].addressDetail }}</el-col
              >

              <!--地址選擇  -->
              <el-col :span="1" class="col">
                <el-button
                  text
                  @click="resMsg[index].type = true"
                  type="warning"
                  style="background-color: azure"
                >
                  選擇地址
                </el-button>

                <el-dialog
                  v-model="resMsg[index].type"
                  title="選擇地址"
                  width="40%"
                  align-center
                >
                  <el-collapse v-model="activeName" accordion>
                    <el-checkbox-group v-model="resMsg[index].address">
                      <el-collapse-item title="7-ELEVEN" name="1">
                        <div v-for="address in recipientAddress" :key="address">
                          <el-card
                            v-if="address.type == '7-11'"
                            style="margin-top: 5px"
                          >
                            <div>7-ELEVEN地址</div>
                            <el-checkbox label="Option1" size="large" border />
                          </el-card>
                        </div>
                        <el-card v-if="count711() < 1" style="margin-top: 5px">
                          <div>新增地址</div>
                        </el-card>
                      </el-collapse-item>

                      <el-collapse-item title="全家" name="2">
                        <div v-for="address in recipientAddress" :key="address">
                          <el-card
                            v-if="address.type == 'FamilyMart'"
                            style="margin-top: 5px"
                          >
                            <el-row>
                              <el-col :span="3">
                                <el-checkbox
                                  @change="selectAddress(index)"
                                  :label="address"
                                  size="large"
                                  border
                                  >{{}}</el-checkbox
                                >
                              </el-col>
                              <el-col :span="3"
                                >收件人:{{ address.name }}</el-col
                              >
                              <el-col :span="6"
                                >電話:{{ address.phone }}</el-col
                              >
                              <el-col :span="4"
                                >門市{{ address.storeName }}</el-col
                              >
                              <el-col :span="8">{{
                                address.addressDetail
                              }}</el-col>
                            </el-row>
                          </el-card>
                        </div>
                        <el-card
                          v-if="countFamilyMart() < 1"
                          style="margin-top: 5px"
                        >
                          <div>新增地址</div>
                        </el-card>
                      </el-collapse-item>

                      <el-collapse-item title="宅配" name="3">
                        <div v-for="address in recipientAddress" :key="address">
                          <el-card
                            v-if="address.type == 'Normal'"
                            style="margin-top: 5px"
                          >
                            <el-row>
                              <el-col :span="3">
                                <el-checkbox
                                  @change="selectAddress(index)"
                                  :label="address"
                                  size="large"
                                  border
                                  >{{}}</el-checkbox
                                >
                              </el-col>
                              <el-col :span="4"
                                >收件人:{{ address.name }}</el-col
                              >
                              <el-col :span="6"
                                >電話:{{ address.phone }}</el-col
                              >
                              <el-col :span="11">{{
                                address.addressDetail
                              }}</el-col>
                            </el-row>
                          </el-card>
                          <el-card
                            v-if="countNormal() < 1"
                            style="margin-top: 5px"
                          >
                            <div>新增地址</div>
                          </el-card>
                        </div>
                      </el-collapse-item>
                    </el-checkbox-group>
                  </el-collapse>

                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="resMsg[index].type = false"
                        >取消</el-button
                      >
                      <el-button
                        type="primary"
                        @click="resMsg[index].type = false"
                        >確定</el-button
                      >
                    </span>
                  </template>
                </el-dialog>
              </el-col>
            </el-row>
            <hr />
            <el-row>
              <el-col :span="3"></el-col>
              <el-col :span="8"></el-col>
              <el-col :span="5"></el-col>
              <el-col :span="2"></el-col>
              <el-col :span="2"></el-col>
              <el-col class="col" :span="4"
                >訂單金額:<span style="font-size: 25px; color: #f3492f"
                  >${{
                    new Intl.NumberFormat().format(
                      sellerTotal(seller.sellerId) -
                        sellerDiscount(seller.sellerId)
                    )
                  }}</span
                ></el-col
              >
            </el-row>
          </el-card>
        </el-row>
        <div>
          <el-card style="margin-top: 10px">
            <el-card>
              <el-row>
                <el-col :span="2">付款方式</el-col>
                <el-col :span="5">
                  <el-checkbox-group v-model="checkboxGroup1" size="large">
                    <el-checkbox-button v-for="t in types" :key="t" :label="t">
                      {{ t }}
                    </el-checkbox-button>
                  </el-checkbox-group>
                  <el-card
                    style="margin-top: 10px; width: 400px"
                    v-if="checkboxGroup1[0] == '信用卡'"
                  >
                    <div v-if="userCreditCard.length > 0">
                      <div v-for="userCard in userCreditCard" :key="userCard">
                        <el-card style="margin-top: 10px">
                          <el-row>
                            <el-col :span="3">
                              <el-checkbox-group
                                v-model="creditCard"
                                size="large"
                              >
                                <el-checkbox :label="userCard.cardId">
                                  {{}}
                                </el-checkbox>
                              </el-checkbox-group>
                            </el-col>
                            <el-col :span="6">
                              <img
                                style="width: 60px; height: auto"
                                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9f6f1831fb61c65952c4cdb1189d7cb8.png"
                              />
                            </el-col>
                            <el-col
                              :span="12"
                              style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                              "
                            >
                              {{ userCard.cardNumber }}</el-col
                            >
                          </el-row>
                        </el-card>
                      </div>
                    </div>
                    <div v-else>
                      <el-card> 未添加信用卡資料 </el-card>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="17"></el-col>
              </el-row>
            </el-card>
            <el-row style="margin-top: 10px">
              <el-col :span="20"></el-col>
              <el-col v-if="couponList.length > 0" :span="2">優惠折抵</el-col>
              <!-- <el-col :span="2" style="text-align: right;">-{{allDiscountTotal()}}</el-col> -->
              <el-col :span="2" style="text-align: right">
                <span
                  v-if="couponList.length > 0"
                  style="font-size: 25px; color: #837e7d"
                  >-{{ allDiscountTotal() }}</span
                >
              </el-col>
              <el-col :span="20"></el-col>
              <el-col :span="2">總金額</el-col>
              <el-col :span="2" style="text-align: right">
                <span style="font-size: 25px; color: #f3492f"
                  >${{
                    new Intl.NumberFormat().format(
                      allTotal() - allDiscountTotal()
                    )
                  }}</span
                >
              </el-col>
              <el-col :span="21"></el-col>
              <el-col :span="3"
                ><el-button
                  @click="buy()"
                  color="#f3492f"
                  :dark="isDark"
                  style="width: 100%"
                  >下單</el-button
                >
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { CookieAxios } from "../../../service/api";
import { infoMsgTimer, successMsgTimer } from "../../../service/sweetalert2";
import Swal from "sweetalert2";
const checkboxGroup1 = ref([]);
const types = ["信用卡", "貨到付款"];
watch(checkboxGroup1, () => {
  if (checkboxGroup1.value.length > 1) {
    checkboxGroup1.value.splice(0, 1);
  }
});
//選擇的信用卡
const creditCard = ref([]);
watch(creditCard, () => {
  if (creditCard.value.length > 1) {
    creditCard.value.splice(0, 1);
  }
});
const activeName = ref("0");
const router = useRouter();
const store = useStore();
const cartIds = store.getters.checkoutProductList;
const couponList = store.getters.checkoutCouponList;
//賣家訊息
const sellerMsg = ref([]);
//地址訊息
const recipientAddress = ref();
//信用卡訊息
const userCreditCard = ref([]);
//回傳用資訊
const resMsg = ref([]);
const selectAddress = (index) => {
  if (resMsg.value[index].address.length > 1) {
    resMsg.value[index].address.splice(0, 1);
  }
  if (resMsg.value[index].address.length == 0) {
    resMsg.value[index].address.push(isDefaultAddress.value);
  }
};

const count711 = () => {
  return recipientAddress.value.filter((address) => address.type === "7-11")
    .length;
};
const countFamilyMart = () => {
  return recipientAddress.value.filter(
    (address) => address.type === "FamilyMart"
  ).length;
};
const countNormal = () => {
  return recipientAddress.value.filter((address) => address.type === "Normal")
    .length;
};
watch(
  () => resMsg.value,
  (newVal, oldVal) => {
    console.log("resMsg changed:", newVal);
    console.log("oldVal oldVal:", oldVal);
  },
  { deep: true }
);

const isDefaultAddress = ref();
const dialogs = ref([]);
onMounted(async () => {
  if (cartIds.length > 0) {
    const res = await CookieAxios.post("/checkOutGet", { cartIds });
    if (res.data.code == 1) {
      recipientAddress.value = res.data.data.recipientAddress;
      sellerMsg.value = res.data.data.sellerMsg;
      userCreditCard.value = res.data.data.userCreditCard;
      //判斷沒地址 
      for (let i = 0; i < res.data.data.recipientAddress.length; i++) {
        if (res.data.data.recipientAddress[i].type == "Normal") {
          if (res.data.data.recipientAddress[i].isDefault == true) {
            isDefaultAddress.value = res.data.data.recipientAddress[i];
            break;
          }
        }
      }
      resMsg.value = sellerMsg.value.map((seller) => ({
        sellerId: seller.sellerId,
        productList: seller.productList.map((product) => [
          product.cartId,
          product.cartProductQuantity,
        ]),
        address: [isDefaultAddress.value],
        type: false,
        creditCard: [],
        couponId: userCouponSelect(seller.sellerId),
      }));
      dialogs.value = Array(sellerMsg.value.length).fill(false);
      
    } else {
      router.push("/");
    }
  } else {
    router.push("/");
  }
});
const ee = () => {
  return 10;
};
//檢查是否有賣家優惠券
const userCouponSelect = (sellerId) => {
  if (couponList.length < 1) {
    return 0;
  }
  for (let i = 0; i < couponList.length; i++) {
    if (couponList[i].sellerId == sellerId) {
      return couponList[i].id;
    }
  }
  return 0;
};

//檢查是否有賣家優惠券
const checkSellerCoupon = (sellerId) => {
  if (couponList.length < 1) {
    return false;
  }
  for (let i = 0; i < couponList.length; i++) {
    if (couponList[i].sellerId == sellerId) {
      return true;
    }
  }
  return false;
};
//賣家商品金額
const sellerTotal = (id) => {
  let total = 0;
  for (let i = 0; i < sellerMsg.value.length; i++) {
    if (sellerMsg.value[i].sellerId == id) {
      for (let j = 0; j < sellerMsg.value[i].productList.length; j++) {
        total +=
          sellerMsg.value[i].productList[j].cartProductQuantity *
          sellerMsg.value[i].productList[j].productPrice;
      }
    }
  }
  return total;
};
//賣家折扣金額
const sellerDiscount = (id) => {
  let total = sellerTotal(id);
  for (let i = 0; i < couponList.length; i++) {
    if (couponList[i].sellerId == id) {
      if (couponList[i].sellerCoupon.type == "rate") {
        if (
          total - total * couponList[i].sellerCoupon.discountRate <
          couponList[i].sellerCoupon.discountMaximum
        ) {
          return Math.ceil(
            total - total * couponList[i].sellerCoupon.discountRate
          );
        } else {
          return couponList[i].sellerCoupon.discountMaximum;
        }
      } else {
        return couponList[i].sellerCoupon.discountAmount;
      }
    }
  }
  return 0;
};
//總折扣金額
const allDiscountTotal = () => {
  let total = 0;
  for (let i = 0; i < sellerMsg.value.length; i++) {
    total += sellerDiscount(sellerMsg.value[i].sellerId);
  }
  return total;
};

//總商品金額
const allTotal = () => {
  let total = 0;
  for (let i = 0; i < sellerMsg.value.length; i++) {
    total += sellerTotal(sellerMsg.value[i].sellerId);
  }
  return total;
};
//購買
const buy = async () => {
  if (resMsg.value.length < 1) {
    router.push("/");
    return;
  }
  if (checkboxGroup1.value[0] == undefined) {
    infoMsgTimer("請選擇付款方式", 1500);
    return;
  }
  if (checkboxGroup1.value[0] == "信用卡") {
    if (creditCard.value[0] != undefined) {
      const buyMsg = {
        sellerOrderList: resMsg.value,
        paymentMethod: checkboxGroup1.value[0],
        card: creditCard.value[0],
      };
      Swal.fire({
    title: '訂單生成中',
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
        Swal.showLoading();
    }
    });  
    const res = await CookieAxios.post("/generateOrders", buyMsg);
    Swal.close();

    if (res.data.code == 1) {
      successMsgTimer("下單成功", 2000);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      infoMsgTimer(res.data.msg, 2000);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
    } else {
      infoMsgTimer("請選擇信用卡", 1500);
    }
  }

  if (checkboxGroup1.value[0] == "貨到付款") {
    const buyMsg = {
      sellerOrderList: resMsg.value,
      paymentMethod: checkboxGroup1.value[0],
      card: 0,
    };
    Swal.fire({
    title: '訂單生成中',
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
        Swal.showLoading();
    }
    });  
    const res = await CookieAxios.post("/generateOrders", buyMsg);
    Swal.close();

    if (res.data.code == 1) {
      successMsgTimer("下單成功", 2000);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      infoMsgTimer(res.data.msg, 2000);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }
};
</script>

<style scoped>
.col {
  text-align: center;
}
</style>
