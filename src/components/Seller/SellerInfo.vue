<template>
    


        <!-- 表單 -->
        <div>

            <form class="d-flex justify justify-content-center mt-3 " ref="sellerForm">
           

            <div class="">
                <div class="mb-2 ">
                    <table class="tableSize" >
                        <tr class="">

                            <td class="td1">
                                <label>名稱</label>
                            </td>

                            <td class="td2 d-flex">
                                <input type="text" id="inputAccount" class="form-control" name="name"
                                    placeholder="User Name" required autofocus v-model="user.name" readonly />



                            </td>
                        </tr>


                        <tr>
                            <td class="td1">
                                <label>身分證字號</label>
                            </td>
                            <td class="td2 d-flex">
                                <input type="text" id="inputName" class="form-control" name="icNumber" placeholder="身分證字號"
                                    required autofocus v-model="user.icNumber" 
                                    />

                            </td>
                        </tr>
                        <tr>
                            <td class="td1">
                                <label>Email</label>
                            </td>
                            <td class="td2 d-flex">
                                <input type="email" id="inputAccount" class="form-control" name="email" placeholder="User Email"
                                    required autofocus v-model="user.email"  readonly/>

                            </td>
                        </tr>

                        <tr>
                            <td class="td1">
                                <label>出生日期</label>
                            </td>
                            <td class="td2 d-flex">
                                <input type="date" id="inputAccount" class="form-control" name="birth"
                                    placeholder="User Account" required autofocus v-model="user.birth" readonly/>

                            </td>
                        </tr>
                        <tr>
                            <td class="td1">
                                <label>賣場名稱</label>
                            </td>
                            <td class="td2 d-flex">
                                <input type="text" id="inputName" class="form-control" name="icNumber" placeholder="賣場名稱"
                                    required autofocus v-model="user.storeName" 
                                    />

                            </td>
                        </tr>

                        <tr>
                            <td class="td1">
                                <label>戶籍地址/公司地址</label>
                            </td>
                            <td class="td2 d-flex">
                                        <input type="text" v-model="user.city" readonly placeholder="選擇城市 / 行政區" class="form-control"
                                        id="citySelect" @click="toggleDropdown" name="city" required />
                                <input type="text" id="inputPostCode" class="form-control " name="city"
                                    placeholder="郵遞區號" required autofocus v-model="user.postCode" maxlength="3"/>

                                    <div v-if="isOpen" class="addressDropdown-menu d-flex flex-column">
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

                            </td>
                        </tr>
                        <tr>
                            <td class="td1">
                                <label></label>
                            </td>
                            <td class="td2 d-flex">
                              
                                <input type="phone" id="inputPhone" class="form-control" name="address"
                                    placeholder="請輸入詳細地址：地區,建築,單位等 " required autofocus v-model="user.address" />

                            </td>
                        </tr>
                        <tr>
                            <td class="td1">
                                <label>主要商品類型</label>
                            </td>
                            <td class="td2 d-flex">
                            

                                    <div>
  <select class="form-select productTypeSelect" v-model="user.productType" required>
    <option value="寵物">寵物</option>
    <option value="代買代購/其他類別">代買代購/其他類別</option>
    <option value="汽機車零件百貨">汽機車零件百貨</option>
    <option value="嬰幼童與母親">嬰幼童與母親</option>
    <option value="家電影音">家電影音</option>
    <option value="3C/遊戲王/手機平板與週邊">3C/遊戲王/手機平板與週邊</option>
    <option value="戶外與運動用品">戶外與運動用品</option>
    <option value="娛樂、收藏">娛樂、收藏</option>
    <option value="美妝保健">美妝保健</option>
    <option value="服務票券">服務票券</option>
    <option value="美食、伴手禮">美食、伴手禮</option>
    <option value="男女生衣著/配件/鞋子/包包">男女生衣著/配件/鞋子/包包</option>
    <option value="居家生活">居家生活</option>
  </select>
</div>

                            </td>
                        </tr>


                    </table>
                    <div class="text-end mt-4 d-flex align-items-center justify-content-center">
                        <button class="btn btn-dark btn-block"  @click.prevent="nextPage">下一頁</button>
                    </div>
                </div>

            </div>
        </form>




        </div>



       
</template>
    
<script setup >
import { reactive, onMounted, ref ,defineEmits} from 'vue'
import { CookieAxios } from '../../service/api';
import { cities, areas } from '../../../public/locations/location';

const user = reactive({
    name: '',
    icNumber: '',
    email: '',
    birth: '',
    city:'',
    area:'',
    address:'',
    productType:'',
    postCode:'',
    storeName:''
});


let isOpen = ref(false);
let selectedCity = ref(null);

let menuType = ref('city'); // 用來決定當前的選單類別，初始值為 'city'



const getAreasByCity = city => areas[city] || [];

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectCity = city => {
    selectedCity.value = city;
    user.county= city;
    menuType.value = 'area'; // 選擇完城市後，切換到地區選單
};

const selectArea = area => {
    user.city = `${selectedCity.value} ${area}`;
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


const emit = defineEmits();

const sellerForm = ref(null);

const nextPage = () => {
    
    if (sellerForm.value.checkValidity()) {
        localStorage.setItem('storeName', user.storeName);
        localStorage.setItem('icNumber', user.icNumber);
        emit('next');
    } else {
        sellerForm.value.reportValidity();
     }
}






const onMountedURL = `${import.meta.env.VITE_API_JAVAURL}findUserByEmail`;
onMounted(async () => {
    try {

        const icNumberFromLocalStorage = localStorage.getItem('icNumber');
        const storeNameFromLocalStorage = localStorage.getItem('storeName');

        if (icNumberFromLocalStorage !== null) {
            user.icNumber = icNumberFromLocalStorage;
        }

        if (storeNameFromLocalStorage !== null) {
            user.storeName = storeNameFromLocalStorage;
        }

        const response = await CookieAxios.post(onMountedURL);
    

        if (response.status === 200) {
            const userData = response.data.data;
       

        
            user.name = userData.name;
            user.email = userData.email;
    
            user.birth = userData.birth;
      



        } else {
            console.error('Failed to fetch user data');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});
    
</script>


    
<style scoped>

table {
    border-collapse: separate;
    border-spacing: 0 10px;
}

.InfoFarm{
    width: 500px;
}

.tableSize{
    width: 500px;
}



#inputAccount[readonly] {
    pointer-events: none; 
    background-color: #f5f5f5; 
}

#inputPostCode{
    margin-left: 10px;
    width: 100px;
}


.td2.d-flex {
    position: relative;
}

.addressDropdown-menu {
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
    border-bottom: 1px solid #ddd;
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


.productTypeSelect{
width: 360px;

}


</style>