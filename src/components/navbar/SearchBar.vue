<template>
       

    <div class="position-relative d-flex searchDiv">
    <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="請輸入搜尋"
          class="searchBar"
        />
    <button class="btn btn-secondary position-absolute right-btn" @click="selectButton()"
    ><i class="bi bi-search"></i></button>
    </div>
    <div class="mt-2">
        <a 
            v-for="item in vvvv" 
            :key="item.id" 
            :href="item.url">
            {{ item.name }}
        </a>
  
    </div>

 


</template>
    
<script setup lang="ts">
import { ref } from "vue";
import { axios } from "../../service/api";
import { ElAutocomplete } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const state = ref("");
interface LinkItem {
  value: string;
  link: string;
}

const vvvv = [
  {
    id: 1,
    name: "湯姆熊",
    url: "https://shopee.tw/search?keyword=湯姆熊",
  },
  { id: 2, name: "衣服", url: "https://shopee.tw/search?keyword=衣服" },
  {
    id: 3,
    name: "打火機",
    url: "https://shopee.tw/search?keyword=打火機",
  },
  {
    id: 4,
    name: "公仔展示盒",
    url: "https://shopee.tw/search?keyword=公仔展示盒",
  },
  {
    id: 5,
    name: "悠遊卡",
    url: "https://shopee.tw/search?keyword=悠遊卡",
  },
  { id: 9, name: "短褲", url: "https://shopee.tw/search?keyword=短褲" },
  {
    id: 10,
    name: "海綿寶寶",
    url: "https://shopee.tw/search?keyword=海綿寶寶",
  },
  {
    id: 11,
    name: "湯姆熊金幣",
    url: "https://shopee.tw/search?keyword=湯姆熊金幣",
  },
  { id: 12, name: "拖鞋", url: "https://shopee.tw/search?keyword=拖鞋" },
  { id: 13, name: "精靈", url: "https://shopee.tw/search?keyword=精靈" },
];

const links = ref<LinkItem[]>([]);
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  var results;
  if (queryString.length > 0) {
    queryString = queryString.replace(/\s/g, '');
    axios
      .post("/public/productsSelect", {
        select: queryString,
      })
      .then((response) => {
        results = response.data.data;
        console.log(response.data.data);
        cb(results);
      });
  } else {
    results = [];
    cb(results);
  }
};

//點擊方法按鈕，跳轉到搜尋頁面並傳送輸入的關鍵字
const selectButton = () => {
  state.value = state.value.replace(/\s/g, '');
  if (state.value.length > 0) { 
  router.push({
    path: "/search_keyword",
    query: { keyword: state.value},
  });
  }
};


    
</script>
    
<style>

.searchBar{
width: 700px;
height: 40px;
}



.position-relative {
    position: relative;
}

.el-autocomplete .el-input__inner {
    height: 40px; 
    line-height: 40px; 
}


.right-btn {
    position: absolute;
    right: 13%;
    top: 52%;
    transform: translateY(-50%);  /* 使按鈕垂直居中 */
}

a {
    text-decoration: none; 
    color: white;        
    cursor: pointer;     
    margin-right: 23px;
}
    
</style>