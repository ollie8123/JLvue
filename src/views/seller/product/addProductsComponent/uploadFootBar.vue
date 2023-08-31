<template>
	<div class="upload-block">
		<div class="button-block">
			<el-button @click="cancelDialogVisable = true">取消</el-button>
			<el-button @click="submitProductPageData('unLaunch')"
				>儲存並下架</el-button
			>
			<el-button
				type="danger"
				@click="submitProductPageData('launch')"
				>儲存並上架</el-button
			>
		</div>
	</div>
	<el-dialog
		v-model="cancelDialogVisable"
		title="確認"
		width="30%"
		align-center
		:close-on-click-modal="false"
	>
		<span class="dialog-text"> 是否捨棄目前的所有變更? </span>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="cancelDialogVisable = false">取消</el-button>
				<el-button
					tag="router-link"
					type="danger"
					to="/seller/"
				>
					確定
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup>
import { ref, defineEmits } from 'vue';
// 被 el-button 引用
import { RouterLink } from 'vue-router';
import { ElButton, ElDialog } from 'element-plus';


const cancelDialogVisable = ref(false);
const emit = defineEmits(['triggerToParent']);
const submitProductPageData = (productPageStatus) => {
	emit('triggerToParent', productPageStatus);
};
</script>
<style scoped>
.upload-block {
	margin: 0 15px;
	height: 100%;
	border-radius: 20px 20px 0 0;
	box-shadow: var(--el-box-shadow-dark);
	background-color: ghostwhite;
}
.button-block {
	height: 100%;
	margin: 0 30px;
	display: flex;
	justify-content: end;
	align-items: center;
}
.el-button {
	font-size: 16px;
	text-decoration: none;
}

.dialog-text {
	font-size: 18px;
}
</style>
