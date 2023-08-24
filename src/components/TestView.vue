<template>
  <div>
    <div>
      <el-header
        style="
          background-color: #f0c8b5;
          height: auto;
          width: auto;
          padding-top: 20px;
        "
      >
      </el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        style="border-bottom-width: 0px; background-color: #f0c8b5"
      >
        <el-menu-item
          class="n1"
          style="width: 80%; margin-left: 5%; background-color: #f0c8b5"
        >
          <!--搜尋欄位-->
          <el-autocomplete
            class="inline-input"
            v-model="input"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
            style="width: 100%"
          ></el-autocomplete>
          <!--------------->
        </el-menu-item>
        <el-menu-item class="n1" style="width: 15%; background-color: #f0c8b5">
        </el-menu-item>
        <!--推薦搜尋-->
      </el-menu>
      <div style="background-color: #f0c8b5">
        <div class="box-1">
          <ul class="list-container" v-for="item in vvvv" :key="item.id">
            <a :href="item.url">{{ item.name }}</a>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axios } from "../service/api";

export default {
  data() {
    return {
      vvvv: [
        { id: 1, name: "湯姆熊", url: "https://shopee.tw/" },
        { id: 2, name: "衣服", url: "https://shopee.tw/" },
        { id: 3, name: "打火機", url: "https://shopee.tw/" },
        { id: 4, name: "公仔展示盒", url: "https://shopee.tw/" },
        { id: 5, name: "悠遊卡", url: "https://shopee.tw/" },
        { id: 6, name: "側背包", url: "https://shopee.tw/" },
        { id: 7, name: "手機殼", url: "https://shopee.tw/" },
        { id: 8, name: "牛仔褲", url: "https://shopee.tw/" },
        { id: 9, name: "短褲", url: "https://shopee.tw/" },
        { id: 10, name: "海綿寶寶", url: "https://shopee.tw/" },
        { id: 11, name: "湯姆熊金幣", url: "https://shopee.tw/" },
        { id: 12, name: "拖鞋", url: "https://shopee.tw/" },
        { id: 13, name: "精靈", url: "https://shopee.tw/" },
      ],
      input: "",
      tt: null,
      activeIndex: "1",
      tableData: [],
      searchForm: {
        name: "",
        gender: "",
        entrydate: [],
        // 搜尋資料
        restaurants: null,
      },
    };
  },
  methods: {
    //輸入框
    querySearch(queryString, cb) {
      var results;
      if (this.input.length > 0) {
        axios
          .post("/public/productsSelect", {
            select: queryString,
          })
          .then((response) => {
            results = response.data;
            cb(results);
          });
      } else {
        results = [

        ];
        cb(results);
      }
      // 调用 callback 返回建议列表的数据
    },
    handleSelect() {},
  },

};
</script>

<style>
.n1 a {
  font-size: 40px;
  text-align: left;
}
.box-1 {
  display: inline-flex;
  align-items: flex-start;
  margin: 0 15% 0 5%;
}
.box-1 a {
  text-decoration: none;
  color: #000;
}
</style>
