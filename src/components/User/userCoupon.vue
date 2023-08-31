<template>
    <div class="d-flex flex-column ">
        <!-- title -->
        <div>
            <h3>我的優惠券</h3>
        </div>

        <!-- 新增優惠券 -->
        <div>
            <div class="d-flex justify-content-center addCouponDiv">
                <div class="d-flex align-items-center addCouponDiv2">
                    <div class="me-3">新增優惠券</div>
                    <div class="codeInputDiv"><input type="text" class="form-control codeInput" placeholder="請輸入優惠券代碼"
                            v-model="coupon.code"> <button class="btn btn-secondary"><i class="bi bi-plus"
                                @click.prevent="inputCouponCode"></i></button></div>

                </div>
            </div>
        </div>
        <!-- 優惠券列表 -->
        <div class="couponListFarmDiv">
            <div class="d-flex flex-column">
                <div class="d-flex flex-wrap row row-cols-2">
                    <div v-for="couponItem in coupons" :key="couponItem.id" class="col">
                        <!-- 優惠券左 -->
                        <div v-if="couponItem.discountAmount" class="coupon">
                            <div class="row">
                                <div class="col-4 couponImg">
                                    <img src="/image/coupon/coin.png" alt="">
                                </div>
                                <div class="col-8 couponText">
                                    <div class="couponTextArea">
                                        <div class="mt-1 fw-bold text">折<i
                                                class="bi bi-currency-dollar"></i>{{ couponItem.discountAmount }}元</div>
                                        <div class="text1">低消 <i
                                                class="bi bi-currency-dollar"></i>{{ couponItem.miniumSpendingAmount }}元</div>
                                        <div class="text2">{{ couponItem.name }}</div>
                                        <div class="progress mt-1">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated"
                                                role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                :style="{ width: ((couponItem.availableNumber - couponItem.used) / couponItem.availableNumber) * 100 + '%' }"></div>
                                        </div>
                                        <div class="text3">已使用 {{ (couponItem.used / couponItem.availableNumber) * 100 }}%,
                                            即將失效: 剩下{{ calculateTimeRemaining(couponItem.endTime) }}</div>
                                            
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 優惠券右 -->
                        <div v-else-if="couponItem.discountRate" class="coupon">
                            <div class="row">
                                <div class="col-4 couponImg">
                                    <img src="/image/coupon/percent.png" alt="">
                                </div>
                                <div class="col-8 couponText">
                                    <div class="couponTextArea">
                                        <div class="mt-1 fw-bold text">{{ couponItem.discountRate * 10 }}折</div>
                                        <div class="text1">低消 <i
                                                class="bi bi-currency-dollar"></i>{{ couponItem.miniumSpendingAmount }}元,最高折扣
                                            <i class="bi bi-currency-dollar"></i>{{ couponItem.discountMaximum }}元</div>
                                        <div class="text2">{{ couponItem.name }}</div>
                                        <div class="progress mt-1">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated"
                                                role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                :style="{ width: ((couponItem.availableNumber - couponItem.used) / couponItem.availableNumber) * 100 + '%' }"></div>
                                        </div>
                                        <div class="text3">已使用 {{ (couponItem.used / couponItem.availableNumber) * 100 }}%,
                                            即將失效: 剩下{{ calculateTimeRemaining(couponItem.endTime) }}</div>
                                           
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup >
import { reactive, onMounted, ref } from 'vue';
import { CookieAxios } from '../../service/api';
import Swal from 'sweetalert2'

const coupon = reactive({
    code: '',
});

const coupons = ref([]);


