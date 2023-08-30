<template>

    <div class="bigFarm">
        <div class="row row-cols-2">
<!-- 商品欄 -->
            <div class="productFarm">
                <div class="d-flex flex-column ">
                    <!-- 照片 -->
                    <div class="photoDiv">

                        <img src="/image/cravingread1.jpg" alt="" class="productImg">
                    </div>
                     <!-- 文字 -->
                    <div class="productText mt-1">
                        <div class="productName fw-bold">穩紮穩打日本語1</div>
                        <div class="d-flex justify-content-between mt-3">
                            <div class="productPrice fw-bold">$280</div>
                            <div class="productSell">已售出200</div>

                        </div>

                    </div>



                </div>

            </div>



        </div>

    </div>
</template>
    
<script setup lang='ts'>
    
</script>
    
<style scoped>

.bigFarm{
    margin-top: 15px;
    min-height: 800px;

    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    padding-top: 30px;
    padding-left: 30px;
   
}


.productFarm{
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    width: 250px;
    height: 300px;
  

}

.productImg{
    width: 150px;
    height: 210px;
    
}

.photoDiv{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 210px;
    width: 250px;
   
}

.productText{
    height: 90px;
}

.productName{
    font-size: 18px;
    margin-left: 10px;

}

.productPrice{
    margin-left: 10px;
    color: red;

}

.productSell{
    padding-right: 10px;
    color: grey;
    font-size: 14px;
  
}
    
</style>