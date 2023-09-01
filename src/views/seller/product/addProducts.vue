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
								><multi-img-upload @data-to-parent="settingImgsDataFromChild"
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
									@data-to-parent="settingCategoryDataFromChild"
							/></el-form-item>
							<el-form-item
								prop="productDescription"
								label="商品描述"
								><el-input
									type="textarea"
									rows="8"
									:maxlength="formRules.productDescription[0].max"
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
						<single-product-setting-block
							v-if="blockShowSetting.singleProductBlock"
							:formRules="formRules"
							@data-to-parent="settingSingleProductFromChild"
							@change-to-specification-mode="changeShowingBlock"
						/>
						<specification-product-block
							v-if="blockShowSetting.specificationProductBlock"
							:formRules="formRules"
							@data-to-parent="settingSpecificationProductFromChild"
							@change-to-single-product-mode="changeShowingBlock"
							@spec-imgs-to-parent="settingSpecImgsFromChild"
						/>
					</div>
				</section>
				<section
					id="logisticInfo"
					class="card m-3 shadow rounded"
				>
					<div class="card-body">
						<h4 class="card-title">物流資訊</h4>
					</div>
					<div class="card-body">
						<el-form
							label-position="right"
							label-width="140px"
							:rules="formRules"
							style="font-size: 30px"
						>
							<el-form-item label="重量">
								<el-input class="el-input-small">
									<template #append>kg</template></el-input
								>
							</el-form-item>
							<el-form-item label="包裹尺寸"
								><el-input class="el-input-small">
									<template #append>長</template></el-input
								><el-icon class="X"><CloseBold /></el-icon
								><el-input class="el-input-small">
									<template #append>寬</template></el-input
								><el-icon class="X"><CloseBold /></el-icon
								><el-input class="el-input-small">
									<template #append>高</template></el-input
								></el-form-item
							>
							<el-form-item label="超商物流"
								><el-checkbox
									label="7-11"
									size="large"
									border
							/></el-form-item>
						</el-form>
					</div>
				</section>
				<section
					id="otherInfo"
					class="card m-3 shadow rounded"
				>
					<div class="card-body">
						<h4 class="card-title">其他</h4>
					</div>
					<div class="card-body">
						<el-form
							label-position="right"
							label-width="140px"
							:rules="formRules"
							style="font-size: 30px"
							><el-form-item label="商品狀況">
								<el-radio-group v-model="productUsage">
									<el-radio
										label="new"
										size="large"
										border
										>全新</el-radio
									>
									<el-radio
										label="secondHand"
										size="large"
										border
										>二手</el-radio
									>
								</el-radio-group></el-form-item
							><el-form-item label="備貨時間">
								<el-radio-group v-model="prepareTime">
									<el-radio
										label="now"
										size="large"
										border
										>立即</el-radio
									><el-radio
										label="wait"
										size="large"
										border
										>較長</el-radio
									>
								</el-radio-group></el-form-item
							></el-form
						>
					</div>
				</section>
			</el-scrollbar>
		</div>
	</div>
	<footer class="foot-bar">
		<upload-foot-bar @trigger-to-parent="submitProductPageData" />
	</footer>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CookieAxios } from '@/service/api.js';
import formRulesData from './addProductsComponent/addProductsFormRules.json';

import addProductsSideNav from './addProductsComponent/addProductsSideNav.vue';
import multiImgUpload from './addProductsComponent/multiImgUpload.vue';
import productCategorySelect from './addProductsComponent/productCategorySelect.vue';
import uploadFootBar from './addProductsComponent/uploadFootBar.vue';
import singleProductSettingBlock from './addProductsComponent/singleProductSettingBlock.vue';
import specificationProductBlock from './addProductsComponent/specificationProductBlock.vue';

import {
	ElInput,
	ElForm,
	ElFormItem,
	ElScrollbar,
	ElLoading,
	ElCheckbox,
	ElIcon,
	ElRadioGroup,
	ElRadio,
} from 'element-plus';
import { CloseBold } from '@element-plus/icons-vue';
const productUsage = ref('new');
const prepareTime = ref('now');
const router = useRouter();
const productManageAPIUrl = `${import.meta.env.VITE_API_JAVAURL}productManage`;

const formRules = ref(formRulesData);

const unsubmitProductPageData = ref({
	secondProductCategory: null,
	productPageStatus: null,
	name: null,
	productDescription: null,
	mainSpecificationClassOptions: null,
	secondSpecificationClassOptions: null,
});

