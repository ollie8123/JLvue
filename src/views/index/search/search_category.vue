<template>
  <div>
    搜尋類別
      <h1> <RouterLink to="/product_page">商品頁面</RouterLink></h1>
   <el-container>
      <el-header style="background-color: rgb(236, 184, 116);">Header</el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(211, 186, 154);" >Aside</el-aside>
        <el-container>
          <el-main style="background-color: rgb(233, 149, 41);">Main</el-main>
          <el-footer style="background-color: rgb(179, 134, 76);">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ElContainer,ElHeader,ElMain,ElFooter,ElAside }from"element-plus"
</script>

<style>

</style>