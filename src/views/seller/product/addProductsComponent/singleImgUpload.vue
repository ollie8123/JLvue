<template>
	<transition-group name="img-container-fade">
		<div
			v-if="img"
			class="img-container"
		>
			<img
				:src="img"
				width="98"
				height="98"
				style="object-fit: contain; border-radius: 10%"
			/>
			<div
				class="img-delete-button"
				@click="deleteImg()"
				@mouseover="setIconShow(true)"
				@mouseleave="setIconShow(false)"
			>
				<transition name="fade">
					<i
						v-show="getDeleteIconState()"
						class="bi bi-trash-fill delete-button-icon"
					></i>
				</transition>
			</div>
		</div>
		<div
			class="file-upload-block"
			@click="pictureInput.click()"
			v-if="!img"
		>
			<i class="bi bi-images picture-icon"></i>
			<div class="d-flex flex-column-reverse m-1">
				<span
					class="alert-text"
					v-if="wrongDataTypeCheck"
				>
					請勿輸入非圖片的檔案!!
				</span>
				<span
					class="alert-text"
					v-if="uploadLimitCheck"
				>
					請勿輸入五個以上的圖片!!
				</span>
			</div>
			<input
				type="file"
				accept="image/*"
				ref="pictureInput"
				class="hidden-img-input"
				@change="pictureSelected"
			/>
		</div>
	</transition-group>
</template>
<script setup>
import { ref, watch, defineEmits } from 'vue';

const pictureInput = ref();
const img = ref();
const imgFile = ref();
const wrongDataTypeCheck = ref(false);
const uploadLimitCheck = ref(false);
const emit = defineEmits(['dataToParent']);

watch(imgFile, () => {
	emit('dataToParent', imgFile.value);
});

const pictureSelected = (e) => {
	wrongDataTypeCheck.value = false;
	uploadLimitCheck.value = false;
	const picture = e.target.files[0];
	if (!img) {
		uploadLimitCheck.value = true;
		return;
	}
	if (!picture.type.includes('image')) {
		wrongDataTypeCheck.value = true;
		return;
	}
	const reader = new FileReader();
	reader.addEventListener('load', (e) => {
		img.value = e.target.result;
		imgFile.value = picture;
	});
	reader.readAsDataURL(picture);
};

// Interactive Function Block Start //

const deleteIconStates = ref(false);

const setIconShow = (state) => {
	deleteIconStates.value = state;
};

const getDeleteIconState = () => {
	return deleteIconStates.value;
};

const deleteImg = () => {
	img.value = null;
	imgFile.value = null;
};
</script>
<style scoped>
.file-upload-block {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	width: 100px;
	height: 100px;
	border: 1px dashed cornflowerblue;
	border-radius: 10%;
	cursor: pointer;
}

.file-upload-block:hover {
	transition: background-color 0.5s ease;
	border: 1px dashed rgb(50, 214, 17);
	background-color: rgb(237, 255, 229);
}
.img-container {
	position: relative;
	width: 100px;
	height: 100px;
	margin: 0 5px;
	border: 1px solid;
	border-radius: 10%;
}
.img-container-fade-enter-active,
.img-container-fade-leave-active,
.img-container-fade-move {
	transition: all 0.5s;
}

.img-container-fade-leave-active {
	position: absolute;
}

.img-container-fade-enter-from {
	opacity: 0;
	transform: translateY(-20px);
}

.img-container-fade-leave-to {
	opacity: 0;
	transform: translateY(20px);
}

.picture-icon {
	display: flex;
	justify-content: center;
	font-size: 35px;
	color: cornflowerblue;
}

.img-delete-button {
	position: absolute;
	width: 100%;
	height: 20%;
	bottom: 0;
	background-color: rgba(241, 235, 235, 0.5);
	backdrop-filter: blur(20px);
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	cursor: pointer;
}

.img-delete-button:hover {
	height: 35%;
	opacity: 0.5;
	transition: height 0.5s ease, opacity 0.5s ease;
}

.delete-button-icon {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 25px;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease, font-size 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	font-size: 10px;
}

.hidden-img-input {
	width: 0;
	height: 0;
	opacity: 0;
	pointer-events: none;
}

span {
	font-size: 14px;
	text-align: center;
	line-height: 15px;
	color: cornflowerblue;
}

.alert-text {
	color: red;
	font-size: 10px;
}
</style>
