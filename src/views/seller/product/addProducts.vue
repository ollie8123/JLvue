<template>
	<div class="page-flexbox">
		<div class="sidebar-container">
			<add-products-side-nav />
		</div>

		<div
			class="flex-fill cards-block"
			data-bs-smooth-scroll="true"
		>
			<el-scrollbar>
				<section
					id="productPageInfo"
					class="card"
				>
					<div class="card-body">
						<h4 class="card-title">商品頁面資訊</h4>
					</div>
					<div class="card-body">
						<el-form
							label-position="right"
							label-width="140px"
							:rules="formRules"
							:model="unsubmitProductPageData"
							style="font-size: 30px"
						>
							<el-form-item label="商品頁面圖片"
								><multi-img-upload
							/></el-form-item>
							<el-form-item
								prop="name"
								label="商品頁面名稱"
								><el-input
									:maxlength="formRules.name[0].max"
									show-word-limit
									v-model="unsubmitProductPageData.name"
							/></el-form-item>
							<el-form-item
								prop="category"
								label="商品類別"
								><product-category-select
							/></el-form-item>
							<el-form-item
								prop="description"
								label="商品描述"
								><el-input
									type="textarea"
									rows="8"
									:maxlength="formRules.description[0].max"
									show-word-limit
									v-model="unsubmitProductPageData.productDescription"
								/>
							</el-form-item>
						</el-form>
					</div>
				</section>
				<section
					id="productSpecificationInfo"
					class="card"
				>
					<div class="card-body">
						<h4 class="card-title">銷售資訊</h4>
					</div>
					<div class="card-body">
						<el-form
							v-if="true"
							label-position="right"
							label-width="140px"
							:rules="formRules"
							:model="products[0]"
							style="font-size: 30px"
							><el-form-item label="開啟規格">點我</el-form-item
							><el-form-item
								label="價格"
								prop="price"
								><el-input
									class="el-input-small"
									v-model.number="products[0].price"
								></el-input
							></el-form-item>
							<el-form-item
								label="商品數量"
								prop="stock"
								><el-input
									class="el-input-small"
									v-model.number="products[0].stock"
								></el-input></el-form-item
						></el-form>
					</div>
				</section>
				<section
					id="logisticInfo"
					class="card m-3 shadow rounded"
				>
					<div class="card-body">
						<h4 class="card-title">物流資訊</h4>
					</div>
					<img
						src="holder.js/100x180/"
						alt=""
					/>
					<div class="card-body">
						<p class="card-text">Text</p>
						<a
							href="#"
							class="card-link"
							>Link 1</a
						>
						<a
							href="#"
							class="card-link"
							>Link 2</a
						>
					</div>
				</section>
				<section
					id="otherInfo"
					class="card m-3 shadow rounded"
				>
					<div class="card-body">
						<h4 class="card-title">其他</h4>
					</div>
					<img
						src="holder.js/100x180/"
						alt=""
					/>
					<div class="card-body">
						<p class="card-text">Text</p>
						<a
							href="#"
							class="card-link"
							>Link 1</a
						>
						<a
							href="#"
							class="card-link"
							>Link 2</a
						>
					</div>
				</section>
			</el-scrollbar>
		</div>
	</div>
	<footer class="foot-bar"><upload-foot-bar /></footer>
</template>
<script setup>
import { ref } from 'vue';
import { ElScrollbar } from 'element-plus';

import addProductsSideNav from './addProductsComponent/addProductsSideNav.vue';
import multiImgUpload from './addProductsComponent/multiImgUpload.vue';
import productCategorySelect from './addProductsComponent/productCategorySelect.vue';
import uploadFootBar from './addProductsComponent/uploadFootBar.vue';

import { ElInput, ElForm, ElFormItem } from 'element-plus';

const unsubmitProductPageData = ref({
	seller: null,
	secondProductCategory: null,
	productPageStatus: null,
	name: null,
	productDescription: null,
	products: null,
	mainSpecificationClassOptions: null,
	secondSpecificationClassOptions: null,
	productPagePhotos: null,
});

const formRules = ref({
	name: [
		{ min: 5, max: 70, message: '請輸入5-70字的商店名稱', trigger: 'blur' },

		{ required: true, message: '請輸入商品頁面名稱', trigger: 'blur' },
	],
	category: [
		{ required: true, message: '請選擇商品類別名稱', trigger: 'blur' },
	],
	description: [
		{ max: 3000, message: '商品說明上限為3000字', trigger: 'blur' },
		{
			min: 30,
			required: true,
			message: '請輸入至少30字的商品說明',
			trigger: 'blur',
		},
	],
	price: [
		{
			type: 'number',
			max: 499999,
			message: '價格最大為499,999元',
			trigger: 'blur',
		},
		{ type: 'number', min: 1, message: '價格最小為1元', trigger: 'blur' },
		{ required: true, message: '請輸入價格', trigger: 'blur' },
	],
	stock: [
		{
			type: 'number',
			max: 100000,
			message: '庫存最大為100000分',
			trigger: 'blur',
		},
		{ type: 'number', min: 1, message: '庫存最少為1分', trigger: 'blur' },
		{ required: true, message: '請輸入庫存', trigger: 'blur' },
	],
});

const products = ref([{ price: null, stock: null }]);
</script>
<style scoped>
* {
	font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
		'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.page-flexbox {
	display: flex;
	height: calc(100vh - 120px);
	background-color: rgb(215, 250, 245);
}

.cards-block {
	height: 100%;
	padding-bottom: 50px;
}
.sidebar-container {
	position: sticky;
	top: 120px;
	height: 100%;
	padding-bottom: 50px;
	flex: 0 0 200px;
	z-index: 1;
}

.card {
	scroll-margin-top: 110px;
	margin: 1rem !important;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
	border-radius: var(--bs-border-radius) !important;
}

.card-title {
	padding: 1rem !important;
}

.el-form-item {
	--el-form-label-font-size: 16px;
}

.el-input {
	height: 35px;
	font-size: 18px;
}

.el-input-small {
	width: 300px;
}

.foot-bar {
	position: relative;
	bottom: 50px;
	height: 50px;
	width: 100%;
	z-index: 2;

}
</style>
