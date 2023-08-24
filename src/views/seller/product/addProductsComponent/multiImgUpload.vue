<template>
	<transition-group name="img-container-fade">
		<div
			:key="imgNum"
			v-for="(img, imgNum) in imgs"
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
				@click="deleteImg(imgNum)"
				@mouseover="setIconShow(imgNum, true)"
				@mouseleave="setIconShow(imgNum, false)"
			>
				<transition name="fade">
					<i
						v-show="getDeleteIconState(imgNum)"
						class="bi bi-trash-fill delete-button-icon"
					></i>
				</transition>
			</div>
		</div>
	</transition-group>

	<div
		class="file-upload-block"
		@click="triggerInput"
		v-show="imgCount < 5"
	>
		<i class="bi bi-images picture-icon"></i>

		<span>新增圖片</span>
		<span>({{ imgCount }}/5)</span>
		<input
			type="file"
			accept="image/*"
			multiple
			ref="pictureInput"
			class="hidden-img-input"
			@change="pictureSelected"
		/>
	</div>
	<div class="d-flex flex-column-reverse m-3">
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
</template>
<script setup>
import { ref, watchEffect } from 'vue';

const pictureInput = ref();
const imgs = ref([]);
const imgCount = ref(0);
watchEffect(() => {
	imgCount.value = imgs.value.length;
});
const wrongDataTypeCheck = ref(false);
const uploadLimitCheck = ref(false);

const triggerInput = () => {
	if (imgCount.value >= 5) {
		return;
	}
	pictureInput.value.click();
};

const pictureSelected = (e) => {
	wrongDataTypeCheck.value = false;
	uploadLimitCheck.value = false;

	const pictures = e.target.files;

	if (imgCount.value + pictures.length > 5) {
		uploadLimitCheck.value = true;
		return;
	}

	for (let picture of pictures) {
		if (!picture.type.includes('image')) {
			wrongDataTypeCheck.value = true;
			continue;
		}
		const reader = new FileReader();
		reader.addEventListener('load', pictureLoaded);
		reader.readAsDataURL(picture);
	}
};

const pictureLoaded = (e) => {
	imgs.value.push(e.target.result);
};

// Interactive Function Block Start //

const deleteIconStates = ref(Array(imgs.value.length).fill(false));

const setIconShow = (imgNum, state) => {
	deleteIconStates.value[imgNum] = state;
};

const getDeleteIconState = (imgNum) => {
	return deleteIconStates.value[imgNum];
};

const deleteImg = (imgNum) => {
	deleteIconStates.value.splice(imgNum, 1);
	imgs.value.splice(imgNum, 1);
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
	font-size: 18px;
}
</style>
