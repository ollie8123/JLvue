<template>
  <UserNAvBar></UserNAvBar>
  <div class="container bg-light mt-5">

    <div class="row">

      <!-- 區塊左 -->
      <div class="col-3 mt-4">

        <UserConsole></UserConsole>

   
      </div>

     <!-- 區塊中: 我的檔案 -->
     <div class="col-6 d-flex flex-column mt-4 border-sides"
     v-if="$route.path !== '/user/account/payment' && 
           $route.path !== '/user/account/payment/CreateCreditcard' && 
           $route.path !== '/user/account/address'">
        <div>
          <h3>我的檔案</h3>
          <span>管理你的檔案以保護你的帳戶</span>
          <hr>
          <div class="mt-5">
            <UserInfo></UserInfo>
          </div>
        </div>
      </div>

      <!-- 中右切換為payment -->
      <div v-else-if="$route.path === '/user/account/payment'" class="col-9 d-flex flex-column mt-4 border-sides">
        <payment></payment>
      </div>

      <!-- 中右切換為CreateCreditcard -->
      <div v-else-if="$route.path === '/user/account/payment/CreateCreditcard'" class="col-9 d-flex flex-column mt-4 border-sides">
        <CreateCreditcard></CreateCreditcard>
      </div>

      <!-- 中右切換為address -->
<div v-else-if="$route.path === '/user/account/address'" class="col-9 d-flex flex-column mt-4 border-sides">
  <Address></Address>
    
</div>

      <!-- 區塊右 -->
      <div class="col-3 d-flex flex-column mt-4"
      v-if="$route.path !== '/user/account/payment' && 
           $route.path !== '/user/account/payment/CreateCreditcard' && 
           $route.path !== '/user/account/address'">
        <UserPhoto></UserPhoto>
      </div>



    </div>

  </div>
  <Footer class="mt-5"></Footer>
</template>

<script setup>
import UserConsole from '../../components/User/UserConsole.vue';
import UserNAvBar from '../../components/navbar/UserNAvBar.vue';
import UserInfo from '../../components/User/UserInfo.vue';
import UserPhoto from '../../components/User/UserPhoto.vue';
import payment from './account/payment/payment.vue';
import CreateCreditcard from './account/payment/CreateCreditcard.vue';
import Address from './account/address/address.vue';
import Footer from '../../components/noPath/footer/Footer.vue';


</script>

<style scoped>

.border-sides {
    border-left: 3px solid white;
    border-right: 3px solid white;
    flex-grow: 1; /* 使.border-sides填充其父元素的所有可用空間 */
}

.container{
  min-height: 800px;
  display: flex; /* 使.container使用flexbox */
    flex-direction: column; /* 子元素將疊放為一列 */

}

.row {
    flex-grow: 1; /* 使.row填充.container的所有可用空間 */
    display: flex; /* 使.row使用flexbox */
    flex-direction: row; /* 這是默認值，但我只是明確地設置它 */
}

hr{
  color:gray;
}



</style>
