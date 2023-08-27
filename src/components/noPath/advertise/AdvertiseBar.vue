<template>
        <div class="bigFarm">
            <div class="d-flex">
                <!-- 輪播廣告開始 -->
                <div>
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="3000">
      <img src="/image/advertise/data1.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src="https://cf.shopee.tw/file/tw-50009109-652af5f85e3e29b33c9670ac3ef0b83c_xxhdpi" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src="https://cf.shopee.tw/file/tw-50009109-7dc6fccb82e848f07961a0e36896c2ce_xxhdpi" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

                </div>
                  <!-- 輪播廣告結束 -->

                    <!-- 右邊小廣告開始 -->
                <div class="d-flex flex-column cmBig">
                    <div class="cm">
                        <img src="/image/advertise/data2.png" alt="">
                    </div>
                    <div class="cm">
                        <img src="https://cf.shopee.tw/file/tw-50009109-130e51f267cacb8151534c2fd1b5f5ce_xhdpi" alt="">
                    </div>
                </div>
                  <!-- 右邊小廣告結束 -->

            </div>



        </div>
</template>
    
<script setup lang='ts'>
    
</script>
    
<style scoped>
.bigFarm{
    min-height: 500px;
}

.carousel-inner .carousel-item img {
    width: 796.664px !important;
    height: 235.016px !important;
    object-fit: cover !important;
}

.carousel-inner {
    height: 235.016px;
    width: 796.664px;
}

.cm{
    width: 499px;
    height: 117.508px;

}

.cm img{
    width: 499px;
    height: 117.508px;
    object-fit: cover !important;
}


    
</style>

