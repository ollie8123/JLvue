 <template>
  <div class="common-layout">
    <el-container>
      <el-header class="Header">
        <input :value="keyword" />
        <span>{{ category }}</span>
        <h3>搜尋元件</h3>
      </el-header>
      <el-container>
        <el-aside class="Aside">
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
              <el-button @click="selectPrice" type="warning" style="width: 100%"
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
                /><span style="margin-top: 5px">或以上</span>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main class="Main">
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
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
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
      </el-container>
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
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps(["keyword", "categoryList", "productList"]);
const category = ref([]);
const productS = ref([]);
const salesFormatted = (sales) => {
  if (sales % 10000 < 1000) {
    return (sales / 10000).toFixed(0);
  } else {
    return (sales / 10000).toFixed(1);
  }
};
watch(
  () => props.categoryList,
  (newVal) => {
    category.value = newVal;
  }
);
watch(
  () => props.productList,
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
    selectPath();
  } else {
    const index = selectedCheckboxes.value.indexOf(id);
    if (index !== -1) {
      selectedCheckboxes.value.splice(index, 1);
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

const selectPath = async () => {
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
  await axios.get(path).then((req) => {
    productS.value = req.data.data.products.content;
  });
};
</script>

<style>
.Header {
  background-color: #919393;
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
