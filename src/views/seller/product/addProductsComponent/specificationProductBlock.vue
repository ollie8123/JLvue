<template>
	<el-form
		label-position="right"
		label-width="140px"
		:rules="formRules"
		:model="specificationProducts"
		style="font-size: 30px"
	>
		<el-form-item label="規格"
			><el-alert
				class="spcification-form"
				@close="changeToSingleProductMode"
				><el-form
					label-position="right"
					label-width="80px"
					:rules="formRules"
					><el-form-item
						class="specification-option"
						label="規格一"
						><el-input class="el-input-small"></el-input></el-form-item
					><el-form-item
						class="specification-option"
						label="選項"
						><div class="option-block">
							<el-input class="el-input-small" />
							<el-button
                                class="option-delete-button"
								type="info"
								plain
                                :icon="Delete"
								></el-button
							>
						</div>
					</el-form-item>
				</el-form></el-alert
			>
			<el-alert class="spcification-form"
				><el-form
					label-position="right"
					label-width="80px"
					:rules="formRules"
					><el-form-item label="規格二"
						><el-input class="el-input-small"></el-input
					></el-form-item> </el-form
			></el-alert>
		</el-form-item>
	</el-form>
</template>
<script setup>
import { ref, defineEmits, defineProps, onUpdated } from 'vue';
import { ElAlert, ElInput, ElForm, ElFormItem, ElButton } from 'element-plus';
import { Delete } from '@element-plus/icons-vue'
const specificationProducts = ref([]);

defineProps({
	formRules: Object,
});
const emit = defineEmits(['dataToParent', 'changeToSingleProductMode']);
const changeToSingleProductMode = () => {
	emit('changeToSingleProductMode', 'single-product-mode');
};
</script>
<style scoped>
.el-form-item {
	--el-form-label-font-size: 16px;
}
.el-input-small {
	width: 300px;
}

.spcification-form {
	margin: 10px;
	width: 100%;
	padding: 20px;
}

.specification-option {
	margin-top: 10px;
}
.option-delete-button {
    margin: 10px;
}
</style>