const settingCategoryDataFromChild = (data) => {
	formRules.value.category[0].required = false;
	unsubmitProductPageData.value.secondProductCategory = data;
};

const unsubmitProductPagePhotos = ref([]);

const settingImgsDataFromChild = (imgs) => {
	unsubmitProductPagePhotos.value = imgs;
};

const unsubmitProducts = ref([]);

const settingSingleProductFromChild = (data) => {
	unsubmitProducts.value[0] = data;
};

const settingSpecificationProductFromChild = (data) => {
	unsubmitProductPageData.value.mainSpecificationClassOptions =
		data.mainSpecificationClassOptions;
	unsubmitProductPageData.value.secondSpecificationClassOptions =
		data.secondSpecificationClassOptions;
	unsubmitProducts.value = data.products;
};
const unsubmitSpecPhotos = ref([]);
const settingSpecImgsFromChild = (imgsFile) => {
	let imgList = [];
	for (let data of imgsFile) {
		if (data.img instanceof File) {
			imgList.push(data.img);
		}
	}
	unsubmitSpecPhotos.value = imgList;
};
const blockShowSetting = ref({
	singleProductBlock: true,
	specificationProductBlock: false,
});

const changeShowingBlock = (showMode) => {
	if (showMode === 'specification-mode') {
		unsubmitSpecPhotos.value = [];
		blockShowSetting.value.singleProductBlock = false;
		blockShowSetting.value.specificationProductBlock = true;
	}
	if (showMode === 'single-product-mode') {
		blockShowSetting.value.singleProductBlock = true;
		blockShowSetting.value.specificationProductBlock = false;
	}
};
const delay = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

const submitProductPageData = async (productPageStatus) => {
	const loading = ElLoading.service({
		lock: true,
		text: '正在建立商品頁面',
		background: 'rgba(0, 0, 0, 0.7)',
	});
	try {
		const pageId = await uploadProductPageData(unsubmitProductPageData.value);
		await uploadProducts(unsubmitProducts.value, pageId);
		await uploadProductPagePhotos(unsubmitProductPagePhotos.value, pageId);
		await uploadSpecPhotos(unsubmitSpecPhotos.value, pageId);
		await pageCreateDone(pageId, productPageStatus);
		await delay(500);
		loading.close();
		selectProduct(pageId);
	} catch (error) {
		console.error(error);
	}
};

const uploadProductPageData = async (pageData) => {
	const response = await CookieAxios({
		method: 'POST',
		url: productManageAPIUrl + '/uploadProductPageData',
		data: pageData,
	});
	return response.data.data;
};

const uploadProducts = async (products, pageId) => {
	console.log(products);
	const response = await CookieAxios({
		method: 'POST',
		url: productManageAPIUrl + '/uploadProducts',
		params: {
			pageId: pageId,
		},
		data: products,
	});
	return response.data.msg;
};

const pageCreateDone = async (pageId, pageStatus) => {
	const response = await CookieAxios({
		method: 'GET',
		url: productManageAPIUrl + '/pageCreateDone',
		params: {
			pageId: pageId,
			pageStatus: pageStatus,
		},
	});
	return response.data.msg;
};

const uploadProductPagePhotos = async (photos, pageId) => {
	if (photos.length === 0) {
		return 'nophoto';
	}
	const formData = new FormData();
	for (let data of photos) {
		formData.append('productPageImgs', data);
	}
	const response = await CookieAxios({
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		method: 'POST',
		url: productManageAPIUrl + '/uploadProductPagePhotos',
		data: formData,
		params: {
			pageId: pageId,
		},
	});
	return response.data.msg;
};

const uploadSpecPhotos = async (photos, pageId) => {
	if (photos.length === 0) {
		return 'noSpecPhoto';
	}
	const formData = new FormData();
	for (let data of photos) {
		formData.append('productSpecImgs', data);
	}
	const response = await CookieAxios({
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		method: 'POST',
		url: productManageAPIUrl + '/uploadSpecPhotos',
		data: formData,
		params: {
			pageId: pageId,
		},
	});
	return response.data.msg;
};

const selectProduct = (PageId) => {
	router.push({
		path: '/product_page',
		query: {
			pd: unsubmitProductPageData.value.name + Math.random() + '-' + PageId,
		},
	});
};
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

.foot-bar {
	position: relative;
	bottom: 50px;
	height: 50px;
	width: 100%;
	z-index: 2;
}
.el-input-small {
	width: 300px;
}

.X {
	margin: 0 8px;
}
</style>
