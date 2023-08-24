<template>
  <div class="container mt-5">
    <v-form class="row justify-content-center" v-slot="{ errors }">
      <div class="col-md-8">
        <h1 class="h3 mb-3 font-weight-normal">會員登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <v-field
            type="email"
            id="inputEmail"
            class="form-control"
            name="email"
            placeholder="Email address"
            required
            autofocus
            v-model="user.email"
            rules="email|required"
            :class="{ 'is-invalid': errors['email'] }"
          />
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <v-field
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            name="password"
            required
            rules="required"
            v-model="user.password"
            :class="{ 'is-invalid': errors['password'] }"
          />
          <error-message
            name="password"
            class="invalid-feedback"
          ></error-message>
        </div>

        <div class="text-end mt-4">
          <button
            class="btn btn-lg btn-primary btn-block"
            type="submit"
            @click.prevent="signIn"
          >
            登入
          </button>
        </div>
      </div>
    </v-form>
  </div>
  
</template>

<script setup>
import { reactive } from "vue";
import { axios } from "../../service/api";
import { useRouter } from "vue-router";
import NomalNavBar from "../navbar/NomalNavBar.vue";
import Swal from 'sweetalert2'

const router = useRouter();
const user = reactive({
  email: "",
  password: "",
});
const signIn = async () => {
  const params = new URLSearchParams();
  params.append("email", user.email);
  params.append("password", user.password);
  axios
    .post("/userLogin", params)
    .then((res) => {
      if (res.status == 200) {
        Swal.fire({
  position: 'center',
  icon: 'success',
  title: '登入成功',
  showConfirmButton: false,
  timer: 1500
})
        localStorage.setItem("loggedIn", true)
        router.push({ name: "HomePageView" });
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        user.password = "";
        Swal.fire({
  icon: 'error',
  title: '登入失敗',
  text: '帳號或密碼有誤',
})
      }
    });
};
</script>

<style></style>
