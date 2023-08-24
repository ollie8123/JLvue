<template>
    <div class="container mt-5" >
        <v-form class="row justify-content-center" v-slot="{ errors }" >
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
                    <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="register">註冊</button>
                </div>
            </div>
        </v-form>
    </div>
</template>
    
<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { defineRule } from 'vee-validate';

defineRule('confirmed', (value, [target]) => {
  if (value === target) {
    return true;
  }
  return 'Passwords must match';
});

const router = useRouter();


const user = reactive({
    email: '',
    password: '',
    confirmPassword: ''
});

const register = async () =>{

    const javaURL = `${import.meta.env.VITE_API_JAVAURL}addUser`;

    const data = {
        email: user.email,
        password: user.password
    };

    try {
        const response = await axios.post(javaURL, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        router.push({ name: 'login' });
    } catch (error) {
        console.error("Error during registration:", error);
    }

}


</script>
    
<style></style>
