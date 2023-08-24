<template>
  <div>
      <el-main style="background-color: rgb(242, 194, 132); margin-top: 5px">商品規格
      <div>{{ props.ProductPageId }}</div>
      <div style="white-space: pre-line;">{{ `12121\nqwe\nqew\nasd\n1\n231` }}</div>
      
    </el-main>

  </div>
</template>

<script setup>
import { ElHeader, ElMain, ElContainer, ElAside, ElButton, ElRow, ElCol, ElDivider, ElCheckboxButton, ElCheckboxGroup } from "element-plus";
import { ref, onMounted, reactive } from "vue";
import { CookieAxios } from "../../../service/api";
const props = defineProps(["ProductPageId"]);
const details = reactive({})
onMounted(() => {
    CookieAxios.get(`/public/ProductPageSelectDetails?productPageId=${props.ProductPageId}`).then((req) => { 
        Object.assign(details, req.data.data) 
    })
 })


</script>

<style>

</style>