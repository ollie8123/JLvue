<template>
    <navbar></navbar>

</template>

<script setup>
import navbar from "../../../components/navbar/navbar.vue";
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex';
const store = useStore();
onMounted(() => { 

console.log(store.getters.checkoutList[0])

})
</script>

<style>

</style>