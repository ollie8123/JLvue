<template>
    <el-main
      style="
        background-color: rgb(241, 167, 70);
        margin: 5px 5px 0px 5px;
        height: auto;
      "
    >
      <el-carousel :interval="1000" arrow="always" :autoplay="false" height="440px" trigger="click" ref="carouselRef" >
        <el-carousel-item v-for="photo in photos" :key="photo" style="height:auto; display: flex; align-items: center; justify-content: center;"   >
              <img  style="width: 350px; height: 350px;" :src=photo.photoPath > 
        </el-carousel-item>
      </el-carousel>
    </el-main>
</template>
<script setup>
import { ElMain, ElCarousel, ElCarouselItem,ElButton } from "element-plus";
import { ref, onMounted,watch } from 'vue'
import { CookieAxios } from "../../../service/api";
const props = defineProps(["ProductPageId", "photoId"]);
const photos = ref([""]);
const carouselRef = ref(null);
watch(() => props.photoId, (newVal) => {
    carouselRef.value.setActiveItem(photos.value.findIndex(photo=> photo.mainId == newVal));
});
onMounted(async() => { 
    const res = await CookieAxios.get(`/public/AllProductPagePhoto?productPageId=${props.ProductPageId}`);
    photos.value = res.data.data;
})

</script>
<style scoped></style>
