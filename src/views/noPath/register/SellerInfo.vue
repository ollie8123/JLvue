<template>
        <NomalNavBar></NomalNavBar>



    <div class="container">
        <div class="big bg-light ">

<div class="infoDiv ">


    <div class="mt-4"><i class="bi bi-pencil"></i><span class="infoText">&nbsp;&nbsp;基本資料</span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="bi bi-caret-right-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;<i class="bi bi-bank"></i><span :class="{'infoText': showBankInfo}">&nbsp;&nbsp;綁定銀行帳戶</span></div>

            <!-- 進度條 -->
            <div class="progress ">
  <div class="progress-bar lineText" role="progressbar" :style="{ width: showBankInfo ? '100%' : '50%' }" :aria-valuenow="showBankInfo ? '100' : '50'"  aria-valuemin="0" aria-valuemax="100">{{ showBankInfo ? '100%' : '50%' }} </div>
 
</div>
<!-- 進度條 -->
<hr>
        <SellerInfo v-if="!showBankInfo" @next="showBankInfo = true" ></SellerInfo>
<BankInfo v-else @goBack="showBankInfo = false"></BankInfo>
</div>

</div>

    </div>








</template>
    
<script setup >
import SellerInfo from '../../../components/Seller/SellerInfo.vue';
import NomalNavBar from '../../../components/navbar/NomalNavBar.vue';
import BankInfo from '../../../components/User/BankInfo.vue';
import { ref } from 'vue';
const showBankInfo = ref(false);



    
</script>
    
<style>

.big {
    margin-top: 30px;
    min-height: 700px;
 
}

hr {
    border: 0;
    height: 2px;
    background-color: grey;
    margin: 0 auto;
    width: 80%; 
}

.infoDiv {
    display: flex;
    flex-direction: column; /* 確保內容在垂直方向上堆疊 */
    justify-content: center; 
    align-items: center;   
}

.progress {
    width: 50%;
    margin: 25px 0; /* 增加上下間距 */
}

.infoText{
    color: rgb(74,113,185);
}

.lineText{
    background-color:  rgb(74,113,185);;
    height: 20px;

}
    
</style>