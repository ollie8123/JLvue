<template>
    <div class="container">
        <checkout></checkout>
    </div>
</template>

<script setup>
import navbar from "../../../components/navbar/navbar.vue";
import checkout from "../../../components/noPath/checkout/checkout.vue";

</script>

<style scoped>
.divBody {
  max-width: 1980px;
  font-weight: normal;
  background-color: bisque;
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
