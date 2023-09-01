<template>

  <el-row>
    <el-col :span="24">賣家推薦</el-col>
    <el-col
      v-for="productPage in props.top5List"
      :key="productPage"
      :span="props.span"
    >
    
      <el-card :body-style="{ padding: '0px' }" style=" margin-top: 5px;" @click="selectProduct(productPage.id,productPage.name)">
        <img
          style="height: 250px; width: auto;  object-position: center;object-fit: cover;"
          :src=productPage.photo
          class="image"
        />
        <div style="padding: 14px">
            <el-row>
              <el-col :span="12">  <span>{{ productPage.name }}</span></el-col>
              <el-col :span="12">   <span>售出數:{{ productPage.sales }}</span></el-col>
            </el-row> 
          <div class="bottom">
            <el-row>
              <el-col v-if="productPage.minPrice!=productPage.maxPrice " :span="24"><span>${{ productPage.minPrice }} ~ ${{productPage.maxPrice}}</span></el-col>
              <el-col v-else :span="24"> <span >${{ productPage.minPrice }}</span> </el-col>
            </el-row> 
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ElRow,ElCol,ElCard,ElButton } from 'element-plus';
import { ref } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter();
const props=defineProps(['top5List',"span"])

const selectProduct = (PageId, PageName) => {
  if (PageId != undefined) {
    router.push({
      path: "/product_page",
      query: { pd: PageName + Math.random() + "-" + PageId },
    });
    window.scrollTo(0, 0);
  } else { 
    router.push('/')
  }
 
};
</script>


<style>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>