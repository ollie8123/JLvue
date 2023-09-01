<template>
               <!-- 表單 -->
               <div>
                <div class="warningArea mt-4">
                    <i class="bi bi-exclamation-diamond"></i>&nbsp;提醒你，身份證字號 / 統一編號須與銀行帳號資訊一致，否則可能會影響日後撥款權益
                </div>

<form class="d-flex justify justify-content-center mt-4 " ref="bankInfoForm">


<div class="">
    <div class="mb-2 ">
        <table class="tableSize" >
            <tr>
                <td class="td1">
                    <label>銀行名稱</label>
                </td>
                <td class="td2 d-flex">
                

                        <div>
                            <select class="form-select productTypeSelect bankSelect" v-model="bank.bankNumber">
      <option v-for="bankCode in bankCodes" :key="bankCode.code" :value="bankCode.code">
        {{ bankCode.name.trim() }}
      </option>
    </select>
</div>

                </td>
            </tr>
            <tr class="">

                <td class="td1">
                    <label>分行</label>
                </td>

                <td class="td2 d-flex">
                    <div>
                        <select class="form-select branchSelect bankSelect" v-if="bank.bankNumber" v-model="bank.branchCode">
    <option v-for="branch in bankBranchCodes[bank.bankNumber]" :key="branch.code" :value="branch.code">
      {{ branch.name.trim() }}
    </option>
  </select>

  <select class="form-select branchSelect bankSelect" v-else>
    <option value="" disabled>請先選擇銀行</option>
  </select>
</div>



                </td>
            </tr>


            <tr>
                <td class="td1">
                    <label>身分證字號</label>
                </td>
                <td class="td2 d-flex">
                    <input type="text" id="inputAccount" class="form-control" name="icNumber" placeholder="身分證字號"
                        required  v-model="bank.icNumber" readonly
                        />

                </td>
            </tr>
            <tr>
                <td class="td1">
                    <label>銀行戶名</label>
                </td>
                <td class="td2 d-flex">
                    <input type="text" id="inputAccount" class="form-control" name="accountName" placeholder="銀行戶名"
                        required  v-model="bank.accountName" readonly
                        />

                </td>
            </tr>
            <tr>
                <td class="td1">
                    <label>綁定您的銀行帳號</label>
                </td>
                <td class="td2 d-flex">
                    <input type="text" id="inputBankAccount" class="form-control" name="accountNumber" placeholder="銀行帳號"
                        required  v-model="bank.accountNumber"  />

                </td>
            </tr>
            <tr>
                <td class="td1">
                    <label>驗證碼</label>
                </td>
                <td class="td2 d-flex">
                    <input type="text" id="inputBankAccount" class="form-control" name="testNumber" 
                        required  v-model="bank.testNumber" maxlength="4" @input="checkInput"/>

                        
                        <button :class="btnClass" @click.prevent="testCode">{{ user.btnText }}</button>

                </td>
            </tr>


           
    


        </table>
        <div class="text-end mt-4 d-flex align-items-center justify-content-center">
            <button class="btn btn-outline-dark" @click.prevent="$emit('goBack')">返回</button>

            <button class="btn btn-dark mx-3 " @click.prevent="addSeller">送出</button>
        </div>
    </div>

</div>
</form>




</div>

</template>
    
<script setup >
import { reactive, onMounted ,ref} from 'vue'
import { CookieAxios } from '../../service/api';
import{bankCodes,bankBranchCodes} from '/public/bank/bankInfo.js';
import router from '../../router';
import Swal from 'sweetalert2'

const bank = reactive({
    bankNumber:'',
    branchCode:'',
    accountName:'',
    accountNumber:'',
    icNumber: '',
    testNumber:'',
   
});

const seller = reactive({
    storeName:'',
});

const user = reactive({
   phone:'',
   btnText:'發送驗證碼'
});

const testCode = () =>{
    Swal.fire({
  position: 'center',
  icon: 'success',
  title: `驗證碼已發送至${user.phone}`,
  showConfirmButton: false,
  timer: 1500
})

}

const bankInfoForm = ref(null);
const btnClass=ref('btn btn-secondary testBtn')

const addSellerURL = `${import.meta.env.VITE_API_JAVAURL}createSeller`;
const addBankURL = `${import.meta.env.VITE_API_JAVAURL}createBankAccount`;

const addSeller = async()=>{
   
     try {

        if (bankInfoForm.value.checkValidity()) {

        const responseSeller = await CookieAxios.post(addSellerURL,seller); 
    if (responseSeller.data.code === 1) {

    } else {
      console.error('Failed to fetch Seller');
    }

    const responseBank = await CookieAxios.post(addBankURL,bank); 
    if (responseBank.data.code === 1) {

    } else {
      console.error('Failed to fetch Bank');
    }

    localStorage.removeItem('storeName');
    localStorage.removeItem('icNumber');
    
    Swal.fire({
  position: 'center',
  icon: 'success',
  title: '恭喜！您已成為賣家！',
  showConfirmButton: false,
  timer: 1500
})


router.push({ name: "seller" });

} else {
    bankInfoForm.value.reportValidity();
 }
   
  } catch (error) {
    console.error('Error fetching storeAddress:', error);
  }

}

const checkInput = () => {
  if (bank.testNumber.length === 4) {
    if (bank.testNumber !== '1355') {
        Swal.fire({
  icon: 'error',
  title: '驗證失敗',
  text: '請重新輸入',

})
      bank.testNumber= ''
    }
    if(bank.testNumber == '1355'){
        btnClass.value = 'btn btn-success testBtn'
    user.btnText = "驗證成功"

    }
    
  }
}



const onMountedURL = `${import.meta.env.VITE_API_JAVAURL}findUserByEmail`;
onMounted(async () => {
    try {

        seller.storeName = localStorage.getItem('storeName');
        bank.icNumber = localStorage.getItem('icNumber');
        const response = await CookieAxios.post(onMountedURL);
   
        if (response.status === 200) {
            const userData = response.data.data;
            user.phone = userData.phone;
            bank.accountName = userData.name;

           if (user.phone) {
    user.phone = user.phone.slice(-3).padStart(10, '*');
} else {
    user.phone = userData.phone;
}
        } else {
            console.error('Failed to fetch user data');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

    
</script>
    
<style scoped>

table {
    border-collapse: separate;
    border-spacing: 0 10px;
}

.InfoFarm{
    width: 500px;
}

.tableSize{
    width: 500px;
}



#inputAccount[readonly] {
    pointer-events: none; 
    background-color: #f5f5f5; 
}

.warningArea{
    height: 50px;
    padding-top: 12px;
    padding-left: 15px;
    padding-right: 15px;
    background-color:rgb(225, 232, 244);;
    border: solid 2px rgb(74,113,185);
}

.bankSelect{
    width: 400px;
}

.testBtn{
    margin-left: 10px;
    width: 150px;
}
    
</style>