<template>
  <div class="common-layout">
      <el-main>
        <product_pageVue :ProductPageId="id"></product_pageVue>
      </el-main>
      <el-container>   
        <el-aside style="width: 75%">
          <product_page_sellerVue :ProductPageId="id"></product_page_sellerVue>
          
          <product_page_details :ProductPageId="id" ></product_page_details>
          <el-main style="background-color: rgb(250, 246, 240); margin-top: 5px">
            測試
             <quill></quill>
          </el-main>
          <product_page_review :ProductPageId="id"></product_page_review>
        </el-aside>
        <el-main style="padding: 0px 20px 0px 20px">
          <el-main style="background-color: rgb(242, 194, 132)"
            >賣場優惠券列表
          </el-main>
          <el-main style="background-color: rgb(242, 194, 132); margin-top: 5px"
            >賣場推薦商品
          </el-main>
        </el-main>
      </el-container>
      <div>.</div>
      <div>.</div>
      <div>.</div>
      <div>.</div>
      <div>.</div>
      <div>.</div>
          <div>.</div>
      <div>.</div>
      <div>.</div>
      <div>.</div>
  </div>
</template>

<script setup>
import { ElHeader, ElMain, ElContainer, ElAside, ElButton, ElRow, ElCol, ElDivider, ElCheckboxButton, ElCheckboxGroup } from "element-plus";
import { useRoute } from "vue-router";
import quill from "../../../components/Buttons/quill.vue";
import product_pageVue from "../../../components/index/product_page/product_page.vue";
import product_page_sellerVue from "../../../components/index/product_page/product_page_seller.vue";
import product_page_details from "../../../components/index/product_page/product_page_details.vue";
import product_page_review from "../../../components/index/product_page/product_page_review.vue";
const route = useRoute();
const id = route.query.pd.split("-")[route.query.pd.split("-").length - 1];



</script>

<style>


</style>
