<template>
    <!-- 最外層 -->
        <div>
<v-form   v-slot="{ errors }" ref="myForm" >
            <!-- Title -->
            <div class="mb-5"><h3>新增信用卡</h3>
            </div>

             <!-- 卡片詳情 -->
            <div class="d-flex justify-content-between mb-3">
                <div class="cardText">卡片詳情</div>
                <div class="d-flex">
                    <div><img :src="cardImages.VISA" alt="VISA"></div>
                    <div><img :src="cardImages.Mastercard" alt="Mastercard"></div>
                    <div><img :src="cardImages.JCB" alt="JCB"></div>
                </div>
            </div>

<!-- 信用卡資料 -->

<div>
<div class="mb-3 form-floating">
    <v-field type="text" 
            id="floatingTextarea" 
            class="form-control" 
            name="cardNumber"
            placeholder="信用卡卡號" 
            required 
            autofocus 
            v-model="user.cardNumber" 
            rules="required"
            @input.prevent="CardNumberChange"
            :class="{ 'is-invalid': errors['cardNumber'] }"
            :maxlength="16"
            :minlength="16"
             />
            <label for="floatingTextarea">信用卡卡號</label>
            <error-message name="cardNumber" class="invalid-feedback "></error-message>
        </div>


<div class="d-flex  mb-3 ">
    <div class="flex-fill form-floating">
        <v-field type="text" 
            id="floatingTextarea" 
            class="form-control" 
            name="expiryDate"
            placeholder="到期日(MM/YY)" 
            required 
            autofocus 
            v-model="user.expiryDate" 
            rules="required"
            :class="{ 'is-invalid': errors['expiryDate'] }" 
            :maxlength="4"
            @input="expiryDateChange" />
            <label for="floatingTextarea">到期日(MM/YY)</label>
            <error-message name="expiryDate" class="invalid-feedback "></error-message>
        </div>
    <div class="flex-fill divExpiryDate form-floating ">
            <v-field type="text" 
            id="floatingTextarea" 
            class="form-control input-with-icon" 
            name="cardVerificationValue"
            placeholder="安全驗證碼" 
            required 
            autofocus 
            v-model="user.cardVerificationValue" 
            rules="required"
            :class="{ 'is-invalid': errors['cardVerificationValue'] }" 
            :maxlength="3"/>
            <label for="floatingTextarea">安全驗證碼</label>
            <i class="bi bi-question-circle input-icon" @click="question()"></i>
            <error-message name="cardVerificationValue" class="invalid-feedback "></error-message>
    
    </div>
<!-- 安全碼Modal -->
<div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">安全碼</h4>
                    <img src="../../../public/image/cvv.png" alt="CVV" class="cvvimg">
                    <br>
                    <p class="mb-0">CVV號碼（安全驗證碼）是信用卡背面簽名區旁邊的3位數字。</p>
                </div>
                <button @click="closeModal" class="btn btn-dark">關閉</button>
            </div>
        </div>
    
</div>
<div class="mb-3 form-floating">
    <v-field type="text" 
            id="floatingTextarea" 
            class="form-control" 
            name="name"
            placeholder="持卡者姓名" 
            required 
            autofocus 
            v-model="user.name" 
            rules="required"
            :class="{ 'is-invalid': errors['name'] }" />
            <label for="floatingTextarea">持卡者姓名</label>
            <error-message name="name" class="invalid-feedback "></error-message>    
</div>

<div>
    <div class="cardText mb-3">帳單地址</div>
    <div>
        <div class="mb-3 form-floating ">
            <v-field type="text" 
            id="floatingTextarea" 
            class="form-control" 
            name="billAddress"
            placeholder="信用卡帳單地址" 
            required 
            autofocus 
            v-model="user.billAddress" 
            rules="required"
            :class="{ 'is-invalid': errors['billAddress'] }" />
            <label for="floatingTextarea">信用卡帳單地址</label>
            <error-message name="billAddress" class="invalid-feedback "></error-message>   
        </div>
        <div class="mb-3 form-floating">
            <v-field type="text" 
            id="floatingTextarea" 
            class="form-control" 
            name="billPostalCode"
            placeholder="郵遞區號" 
            required 
            autofocus 
            v-model="user.billPostalCode" 
            rules="required"
            :class="{ 'is-invalid': errors['billPostalCode'] }" 
            :maxlength="3"/>
            <label for="floatingTextarea">郵遞區號</label>
            <error-message name="billPostalCode" class="invalid-feedback "></error-message> 
        </div>
        
    </div>
</div>

<div class="d-flex justify-content-end">
    <button class="btn btn-dark " @click.prevent="addCard">送出</button>
</div>


</div>

</v-form>
<!-- 尾巴-->
        </div>


</template>
    
<script setup >
import { reactive ,ref} from 'vue';
import { CookieAxios } from '../../service/api';
import router from '../../router';
import Swal from 'sweetalert2'

const user = reactive({
    userId:'',
    cardNumber:'',
    expiryDate:'',
    name:'',
    cardVerificationValue:'',
    billAddress:'',
    billPostalCode:''
});

const showModal = ref(false); // 控制模態窗口的顯示和隱藏

const question = () => {
    showModal.value = true; // 顯示模態窗口
}

const closeModal = () => {
    showModal.value = false; // 隱藏模態窗口
}

const cardImages = reactive({
    VISA: "/image/visaBlack.png",
    Mastercard: "/image/mastercardBlack.png",
    JCB: "/image/jcbBlack.png"
});

const CardNumberChange = () => {
    let cardStr = user.cardNumber.toString();

    // Set the default black images
    cardImages.VISA = "/image/visaBlack.png";
    cardImages.Mastercard = "/image/mastercardBlack.png";
    cardImages.JCB = "/image/jcbBlack.png";

    if (cardStr.startsWith("4")) {
        cardImages.VISA = "/image/visa.png";
    } else if (cardStr.startsWith("5") && parseInt(cardStr.slice(0, 2)) >= 51 && parseInt(cardStr.slice(0, 2)) <= 55) {
        cardImages.Mastercard = "/image/mastercard.png";
    } else if (cardStr.startsWith("3") && parseInt(cardStr.slice(1, 4)) >= 528 && parseInt(cardStr.slice(1, 4)) <= 539) {
        cardImages.JCB = "/image/jcb.png";
    }
};

const myForm = ref(null);
const javaURL = `${import.meta.env.VITE_API_JAVAURL}createCreditcard`;

const addCard =   async()=>{

    const validation = await myForm.value.validate();
     

    if (validation.valid) {
        const response =  await CookieAxios.post(javaURL,user)
  
  if(response.status === 200){
    Swal.fire({
  position: 'center',
  icon: 'success',
  title: '新增成功',
  showConfirmButton: false,
  timer: 1500
})
 router.push({ name: "payment" });
  }else{
    Swal.fire({
  icon: 'error',
  title: '新增失敗',
  showConfirmButton: false,
  timer: 1500
})
 router.push({ name: "CreateCreditcard" });
  }

    }

}

    
</script>
    
<style scoped>

.cardText{
    color: rgba(85, 85, 85, .8);
    font-size: 18px;
}
    
img{
    width: 70px;
    height: 35px;
}

.divExpiryDate{
    margin-left: 15px;
    position: relative;
}

.input-with-icon {
  padding-right: 30px; 
}

.input-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding-right: 50px;
  font-size: 20px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 500px;
}

.cvvimg{
    width: 300px;
    height: 200px;
}
.alert.alert-success {
    background-color: white;
    border: none;
}

</style>