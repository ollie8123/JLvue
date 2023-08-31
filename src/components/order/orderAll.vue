<template>

        <div>
<div class="d-flex flex-column bigFarm " v-for="order in orders" :key="order.orderId">

<!-- 店家Title -->
<div class="d-flex justify-content-between">
    <div class="d-flex align-items-center"><div class="fw-bold ms-2"><i class="bi bi-shop"></i>{{order.products[0].storeName}}</div>&nbsp;&nbsp;<div class="sellerHome "><a href="#"  class="aTag"><i class="bi bi-houses"></i>查看賣場</a></div></div>
    <div class="d-flex">
        <div><i class="bi bi-bag-check"></i><span class="textGreen fw-bold">賣家取件成功</span></div>&nbsp;|&nbsp; 
        <div><span class="textPink fw-bold">已完成</span></div>
    </div>

</div>
<hr>

<!-- 商品內容 -->
<div v-for="product in order.products" :key="product.productId" class="productArea">
<div class="d-flex justify-content-between align-items-center mt-1 mb-1" @click="selectProduct(product.productName, product.productPageId)" >
    <div class="d-flex">
    <div class="imgDiv"><img :src="`data:image/*;base64,${product.productImg}`" alt="" class="imgSize"></div>
    <div class="d-flex flex-column productInfo">
        <div class="fw-bold">{{product.productName}}</div>
        <div>數量：{{product.productQuantity}}</div>
    </div>
</div>

    <div>價格：{{`${product.price*product.productQuantity}`}}</div>
</div>
</div>
<hr>
<!-- 商品footer -->
<div class="d-flex flex-column">
<div class="d-flex flex-row-reverse mt-1 moneyArea"><span class="moneyText">＄{{ calculateTotal(order) }}</span>訂單金額：</div>
<div class="d-flex flex-row-reverse mt-4">
    <button class="btn btn-secondary ms-3">再買一次</button>
    <button class="btn btn-outline-secondary ms-3">聯絡賣家</button>
    <button class="btn btn-outline-secondary">評價</button>

</div>
</div>




</div>


        </div>
</template>
    
<script setup >
import { onMounted,ref } from 'vue'
import { CookieAxios } from '../../service/api';
import { useRouter } from "vue-router";
const router = useRouter();


const calculateTotal = (order) => {
    return order.products.reduce((acc, product) => acc + (product.price * product.productQuantity), 0);
}

const selectProduct = (PageId, PageName) => {
  router.push({
    path: "/product_page",
    query: { pd:PageId+Math.random()+"-"+PageName },
  });
};

const orders = ref([]);
const onMountedURL = `${import.meta.env.VITE_API_JAVAURL}findUserOrder`;
onMounted(async () => {
    const response = await CookieAxios.post(onMountedURL);
    console.log(response);
    orders.value = response.data.data;
});


    
</script>
    
<style scoped>

.imgDiv{

    margin-right: 10px;
}


.productInfo{
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: flex-start;
}

.moneyText{
    color: red;
    font-size: 20px;
    font-weight: bold;

}

.moneyArea {
    text-align: center;
    align-items: center; 
}

hr{
    width: 98%;
    margin-inline: auto;
}

.sellerHome{
    border: solid 1px grey;
    padding: 2px;
}

a {
    text-decoration: none;  
    color: inherit;  
}

.bigFarm{

    background-color: white;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    margin-bottom: 15px;
}

.productArea{
    background-color: white;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    margin-bottom: 15px;

}

.imgSize{
width: 120px;
height: 150px;

}

.textGreen{
    color: rgb(98 176 162);
}

.textPink{
    color:rgb( 237 109 146) 
}

.aTag{
    margin-left: 10px;
    margin-right: 10px;
}
</style>