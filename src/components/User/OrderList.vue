<template>
    <div class="bigFarm ">
       <ul class="nav nav-pills mb-3 titleUl" id="pills-tab" role="tablist">
  <li class="nav-item titleLi" role="presentation">
    <button class="nav-link active" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">全部</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-pendingPayment-tab" data-bs-toggle="pill" data-bs-target="#pills-pendingPayment" type="button" role="tab" aria-controls="pills-pendingPayment" aria-selected="false">待付款</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-backOrder-tab" data-bs-toggle="pill" data-bs-target="#pills-backOrder" type="button" role="tab" aria-controls="pills-backOrder" aria-selected="false">待出貨</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-toBeReceived-tab" data-bs-toggle="pill" data-bs-target="#pills-toBeReceived" type="button" role="tab" aria-controls="pills-toBeReceived" aria-selected="false">待收貨</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-finished-tab" data-bs-toggle="pill" data-bs-target="#pills-finished" type="button" role="tab" aria-controls="pills-finished" aria-selected="false">已完成</button>
  </li>
</ul>


<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-home-all"><orderAll></orderAll></div>
  <div class="tab-pane fade" id="pills-pendingPayment" role="tabpanel" aria-labelledby="pills-pendingPayment-tab">
    <orderPendingPayment></orderPendingPayment>
  </div>
  <div class="tab-pane fade" id="pills-backOrder" role="tabpanel" aria-labelledby="pills-backOrder-tab"><orderBackOrder></orderBackOrder></div>
<div class="tab-pane fade" id="pills-toBeReceived" role="tabpanel" aria-labelledby="pills-toBeReceived-tab"><orderToBeReceived></orderToBeReceived></div>
<div class="tab-pane fade" id="pills-finished" role="tabpanel" aria-labelledby="pills-finished-tab">
    <orderFinished></orderFinished>
</div>
</div>
</div>
</template>
    
<script setup >
import orderAll from '../order/orderAll.vue';
import orderToBeReceived from'../order/orderToBeReceived.vue';
import orderPendingPayment from'../order/orderPendingPayment.vue';
import orderBackOrder from'../order/orderBackOrder.vue';
import orderFinished from '../order/orderFinished.vue';


</script>
    
<style scoped>


.bigFarm{
    text-align: center;  /* 水平居中 */
    margin: 0;
    padding: 0;
    width: 100%;  /* 宽度为整个屏幕宽度 */
    background-color: rgb(247 248 249	);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    min-height: 776px;
    padding-top: 10px;

}
.titleUl {
    display: flex;  /* 使用flex布局 */
    justify-content: space-between;  /* 使列表项平均分布 */
    padding: 0;  /* 移除内部的间距 */
    list-style-type: none;  /* 去除默认的列表样式 */
    margin: 0 auto;  /* 水平居中ul */
    width: 80%;  /* 这里假设你希望ul占据屏幕宽度的80%，可以根据实际需求调整 */
}



    
</style>