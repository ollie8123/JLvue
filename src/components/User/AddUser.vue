<template>
    <div class="container mt-5" >
        <v-form class="row justify-content-center" v-slot="{ errors, handleSubmit }" >
            <div class="col-md-9 " >
                <h1 class="h3 mb-3 font-weight-normal">會員註冊</h1>
                <div class="mb-2">
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <v-field type="email" id="inputEmail" class="form-control" name="email" placeholder="Email address"
                        required  v-model="user.email" rules="email|required"
                        :class="{ 'is-invalid': errors['email'] }" />
                    <error-message name="email" class="invalid-feedback"></error-message>

                </div>

                <div class="mb-2"  >
                    <label for="inputPassword" class="sr-only">Password</label>
                    <v-field type="password" id="inputPassword" class="form-control" placeholder="Password" name="password" rules="required" 
                        required v-model="user.password" :class="{ 'is-invalid': errors['password'] }" />
                    <error-message name="password" class="invalid-feedback"></error-message>
                </div>

                <div class="mb-2">
                    <label for="inputConfirmPassword" class="sr-only">Confirm Password</label>
                    <v-field type="password" id="inputConfirmPassword" class="form-control" placeholder="Confirm Password"
                        name="confirmPassword" required v-model="user.confirmPassword"
                        :class="{ 'is-invalid': errors['confirmPassword'] }" rules="required|confirmed:@password" />
                    <error-message name="confirmPassword" class="invalid-feedback"></error-message>
                </div>

                <div class="text-end mt-4">
                    <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="handleSubmit(register)">註冊</button>
                </div>
            </div>
        </v-form>
    </div>
</template>
    
<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { defineRule,validate } from 'vee-validate';
import Swal from 'sweetalert2'

defineRule('confirmed', (value, [target]) => {
  if (value === target) {
    return true;
  }
  return '密碼不一致';
});

const router = useRouter();


const user = reactive({
    email: '',
    password: '',
    confirmPassword: ''
});


const register = async () => {
    try {
  
        const isValid = await validate({
    email: { value: user.email, rules: 'email|required' },
    password: { value: user.password, rules: 'required' },
    confirmPassword: { value: user.confirmPassword, rules: 'required|confirmed:password' }
});


        if (isValid) {

            const checkUserURL = `${import.meta.env.VITE_API_JAVAURL}checkUserByEmail`;
            const javaURL = `${import.meta.env.VITE_API_JAVAURL}addUser`;

            const data = {
                email: user.email,
                password: user.password
            };

            const checkUser = await axios.post(checkUserURL,user)

            if (checkUser.data.data !== null) {
                Swal.fire({
  icon: 'error',
  title: '此帳號已註冊',
  text: '請重新輸入email帳號',
 
})
router.push({ name: 'register' });
                
            }else{
                const response = await axios.post(javaURL, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            router.push({ name: 'login' });
                
            }



            
        }
    } catch (error) {
        console.error("註冊過程中出現錯誤:", error);
    }
};




</script>
    
<style></style>
