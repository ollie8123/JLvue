<template>
    <div class="big bg-light">

        
        <!-- 頁面一 -->
        <form v-if="!showPageTwo">
            <h2>會員驗證</h2>

            <div class="">
                <div class="mb-2 ">
                    <table class="">
                        <tr class="">

                            <td class="td1">
                                <label>使用者帳號</label>
                            </td>

                            <td class="td2 d-flex">
                                <input type="text" id="inputAccount" class="form-control" name="account"
                                    placeholder="User Account" required autofocus v-model="user.account" readonly />



                            </td>
                        </tr>


                        <tr>
                            <td class="td1">
                                <label>姓名</label>
                            </td>
                            <td class="td2 d-flex">
                                <input type="text" id="inputName" class="form-control" name="name" placeholder="User Name"
                                    required autofocus v-model="user.name" />

                            </td>
                        </tr>

                        <tr>
                            <td class="td1">
                                <label>手機號碼</label>
                            </td>
                            <td class="td2 d-flex">
                                <input type="phone" id="inputPhone" class="form-control" name="phone"
                                    placeholder="User Phone" required autofocus v-model="user.phone" />

                            </td>
                        </tr>

                        <tr>
                            <td class="td1">
                                <label>生日</label>
                            </td>
                            <td class="td2 d-flex">
                                <input type="date" id="inputAccount" class="form-control" name="birth"
                                    placeholder="User Account" required autofocus v-model="user.birth" />

                            </td>
                        </tr>
                    </table>
                    <div class="text-end mt-4 d-flex align-items-center justify-content-center">
                        <button class="btn btn-lg btn-dark btn-block"  @click.prevent="nextPage">送出驗證</button>
                    </div>
                </div>

            </div>
        </form>

        <!-- 頁面二 -->


        <div v-if="showPageTwo " >
            <h2 class="mb-4">會員驗證</h2>
            <div class="mb-3">輸入已傳送至{{ user.hidePhoneNumber }}的驗證碼</div>


   <div class="inputGroup">
  <input ref="numOne" type="text" aria-label="numOne" class="form-control numText" maxlength="1" @input="moveFocus($event, 'numTwo')" autofocus>
  <input ref="numTwo" type="text" aria-label="numTwo" class="form-control numText" maxlength="1" @input="moveFocus($event, 'numThree')">
  <input ref="numThree" type="text" aria-label="numThree" class="form-control numText" maxlength="1" @input="moveFocus($event, 'numFour')">
  <input ref="numFour" type="text" aria-label="numFour" class="form-control numText" maxlength="1"  @input="validateCode">
  <p class="mt-2 mx-2 text-danger" v-if="errorMessage">{{ errorMessage }}</p>
</div>




        </div>






    </div>
</template>
    
<script setup >
import { reactive, onMounted, ref } from 'vue'
import { CookieAxios } from '../../service/api';
import router from '../../router';
import Swal from 'sweetalert2'

const showPageTwo = ref(false);
const user = reactive({
    account: '',
    name: '',
    phone: '',
    birth: '',
    hidePhoneNumber:''
});

const numOne = ref(null);
const numTwo = ref(null);
const numThree = ref(null);
const numFour = ref(null);


const nextPage = () => {
  showPageTwo.value = true;
};


const findSellerURL = `${import.meta.env.VITE_API_JAVAURL}findSeller`;
const onMountedURL = `${import.meta.env.VITE_API_JAVAURL}findUserByEmail`;
onMounted(async () => {
    try {

        const findSellerResponse = await CookieAxios.post(findSellerURL);
       

        if(findSellerResponse.data.code === 1){

            router.push({ name: "seller" });
        }else{

        const response = await CookieAxios.post(onMountedURL);
        if (response.status === 200) {
            const userData = response.data.data;
            
            user.account = userData.account;
            user.name = userData.name;
            user.phone = userData.phone;
            user.birth = userData.birth;

           if (user.phone) {
    user.hidePhoneNumber = user.phone.slice(-3).padStart(10, '*');
} else {
    user.phone = userData.phone;
}
            if (!user.account || !user.name || !user.phone || !user.birth) {

                Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: '請先至會員專區填寫會員資料',
})
                router.push({ name: "user" });
            }

        } else {
            console.error('Failed to fetch user data');
        }
            
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

const moveFocus = (event, nextInputAriaLabel) => {
  if (event.target.value.length >= 1) {
    const nextInput = document.querySelector(`[aria-label=${nextInputAriaLabel}]`);
    if (nextInput) {
      nextInput.focus();
    }
  }
};

const errorMessage = ref("");

const validateCode = () => {
  const code = `${numOne.value.value}${numTwo.value.value}${numThree.value.value}${numFour.value.value}`;
  if (code.length === 4) {
    if (code === '1355') {
      router.push({ name: "sellerInfo" });
    } else {
      errorMessage.value = "輸入錯誤";
      numOne.value.value = "";
      numTwo.value.value = "";
      numThree.value.value = "";
      numFour.value.value = "";
      numOne.value.focus();
    }
  }
};





</script>
    
<style scoped>
.big {
    margin-top: 30px;
    min-height: 700px;
    display: flex;
    /* 將這個容器設置為flex容器 */
    justify-content: center;
    /* 主軸對齊方式 */
    align-items: center;
    /* 交叉軸對齊方式 */
    background-color: lightgray;
    /* 給予背景色 */

}

table {
    border-collapse: separate;
    border-spacing: 0 10px;
}

input {
    width: 100%;
}

.inputGroup {
  display: flex;
  justify-content: center; 
  align-items: center;
}

.numText {
  width: 40px;
  height: 50px; 
  margin: 0 10px; 
  border: 1px solid #ccc;
  border-radius: 30%;
  text-align: center; 
}


</style>