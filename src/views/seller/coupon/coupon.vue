<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-container>
        <!-- <el-aside width="200px">
          <nav>
            
            <br>
            
            
          </nav>
          
        </el-aside> -->
        <el-main>
          <RouterLink to="/seller/coupon/find">優惠券管理</RouterLink>
          <RouterLink to="/seller/coupon/insert">新增優惠券</RouterLink>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>


</script>

<style></style>
