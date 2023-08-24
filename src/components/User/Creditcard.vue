<template>
    <!-- 最外層 -->
    <div class="">
        <!-- title -->
        <div class="d-flex justify-content-between mb-4">
<div> <h3>信用卡</h3></div>
<div ><button class="btn btn-dark justify-content-end" @click="goToAddCreditCard"><i class="bi bi-plus-lg m-1"></i>新增信用卡</button></div>
        </div>
        <hr>

         <!-- 信用卡 -->
<div class="d-flex divSize " v-for="creditcard in creditcards.data" :key="creditcard.id" >

    <!-- 信用卡圖案 -->
<div class=" d-flex align-items-center">
    <img :src="getCardImagePath(creditcard.cardNumber)" alt="" class="cardPhoto flex-fill mx-3"></div>
<!-- 信用文字-->
<div class="d-flex align-items-center flex-fill cardType">
    <div>{{ getCardType(creditcard.cardNumber) }}</div>
</div>
<!-- 留白-->
<div class="divSpace flex-fill"></div>
<!-- 卡號-->
<div class="d-flex align-items-center flex-fill">{{ formatCardNumber(creditcard.cardNumber) }}</div>
<!-- 刪除、設為預設-->
<div class="d-flex align-items-center flex-fill justify-content-end"><button class="btn btn-dark" @click.prevent="deleteCard(creditcard)">刪除鈕</button></div>


</div>


       
    </div>
        



</template>
    
<script setup >
import { useRouter } from 'vue-router';
import { CookieAxios } from '../../service/api';
import { onMounted ,reactive} from 'vue'

const router = useRouter();

const creditcards = reactive({
id:'',
cardNumber:''



});


  const goToAddCreditCard = () => {
    router.push('/user/account/payment/CreateCreditcard'); 
  };

  const findCardURL = `${import.meta.env.VITE_API_JAVAURL}findCreditcard`;

  const fetchCreditCards = async () => {
  try {
    const response = await CookieAxios.post(findCardURL); 
    console.log(response);
    if (response.data.code === 1) {
      creditcards.data = response.data.data; 

    } else {
      console.error('Failed to fetch credit cards');
    }
  } catch (error) {
    console.error('Error fetching credit cards:', error);
  }
};

const getCardType = (creditcard) => {
   
  const cardNumber = creditcard;

  if (cardNumber.startsWith("4")) {
    return 'Visa';
  } else if (cardNumber.startsWith("5") && parseInt(cardNumber.slice(0, 2)) >= 51 && parseInt(cardNumber.slice(0, 2)) <= 55) {
    return 'MasterCard';
  } else if (cardNumber.startsWith("3") && parseInt(cardNumber.slice(1, 4)) >= 528 && parseInt(cardNumber.slice(1, 4)) <= 539) {
    return 'JCB';
  } else {
    return 'Unknown Card Type';
  }
}

const formatCardNumber = (cardNumber) => {
  if (typeof cardNumber !== 'string') {
    return '';
  }
  const formatted = cardNumber.replace(/\s/g, '').match(/.{1,4}/g).join(' ');
  return formatted;
};

const getCardImagePath = (cardNumber) => {
  if (cardNumber.startsWith("4")) {
    return "/image/visa.png";
  } else if (cardNumber.startsWith("5") && parseInt(cardNumber.slice(0, 2)) >= 51 && parseInt(cardNumber.slice(0, 2)) <= 55) {
    return "/image/mastercard.png";
  } else if (cardNumber.startsWith("3") && parseInt(cardNumber.slice(1, 4)) >= 528 && parseInt(cardNumber.slice(1, 4)) <= 539) {
    return "/image/jcb.png";
  } else {
    return "/image/mastercard.png";
  }
};

const deleteCardURL = `${import.meta.env.VITE_API_JAVAURL}deleteCard`;
const deleteCard = async(creditcard)=>{
    try {
    const response = await CookieAxios.post(deleteCardURL,creditcard); 

    if(response.data.code === 1){
        alert("刪除成功")
        location.reload();

    }else{
        alert("刪除失敗")
        location.reload();
    }

  } catch (error) {
    console.error('Error fetching credit cards:', error);
  }


}

onMounted(() => {
  fetchCreditCards(); 
});

    
</script>
    
<style scoped>

.cardPhoto{
width: 100px;
height: 50px;

}

.divSpace{
    width: 250px;
}
    
.divSize{
    height: 100px;
    border-bottom: solid 3px white;
    
}

hr{
    color: gray;
}

.cardType{
    width: 188px;
}


</style>
