<template>
  <h1 style="background-color: rgb(195, 137, 67);">SellerNavbar</h1>
  <div class="seller"> 
    <h1>賣家中心<RouterLink to="/">首頁</RouterLink></h1>
    <nav>
      <RouterLink to="/seller/order">訂單管理</RouterLink>
      <RouterLink to="/seller/management">賣場管理</RouterLink>
      <RouterLink to="/seller/product">商品管理</RouterLink>
      <RouterLink to="/seller/coupon/find">優惠券管理</RouterLink>
    </nav>


    <!-- <div style="background-color: rgb(241, 150, 150); height: 300px; width: 300px;" > -->
    <RouterView></RouterView>
    <!-- </div> -->

   
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  components: { RouterLink, RouterView },
};
</script>

<style scoped>
.seller {
  max-width: 1980px;
  margin: 0 20%;
  font-weight: normal;
  background-color: bisque;
}
nav {
  width: 100%;
  font-size: 30px;

}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
</style>
