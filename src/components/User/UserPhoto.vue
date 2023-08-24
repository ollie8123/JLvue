<template>
    <div>

        <div class="d-flex flex-column ">

            <div class="image-container d-flex align-items-center justify-content-center mt-5">
                <img :src="image"  alt="Description" class="round-image ">
                

            </div>
            <div class="d-flex flex-column align-items-center justify-content-center">
                <input type="file" id="fileInput" ref="fileInputRef" class="file-input" name="file" @change.prevent="handleFileChange" accept="image/jpeg, image/png">
                <label for="fileInput" class="file-label">選擇文件</label>
                <p class="no-file-text">{{ photo.fileName }}</p>

 

            </div>
            <div class="textDiv">
                <a class="text">檔案大小:最大1MB</a><br>
                <a class="text">檔案限制: .JPEG, .PNG</a><br>
                <button class="btn btn-dark mt-3" v-if="photo.fileName && photo.fileName !== '未選擇文件'" @click.prevent="uploadFile">上傳圖片</button>
            </div>



        </div>
    </div>
</template>
    
<script setup >
import { ref ,reactive,onMounted} from 'vue';
import { CookieAxios } from '../../service/api';
import Swal from 'sweetalert2'

const fileInputRef = ref(null); 
const photo = reactive({
    fileName:"未選擇文件",

});


const image = ref('../../../public/image/nolmg.png')

const uploadFileURL = `${import.meta.env.VITE_API_JAVAURL}addUserPhoto`;
const uploadFile = async () => {
    

 if (!fileInputRef.value || fileInputRef.value.files.length === 0) return;


const formData = new FormData();
formData.append('file', fileInputRef.value.files[0]); 

try {
    const response = await CookieAxios.put(uploadFileURL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    if(response.data.code === 1){
        Swal.fire({
  position: 'center',
  icon: 'success',
  title: '新增成功',
  showConfirmButton: false,
  timer: 2000
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

} catch (error) {
    console.error('Error AddPhoto:', error);
}
};



const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
        photo.fileName = event.target.files[0].name;

        // 更新圖片路徑
        const reader = new FileReader();
        reader.onload = (e) => {
            image.value = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    } else {
        photo.fileName = '未選擇文件';
        image.value = '../../../public/image/nolmg.png';
    }
};

const userPhotoURL = `${import.meta.env.VITE_API_JAVAURL}userPhoto`;
onMounted(async () => {
    try {
        const response = await CookieAxios.post(userPhotoURL);
        
        if (response.status === 204) {  // Checking for NO_CONTENT status
            return;
        }
        
        image.value = `data:image/*;base64,${response.data}`;

    } catch (error) {
        console.error("An error occurred while fetching user photo:", error);
    }
});

</script>
    
<style scoped>
.text {
    color: rgba(85, 85, 85, .8);
    overflow: hidden;
    padding-bottom: 30px;
    white-space: nowrap;
    min-width: 20%;
    font-size: 16px;
    text-decoration: none;
}

.textDiv {
    align-items: center;
    justify-content: center;
    text-align: center;
}

.image-container {
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: 200px;
    overflow: hidden; 
    flex-direction: column; 
}

.round-image {
    border-radius: 50%; 
    width: 150px;
    height: 150px;
    object-fit: cover;
    max-width: 100%;
    max-height: 100%;
    border:solid 1px black;
}

.file-input {
    display: none; 
    
}

.file-label {
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #f5f5f5;
    color: black;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
}

.no-file-text {
    margin-top: 5px;
    color: rgba(85, 85, 85, .8);
}


</style>