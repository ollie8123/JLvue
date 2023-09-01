<template>
	<div class="bigDiv">
		<div class="kind">
			<span>分類</span>
			<el-carousel
				trigger="click"
				:autoplay="false"
				arrow="always"
				height="200px"
			>
				<el-carousel-item
					v-for="item in count"
					:key="item"
				>
					<el-row>
						<el-col
							:span="3"
							v-for="i in 16 * item"
							:key="i"
							class="col"
						>
							<el-card
								shadow="hover"
								class="button d-flex flex-column"
								@click="buttonKind(KindList.values[i - 1][1])"
								v-if="i > (item - 1) * 16 && i <= item * 16"
							>
							<img :src="imagePaths[i - 1]" alt="Description of the image" class="cardImg">
								
								<div>
									{{
										KindList.values && KindList.values[i - 1]
											? KindList.values[i - 1][1]
											: ''
									}}
								</div>
							</el-card>
						</el-col>
					</el-row>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue';
import { axios, CookieAxios } from '../../service/api';
import { useRouter } from 'vue-router';
import {
	ElButton,
	ElCarousel,
	ElRow,
	ElCard,
	ElCarouselItem,
	ElCol,
} from 'element-plus';
import 'element-plus/dist/index.css';
const router = useRouter();
const count = ref(0);
const KindList = reactive([]);
const buttonKind = (n) => {
	// alert(n);
	// router.push('/search_category');
};


const imagePaths = [
    '/image/IndexView/image1.png',
    '/image/IndexView/image2.png',
	'/image/IndexView/image3.png',
	'/image/IndexView/image4.png',
	'/image/IndexView/image5.png',
	'/image/IndexView/image6.png',
	'/image/IndexView/image7.jpeg',
	'/image/IndexView/image8.png',
	'/image/IndexView/image9.png',
	'/image/IndexView/image10.png',
	'/image/IndexView/image11.png',
	'/image/IndexView/image12.png',
	'/image/IndexView/image13.png',
	'/image/IndexView/image14.png',
	'/image/IndexView/image15.png',
	'/image/IndexView/image16.png',
	'/image/IndexView/image17.png',
	'/image/IndexView/image18.png',
	'/image/IndexView/image19.png',
	'/image/IndexView/image20.png',
	'/image/IndexView/image21.png',
	'/image/IndexView/image22.png',
	'/image/IndexView/image23.png',
	'/image/IndexView/noImg.png',
	'/image/IndexView/noImg.png',
	'/image/IndexView/noImg.png',
	'/image/IndexView/noImg.png',
	'/image/IndexView/noImg.png',
	'/image/IndexView/noImg.png',
	'/image/IndexView/noImg.png',
	'/image/IndexView/noImg.png',
	'/image/IndexView/noImg.png',


    
];



onMounted(async () => {
	await CookieAxios.post('/public/select/MainProductCategory').then((req) => {
		console.log(req.data.data[0]);
		KindList.values = req.data.data;
		count.value = Math.ceil(KindList.values.length / 16);
	});
});
</script>
<style scoped>
.kind {
	background-color: white;
	margin: 15px 0 0 0;
	padding: 0;
	border: 1px solid rgb(204, 195, 195);
}
.kind span {
	font-size: 20px;
	margin: 0 0 0 2%;
}
.button {
	height: 100px;
	width: 100%;
}
.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 150px;
	margin: 0;
}


.cardImg {
    width: 50px;
    height: 50px;


}

.bigDiv{
	background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);


}

</style>
