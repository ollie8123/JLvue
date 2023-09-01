<template>

    <div class="bigFarm">
        <div class="row row-cols-2">
<!-- 商品欄 -->
            <div class="productFarm " v-for="product in products" :key="product.id">
                <div class="d-flex flex-column "
                @click="selectProduct(product.name, product.id)">
                    <!-- 照片 -->
                    <div class="photoDiv">

                        <img :src="`data:image/*;base64,${product.image}`" alt="" class="productImg">
                    </div>
                     <!-- 文字 -->
                    <div class="productText mt-1">
                        <div class="productName fw-bold" >{{product.name}}</div>
                        <div class="d-flex justify-content-between mt-3">
                            <div class="productPrice fw-bold">${{product.price}}</div>
                            <div class="productSell">已售出{{product.sales}}</div>

                        </div>

                    </div>



                </div>

            </div>



        </div>

    </div>
</template>
    
<script setup >
import { ref,onMounted} from 'vue';
import CookieAxiosaxios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();


const selectProduct = (PageId, PageName) => {
  router.push({
    path: "/product_page",
    query: { pd:PageId+Math.random()+"-"+PageName },
  });
};



const products = ref([]);

const productsListURL = `${import.meta.env.VITE_API_JAVAURL}find40Products`;
onMounted(async () => {    

    const response = await CookieAxiosaxios.post(productsListURL)

    products.value = response.data.data.map(productInfo => {

    return {
        id: productInfo.product.id,
        name: productInfo.product.name,
        image: productInfo.image,
        price:productInfo.price,
        sales:productInfo.sales,

    };
});

});
</script>
    
<style scoped>

.bigFarm{
    margin-top: 15px;
    min-height: 800px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    padding-top: 25px;
    padding-left: 25px;
   
}


.productFarm{
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    width: 250px;
    height: 300px;
    margin-right: 5px;
    margin-bottom: 10px;
  

}

.productImg{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.photoDiv{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 210px;
    width: 240px;
    padding-right: 15px;
   
}

.productText{
    height: 90px;
}

.productName{
    font-size: 18px;
    margin-left: 10px;

}

.productPrice{
    margin-left: 10px;
    color: red;

}

.productSell{
    padding-right: 10px;
    color: grey;
    font-size: 14px;
  
}
    
</style>