<template>
 <button  v-show="loginStatus" type="primary" style="margin-left: 16px" @click="drawer2 = true" class="btn btn-primary floatBtn">
 聊聊
  </button>
  <el-drawer v-model="drawer2" :direction="direction" class="drawer" size="75vh" style="width: 50%;" >
   
    <template #default>
      <div >
        <chatroom></chatroom>
      </div>
    </template>
    
  </el-drawer>
</template>
    
<script setup >
    import chatroom from'./chat.vue'
    import { ref } from 'vue';
    
    const drawer2=ref(false);
    const direction = ref('btt')
    const loginStatus = ref(false);
     setInterval(() => {

    if(sessionStorage.getItem('loginStatus')=="true"){

      loginStatus.value=true
    }else{
      loginStatus.value=false
    }
    }, 8000);
</script>
    
<style>

.floatBtn {
position: fixed; /* 將按鈕設定為固定位置 */
  bottom: 30px; /* 距離螢幕底部的距離 */
  left: 20px; /* 距離螢幕右側的距離 */
  padding: 10px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
</style>