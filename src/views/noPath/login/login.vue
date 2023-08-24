<template>
  <NomalNavBar></NomalNavBar>

  <div class="container row bigFarm">
  
    <div class="col-6"><img src="/image/background/jingling.png" alt="" class="imgBg"></div>
    <div class="col-5 bodyDiv d-flex flex-column  "> 
      
      <div><UserLogin></UserLogin></div>
<div class=" mt-5 d-flex justify-content-center"><googleLoginButton class="log"></googleLoginButton></div>


    </div>
    
    
  </div>




  <div class="container">
   
   
    
  </div>

<Footer></Footer>



</template>

<script setup>
import googleLoginButton from "../../../components/noPath/login/googleLoginButton.vue";
import UserLogin from "../../../components/User/UserLogin.vue"
import NomalNavBar from "../../../components/navbar/NomalNavBar.vue";
import Footer from "../../../components/noPath/footer/Footer.vue";

</script>

<style>

.bigFarm{
  min-height: 600px;
  background-color: rgb(193	211	221	);
  margin:80px auto;
  border-radius: 1%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); 

}

.imgBg{
margin-top: 60px;
margin-left: 40px;
  width: 600px;
  border-radius: 1%;
 
}

.bodyDiv{

  margin-left: 80px;
  height: vh;
  width: 400px;
  background-color: white;

  border: solid 1px white;
  border-radius: 1%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); 
}

</style>
