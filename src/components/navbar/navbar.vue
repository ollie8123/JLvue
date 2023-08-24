<template>
  <nav class="navbar navbar-expand-lg bg-transparent bg-dark border-bottom">
    <div class="container-fluid">
      <div>
        <a class="navbar-brand text-dark" style="padding-left: 50px">
          <RouterLink to="/"><img src="/image/logo/logo.png" alt="" class="logo"></RouterLink>
        </a>
        <RouterLink class="nav-item dropdown" to="/seller">賣家中心</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <!-- 會員專區、購物車 -->
      <div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- 會員專區-->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle text-dark"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-person-circle"></i>{{ user.account }}
            </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li v-if="!isLoggedIn">
                    <RouterLink to="/register" class="dropdown-item">註冊新會員</RouterLink>
                </li>
                <li  v-if="!isLoggedIn">
                    <RouterLink to="/login" class="dropdown-item">登入</RouterLink>
                </li>
                <!-- 登入後才會顯示 -->
                <li v-if="isLoggedIn">
                  <RouterLink class="dropdown-item" to="/user"
                    >個人資料</RouterLink
                  >
                </li>
                <li v-if="isLoggedIn">
                  <RouterLink class="dropdown-item" to="＃"
                    >購買清單</RouterLink
                  >
                </li>
                <li v-if="isLoggedIn">
                  <a class="dropdown-item" @click="logout">登出</a>
                </li>
                <!-- 登入後才會顯示 -->
              </ul>
            </li>
            <!-- 購物車 -->
             <shoppingCart style="margin-top: 5px;"></shoppingCart>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref, onMounted ,watch,reactive} from "vue";
import { CookieAxios } from "../../service/api";
import shoppingCart from'../../components/noPath/shoppingCart/shoppingCart.vue'
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const isLoggedIn = localStorage.getItem("loggedIn") == "true";
const user = reactive({
    account:"會員專區",
});
//登出後端讓cookie失效，並更新登入狀態
const logout =  () => {
   CookieAxios.post("/logout").then(() => {
     localStorage.setItem("loggedIn", false)
  //判斷登出時的路徑
  if (route.path !== "/HomePageView") {
       router.push("/").then(() => location.reload());
    } else {
    location.reload();
    }
  });
};
const onMountedURL = `${import.meta.env.VITE_API_JAVAURL}findUserByEmail`;
onMounted(async () => {
  if (isLoggedIn) {
 try {
    const response = await CookieAxios.post(onMountedURL);
    console.log(response);

    if (response.status === 200) {
      const userData = response.data.data;
      console.log(userData)

      user.account = userData.account;

    } else {
      console.error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
  }
});
</script>
<style scoped>
.logo{
  width: 100px;
  height: 50px;
}
</style>

