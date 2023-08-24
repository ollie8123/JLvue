<template>
    <div class="">
        <v-form class="" v-slot="{ errors }">

            <div class="">
                <div class="mb-2 ">
                    <table class="">
                        <tr class="">

                            <td class="td1">
                                <label>使用者帳號</label>
                            </td>

                            <td class="td2 d-flex">
                                <v-field type="text" id="inputAccount" class="form-control" name="account"
                                    placeholder="User Account" required autofocus v-model="user.account" rules="required"
                                    :class="{ 'is-invalid': errors['account'] }" 
                                    :readonly="isAccountReadOnly"
                                    />
                                <error-message name="account" class="invalid-feedback "></error-message>
                                <div class="textAccount">*使用者有一次更改帳號機會</div>
                                
                            </td>
                        </tr>


                        <tr>
                            <td class="td1">
                                <label>姓名</label>
                            </td>
                            <td class="td2 d-flex">
                                <v-field type="text" id="inputName" class="form-control" name="name"
                                    placeholder="User Name" required  v-model="user.name" rules="required"
                                    :class="{ 'is-invalid': errors['name'] }" />
                                <error-message name="name" class="invalid-feedback "></error-message>
                            </td>
                        </tr>

                        <tr>
                            <td class="td1">
                                <label>Email</label>
                            </td>
                            <td class="td2 d-flex">
                                <v-field type="email"
                id="inputEmail"
                class="form-control"
                name="email"
                placeholder="Email address"
                required
                v-model="user.email"
                rules="email|required"
                :class="{ 'is-invalid':errors['email']}"
                readonly />
                                <error-message name="email" class="invalid-feedback "></error-message>
                            </td>
                        </tr>

                        <tr>
                            <td class="td1">
                                <label>手機號碼</label>
                            </td>
                            <td class="td2 d-flex">
                                <v-field type="phone" id="inputPhone" class="form-control" name="phone"
                                    placeholder="User Phone" required  v-model="user.phone"  :rules="isPhone"
                                    :class="{ 'is-invalid': errors['phone'] }" />
                                <error-message name="phone" class="invalid-feedback "></error-message>
                            </td>
                        </tr>

                        <tr>
                            <td class="td1">
                                <label>生日</label>
                            </td>
                            <td class="td2 d-flex">
                                <v-field type="date" id="inputAccount" class="form-control" name="birth"
                                    placeholder="User Account" required v-model="user.birth" rules="required"
                                    :class="{ 'is-invalid': errors['birth'] }" />
                                <error-message name="birth" class="invalid-feedback "></error-message>
                            </td>
                        </tr>

                      

                      



                    </table>
                    <div class="text-end mt-4 d-flex align-items-center justify-content-center">
                <button class="btn btn-lg btn-dark btn-block" type="submit" @click.prevent="save">儲存</button>
            </div>
                </div>

            </div>





         
           

        </v-form>
    </div>
</template>
    
<script setup >
import { reactive ,onMounted , ref} from 'vue'
import { CookieAxios } from '../../service/api';
import router from '../../router';

const user = reactive({
    email: '',
    password: '',
    account: '',
    name:'',
    phone:'',
    birth:''
});

const isPhone = (value) => {
    if (!value || value.trim() === '' || value === null) {
        return '電話號碼為必填';
    }

    const phoneNumber = /^(09)[0-9]{8}$/;
    return phoneNumber.test(value) ? true : '需要正確的電話號碼';
}

const updataURL = `${import.meta.env.VITE_API_JAVAURL}updateUser`;

const save = async () => {
  try {

    const response = await CookieAxios.put(updataURL, user);


    if (response.status === 200) {
      
        alert("更新成功");
        location.reload();
    } else {
        alert("更新失敗");
        location.reload();
    }
  } catch (error) {
    // 请求错误，你可以在这里处理错误情况，例如显示错误消息
    console.error("請求錯誤");
  }
  router.push({ name: "account" });
};

const isAccountReadOnly = ref(false); 

const onMountedURL = `${import.meta.env.VITE_API_JAVAURL}findUserByEmail`;
onMounted(async () => {
  try {
    const response = await CookieAxios.post(onMountedURL);


    if (response.status === 200) {
      const userData = response.data.data; 
      
      user.email = userData.email;
      user.account = userData.account;
      user.name = userData.name;
      user.phone = userData.phone;
      user.birth = userData.birth;

      isAccountReadOnly.value = !user.account.startsWith('~');
     
    } else {
      console.error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
});

</script>
    
<style scoped>
.td1 {
    text-align: right;
    color: rgba(85, 85, 85, .8);
    overflow: hidden;
    padding-bottom: 30px;
    white-space: nowrap;
    min-width: 20%;
}

.td2 {
    box-sizing: border-box;
    padding-left: 20px;
    padding-bottom: 30px;
}

.label {
    cursor: default;
}

.invalid-feedback {
    margin-left: 30px;
    font-size: 16px;
}

.form-control {
    width: 300px;
    min-width: 0;
}

.textAccount{
    display: block;
    color: grey;
    font-size: 12px;
    margin: 10px;
}

#inputAccount[readonly] {
    pointer-events: none; 
    background-color: #f5f5f5; 
}


</style>