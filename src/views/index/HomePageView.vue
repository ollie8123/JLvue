<template>

<div class="indexDiv">
  <AdvertiseBar></AdvertiseBar>
      <hotProducts></hotProducts>
  <IndexKindView></IndexKindView>
  <hProductList></hProductList>
  
</div>

</template>

<script setup>
import IndexKindView from '../../components/index/IndexKindView.vue';
import AdvertiseBar from "../../components/noPath/advertise/AdvertiseBar.vue";
import hotProducts from "../../components/noPath/hotProducts/hotProducts.vue";
import hProductList from '../../components/noPath/homePagePList/hProductList.vue';
</script>

<style scoped>
.divBody {
  max-width: 1980px;
  margin: 0 15%;
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

.indexDiv{
  min-height: 800px;
}


</style>