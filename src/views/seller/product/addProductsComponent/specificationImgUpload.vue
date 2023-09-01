<template>
	<el-table
		:data="empty"
		border
	>
		<el-table-column
			v-for="(option, index) in modifiedOptions"
			:label="option.name"
			><template #default="{ row }">
				<div class="img-block">
					<singleImgUpload
						@data-to-parent="getImgs($event, index)"
					/></div></template></el-table-column
	></el-table>
</template>
<script setup>
import { ref, defineProps, computed, defineEmits } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import singleImgUpload from './singleImgUpload.vue';
const emit = defineEmits(['dataToParent']);
const props = defineProps({
	mainSpecificationClassOptions: Array,
	mainSpecificationClassName: String,
});

const modifiedOptions = computed(() => {
	if (props.mainSpecificationClassOptions.length > 1) {
		return props.mainSpecificationClassOptions.slice(0, -1); // 去掉最后一项
	}
	return props.mainSpecificationClassOptions;
});
const empty = ref([{}]);
const photos = computed(() => {
	let data = [];
	for (let i = 0; i < modifiedOptions.value.length; i++) {
		data.push({
			no: i,
			img: null,
		});
	}
	return data;
});
const getImgs = (img, no) => {
	const data = photos.value.slice();
	const index = data.findIndex((item) => item.no === no);
	if (index !== -1) {
		data[index].img = img;
	}
	emit('dataToParent', data);
};
</script>
<style scoped>
.img-block {
	display: flex;
	justify-content: center;
}
</style>
