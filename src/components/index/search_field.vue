<template>
  <div class="search_field">
    <div class="search_field_div">
      <div class="input-group">
        <span class="logo">圖案</span>
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="請輸入搜尋"
          class="inline-input"
        />
        <button style="height: auto" class="button" @click="selectButton()">
          按鈕
        </button>
      </div>
      <div class="box-1">
        <ul class="list-container" v-for="item in vvvv" :key="item.id">
          <a :href="item.url">{{ item.name }}</a>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { axios } from "../../service/api";
import { ElAutocomplete } from "element-plus";
import { useRouter } from "vue-router";
import "element-plus/dist/index.css";
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

<style >
.search_field {
  background-color: #f0c8b5;
}
.search_field_div {
  margin: 0 20%;
}
.input-group {
  display: flex;
  justify-content: space-between;
}
.label {
  flex: 0 0 15%;
}
.inline-input {
  flex: 0 0 70%;
}
.button {
  flex: 0 0 15%;
}
.box-1 {
  padding: 0 0 0 6%;
  width: 100%;
  display: flex;
}
.box-1 a {
  text-decoration: none;
  color: #000;
}
</style>
