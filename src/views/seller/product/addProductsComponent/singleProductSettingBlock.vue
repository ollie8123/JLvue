<template>
	<el-form
		label-position="right"
		label-width="140px"
		:rules="formRules"
		:model="singleProduct"
		style="font-size: 30px"
		><el-form-item label="開啟規格"
			><el-button
				type="primary"
				plain
				@click="changeToSpecificationMode"
				>點我切換</el-button
			></el-form-item
		><el-form-item
			label="價格"
			prop="price"
			><el-input-number
				class="el-input-small"
				:controls="false"
				v-model.number="singleProduct.price"
				@input="dataToParent"
			></el-input-number
		></el-form-item>
		<el-form-item
			label="商品數量"
			prop="stocks"
			><el-input-number
				class="el-input-small"
				:controls="false"
				v-model.number="singleProduct.stocks"
				@input="dataToParent"
			></el-input-number
		></el-form-item>
	</el-form>
</template>
<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { ElForm, ElFormItem, ElButton,ElInputNumber } from 'element-plus';

defineProps({
	formRules: Object,
});

const singleProduct = ref({
	mainSpecificationClassOption: null,
	secondSpecificationClassOption: null,
	price: null,
	stocks: null,
});

const emit = defineEmits(['dataToParent', 'changeToSpecificationMode']);

const dataToParent = () => {
	emit('dataToParent', singleProduct.value);
};

const changeToSpecificationMode = () => {
	emit('changeToSpecificationMode', 'specification-mode');
};
</script>
<style scoped>
.el-form-item {
	--el-form-label-font-size: 16px;
}

.el-input-small {
	width: 300px;
}
</style>
