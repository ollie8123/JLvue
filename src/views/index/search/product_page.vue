<template >
  <div class="common-layout" :key="someKey">
      <el-main>
        <product_pageVue :ProductPageId="productPageId"></product_pageVue>
      </el-main>
      <el-container v-if="top5List.length>0">   
        <el-aside style="width: 75%">
          <product_page_sellerVue :ProductPageId="productPageId"></product_page_sellerVue>
          <product_page_details  :ProductPageId="productPageId" ></product_page_details>
          <product_page_review  :ProductPageId="productPageId"></product_page_review>
        </el-aside>
        <el-main  style="padding: 0px 20px 0px 20px">
          <el-main style="background-color: rgb(242, 194, 132); margin-top: 5px">
            <top5_seller_product  :top5List="top5List" :span=24></top5_seller_product>
          </el-main>
        </el-main>
      </el-container>
      <el-container v-else>   
        <el-aside style="width: 100%">
          <product_page_sellerVue  :ProductPageId="productPageId"></product_page_sellerVue>
          <product_page_details  :ProductPageId="productPageId" ></product_page_details>
          <product_page_review :ProductPageId="productPageId"></product_page_review>
        </el-aside>
      </el-container>
  </div>
</template>

<script setup>
import { ElHeader, ElMain, ElContainer, ElAside, ElButton, ElRow, ElCol, ElDivider, ElCheckboxButton, ElCheckboxGroup,ElIcon } from "element-plus";
import { useRoute } from "vue-router";
import { ref, onMounted,watch } from 'vue';
import { CookieAxios } from "../../../service/api";
import product_pageVue from "../../../components/index/product_page/product_page.vue";
import product_page_sellerVue from "../../../components/index/product_page/product_page_seller.vue";
import product_page_details from "../../../components/index/product_page/product_page_details.vue";
import product_page_review from "../../../components/index/product_page/product_page_review.vue";
import top5_seller_product from '../../../components/index/product_page/top5_seller_product.vue';
const someKey = ref(0);
const route = useRoute();
const productPageId =ref(route.query.pd.split("-")[route.query.pd.split("-").length - 1]) ;
const top5List = ref([]);
watch(() => route.query, async (newQuery, oldQuery) => {
  productPageId.value=newQuery.pd.split("-")[route.query.pd.split("-").length - 1]
  const req = await CookieAxios.get(`public/SellerTop5Product?productPageId=${productPageId.value}` );
  top5List.value = req.data.data;
  someKey.value++;
});

onMounted(async () => { 
  const req = await CookieAxios.get(`public/SellerTop5Product?productPageId=${productPageId.value}` );
  top5List.value = req.data.data;
})


</script>

<style>


</style>
