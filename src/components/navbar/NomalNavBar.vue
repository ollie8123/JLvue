<template>

    <nav id="mainNav" class="navbar navbar-light navbar-expand-lg bg-black text-uppercase">
        <div class="logoDiv"><a class="navbar-brand " href="#page-top"><RouterLink to="/"><img src="/image/logo/navbarlogo.png" alt="" class="logo"></RouterLink></a><button class="navbar-toggler text-white bg-primary navbar-toggler-right text-uppercase rounded" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><i class="fa fa-bars"></i></button>
            <div id="navbarResponsive" class="collapse navbar-collapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item mx-0 mx-lg-1">

                      <!-- 會員開始 -->
                       <div class="d-flex accountArea">
                <div>

                </div>

              </div>
              <!-- 結束 -->



                    </li>
                    <li class="nav-item mx-0 mx-lg-1">
                        </li>
                    <li class="nav-item mx-0 mx-lg-1"></li>
                </ul>
            </div>
        </div>
    </nav>

    </template>

    <script setup >
    import { ref,reactive , onMounted } from 'vue';
    import { CookieAxios } from '../../service/api';
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const route = useRoute();
    const isLoggedIn = localStorage.getItem("loggedIn") == "true";
    const user = reactive({
        account:'',
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
            image.value = `data:image/*;base64,${photoResponse.data}`;

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
        width: 50px;
        height: 50px;
        object-fit: cover;
        max-width: 100%;
        max-height: 100%;
        border: solid 1px white;
    }

    .nav-item {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
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
    }
        
    </style>