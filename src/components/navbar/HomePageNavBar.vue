<template>
<!-- navbar開始 -->
    <nav id="mainNav" class="navbar navbar-light navbar-expand-lg bg-black text-uppercase ">
<div class="d-flex w-100 justify-content-between ">
        <!-- 左 - LOGO開始 -->
        <div class="logoDiv "><a class="navbar-brand " href="#page-top"><RouterLink to="/"><img src="/image/logo/navbarlogo.png" alt="" class="logo"></RouterLink></a><button class="navbar-toggler text-white bg-primary navbar-toggler-right text-uppercase rounded" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><i class="fa fa-bars"></i></button>    
        </div>
        <!-- 左 - LOGO結束 -->
        
        <!-- 中 - SearchBar開始 -->

        <div class="searchDiv ">
<SearchBar class="cartBtn"></SearchBar>
            
</div>

         <!-- 中 - SearchBar結束 -->

         <!-- 右 - 會員開始 -->
         <div class="d-flex">

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-3 mb-lg-0">
            <!-- 會員專區-->
            <li class="nav-item dropdown">
                <span class="accountArea d-flex">
                <img :src="image" alt="Description" class="round-image ">
                <span class="dropdown-toggle-wrapper" data-bs-toggle="dropdown">
                <a
                class="nav-link dropdown-toggle text-dark accountText"
                href="#"
                id="navbarDropdown"
                role="button"
                aria-expanded="false"
              >
                {{ user.account }}
            </a>
        </span>
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
            </span>
            </li>
            <!-- 購物車 -->
            <div>
                <RouterLink to="/seller"><div class="btn btn-outline-secondary sellerBtn">賣家中心</div></RouterLink>
                
            </div>
            <div>
             <shoppingCart style="margin-top: 5px;"></shoppingCart>
            </div>
          </ul>
        </div>
      
            
</div>
         <!-- 右 - 會員結束 -->
      
<!-- navbar結束 -->
</div>
    </nav>

    </template>

    <script setup >
    import { ref,reactive , onMounted } from 'vue';
    import { CookieAxios } from '../../service/api';
    import { useRouter, useRoute } from "vue-router";
    import shoppingCart from'../../components/noPath/shoppingCart/shoppingCart.vue'
    import SearchBar from './SearchBar.vue';
    const router = useRouter();
    const route = useRoute();
    const isLoggedIn = localStorage.getItem("loggedIn") == "true";
    const user = reactive({
    account:"會員專區",
});

    const image = ref('../../../public/image/nolmg.png')
    


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

    const userPhotoURL = `${import.meta.env.VITE_API_JAVAURL}userPhoto`;
    const userAccountURL = `${import.meta.env.VITE_API_JAVAURL}findUserByEmail`;
    onMounted(async () => {
            if (isLoggedIn) {
                     try {

            const photoResponse = await CookieAxios.post(userPhotoURL);
             if (photoResponse.data) {
            image.value = `data:image/*;base64,${photoResponse.data}`;
        }

            const userResponse = await CookieAxios.post(userAccountURL);
            if (userResponse.status === 200) {
          const userData = userResponse.data.data;
          user.account = userData.account;
        }

        } catch (error) {
            console.error('發生錯誤:', error);

        }
            }

    });







    </script>

    <style scoped>

    #mainNav {
        color: white;
    }

    #mainNav .navbar-brand, #mainNav .nav-link {
        color: white !important;
        padding-right: 0;
        margin-right: 10px;
    }

    .logo {
        width: 150px;
        height: 50px;
    }

    .logoText a, .accountText a {
        text-decoration: none !important;
        color: inherit !important;
    }

    .logoText a:hover, .accountText a:hover,
    .logoText a:focus, .accountText a:focus,
    .logoText a:visited, .accountText a:visited {
        text-decoration: none !important;
        color: inherit !important;
    }

    .round-image {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        object-fit: cover;
        max-width: 100%;
        max-height: 100%;
        border: solid 1px white;
        margin-top: 5px;
        margin-left: 5px;
        
    }

    .nav-item {
        display: flex;
        align-items: center;
        margin-top: 5px;
      
      
    }

    .accountText {
        margin: 0;
        line-height: 1.5;
        font-size: 16px;
        margin-left: 10px;
    }


    .router-link-exact-active, .router-link-active {
        text-decoration: none !important;
        color: inherit !important;
    }

    .cartIcon{
        font-size: 30px;
    }

    .logoDiv{
        margin-left: 30px;
        display: flex;
        align-items: center;        
    }


    .searchDiv{
        width: 800px;
       margin-top: 20px;
       margin-left: 180px;
    }

    .navbar{
        height: 130px;
    }

    .accountArea{
        border: solid 1px white;
        border-radius: 10px;
        white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    }
        
  .sellerBtn{
    border-color: white;
    color:white;
    width: 97.672px;
    height: 38px;
    margin-top: 7px;
    margin-left: 15px;

  }


    </style>