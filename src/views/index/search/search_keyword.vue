<template>
  <div>
    <RouterLink to="/product_page">商品頁面</RouterLink>
    <keyword_product_list :keyword="keyword" :categoryList="categoryList" :productList="productList"></keyword_product_list>
  </div>
</template>

<script setup>
import keyword_product_list from '../../../components/index/search_keyword/keyword_product_list.vue'
import { onMounted,watch,ref} from 'vue';
import { axios} from '../../../service/api'
import { useRoute } from 'vue-router';
const route = useRoute();
const keyword = ref(route.query.keyword);
const productList = ref();
const categoryList =ref();
 watch(() => route.query, (newQuery) => {
   keyword.value = newQuery.keyword;
   axios.get('/public/keywordSelectProductList?keyword=' + keyword.value+"&page=0&size=5").then((req) => { 
     categoryList.value =req.data.data.class
      productList.value=req.data.data.products.content
   })
 });
onMounted(() => { 
   axios.get('/public/keywordSelectProductList?keyword=' + keyword.value+"&page=0&size=5").then((req) => { 
    categoryList.value=req.data.data.class
    productList.value=req.data.data.products.content
    console.log(req.data.data.products.content)
   })
})
</script>

<style></style>