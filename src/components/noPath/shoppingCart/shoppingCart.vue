<template>
<div class="cartDiv">
  <el-button type="danger" style="margin-left: 16px" @click="drawer = true" class="bi bi-cart el-button--large">
    &nbsp;購物車
  </el-button>
  <el-drawer v-model="drawer" title="I am the title" :with-header="false" size="40%" >
    <div v-if="Cart.length>0">
      <el-card  style="background-color: rgb(245, 245, 245); width:100%;" >
         <ElContainer  style="margin-left: 15px;">

             <ElMain style="width:40%; " class="main">
                      <span >名稱</span>
              </ElMain>
              <ElMain style="width:30%;" class="main">
                        <span>價錢</span>
               </ElMain>
               <ElMain style="width:10%;" class="main">
                       <span>數量</span>
               </ElMain>       
               <ElMain style="width:10%; " class="main">
                         <span>總計</span>
                </ElMain>  
                 <ElMain style="width:10%;" class="main">
                </ElMain>                        
              </ElContainer>
        </el-card>
     <el-row v-for="review in Cart" :key="review">
        <el-card  class="box-card" style="background-color: rgb(245, 245, 245);  margin-top: 10px; width:100%" >
          <span>{{review.賣家名}}</span>
                 <el-row v-for="a in review.aaa" :key="a">
                     <el-card  class="box-card" style="background-color: rgb(245, 245, 245);  width:100%; margin-top: 5px;" >
                      <ElContainer>
                        <ElMain  style="width:5%;">
                                <el-checkbox-group v-model="selectedFoods">
                                       <el-checkbox :label="a.id" size="large">{{ }}</el-checkbox>
                                 </el-checkbox-group>
                        </ElMain>
                        <ElMain  style="width:30%;" class="main" >
                               <span class="truncate">{{a.name+111111111111111111111111111111111111111}}</span>
                        </ElMain>
                        <ElMain  style="width:10%; " class="main">
                                <span>{{a.price}}</span>
                        </ElMain>
                        <ElMain  style="width:10%;" class="main">
                                <span>{{a.count}}</span>
                        </ElMain>
                            <ElMain  style="width:10%;" class="main">
                                <span>{{a.count*a.price}}</span>
                             </ElMain>   
                       <ElMain  style="width:10%; " class="main">
                                <span>刪除</span>
                        </ElMain>   
                      </ElContainer>
                   </el-card>
                </el-row>
        </el-card>
      </el-row>
      <el-card style="position: absolute; bottom: 0; width: 85%; background: #ed9898; padding: 10px;margin-left: 10%; ">
        <el-row type="flex" justify="space-between">
          
        </el-row>
    </el-card>
    </div>
     <div v-else><span>暫無商品</span></div>
  </el-drawer>
</div>
</template>

<script setup>
import{ElButton,ElDrawer,ElRow,ElCard,ElMain,ElContainer,ElCheckbox,ElCheckboxGroup}from'element-plus'
import { ref,onMounted,watch} from 'vue'
const drawer = ref(false)
const Cart = ref([])
onMounted(() => {
  Cart.value = [
    {
      "賣家名": "bbb", "aaa": [{ "name": "好好用", "price": 1111111, "count": 99, "id": 1 },
        { "name": "超好用", "price": 112, "count": 2, "id": 2 },
        { "name": "無敵好用", "price": 123, "count": 4 , "id": 3}]
    },
    {
      "賣家名": "vvv", "aaa": [{ "name": "好好用", "price": 123, "count": 1 , "id": 4},
        { "name": "超好用", "price": 3334, "count": 2 , "id": 5},
        { "name": "無敵好用", "price": 123, "count": 4, "id": 6 }]
    },
    {
      "賣家名": "qweqwe", "aaa": [{ "name": "好好用", "price": 123, "count": 1, "id": 7 },
        { "name": "超好用", "price": 123, "count": 2 , "id": 8},
        { "name": "無敵好用", "price": 123, "count": 4, "id": 9 }]
    },
    {
      "賣家名": "qweqewwqe", "aaa": [{ "name": "好好用", "price": 123, "count": 1, "id": 10 },
        { "name": "超好用", "price": 12313, "count": 2 , "id": 11},
        { "name": "無敵好用", "price": 123, "count": 4 , "id": 2}]
    },
    { "賣家名": "123132", "aaa": [{ "name": "好好用",
      "price": 123, "count": 1, "id":13
    }, { "name": "超好用", "price": 111, "count": 2 , "id": 14},
      { "name": "無敵好用", "price": 123, "count": 4 , "id": 15}]
    },
    {
      "賣家名": "asasd", "aaa": [{ "name": "好好用", "price": 123, "count": 1 , "id": 16},
        { "name": "超好用", "price": 123, "count": 2 , "id": 17},
        { "name": "無敵好用", "price": 123, "count": 4 , "id": 18}]
    },
    {
      "賣家名": "zczx", "aaa": [{ "name": "好好用", "price": 123, "count": 1, "id": 19 },
        { "name": "超好用", "price": 123, "count": 2 , "id": 20},
        { "name": "無敵好用", "price": 123, "count": 4, "id": 21 }]
    },
    {
      "賣家名": "adasda", "aaa": [{ "name": "好好用", "price": 123, "count": 1, "id": 22 },
        { "name": "超好用", "price": 123, "count": 2 , "id": 23},
        { "name": "無敵好用", "price": 123, "count": 4 , "id": 24}]
    }
  ];

});
const totalPrice = (arr) => { 
  let total=0;
  for (let i = 0; i < arr.length; i++){
    total+=arr[i].price
  }
  return total
}

const selectedFoods = ref([])

watch(selectedFoods, (newVal) => {
    alert(JSON.stringify(newVal));  // 顯示新的 selectedFoods 值
});
</script>
<style scoped>
.truncate {
    display: block;       /* or inline-block, depending on your needs */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;      /* or any other value that fits your design */
}
.main{
padding:10px 0px;
display: flex; 
align-items: center;
justify-content: center;
}

.cartDiv{

  margin-right: 30px;
}
</style>
