<template>

        <div>
<div class="d-flex flex-column bigFarm">
<!-- 店家Title -->
<div class="d-flex justify-content-between">
    <div class="d-flex align-items-center"><div>店家名稱</div>&nbsp;&nbsp;<div class="sellerHome"><a href="#" ><i class="bi bi-houses"></i>查看賣場</a></div></div>
    <div class="d-flex">
        <div>狀態一</div>&nbsp;|&nbsp; 
        <div>狀態二</div>
    </div>

</div>
<hr>

<!-- 商品內容 -->
<div class="d-flex justify-content-between align-items-center mt-1 mb-1">
    <div class="d-flex">
    <div class="imgDiv"><img src="/image/coupon/coin.png" alt=""></div>
    <div class="d-flex flex-column productInfo">
        <div>商品名稱</div>
        <div>規格</div>
        <div>數量</div>
    </div>
</div>

    <div>金額</div>
</div>
<hr>
<!-- 商品footer -->
<div class="d-flex flex-column">
<div class="d-flex flex-row-reverse mt-1 moneyArea"><span class="moneyText">＄1,000</span>訂單金額：</div>
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
    
</script>
    
<style scoped>

.imgDiv{

    margin-right: 10px;
}


.productInfo{
    text-align: left;
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
}
</style>