const addUserCouponURL = `${import.meta.env.VITE_API_JAVAURL}addUserCoupon`;
const inputCouponCode = async () => {

    const response = await CookieAxios.post(addUserCouponURL, coupon);
    console.log(response);

    if (response.data.code === 0) {
        if (response.data.msg === "已領取過優惠券") {
            Swal.fire({
                icon: 'error',
                title: '已領取過此優惠券',
            })
        }

        if (response.data.msg === "查無此優惠券") {
            Swal.fire({
                icon: 'error',
                title: '查無此優惠券',
            })
        }

        if (response.data.msg === "優惠券尚未開始領取") {

            const rawData = "2023-09-14T15:26:00";
const dateObj = new Date(rawData);

const year = dateObj.getFullYear();
const month = String(dateObj.getMonth() + 1).padStart(2, '0');  
const day = String(dateObj.getDate()).padStart(2, '0');
const hour = String(dateObj.getHours()).padStart(2, '0');
const minute = String(dateObj.getMinutes()).padStart(2, '0');

const formattedDate = `${year}年${month}月${day}日 ${hour}:${minute}`;
            Swal.fire({
                icon: 'error',
                title: '優惠券尚未開始領取',
                text: "開始領取時間" + formattedDate,
            })
        }

        if (response.data.msg === "優惠券已過期") {
            Swal.fire({
                icon: 'error',
                title: '優惠券已過期',
            })
        }

        if (response.data.msg === "已領取過優惠券") {
            Swal.fire({
                icon: 'error',
                title: '已領取過優惠券',
            })
        }

        if (response.data.msg === "優惠券已全部領完") {
            Swal.fire({
                icon: 'error',
                title: '優惠券已全部領完',
            })
        }

        if (response.data.msg === "優換券已全數兌換完畢") {
            Swal.fire({
                icon: 'error',
                title: '優換券已全數兌換完畢',
            })
        }

        if (response.data.msg === "fail") {
            Swal.fire({
                icon: 'error',
                title: '新增失敗',
                text: "請重新輸入優惠券代碼",
            })
        }

    }

    if (response.data.code === 1) {

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '新增成功',
            showConfirmButton: false,
            timer: 2000
        })
        location.reload();
    }


}

const calculateTimeRemaining = (endTime) => {
    let endTimeDate = new Date(endTime);
    let currentDate = new Date();
    let diffMilliseconds = endTimeDate - currentDate;

    let days = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diffMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
        return days + "天" + hours + "小時";
    } else {
        return hours + "小時";
    }
}

const findAllUserCouponURL = `${import.meta.env.VITE_API_JAVAURL}findAllUserCoupon`;
onMounted(async () => {

    const response = await CookieAxios.post(findAllUserCouponURL);

    if (response.status === 200) {
        const CouponData = response.data.data;

        coupons.value = CouponData;

    }


})




</script>
    
<style scoped>
.addCouponDiv {
    width: 100%;
    height: 80px;
    margin-top: 20px;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2), 0px 3px 5px rgba(0, 0, 0, 0.1);


}

.codeInput {
    border: solid 1px black;

}

.codeInputDiv {
    width: 400px;
    position: relative;
}

.codeInput {
    padding-right: 40px;
    /* 使输入框内的文本不会被按钮覆盖 */
}

.btn {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    /* 垂直居中 */
}

.couponListFarmDiv {
    margin-top: 30px;
    border-radius: 10px;
    background-color: #FFFFFF;
    min-height: 700px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2), 0px 3px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;

}


.coupon {
    width: 450px;
    height: 150px;
    border: solid 1px white;
    margin-inline: 13px;
    margin-top: 18px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2), 0px 3px 5px rgba(0, 0, 0, 0.1);

}

.couponImg {

    height: 150px;
    padding: 0;
    overflow: hidden;

}

.couponImg img {
    width: 100%;
    height: auto;
    display: block;
}

.couponText {
    height: 150px;

}


.couponTextArea {
    margin-top: 10px;

}

.text {
    font-size: 20px;

}

.text1 {
    font-size: 14px;
}

.text2 {
    display: inline-block;
    border: solid 1px #c4af9a;
    color: #c4af9a;
    padding-inline: 4px;
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 5px;


}

.text3 {
    font-size: 14px;
}</style>