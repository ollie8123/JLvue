<template>
    <!-- 最外層 -->
    <div>

        <!-- Title、新增按鈕 -->
        <div class="d-flex justify-content-between titleArea">
            <div>
                <h3>我的地址</h3>
            </div>
            <div class="d-flex">
                <div class="mx-2"><button class="btn btn-outline-dark " @click="newConvenience"><i class="bi bi-plus-lg m-1"></i>新增超商地址</button>
                </div>
                <div><button class="btn btn-dark" @click="newAddress"><i class="bi bi-plus-lg m-1"></i>新增地址</button></div>
            </div>

        </div>
        <hr >

        <!-- 新增地址 -->
        <div class="bigArea">

            <div class="mb-3"  >
                <h3>地址</h3>
            </div>

            <div class="" >
                <div class="addressArea">
                <div class="d-flex flex-column mb-2 addressInfo" v-for=" address in address.data" :key="address.id"  >

                    <!-- 新增地址-姓名、電話、編輯 -->
                    <div class="d-flex justify-content-between"  >
                        <div class="d-flex mb-2">
                            <span>
                                <div>{{ address.recipientName }}</div>
                            </span>
                            <div class="dividingLine">&nbsp;|&nbsp;</div>
                            <div class="text-black-50">{{ address.recipientPhone }}</div>
                        </div>
                        <div>
                            <a href="#" @click.prevent="deleteAddress(address)">刪除</a>

                        </div>

                    </div>


                    <!-- 新增地址-地址 -->
                    <div class="d-flex justify-content-between ">
                        <div class="d-flex flex-column">
                            <div class="text-black-50">{{ address.addressDetail }}</div>
                           
                        </div>

                        <div>
                            <button class="btn btn-outline-warning" v-if="address.isDefault === false" 
                             @click.prevent="updateAddressIsDefault(address)">設為預設</button>
                             <button v-else class="btn btn btn-outline-success">預設</button>

                        </div>


                    </div>
                    <div>
                        <span class="text-black-50 addressType">{{ address.addressType }}</span>
                    </div>

                </div>
            </div>
                <!-- 新增超商地址-地址 -->
                <hr>

                <div class="convenienceStore">
                    <!-- 新增超商地址-Title-->
                    <div class="mb-3">
                        <h3>超商取貨地址</h3>
                    </div>
                    <!-- d1-->
                    <div class="storeArea">
                    <div v-for=" storeAddress in storeAddress.data" :key="storeAddress.id" class="addressInfo mb-2">
                        <div class="d-flex flex-column mb-5">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex mb-2">
                                    <span>
                                        <div>{{ storeAddress.recipientName }}</div>
                                    </span>
                                    <div class="dividingLine">&nbsp;|&nbsp;</div>
                                    <div class="text-black-50">{{ storeAddress.recipientPhone }}</div>
                                </div>
                                <div><a href="#" @click.prevent="deleteStoreAddress(storeAddress)">刪除</a></div>
                            </div>

                            <div class="text-black-50 ">{{ storeAddress.storeName }}</div>
                            <div class="">
                                <div class="text-black-50">{{ storeAddress.addressDetail }}</div>
                            </div>

                            <div class="text-black-50 ">{{ storeAddress.storeNumber }}</div>
                            <div>
                                <span class="text-black-50 convenienceStoreName ">{{storeAddress.storeType}}</span>
                            </div>

                        </div>
                    </div>
                </div>




                </div>




            </div>
        </div>




        <!-- 尾巴 -->
    </div>

    <!-- Add new Address Modal視窗 -->
    <div class="modal" id="addressModal" tabindex="-1" ref="addressModalRef">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header my-2">
                    <h3 class="modal-title">新增地址</h3>
                </div>

                <!-- form開始 -->
                <v-form ref="myForm" >
                    <div class="modal-body">
                        <div class="d-flex flex-column">
                            <div class="d-flex">
                                <div class="mb-3 form-floating flex-fill">
                                    <input type="text" id="floatingTextarea1" class="form-control" name="recipientName"
                                        placeholder="全名" required v-model="address.recipientName"  />
                                    <label for="floatingTextarea1">全名</label>
                                </div>

                                <div class="mb-3 form-floating flex-fill mx-3">
                                    <input type="text" id="floatingTextarea2" class="form-control" name="recipientPhone"
                                        placeholder="電話" required v-model="address.recipientPhone"  />
                                    <label for="floatingTextarea2">電話</label>
                                </div>
                            </div>
                            <div>

                                <div class="form-floating flex-fill mb-3">
                                    <input type="text" v-model="address.city" readonly placeholder="選擇城市" class="form-control"
                                        id="citySelect" @click="toggleDropdown" name="city" required />
                                    <label for="citySelect">選擇城市、地區</label>

                                    <div v-if="isOpen" class="dropdown-menu d-flex flex-column">
                                        <!-- 上方的選擇標題 -->
                                        <div class="menu-header">
                                            <div class="menu-title" @click="resetSelection"
                                                :class="{ 'active-border': menuType === 'city' }">城市</div>
                                            <div class="menu-title" @click="switchToArea"
                                                :class="{ 'active-border': menuType === 'area' }">地區</div>
                                        </div>

                                        <!-- 下方的選擇列表 -->
                                        <div class="menu-column">
                                            <div v-if="!selectedCity && menuType === 'city'" v-for="city in cities"
                                                @click="selectCity(city)">{{ city }}</div>
                                            <div v-if="selectedCity && menuType === 'area'"
                                                v-for="area in getAreasByCity(selectedCity)" @click="selectArea(area)">
                                                {{ area }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="mb-3 form-floating ">
                                    <input type="text" id="floatingTextarea1" class="form-control" name="postalCode"
                                        placeholder="郵遞區號" required v-model="address.postalCode" rules="required"
                                        maxlength="3" />
                                    <label for="floatingTextarea1">郵遞區號</label>
                                </div>

                            </div>

                            <div>
                                <div class="mb-3 form-floating ">
                                    <input type="text" id="floatingTextarea1" class="form-control" name="address"
                                        placeholder="街道,巷弄,門號,樓層" required v-model="address.address" rules="required" />
                                    <label for="floatingTextarea1">街道,巷弄,門號,樓層</label>
                                </div>

                            </div>

                            <div>

                                <div>
                                    <p>標記為：</p>
                                    <label class="custom-label" :class="{ 'radioBg': address.addressType === '住家' }">
                                        <input type="radio" name="addressType" value="住家" v-model="address.addressType">
                                        <span>住家</span>


                                    </label>

                                    <label class="custom-label" :class="{ 'radioBg': address.addressType === '公司' }">
                                        <input type="radio" name="addressType" value="公司" v-model="address.addressType">
                                        <span>公司</span>

                                    </label>

                                </div>
                            </div>
                            <div class="mt-2">
                                <input type="checkbox" id="isDefault" name="isDefault"  v-model="address.isDefault"  />
                                <label for="isDefault">設為預設</label>
                            </div>




                        </div>
                    </div>

                    <!-- button -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-dark btnSize" data-bs-dismiss="modal"
                            @click="closeModal">取消</button>
                        <button class="btn btn-dark btnSize" @click.prevent="addAddress"> 完成</button>
                    </div>
                </v-form>
                <!-- form結束 -->
            </div>
        </div>
    </div>

    <!-- 新增超商  選擇超商 Modal視窗 -->
    <div class="modal"  id="convenienceModal" tabindex="-1" ref="convenienceModalRef">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header my-2">
                    <h3 class="modal-title">新增超商地址</h3>
                </div>

                <div class="modal-body">
                    <div class="d-flex flex-column">

                        <div>
                            <div class="mb-3  ">
                                <button type="button" class="btn btn-outline-secondary btn-lg w-100 d-flex align-items-center" @click="emap711"><img src="/image/convenience/711.png" class="c711Img"><span>7-11</span></button>
                            </div>

                            <div  class="mb-3  ">
                                <button type="button" class="btn btn-outline-secondary btn-lg w-100 d-flex align-items-center" @click="emapFM"><img src="/image/convenience/FamilyMart.png" class="FMImg" ><span class="fm">全家便利商店</span></button>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- button -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-dark btnSize" data-bs-dismiss="modal"
                        @click="closeConvenienceModal">取消</button>

                </div>

            </div>
        </div>
    </div>


    <!-- 新增超商  輸入資料 Modal視窗 -->

    <div class="modal" id="convenienceModalInputnput" tabindex="-1" ref="convenienceModalRefInput">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header my-2 d-flex flex-column ">
                    <div ><h3 class="modal-title ">新增超商地址</h3></div>
                    <div class="textColor"> 請確認你已提供與身份證件相同之真實姓名，以便取貨時供超商店員核對</div>
                </div>
                

                <v-form ref="storeForm">
                <div class="modal-body">
                    <div class="d-flex flex-column">

                        <div>
                            <div class="mb-3 form-floating ">
                                <input type="text" id="floatingTextarea1" class="form-control" name="name"
                                        placeholder="姓名" required v-model="storeAddress.recipientName"  />
                                    <label for="floatingTextarea1">姓名</label>
                            </div>

                            <div class="mb-3 form-floating ">
                                <input type="text" id="floatingTextarea1" class="form-control" name="phone"
                                        placeholder="電話號碼" required v-model="storeAddress.recipientPhone"  />
                                    <label for="floatingTextarea1">電話號碼</label>
                            </div>
                            <input type="text" name="storeType" :value="storeAddress.storeType" hidden>
                            <input type="text" name="storeName" :value="storeAddress.storeName" hidden>
                            <input type="text" name="addressDetail" :value="storeAddress.addressDetail" hidden>

                            <div class="mb-3  ">
                                <div class="form-control">
                                    <span>{{ storeAddress.storeType }}</span><br>
                                    <span>{{ storeAddress.storeName }}</span><br>
                                    <span>{{ storeAddress.addressDetail }}</span>
                                </div>
                                   
                            </div>

                        </div>
                    </div>
                </div>

                <!-- button -->
                <div class="modal-footer">
                        <button type="button" class="btn btn-outline-dark btnSize" data-bs-dismiss="modal"
                            @click="closeModal">取消</button>
                        <button class="btn btn-dark btnSize" @click.prevent="addStoreAddress">完成</button>
                    </div>
                </v-form>


            </div>
        </div>
    </div>







</template>
    
<script setup >
import { ref, reactive,onMounted } from 'vue';
import { Modal } from 'bootstrap';
import { cities, areas } from '../../../public/locations/location';
import { CookieAxios } from '../../service/api';
import Swal from 'sweetalert2'


const address = reactive({
    recipientName: '',
    recipientPhone: '',
    postalCode: '',
    address: '',
    addressDetail: '',
    county: '',
    addressType: null,
    isDefault:'true',
    city:'',
});



const storeAddress = reactive({
    recipientName: '',
    recipientPhone: '',
    storeType:'',
    storeNumber:'',
    storeName:'',
    addressDetail: '',
});

const addressModalRef = ref(null);
const modalInstance = ref(null);

const newAddress = () => {
    if (!modalInstance.value && addressModalRef.value) {
        modalInstance.value = new Modal(addressModalRef.value);
    }
    modalInstance.value.show();
};

const closeModal = () => {
    modalInstance.value.hide();
};

let isOpen = ref(false);
let selectedCity = ref(null);

let menuType = ref('city'); // 用來決定當前的選單類別，初始值為 'city'



const getAreasByCity = city => areas[city] || [];

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectCity = city => {
    selectedCity.value = city;
    address.county= city;
    menuType.value = 'area'; // 選擇完城市後，切換到地區選單
};

const selectArea = area => {
    address.city = `${selectedCity.value} ${area}`;
    isOpen.value = false;
};

const switchToArea = () => {
    if (!selectedCity.value) {
        selectedCity.value = cities[0]; // 或是其他預設的城市
    }
    menuType.value = 'area'; // 切換到地區選單
};

const resetSelection = () => {
    selectedCity.value = null;
    menuType.value = 'city'; // 重設回城市選單
};


const convenienceModalRef = ref(null);
const convenienceInstance = ref(null);

const newConvenience = () => {
    if (!convenienceInstance.value && convenienceModalRef.value) {
        convenienceInstance.value = new Modal(convenienceModalRef.value);
    }
    convenienceInstance.value.show();
};

const closeConvenienceModal = () => {
    convenienceInstance.value.hide();
};

const emap711 = ()=>{
    window.open('https://emap.presco.com.tw/c2cemap.ashx?eshopid=870&&servicetype=1&url=http%3A%2F%2Flocalhost%3A9999%2FcallBack711','_blank')
    }

    const convenienceModalRefInput = ref(null);
    const convenienceInstanceInput = ref(null);

    const emapFM = () => {
    let newWindow = window.open('https://mfme.map.com.tw/default.aspx?cvsname=shopee.tw&cvsid=1692000713190&cvstemp=eyJjYWxsYmFja191cmwiOiJodHRwczovL3Nob3BlZS50dy91c2VyL2FjY291bnQvYWRkcmVzcyJ9&exchange=true&cvslink=http://localhost:9999/familyMartCallBack', '_blank');
    
    convenienceInstance.value.hide();

    if (!convenienceInstanceInput.value && convenienceModalRefInput.value) {
        convenienceInstanceInput.value = new Modal(convenienceModalRefInput.value);
    }
    convenienceInstanceInput.value.show();

    let checkWindowClosed = setInterval(() => {
        if (newWindow.closed) {
            clearInterval(checkWindowClosed);
            console.log('視窗已經關閉');

            // 當視窗關閉時，從cookie中取得資料
            storeAddress.storeName = getCookie('storeName') || '';
            storeAddress.addressDetail = getCookie('addressDetail') || '';
            storeAddress.storeType = getCookie('storeType') || '';
        }
    }, 1000);
}

// 幫助函數，用來根據名稱獲取cookie
function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

const myForm = ref(null);


const addAddressURL = `${import.meta.env.VITE_API_JAVAURL}createAddress`;
const addAddress = async ()=>{

    if (myForm.value.$el.checkValidity()) {
        address.addressDetail = `${address.postalCode}${address.city}${address.address}`;
    const response = await CookieAxios.post(addAddressURL,address)

    if(response.status === 200){
        Swal.fire({
  position: 'center',
  icon: 'success',
  title: '新增成功',
  showConfirmButton: false,
  timer: 1500
})
 location.reload();
  }else{
    Swal.fire({
  icon: 'error',
  title: '新增失敗',
  showConfirmButton: false,
  timer: 1500

})
   location.reload();
  }

    }
    myForm.value.$el.reportValidity();
        return;
}

const findAddressURL = `${import.meta.env.VITE_API_JAVAURL}findAddress`;
const fetchAddress = async ()=>{
    try {
    const response = await CookieAxios.post(findAddressURL); 
    console.log(response);
    if (response.data.code === 1) {
      address.data = response.data.data; 

    } else {
      console.error('Failed to fetch credit cards');
    }
  } catch (error) {
    console.error('Error fetching credit cards:', error);
  }

}

const deleteAddressURL = `${import.meta.env.VITE_API_JAVAURL}deleteAddress`;
const deleteAddress = async(address)=>{
    try {
    const response = await CookieAxios.post(deleteAddressURL,address); 

    if(response.data.code === 1){
        Swal.fire({
  position: 'center',
  icon: 'success',
  title: '刪除成功',
  showConfirmButton: false,
  timer: 1500
})
        location.reload();

    }else{
        Swal.fire({
  icon: 'error',
  title: '刪除失敗',
  showConfirmButton: false,
  timer: 1500

})
        location.reload();
    }

  } catch (error) {
    console.error('Error fetching address:', error);
  }

}
const updateIsDefault = `${import.meta.env.VITE_API_JAVAURL}updateAddressIsDefault`;
const updateAddressIsDefault =async(address)=>{

    try {
    const response = await CookieAxios.post(updateIsDefault,address); 

    if(response.data.code === 1){
        Swal.fire({
  position: 'center',
  icon: 'success',
  title: '修改成功',
  showConfirmButton: false,
  timer: 1500
})
        location.reload();

    }else{
        Swal.fire({
  icon: 'error',
  title: '修改失敗',
  showConfirmButton: false,
  timer: 1500

})
        location.reload();
    }

  } catch (error) {
    console.error('Error fetching isDefault:', error);
  }

}


const storeForm = ref(null);


const addStoreAddressURL = `${import.meta.env.VITE_API_JAVAURL}createStoreAddress`;
const addStoreAddress = async ()=>{

    if (storeForm.value.$el.checkValidity()) {
        
    const response = await CookieAxios.post(addStoreAddressURL,storeAddress)

    if(response.status === 200){
        Swal.fire({
  position: 'center',
  icon: 'success',
  title: '新增成功',
  showConfirmButton: false,
  timer: 1500
})
 location.reload();
  }else{
    Swal.fire({
  icon: 'error',
  title: '新增失敗',
  showConfirmButton: false,
  timer: 1500

})
   location.reload();
  }

    }
    storeForm.value.$el.reportValidity();
        return;
}

const findStoreAddressURL = `${import.meta.env.VITE_API_JAVAURL}findStoreAddress`;
const fetchstoreAddress = async ()=>{
    try {
    const response = await CookieAxios.post(findStoreAddressURL); 
    console.log(response);
    if (response.data.code === 1) {
      storeAddress.data = response.data.data; 

    } else {
      console.error('Failed to fetch storeAddress');
    }
  } catch (error) {
    console.error('Error fetching storeAddress:', error);
  }

}


const deleteStoreAddressURL = `${import.meta.env.VITE_API_JAVAURL}deleteStoreAddress`;
const deleteStoreAddress = async (storeAddress)=>{
    try {
        const response = await CookieAxios.post(deleteStoreAddressURL, storeAddress);

    if(response.data.code === 1){
        Swal.fire({
  position: 'center',
  icon: 'success',
  title: '刪除成功',
  showConfirmButton: false,
  timer: 1500
})
        location.reload();

    }else{
        Swal.fire({
  icon: 'error',
  title: '刪除失敗',
  showConfirmButton: false,
  timer: 1500

})
        location.reload();
    }

  } catch (error) {
    console.error('Error storeAddress:', error);
  }

}



onMounted(() => {
  fetchAddress(); 
  fetchstoreAddress();
});


  


</script>
    
<style scoped>
hr {
    border-color: gray;
}

.dividingLine {
    color: rgb(185, 182, 182);

}

.convenienceStore {
    border-top: solid 4px white;
}

.addressType {
    border: solid 1px gray;
}

.convenienceStoreName {
    border: solid 1px gray;
}

.modal-header {
    border-bottom: none;
}

.modal-footer {
    border-top: none;
}

.dropdown {
    position: relative;
}

.dropdown-menu {
    border: 1px solid #ccc;
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    width: 400px;
    z-index: 1050;
    display: flex;
}

.menu-title {
    font-weight: bold;
    padding: 10px;
    flex: 1;
    background-color: #eee;
    border-bottom: 1px solid #ddd;
}

.menu-column {
    padding: 10px;
    border-left: 1px solid #ddd;
    flex: 1;
    max-height: 200px;
    overflow-y: auto;
}

/* 以下是新增的樣式 */

/* 城市和地區列表的樣式 */
.menu-column div {
    padding: 5px 10px;
    /* 更大的內部間距增加點擊區域 */
    cursor: pointer;
    /* 改變滑鼠樣式以提示可點擊 */
    transition: background 0.3s;
    /* 平滑的背景色轉換效果 */
}

.menu-column div:hover {
    background-color: #f5f5f5;
    /* 滑鼠懸停時的背景色 */
}


.menu-column div:first-child {
    font-weight: bold;
    margin-bottom: 5px;
}

.menu-header {
    display: flex;
    justify-content: space-between;
}

.menu-title {
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.menu-title:hover,
.menu-title.active {
    background-color: #f5f5f5;
}

.active-border {
    border-bottom: 2px solid black;
}

.custom-label {
    cursor: pointer;
    width: 55px;
    height: 45px;
    margin-right: 10px;
    border: 1px solid #ccc;
    display: inline-flex;
    /* 這裡從 inline-block 修改為 inline-flex */
    align-items: center;
    /* 垂直置中 */
    justify-content: center;
    /* 水平置中 */
    transition: background-color 0.3s;
}

.custom-label input[type="radio"] {
    display: none;
    /* 隱藏原始的 radio 按鈕 */
}

.custom-label.radioBg {
    background-color: turquoise;
}

.btnSize {
    width: 100px;
    height: 40px;
}


.FMImg{
    width: 50px;
    height: 50px;
    margin-left: 10px;
}

.c711Img{
    width: 70px;
    height: 50px;

    
}

.fm{
    margin-left: 10px;
}

.textColor{
    color:grey ;
}

.titleArea{
    background-color: white;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;

}

.bigArea{
    background-color: white;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    min-height: 666px;
}

.addressArea{
    min-height: 250px;
}

.storeArea{
    min-height: 250px;

}

.addressInfo{
    background-color: white;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
}

</style>