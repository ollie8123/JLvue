<template>
	<el-form
		label-position="right"
		label-width="140px"
		:rules="props.formRules"
		:model="specificationProducts"
		style="font-size: 30px"
	>
		<el-form-item label="規格"
			><el-alert
				:closable="secondSpecificationClassName === null"
				class="specification-form"
				@close="closeSpecificationBlock()"
			>
				<i
					v-if="secondSpecificationClassName !== null"
					class="el-icon el-alert__close-btn"
					@click="changeSecondToMain()"
					><el-icon><Close /></el-icon
				></i>
				<el-form
					label-position="right"
					label-width="80px"
					:rules="props.formRules"
					><el-form-item label="規格一"
						><el-input
							v-model="mainSpecificationClassName"
							class="el-input-small"
							placeholder="規格一"
							@focus="addNewOption(0, 'main')" /></el-form-item
					><el-form-item
						class="specification-option"
						label="選項"
						v-if="mainSpecificationClassOptions.length > 0"
						><div
							class="option-block"
							v-for="(option, index) in mainSpecificationClassOptions"
						>
							<el-input
								v-model="mainSpecificationClassOptions[index].name"
								:key="index"
								class="el-input-small"
								@focus="addNewOption(index + 1, 'main')"
							/>
							<el-button
								class="option-delete-button"
								type="info"
								plain
								:icon="Delete"
								disabled
								@click="removeCurrentOption(index, 'main')"
							></el-button>
						</div> </el-form-item
					><el-form-item label=" "
						><el-button
							v-if="secondSpecificationClassName === null"
							class="add-specification-button"
							type="primary"
							plain
							@click="secondSpecificationClassName = ''"
							>新增規格</el-button
						></el-form-item
					></el-form
				></el-alert
			>
			<el-alert
				class="specification-form"
				v-if="secondSpecificationClassName != null"
				@close="closeSpecificationBlock()"
				><el-form
					label-position="right"
					label-width="80px"
					:rules="props.formRules"
					><el-form-item label="規格二"
						><el-input
							v-model="secondSpecificationClassName"
							placeholder="規格二"
							class="el-input-small"
						></el-input></el-form-item
					><el-form-item
						class="specification-option"
						label="選項"
						v-if="secondSpecificationClassOptions.length > 0"
						><div
							class="option-block"
							v-for="(option, index) in secondSpecificationClassOptions"
						>
							<el-input
								v-model="secondSpecificationClassOptions[index].name"
								:key="index"
								class="el-input-small"
								@focus="addNewOption(index + 1, 'second')"
							/>
							<el-button
								class="option-delete-button"
								type="info"
								plain
								:icon="Delete"
								disabled
								@click="removeCurrentOption(index, 'second')"
							></el-button>
						</div>
					</el-form-item> </el-form
			></el-alert>
		</el-form-item>
		<el-form-item>
			<specification-img-upload
				class="specification-img-upload"
				@data-to-parent="getMainSpecifiCationImg"
				:mainSpecificationClassOptions="mainSpecificationClassOptions"
				:mainSpecificationClassName="mainSpecificationClassName"
			/>
			<el-table
				:data="specificationProducts"
				:default-sort="{
					prop: 'mainSpecificationClassOption.name',
					order: 'descending',
				}"
				:span-method="mainSpecSpanMethod"
				border
				><el-table-column
					prop="mainSpecificationClassOption.name"
					:label="
						mainSpecificationClassName === ''
							? '規格一'
							: mainSpecificationClassName
					"
					><template #default="{ row }"
						><div class="main-specification-block">
							{{ row.mainSpecificationClassOption.name }}
						</div>
					</template></el-table-column
				><el-table-column
					prop="secondSpecificationClassOption.name"
					:label="
						secondSpecificationClassName === ''
							? '規格二'
							: secondSpecificationClassName
					"
				/><el-form></el-form>
				<el-table-column
					prop="price"
					label="價格"
				>
					<template #default="{ row }">
						<el-form
							:model="row"
							:rules="props.formRules"
							><el-form-item prop="price">
								<el-input-number
									:controls="false"
									v-model.number="row.price"
								/> </el-form-item
						></el-form> </template></el-table-column
				><el-table-column
					prop="stocks"
					label="數量"
				>
					<template #default="{ row }"
						><el-form
							:model="row"
							:rules="props.formRules"
							><el-form-item prop="stocks">
								<el-input-number
									:controls="false"
									v-model.number="row.stocks"
								/> </el-form-item
						></el-form> </template
				></el-table-column>
			</el-table>
		</el-form-item>
	</el-form>
</template>
<script setup>
import { ref, defineEmits, defineProps, computed, onMounted, watch } from 'vue';
import {
	ElAlert,
	ElInput,
	ElInputNumber,
	ElForm,
	ElFormItem,
	ElButton,
	ElTable,
	ElTableColumn,
	ElIcon,
} from 'element-plus';
import { Delete, Close } from '@element-plus/icons-vue';

import specificationImgUpload from './specificationImgUpload.vue';
const props = defineProps({
	formRules: Object,
});
const specificationProducts = ref([]);

const mainSpecificationClassName = ref('');
let mainSpecNo = 1;
const createNewMainSpec = () => {
	const result = {
		no: mainSpecNo,
		className: computed(() => {
			return mainSpecificationClassName.value;
		}),
		name: null,
	};
	mainSpecNo++;
	return result;
};
const mainSpecificationClassOptions = ref([createNewMainSpec()]);

