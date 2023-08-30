 <template>
  <div class="common-layout" >
    <el-container>
      <el-header class="Header"  v-if="productS.length>0">
      </el-header>
      <el-container>
        <el-aside  class="Aside" >
           <el-select v-model="value" class="m-2" placeholder="Select" size="large">
                   <el-option
                         v-for="item in options"
                          :key="item.value"
                        :label="item.label"
                     :value="item.value"
                      />
           </el-select>
          <div v-if="category.length > 0">
            <span style="font-size: 25px">類別:</span>
            <div v-for="(category, id) in category" :key="id" class="text item">
              <el-checkbox
                @change="(checked) => changeCheckbox(category.id, checked)"
                :label="category.category + '(' + category.count + ')'"
                size="large"
              />
            </div>
          </div>
          <div>
            <el-divider />
            <span style="font-size: 25px">價格範圍:</span>
            <div>
              <el-input
                v-model="selectMinPrice"
                size="small"
                placeholder="$最小金額"
                type="number"
                min="0"
                style="width: 50%"
                maxlength="10"
              />
              <el-input
                v-model="selectMaxPrice"
                size="small"
                placeholder="$最大金額"
                type="number"
                min="0"
                style="width: 50%"
                maxlength="10"
              />
              <el-button @click="selectPrice" type="warning" style="width: 100%;margin-top: 10px;"
                >套用</el-button
              >
            </div>
            <div style="margin-top: 5px">
              <span style="font-size: 25px">評價:</span>
              <div>
                <el-rate
                  @change="evaluateSelect"
                  v-model="evaluate"
                  size="large"
                  clearable 
                /><span style="margin-top: 5px">或以上</span>
              </div>
            </div>
          </div>
          <el-button type="info" style="width: 100%;" @click="clean()" >清除篩選</el-button>
        </el-aside>
        <el-main class="Main" v-if="productS.length>0">
          <div class="list">
            <el-row>
              <el-col
                v-for="(product, index) in productS"
                :key="product.id"
                :span="5"
                :offset="index % 4 > 0 ? 1 : 0"
              >
                <el-card
                  :body-style="{ padding: '0px' }"
                  @click="selectProduct(product.name, product.id)"
                >
                  <img
                    :src="product.photoPath"
                    style="width: auto;height: 218px;margin: auto; display: block;"
                    class="image"
                  />
                  <div style="padding: 5px">
                    <span>{{ product.name }}</span>
                    <div class="bottom">
                      <span
                        class="price"
                        v-if="product.minPrice != product.maxPrice"
                        >{{
                          "$" + product.minPrice + "~" + "$" + product.maxPrice
                        }}</span
                      >
                      <span class="price" v-else>{{
                        "$" + product.maxPrice
                      }}</span>
                    </div>
        
                    <div>
                      <el-rate
                      v-if="product.averageRating>0"
                        v-model="product.averageRating"
                        disabled
                        size="small"
                      />
           
                      <span
                        v-if="product.sales > 0 && product.sales < 10000"
                        style="font-size: 14px"
                      >
                        已出售 :{{ product.sales }}</span
                      >
                      <samp v-else-if="product.sales > 9999"
                        >已出售 :{{salesFormatted(product.sales)}}萬</samp
                      >
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-main>
        <el-main class="Main" v-else>
          <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/a60759ad1dabe909c46a817ecbf71878.png">
          <div>找不到結果</div>
        </el-main>
      </el-container>
    <ElPagination
    v-if="productS.length>0"
     style="margin-top: 10px;
       display: flex; 
      justify-content: center; 
      align-items: center;"
    :page-size=totalPagesize
    layout="prev, pager, next"
    :total=Number(totalElements)
      v-model:current-page="currentPage"
   />
    </el-container>
  </div>
</template>
<script setup>
import {
  ElCard,
  ElRow,
  ElCol,
  ElButton,
  ElHeader,
  ElMain,
  ElContainer,
  ElAside,
  ElRate,
  ElCheckbox,
  ElDivider,
  ElIcon,
  ElInput,
} from "element-plus";
import "element-plus/dist/index.css";
import { axios } from "../../../service/api";
import { onMounted, ref, watch,watchEffect  } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps(["keyword"]);
const aa = () => { 
  return 3;
}

