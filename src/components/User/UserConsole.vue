<template>
    <div  class="divArea">
        <div class="accordion  " id="accordionExample">
<!-- 會員頭像、帳號 -->
          <div class="d-flex mb-4 accountArea">
            <div>
              <img :src="image" alt="Description" class="round-image ">
            </div>
            <div class="d-flex align-items-center userAccount">
              <p class="accountText">{{user.account}}</p>
            </div>

          </div>

<!-- 我的帳號 -->
  <div class="accordion-item mb-3" >
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
        <i class="bi bi-person"></i>&nbsp;我的帳號
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
     <div class="container">
        <ul >
<li class="mb-2"> <RouterLink to="/user">個人檔案</RouterLink></li>
<li class="mb-2"> <RouterLink to="/user/account/payment">信用卡</RouterLink></li>
<li > <RouterLink to="/user/account/address">地址</RouterLink></li>
        </ul>
     </div>
      </div>
    </div>
  </div>

<!-- 購買清單 -->
  <div class="mb-3">
      <button class="accordion-button " type="button" >
        <i class="bi bi-card-list"></i> <RouterLink to="/user/orderList">&nbsp;購買清單</RouterLink>
      </button>
    
  </div>


<!-- 我的優惠券 -->
<div class=" mb-3">
      <button class="accordion-button " type="button"  >
        <i class="bi bi-ticket-perforated"></i>
        <RouterLink to="/user/userCoupon">&nbsp;我的優惠券</RouterLink>
     

      </button>
    
  </div>



</div>

</div>
</template>
    
<script setup >

import { ref,reactive , onMounted } from 'vue';
import { CookieAxios } from '../../service/api';
import { RouterLink } from 'vue-router';

const user = reactive({
    account:'',
});
const image = ref('../../../public/image/nolmg.png')



const userPhotoURL = `${import.meta.env.VITE_API_JAVAURL}userPhoto`;
const userAccountURL = `${import.meta.env.VITE_API_JAVAURL}findUserByEmail`;
onMounted(async () => {
  try {
        const photoResponse = await CookieAxios.post(userPhotoURL);

       
        if (photoResponse.data) {
            image.value = `data:image/*;base64,${photoResponse.data}`;
        }

        const userResponse = await CookieAxios.post(userAccountURL);
        if (userResponse.status === 200) {
            const userData = userResponse.data.data; 
            user.account = userData.account;     
        }

    } catch (error) {
        
        return;
    }
});


</script>
    
<style scoped>

ul {
    list-style-type: none;
    padding-left: 0; 
}
    
a {
    color: inherit; 
    text-decoration: none; 
}

.accordion-item {
    border: none;
}

.accordion-button {
    border: none;
    border-radius: 0; 
    background-color: transparent;  /* 移除背景色 */
    color: inherit;                 /* 使用其父元素的字體顏色 */
    box-shadow: none;               /* 移除陰影效果 */
    padding: 0;                     /* 移除內部留白 */

}

.accordion-button:not(.collapsed) {
    border: none;
    box-shadow: none; 
    background-color: transparent;
}

.accordion-collapse {
    border-top: none;
}

.accordion-button::after {
    display: none; /* 隱藏箭頭 */
}

.accordion, .accordion-item, .accordion-collapse, .accordion-body {
    background-color: transparent !important; /* 強制設定為透明背景色 */
}

.bi {
    font-size: 24px; /* 或你想要的任何其他大小 */
}

.accordion-body{
  padding-bottom: 0px;
}

.round-image {
  border-radius: 50%; 
    width: 50px;
    height: 50px;
    object-fit: cover;
    max-width: 100%;
    max-height: 100%;
    border:solid 1px black;
    margin-left: 10px;
}

.accountArea{
  height: 50px;
}

.userAccount{
  margin-left: 20px;
  font-size: 20px;
}

.accountText{
  font-size: 14px;
  font-weight: bold;
}

.userAccount .accountText{
  margin: 0;
}

.divArea{
  background-color: white;
  min-height: 99%;
  padding-top: 15px;
  border-radius: 10px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2), 0px 3px 5px rgba(0, 0, 0, 0.1);
  padding-left: 10px;
}
</style>