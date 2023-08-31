<template>
	<el-input
		type="text"
		:value="finalSelectedCategories.categoryValue"
		readonly
		@click="showModal()"
	/>
	<Teleport
		v-if="modalIsRendering"
		to="body"
	>
		<div
			class="modal fade"
			ref="categoryInputModalRef"
			tabindex="-1"
			data-bs-keyboard="false"
			role="dialog"
			aria-labelledby="modalTitleId"
			aria-hidden="true"
		>
			<div
				class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl"
				role="document"
			>
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title"
							id="modalTitleId"
						>
							請選取商品類別
						</h5>
					</div>

					<div class="modal-body">
						<div
							class="select-result-block"
							:style="{ backgroundColor: changeColor }"
						>
							<el-input :value="categorySelectResult.categoryValue" />
						</div>
						<div class="select-block">
							<div class="options-block">
								<el-scrollbar>
									<div class="categories-group">
										<transition-group name="categories-buttons-fade">
											<el-button
												v-for="category in mainProductCategories"
												:key="category.id"
												type="primary"
												text
												@click="
													getSecondCategoriesByMainCategoryId(category.id),
														setSelectResult('main', category.id),
														selectResultChange()
												"
											>
												{{ category.name }}
											</el-button>
										</transition-group>
									</div>
								</el-scrollbar>
							</div>
							<div class="options-block">
								<el-scrollbar>
									<div class="categories-group">
										<transition-group name="categories-buttons-fade">
											<el-button
												v-for="category in secondProductCategoryByMainCategory"
												:key="category.id"
												type="primary"
												text
												@click="
													setSelectResult('second', category.id),
														selectResultChange()
												"
											>
												{{ category.name }}
											</el-button>
										</transition-group>
									</div>
								</el-scrollbar>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<el-button @click="hideModal()"> 取消 </el-button>
						<el-button
							type="primary"
							:disabled="categorySelectResult.secondCategory == null"
							@click="hideModal(), saveSelectResult()"
						>
							確定
						</el-button>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>
<script setup>
import { ref, computed, nextTick, defineEmits } from 'vue';
import { Modal } from 'bootstrap/dist/js/bootstrap.min.js';
import { CookieAxios } from '@/service/api.js';

import { ElScrollbar, ElButton, ElInput } from 'element-plus';

//=========== Modal Block ============

const productManageAPIUrl = `${import.meta.env.VITE_API_JAVAURL}productManage`;
const categoryInputModalRef = ref(null);
const categoryInputModal = ref(null);
const modalIsRendering = ref(false);

const showModal = () => {
	//DOM渲染開始
	modalIsRendering.value = !modalIsRendering.value;

	nextTick(() => {
		//利用bs的事件，在顯示完畢後執行搜尋MainCategory的動作
		categoryInputModalRef.value.addEventListener('shown.bs.modal', () => {
			getMainProductCategories();
		});

		const options = {
			backdrop: 'static',
		};
		categoryInputModal.value = new Modal(categoryInputModalRef.value, options);
		categoryInputModal.value.show();
	});
	nextTick(() => {});
};
const hideModal = () => {
	categoryInputModal.value.hide();
	modalIsRendering.value = !modalIsRendering.value;
};

//=========== Category Select Block ============

//=========== Main Category Show ============
const mainProductCategories = ref({});

const getMainProductCategories = async () => {
	const response = await CookieAxios({
		method: 'GET',
		url: productManageAPIUrl + '/getMainProductCategories',
	});
	mainProductCategories.value = response.data.data;
};

//========== Second Category Show ==========
const secondProductCategoryByMainCategory = ref({});

const getSecondCategoriesByMainCategoryId = async (id) => {
	const response = await CookieAxios({
		method: 'GET',
		url: productManageAPIUrl + '/getSecondCategoriesByMainCategoryId',
		params: {
			id: id,
		},
	});
	secondProductCategoryByMainCategory.value = null;
	// 為了配合轉場動畫，延遲渲染時間
	setTimeout(() => {
		secondProductCategoryByMainCategory.value = response.data.data;
	}, 300);
};

//=========== Category Select Function ==========

const calculateCategoryValue = (obj) => {
	return (
		(obj.value.mainCategory !== null ? obj.value.mainCategory.name : '') +
		(obj.value.secondCategory !== null
			? ' > ' + obj.value.secondCategory.name
			: '')
	);
};
//=========== Temp Select Result DTO ==========
const categorySelectResult = ref({
	mainCategory: null,
	secondCategory: null,
	categoryValue: computed(() => calculateCategoryValue(categorySelectResult)),
});

const setSelectResult = (categoryLevel, categoryId) => {
	//若輸入為主要類別
	if (categoryLevel === 'main') {
		const found = mainProductCategories.value.find(
			(category) => category.id == categoryId
		);
		categorySelectResult.value.secondCategory = null;
		categorySelectResult.value.mainCategory = found;
	}
	//若輸入為次要類別
	if (categoryLevel === 'second') {
		const found = secondProductCategoryByMainCategory.value.find(
			(category) => category.id == categoryId
		);
		categorySelectResult.value.secondCategory = found;
	}
};

//=========== Final Select Result DTO ==========
const finalSelectedCategories = ref({
	mainCategory: null,
	secondCategory: null,
	categoryValue: computed(() =>
		calculateCategoryValue(finalSelectedCategories)
	),
});

//準備將資料傳至父組件
const emit = defineEmits(['dataToParent']);

const saveSelectResult = () => {
	finalSelectedCategories.value.mainCategory =
		categorySelectResult.value.mainCategory;
	finalSelectedCategories.value.secondCategory =
		categorySelectResult.value.secondCategory;
		//只傳送第二層類別給父組件
	emit('dataToParent', finalSelectedCategories.value.secondCategory);
};

//========== Select Result Css ========
const changeColor = ref('');
const selectResultChange = () => {
	changeColor.value = 'aqua';
	setTimeout(() => {
		changeColor.value = 'white';
	}, 300);
};
</script>
<style scoped>
.el-input {
	height: 35px;
	font-size: 18px;
}
.select-block {
	display: flex;
	flex-direction: row;
}

.select-result-block {
	display: flex;
	align-items: center;
	justify-content: center;
	flex: auto;
	height: 45px;
	margin: 1rem;
	margin-top: 0;
	transition: all 0.3s ease;
}

.select-result-block > .el-input {
	margin: 1px;
	height: 40px;
	font-size: 30px;
	transition: transform 0.3s ease;
}
.options-block {
	max-height: 400px;
	width: 50%;
}

.categories-group {
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	margin: 1re;
}

.categories-group > .el-button {
	font-size: 16px;
	color: gray;
	margin: 0 !important;
}

.categories-buttons-fade-move,
.categories-buttons-fade-enter-active,
.categories-buttons-fade-leave-active {
	transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.categories-buttons-fade-enter-from,
.categories-buttons-fade-leave-to {
	opacity: 0;
	transform: scaleY(0.01) translate(30px, 0);
}
</style>