let secondSpecNo = 1;
const createNewSecondSpec = () => {
	const result = {
		no: secondSpecNo,
		className: computed(() => {
			return secondSpecificationClassName.value;
		}),
		name: null,
	};
	secondSpecNo++;
	return result;
};
const secondSpecificationClassName = ref(null);
const secondSpecificationClassOptions = ref([createNewSecondSpec()]);

onMounted(() => {
	newProductInit(0, 0);
});
const emit = defineEmits([
	'dataToParent',
	'changeToSingleProductMode',
	'specImgsToParent',
]);

watch(specificationProducts.value, () => {
	emit('dataToParent', {
		mainSpecificationClassOptions: mainSpecificationClassOptions.value,
		secondSpecificationClassOptions: secondSpecificationClassOptions.value,
		products: specificationProducts.value,
	});
});

const addNewOption = (optionAmount, specificationLevel) => {
	if (
		specificationLevel === 'main' &&
		mainSpecificationClassOptions.value.length === optionAmount
	) {
		mainSpecificationClassOptions.value.push(createNewMainSpec());
		createNewProduct(optionAmount - 1, specificationLevel);
	}
	if (
		specificationLevel === 'second' &&
		secondSpecificationClassOptions.value.length === optionAmount
	) {
		secondSpecificationClassOptions.value.push(createNewSecondSpec());
		createNewProduct(optionAmount - 1, specificationLevel);
	}
};
const removeCurrentOption = (optionIndex, specificationLevel) => {
	if (specificationLevel === 'main') {
		mainSpecificationClassOptions.value.splice(optionIndex, 1);
	}
	if (specificationLevel === 'second') {
		secondSpecificationClassOptions.value.splice(optionIndex, 1);
	}
};

const closeSpecificationBlock = () => {
	setTimeout(() => {
		if (secondSpecificationClassName.value === null) {
			mainSpecificationClassOptions.value = null;
			secondSpecificationClassOptions.value = null;
			specificationProducts.value = null;
			emit('changeToSingleProductMode', 'single-product-mode');
		}
		if (secondSpecificationClassName.value !== null) {
			initSecondSpecification();
		}
	}, 200);
};

const createNewProduct = (optionIndex, specificationLevel) => {
	if (optionIndex === 0) {
		return;
	}
	if (specificationLevel === 'main') {
		if (secondSpecificationClassOptions.value.length === 1) {
			newProductInit(optionIndex, 0);
		}
		for (
			let secondIndex = 0;
			secondIndex < secondSpecificationClassOptions.value.length - 1;
			secondIndex++
		) {
			newProductInit(optionIndex, secondIndex);
		}
	}
	if (specificationLevel === 'second') {
		if (mainSpecificationClassOptions.value.length === 1) {
			newProductInit(0, optionIndex);
		}
		for (
			let mainIndex = 0;
			mainIndex < mainSpecificationClassOptions.value.length - 1;
			mainIndex++
		) {
			newProductInit(mainIndex, optionIndex);
		}
	}
};

const newProductInit = (mainSpecIndex, secondSpecIndex) => {
	const newProduct = {
		mainSpecificationClassOption: computed(() => {
			return mainSpecificationClassOptions.value[mainSpecIndex];
		}),
		secondSpecificationClassOption: computed(() => {
			return secondSpecificationClassOptions.value[secondSpecIndex];
		}),
		price: null,
		stocks: null,
	};
	specificationProducts.value.push(newProduct);
};
const initSecondSpecification = () => {
	secondSpecificationClassName.value = null;
	secondSpecificationClassOptions.value = [createNewSecondSpec()];
	specificationProducts.value = [];
	for (
		let newMainIndex = 0;
		newMainIndex < mainSpecificationClassOptions.value.length - 1;
		newMainIndex++
	) {
		newProductInit(newMainIndex, 0);
	}
};

const changeSecondToMain = () => {
	mainSpecificationClassName.value = secondSpecificationClassName.value;
	mainSpecificationClassOptions.value = secondSpecificationClassOptions.value;
	initSecondSpecification();
};

const getMainSpecifiCationImg = (imgsFile) => {
	// console.log(imgsFile);
	emit('specImgsToParent', imgsFile);
};

const mainSpecSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
	const computedRowspan = computed(() => {
		let value = secondSpecificationClassOptions.value.length - 1;
		if (value === 0) {
			return value + 1;
		}
		return value;
	});
	if (columnIndex === 0) {
		if (rowIndex % computedRowspan.value === 0) {
			return {
				rowspan: computedRowspan.value,
				colspan: 1,
			};
		} else {
			return {
				rowspan: 0,
				colspan: 0,
			};
		}
	}
};
</script>
<style scoped>
.el-form-item {
	--el-form-label-font-size: 16px;
	margin-bottom: 12px;
}
.el-input-small {
	width: 300px;
}
.el-input-number {
	width: 100%;
}
.specification-form {
	margin: 10px;
	width: 100%;
	padding: 20px;
}
.option-block {
	width: 450px;
	margin-bottom: 12px;
}
.specification-option {
	margin-bottom: 0;
}
.option-delete-button {
	padding: 7px;
	margin: 0 10px;
}
.add-specification-button {
	padding: 20px;
}

.main-specification-block {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.specification-img-upload{
	margin-bottom: 20px;
}
</style>
