<template>
  <div class="container">
    <HomePageNavBar class="fixed-navbar"></HomePageNavBar>
    <div class="divBody">
    
      <RouterView></RouterView>

     

    </div>
   

  </div>
  <div><Footer></Footer></div>
</template>

<script setup>
import HomePageNavBar from "../../components/navbar/HomePageNavBar.vue";
import Footer from "../../components/noPath/footer/Footer.vue";


</script>

<style scoped>
.divBody {
  max-width: 1980px;
  font-weight: normal;

  margin-top: 130px;

}

.fixed-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;  /* Ensure it stays on top of other content */
}
</style>