onMounted(async() => {
 await axios.get('/public/keywordSelectProductList?keyword=' + props.keyword).then((req) => {
    categoryList.value=req.data.data.class
    productList.value=req.data.data.products.content
     totalElements.value=req.data.data.products.totalElements
     totalPagesize.value = req.data.data.products.pageSize
   })
})
const productList = ref();
const categoryList =ref();
const totalPagesize=ref();
const totalElements=ref();

//const props = defineProps(["keyword", "categoryList", "productList","totalPagesize","totalElements"]);

//分頁

const currentPage = ref(1);
watch(currentPage, () => {
   selectPath(currentPage.value-1)
});



const category = ref([]);
const productS = ref([]);
const value = ref('時間排序')

const options = [
  {
    value: 'DESC',
    label: '最新商品',
  },
   {
    value: 'ASC',
    label: '最早上架',
  },
]
watch(value, () => {
  selectPath()
})

const salesFormatted = (sales) => {
  if (sales % 10000 < 1000) {
    return (sales / 10000).toFixed(0);
  } else {
    return (sales / 10000).toFixed(1);
  }
};
watch(
  () => categoryList.value,
  (newVal) => {
    category.value = newVal;
  }
);
watch(
  () => productList.value,
  (newVal) => {
    productS.value = newVal;
  }
);
const evaluate = ref();
const evaluateSelect = () => {
  selectPath();
};
const selectMinPrice = ref();
const selectMaxPrice = ref();
const selectPrice = () => {
  selectPath();
};
const selectedCheckboxes = ref([]);
const changeCheckbox = async (id, isChecked) => {
  if (isChecked) {
    selectedCheckboxes.value.push(id);
    currentPage.value=1
    selectPath();
  } else {
    const index = selectedCheckboxes.value.indexOf(id);
    if (index !== -1) {
      selectedCheckboxes.value.splice(index, 1);
        currentPage.value=1
    }
    selectPath();
  }
};
const selectProduct = (PageId, PageName) => {
  router.push({
    path: "/product_page",
    query: { pd:PageId+Math.random()+"-"+PageName },
  });
};

const selectPath = async (page) => {
  let path = "/public/keywordSelectProductList?keyword=" + props.keyword;
  if (selectMinPrice.value != undefined) {
    path += "&MinPrice=" + selectMinPrice.value;
  }
  if (selectMaxPrice.value != undefined) {
    path += "&MaxPrice=" + selectMaxPrice.value;
  }
  if (selectedCheckboxes.value.length > 0) {
    path += "&type=" + selectedCheckboxes.value;
  }
  if (evaluate.value > 0) {
    path += "&evaluate=" + evaluate.value;
  }
  path += "&chronological=" + value.value
  if (page != undefined) {
    path += "&page=" + page
  } else { 
    path += "&page=0"
  }
   path += "&size=3"
  await axios.get(path).then((req) => {

    productS.value = req.data.data.products.content;
    totalElements.value=req.data.data.products.totalElements
    totalPagesize.value = req.data.data.products.pageSize

  });
};

const re=ref(0)
const clean = async () => { 
  selectMinPrice.value=''
  selectMaxPrice.value=''
  evaluate.value = ''
  value.value='時間排序'
  
 let path = "/public/keywordSelectProductList?keyword=" + props.keyword;
await axios.get(path).then((req) => {
    productS.value = req.data.data.products.content;
    totalElements.value=req.data.data.products.totalElements
    totalPagesize.value = req.data.data.products.pageSize
  });
}
</script>

<style scoped>
.Header {
  background-color: #EDF4FC;
}
.Aside {
  width: 200px;
  background-color: #f5f5f5;
}
.Main {
  background-color: #f1f6be;
}
.price {
  font-size: 16px;
  color: #fe9f60;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
.text {
  font-size: 14px;
}

.item {
  padding: 0px 15%;
}
.box-card {
  width: auto;
}
</style>
